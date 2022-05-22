/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Configuration as config} from '../config/configuration';
import {Credential, User} from '../models';
import {UserRepository} from '../repositories';
const fetch = require('node-fetch');

@injectable({scope: BindingScope.TRANSIENT})
export class SessionUsersService {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) {}

  /*
   * Add service methods here
   */
  async ValidateCrediantials(credentials: Credential) {
    const user = await this.userRepository.findOne({
      where: {email: credentials.email, password: credentials.password},
    });

    return user;
  }

  async CreateToken(user: User): Promise<string> {
    const urlCreateToken = `${config.urlCreateToken}?user=${user.email}&id=${user._id}&rol=${user.rollId}`;
    let token = '';
    await fetch(urlCreateToken)
      .then((data: any) => data.json())
      .then((data: any) => {
        token = data.token;
      });
    return token;
  }
}
