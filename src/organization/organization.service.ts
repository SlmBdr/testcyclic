import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { organizationDocument } from 'src/interfaces/mongoose.gen';
import { organization } from 'src/models/organization.schema';

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
  async findAllOrganization() {
    return await this.organizationModel.find();
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
