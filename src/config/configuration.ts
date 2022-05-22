export namespace Configuration {
  export const urlNotificationEmail = 'http://localhost:5000/email';
  export const urlNotificationSms = 'http://localhost:5000/sms';
  export const urlCreateToken = 'http://localhost:5001/create-token';
  export const urlValidateToken = 'http://localhost:5001/validate-token';

  export const notificationHash = 'SW1heGlzIEludGVyYWN0aXZl';
  export const keyChangeIssue = 'Change of password';
  export const greetingHeader = 'Merhaba';
  export const passWordRecoverySmsMessage =
    'Şifreniz sistemde değiştirildi. Yeni Şifreniz: ';
  export const defaultAvatarImage =
    'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';
}
