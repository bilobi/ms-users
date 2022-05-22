/* eslint-disable @typescript-eslint/naming-convention */
import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import {Configuration} from '../config/configuration';
import {MailNotification, SmsNotification} from '../models';
const fetch = require('node-fetch');

@injectable({scope: BindingScope.TRANSIENT})
export class NotificationService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */

  async SendMail(notification: MailNotification): Promise<Boolean> {
    const url = `${Configuration.urlNotificationEmail}?hash=${Configuration.notificationHash}&destination=${notification.destination}&subject=${notification.subject}&message=${notification.message}`; //&attached=${notification.attached}
    const response = await fetch(url);
    console.log(response);
    if (response.ok) {
      return true;
    }
    return false;
  }

  async SendSms(notification: SmsNotification): Promise<Boolean> {
    const url = `${Configuration.urlNotificationSms}?hash=${Configuration.notificationHash}&destination=${notification.destination}&message=${notification.message}`; //&attached=${notification.attached}
    console.log(url);
    const response = await fetch(url);
    console.log(response);
    if (response.ok) {
      return true;
    }
    return false;
  }
}
