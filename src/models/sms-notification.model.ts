import {Model, model, property} from '@loopback/repository';

@model()
export class SmsNotification extends Model {
  @property({
    type: 'string',
    required: true,
  })
  destination: string;

  @property({
    type: 'string',
    required: true,
  })
  message: string;


  constructor(data?: Partial<SmsNotification>) {
    super(data);
  }
}

export interface SmsNotificationRelations {
  // describe navigational properties here
}

export type SmsNotificationWithRelations = SmsNotification & SmsNotificationRelations;
