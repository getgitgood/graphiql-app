export const REQUIRED_MESSAGE_KZ = 'Міндетті өріс!';

export const EMAIL_VALIDATION_KZ = {
  rules: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
  message: 'Дұрыссыз эл. пошта! (мысалы, example@gmail.com)'
};

export const PASSWORD_VALIDATION_KZ = {
  rules_uppercase: /(?=.*[A-Z])/,
  rules_lowercase: /(?=.*[a-z])/,
  rules_digit: /\d/,
  rules_specials: /(?=.*?[#?!@$%^&*-])/,
  message_uppercase: 'Кем дегенде бір үлкен әріпті болуы тиіс!',
  message_lowercase: 'Кем дегенде бір кіші әріпті болуы тиіс!',
  message_digit: 'Кем дегенде бір санды болуы тиіс!',
  message_length: 'Кем дегенде 8 символдан көбі болуы тиіс!',
  message_specials: 'Кем дегенде бір арнайы символді болуы тиіс!'
};
