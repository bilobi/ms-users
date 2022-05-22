import {Model, model, property} from '@loopback/repository';

@model()
export class CredentialRecoveryPassword extends Model {
  @property({
    type: 'string',
    required: true,
  })
  email: string;

  constructor(data?: Partial<CredentialRecoveryPassword>) {
    super(data);
  }
}

export interface RecoveryPasswordRelations {
  // describe navigational properties here
}

export type RecoveryPasswordWithRelations = CredentialRecoveryPassword &
  RecoveryPasswordRelations;
