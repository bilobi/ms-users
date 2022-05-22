import {Getter, inject} from '@loopback/core';
import {
  DefaultCrudRepository,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Roll, RollRelations, User} from '../models';
import {UserRepository} from './user.repository';

export class RollRepository extends DefaultCrudRepository<
  Roll,
  typeof Roll.prototype._id,
  RollRelations
> {
  public readonly users: HasManyRepositoryFactory<
    User,
    typeof Roll.prototype._id
  >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
    @repository.getter('UserRepository')
    protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Roll, dataSource);
    this.users = this.createHasManyRepositoryFactoryFor(
      'users',
      userRepositoryGetter,
    );
    this.registerInclusionResolver('users', this.users.inclusionResolver);
  }
}
