/* eslint-disable @typescript-eslint/naming-convention */
import {repository} from '@loopback/repository';
import {get, getModelSchemaRef, param} from '@loopback/rest';
import {Roll, User} from '../models';
import {UserRepository} from '../repositories';

export class UserRollController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) {}

  @get('/users/{id}/roll', {
    responses: {
      '200': {
        description: 'Roll belonging to User',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Roll)},
          },
        },
      },
    },
  })
  async getRoll(
    @param.path.string('id') id: typeof User.prototype._id,
  ): Promise<Roll> {
    return this.userRepository.roll(id);
  }
}
