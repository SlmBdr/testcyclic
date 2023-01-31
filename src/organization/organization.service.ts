import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Model } from 'mongoose';
import { firebaseService } from 'src/firebase/firebase.service';
import { IFilterParams } from 'src/interfaces/filter.type';
import { organizationDocument } from 'src/interfaces/mongoose.gen';
import { organization } from 'src/models/organization.schema';
import filterUtilities from 'src/utilities/filter';
import owner_information from 'src/models/sub-schema/owner_information.schema';
import { doc, DocumentReference } from 'firebase/firestore/lite';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectModel(organization.name)
    private organizationModel: Model<organizationDocument>,
    private firebaseService: firebaseService,
    private docRef: DocumentReference,
  ) {}

  async createOrganization(organization: organizationDocument) {
    const create_owner = await createUserWithEmailAndPassword(
      this.firebaseService.auth,
      organization.owner.account_email,
      organization.owner.account_password,
    );
    delete organization.owner.account_password;
    const uid: string = create_owner.user.uid;
    const docRef: DocumentReference = doc(
      this.firebaseService.organizationCollection,
      uid,
    );
    const newOrganization = new this.organizationModel({
      ...organization,
      owner_information,
    });
    if (!newOrganization) {
      return null;
    } else {
      return newOrganization.save();
    }
  }
  async findAllOrganization(filter: IFilterParams) {
    return await this.organizationModel.find(await filterUtilities(filter));
  }

  async findOne(name: string) {
    const data = await this.organizationModel.findOne({
      name,
    });
    return data;
  }

  async update(name: string, body: organizationDocument) {
    return this.organizationModel.updateOne({ name }, { $set: { ...body } });
  }
}
