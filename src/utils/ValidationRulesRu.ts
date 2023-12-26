export const REQUIRED_MESSAGE_RU = 'Обязательное поле!';

export const EMAIL_VALIDATION_RU = {
  rules: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
  message: 'Неверный адрес электронной почты! (например, example@gmail.com)'
};

export const PASSWORD_VALIDATION_RU = {
  rules_uppercase: /(?=.*[A-Z])/,
  rules_lowercase: /(?=.*[a-z])/,
  rules_digit: /\d/,
  rules_specials: /(?=.*?[#?!@$%^&*-])/,
  message_uppercase: 'Должен содержать хотя бы одну заглавную букву!',
  message_lowercase: 'Должен содержать хотя бы одну строчную букву!',
  message_digit: 'Должен содержать хотя бы одну цифру!',
  message_length: 'Должен содержать не менее 8 символов!',
  message_specials: 'Должен содержать хотя бы 1 специальный символ!'
};
