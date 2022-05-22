import {Entity, model, property, hasMany} from '@loopback/repository';
import {User} from './user.model';

@model()
export class Roll extends Entity {
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
  name: string;

  @hasMany(() => User)
  users: User[];

  constructor(data?: Partial<Roll>) {
    super(data);
  }
}

export interface RollRelations {
  // describe navigational properties here
}

export type RollWithRelations = Roll & RollRelations;
