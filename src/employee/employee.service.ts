import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { error } from 'console';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, DocumentReference, setDoc } from 'firebase/firestore/lite';
import { Model } from 'mongoose';
import { firebaseService } from 'src/firebase/firebase.service';
import { IFilterParams } from 'src/interfaces/filter.type';
import { employeeDocument } from 'src/interfaces/mongoose.gen';
import { employee } from 'src/models/employee.schema';
import filterUtilities from 'src/utilities/filter';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(employee.name)
    private employeeeModel: Model<employeeDocument>,
    private firebaseService: firebaseService,
  ) {}

  async createEmployee(employee: employeeDocument) {
    const toFirestore = await createUserWithEmailAndPassword(
      this.firebaseService.auth,
      employee.account.account_email,
      employee.account.account_password,
    );
    const uid: string = toFirestore.user.uid;
    const docRef: DocumentReference = doc(
      this.firebaseService.employeeCollection,
      uid,
    );
    const newEmployee = new this.employeeeModel(employee);
    console.log(newEmployee);
    if (!newEmployee) {
      return null;
    } else {
      setDoc(docRef, {
        email: employee.account.account_email,
        password: employee.account.account_password,
        employee_id: newEmployee.id,
      });
      return newEmployee.save();
    }
  }

  async findAllEmployee(filter: IFilterParams) {
    return await this.employeeeModel
      .find(await filterUtilities(filter))
      .populate([
        {
          path: 'created_by',
          select: 'name',
        },
        {
          path: 'updated_by',
          select: 'name',
        },
        {
          path: 'organization',
        },
      ]);
  }

  async findOne(position: string) {
    const data = await this.employeeeModel
      .findOne({
        position,
      })
      .populate([
        {
          path: 'created_by',
          select: ['name.first', 'name.last'],
        },
        {
          path: 'updated_by',
          select: 'name',
        },
      ]);
    if (data == null) {
      return { data: null, error };
    }
    return { data, error: null };
  }

  update(name: string, employee: employeeDocument) {
    return this.employeeeModel.updateOne(
      {
        name,
      },
      { $set: { employee } },
    );
  }
}
