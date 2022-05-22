import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class UserProfile extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'string',
    required: true,
  })
  userId: string;

  @property({
    type: 'string',
    required: true,
  })
  prefix: string;

  @property({
    type: 'string',
    required: true,
  })
  position: string;

  @property({
    type: 'date',
    required: true,
  })
  hireDate: string;

  @property({
    type: 'date',
  })
  birthDate?: string;

  @property({
    type: 'string',
  })
  bloodType?: string;

  @property({
    type: 'string',
  })
  birthplace?: string;

  @property({
    type: 'string',
  })
  address?: string;

  @property({
    type: 'string',
  })
  notes?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<UserProfile>) {
    super(data);
  }
}

export interface UserProfileRelations {
  // describe navigational properties here
}

export type UserProfileWithRelations = UserProfile & UserProfileRelations;
