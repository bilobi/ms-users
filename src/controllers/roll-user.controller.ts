/* eslint-disable @typescript-eslint/naming-convention */
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {Roll, User} from '../models';
import {RollRepository} from '../repositories';

export class RollUserController {
  constructor(
    @repository(RollRepository) protected rollRepository: RollRepository,
  ) {}

  @get('/rolls/{id}/users', {
    responses: {
      '200': {
        description: 'Array of Roll has many User',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<User>,
  ): Promise<User[]> {
    return this.rollRepository.users(id).find(filter);
  }

  @post('/rolls/{id}/users', {
    responses: {
      '200': {
        description: 'Roll model instance',
        content: {'application/json': {schema: getModelSchemaRef(User)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Roll.prototype._id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUserInRoll',
            exclude: ['_id'],
            optional: ['rollId'],
          }),
        },
      },
    })
    user: Omit<User, '_id'>,
  ): Promise<User> {
    return this.rollRepository.users(id).create(user);
  }

  @patch('/rolls/{id}/users', {
    responses: {
      '200': {
        description: 'Roll.User PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: Partial<User>,
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where<User>,
  ): Promise<Count> {
    return this.rollRepository.users(id).patch(user, where);
  }

  @del('/rolls/{id}/users', {
    responses: {
      '200': {
        description: 'Roll.User DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where<User>,
  ): Promise<Count> {
    return this.rollRepository.users(id).delete(where);
  }
}
