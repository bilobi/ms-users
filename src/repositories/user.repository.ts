import {Getter, inject} from '@loopback/core';
import {
  BelongsToAccessor,
  DefaultCrudRepository,
  repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Roll, User, UserRelations, UserProfile} from '../models';
import {RollRepository} from './roll.repository';
import {UserProfileRepository} from './user-profile.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype._id,
  UserRelations
> {
  public readonly roll: BelongsToAccessor<Roll, typeof User.prototype._id>;

  public readonly userProfile: HasOneRepositoryFactory<UserProfile, typeof User.prototype._id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
    @repository.getter('RollRepository')
    protected rollRepositoryGetter: Getter<RollRepository>, @repository.getter('UserProfileRepository') protected userProfileRepositoryGetter: Getter<UserProfileRepository>,
  ) {
    super(User, dataSource);
    this.userProfile = this.createHasOneRepositoryFactoryFor('userProfile', userProfileRepositoryGetter);
    this.registerInclusionResolver('userProfile', this.userProfile.inclusionResolver);
    this.roll = this.createBelongsToAccessorFor('roll', rollRepositoryGetter);
    this.registerInclusionResolver('roll', this.roll.inclusionResolver);
  }
}
