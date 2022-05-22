import {belongsTo, Entity, model, property, hasOne} from '@loopback/repository';
import {Configuration} from '../config/configuration';
import {Roll} from './roll.model';
import {UserProfile} from './user-profile.model';

@model()
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id?: string;

  @property({
    type: 'string',
    required: true,
    index: {unique: true},
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  firstName: string;

  @property({
    type: 'string',
    required: true,
  })
  lastName: string;

  @property({
    type: 'string',
    required: true,
    index: {unique: true},
  })
  mobile: string;

  @property({
    type: 'string',
  })
  password?: string;

  @property({
    type: 'string',
    default: Configuration.defaultAvatarImage,
  })
  avatarUrl?: string;

  @property({
    type: 'string',
  })
  defaultSpeCode?: string;

  @property({
    type: 'string',
  })
  defaultAuthCode?: string;

  @property({
    type: 'boolean',
    default: true,
  })
  isActive?: boolean;

  @belongsTo(() => Roll)
  rollId: string;

  @hasOne(() => UserProfile)
  userProfile: UserProfile;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
