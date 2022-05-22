/* eslint-disable @typescript-eslint/naming-convention */
import {service} from '@loopback/core';
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
  HttpErrors,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Configuration} from '../config/configuration';
import {
  ChangeKeyCredentials,
  Credential,
  CredentialRecoveryPassword,
  MailNotification,
  SmsNotification,
  User,
} from '../models';
import {UserRepository} from '../repositories';
import {
  KeyManagerService,
  NotificationService,
  SessionUsersService,
} from '../services';

export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @service(KeyManagerService)
    public keyManagerService: KeyManagerService,
    @service(NotificationService)
    public notificationService: NotificationService,
    @service(SessionUsersService)
    public sessionUserService: SessionUsersService,
  ) {}

  @post('/users')
  @response(200, {
    description: 'User model instance',
    content: {'application/json': {schema: getModelSchemaRef(User)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUser',
            exclude: ['_id'],
          }),
        },
      },
    })
    user: Omit<User, '_id'>,
  ): Promise<User> {
    const password = this.keyManagerService.GenerateRandomKey();
    const cyrptoPassword = this.keyManagerService.CrypoText(password);
    user.password = cyrptoPassword;
    return this.userRepository.create(user);
  }

  @get('/users/count')
  @response(200, {
    description: 'User model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(User) where?: Where<User>): Promise<Count> {
    return this.userRepository.count(where);
  }

  @get('/users')
  @response(200, {
    description: 'Array of User model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(User, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(User) filter?: Filter<User>): Promise<User[]> {
    return this.userRepository.find(filter);
  }

  @patch('/users')
  @response(200, {
    description: 'User PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
    @param.where(User) where?: Where<User>,
  ): Promise<Count> {
    return this.userRepository.updateAll(user, where);
  }

  @get('/users/{id}')
  @response(200, {
    description: 'User model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(User, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(User, {exclude: 'where'}) filter?: FilterExcludingWhere<User>,
  ): Promise<User> {
    return this.userRepository.findById(id, filter);
  }

  @patch('/users/{id}')
  @response(204, {
    description: 'User PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
  ): Promise<void> {
    await this.userRepository.updateById(id, user);
  }

  @put('/users/{id}')
  @response(204, {
    description: 'User PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() user: User,
  ): Promise<void> {
    await this.userRepository.replaceById(id, user);
  }

  @del('/users/{id}')
  @response(204, {
    description: 'User DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.userRepository.deleteById(id);
  }

  /**
   * Security Section
   */

  @post('/user-identification')
  @response(200, {
    description: 'User identification',
  })
  async userIdentification(
    @requestBody() data: Credential,
  ): Promise<object | null> {
    const user = await this.sessionUserService.ValidateCrediantials(data);
    let token = '';
    if (user) {
      //user.password = '';
      if (
        user.avatarUrl === null ||
        user.avatarUrl === '' ||
        user.avatarUrl === undefined
      )
        user.avatarUrl = Configuration.defaultAvatarImage;
      token = await this.sessionUserService.CreateToken(user);
    } else {
      throw new HttpErrors[401]('Email or password incorrect');
    }

    return {
      token,
      user,
    };
  }

  @post('/password-change')
  @response(200, {
    description: 'Change Password',
  })
  async passwordChange(
    @requestBody() data: ChangeKeyCredentials,
  ): Promise<Boolean> {
    const user = await this.userRepository.findById(data.id);
    //Mail Notification

    if (user) {
      if (user.password === data.currentPassword) {
        const cyrptoPassword = this.keyManagerService.CrypoText(
          data.newPassword,
        );
        user.password = cyrptoPassword;

        const notification = new MailNotification();
        notification.destination = user.email;
        notification.subject = 'Şifre Değişikliği';
        notification.message = `Merhaba ${user.firstName} ${user.lastName} <p/>Yeni Şifreniz: ${data.newPassword}<br/>`;
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        this.notificationService.SendMail(notification);

        await this.userRepository.updateById(data.id, user);
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  @post('/password-recovery')
  @response(200, {
    description: 'Revocery Password',
  })
  async passwordRecovery(
    @requestBody() credentials: CredentialRecoveryPassword,
  ): Promise<Boolean> {
    const user = await this.userRepository.findOne({
      where: {email: credentials.email},
    });
    if (user) {
      const password = this.keyManagerService.GenerateRandomKey();
      const cyrptoPassword = this.keyManagerService.CrypoText(password);
      user.password = cyrptoPassword;
      await this.userRepository.updateById(user._id, user);
      // SMS Notification
      //TODO: SMS Notification
      const notification = new SmsNotification();
      notification.destination = user.mobile;
      //notification.subject = Configuration.keyChangeIssue;

      notification.message = `${Configuration.greetingHeader} ${user.firstName} ${user.lastName} ${Configuration.passWordRecoverySmsMessage}${password}`;
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this.notificationService.SendSms(notification);

      return true;
    }
    return false;
  }
}
