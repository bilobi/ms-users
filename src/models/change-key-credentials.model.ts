import {Model, model, property} from '@loopback/repository';

@model()
export class ChangeKeyCredentials extends Model {
  @property({
    type: 'string',
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  currentPassword: string;

  @property({
    type: 'string',
    required: true,
  })
  newPassword: string;

  constructor(data?: Partial<ChangeKeyCredentials>) {
    super(data);
  }
}

export interface ChangeKeyCredentialsRelations {
  // describe navigational properties here
}

export type ChangeKeyCredentialsWithRelations = ChangeKeyCredentials &
  ChangeKeyCredentialsRelations;
