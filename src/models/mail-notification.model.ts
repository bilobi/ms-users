import {Model, model, property} from '@loopback/repository';

@model()
export class MailNotification extends Model {
  @property({
    type: 'string',
    required: true,
  })
  destination: string;

  @property({
    type: 'string',
    required: true,
  })
  subject: string;

  @property({
    type: 'string',
    required: true,
  })
  message: string;

  @property({
    type: 'string',
    required: true,
  })
  attached: string;

  constructor(data?: Partial<MailNotification>) {
    super(data);
  }
}

export interface MailNotifiycationRelations {
  // describe navigational properties here
}

export type MailNotifiycationWithRelations = MailNotification &
  MailNotifiycationRelations;
