/* eslint-disable @typescript-eslint/naming-convention */
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Roll} from '../models';
import {RollRepository} from '../repositories';

export class RollController {
  constructor(
    @repository(RollRepository)
    public rollRepository: RollRepository,
  ) {}

  @post('/rolls')
  @response(200, {
    description: 'Roll model instance',
    content: {'application/json': {schema: getModelSchemaRef(Roll)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Roll, {
            title: 'NewRoll',
            exclude: ['_id'],
          }),
        },
      },
    })
    roll: Omit<Roll, '_id'>,
  ): Promise<Roll> {
    return this.rollRepository.create(roll);
  }

  @get('/rolls/count')
  @response(200, {
    description: 'Roll model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Roll) where?: Where<Roll>): Promise<Count> {
    return this.rollRepository.count(where);
  }

  @get('/rolls')
  @response(200, {
    description: 'Array of Roll model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Roll, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Roll) filter?: Filter<Roll>): Promise<Roll[]> {
    return this.rollRepository.find(filter);
  }

  @patch('/rolls')
  @response(200, {
    description: 'Roll PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Roll, {partial: true}),
        },
      },
    })
    roll: Roll,
    @param.where(Roll) where?: Where<Roll>,
  ): Promise<Count> {
    return this.rollRepository.updateAll(roll, where);
  }

  @get('/rolls/{id}')
  @response(200, {
    description: 'Roll model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Roll, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Roll, {exclude: 'where'}) filter?: FilterExcludingWhere<Roll>,
  ): Promise<Roll> {
    return this.rollRepository.findById(id, filter);
  }

  @patch('/rolls/{id}')
  @response(204, {
    description: 'Roll PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Roll, {partial: true}),
        },
      },
    })
    roll: Roll,
  ): Promise<void> {
    await this.rollRepository.updateById(id, roll);
  }

  @put('/rolls/{id}')
  @response(204, {
    description: 'Roll PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() roll: Roll,
  ): Promise<void> {
    await this.rollRepository.replaceById(id, roll);
  }

  @del('/rolls/{id}')
  @response(204, {
    description: 'Roll DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.rollRepository.deleteById(id);
  }
}
