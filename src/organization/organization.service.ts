import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IFilterParams } from 'src/interfaces/filter.type';
import { organizationDocument } from 'src/interfaces/mongoose.gen';
import { organization } from 'src/models/organization.schema';
import filterUtilities from 'src/utilities/filter';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectModel(organization.name)
    private organizationModel: Model<organizationDocument>,
  ) {}

  async createOrganization(organization: organizationDocument) {
    const newOrganization = new this.organizationModel(organization);
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
