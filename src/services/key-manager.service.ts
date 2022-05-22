/* eslint-disable @typescript-eslint/naming-convention */
import {/* inject, */ BindingScope, injectable} from '@loopback/core';

const generatePassword = require('password-generator');
const CryptoJS = require('crypto-js');
@injectable({scope: BindingScope.TRANSIENT})
export class KeyManagerService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */

  GenerateRandomKey() {
    const randomKey = generatePassword(8, false);
    return randomKey;
  }

  CrypoText(text: string) {
    const cryptoText = CryptoJS.MD5(text).toString();
    return cryptoText;
  }
}
