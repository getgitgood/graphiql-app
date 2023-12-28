import { InferType, object, ref, string } from 'yup';
import {
  EMAIL_VALIDATION_KZ,
  PASSWORD_VALIDATION_KZ,
  REQUIRED_MESSAGE_KZ
} from './ValidationRulesKz';

const signInSchemaKz = object({
  email: string()
    .required(REQUIRED_MESSAGE_KZ)
    .email(EMAIL_VALIDATION_KZ.message)
    .matches(EMAIL_VALIDATION_KZ.rules, EMAIL_VALIDATION_KZ.message),
  password: string()
    .required(REQUIRED_MESSAGE_KZ)
    .matches(PASSWORD_VALIDATION_KZ.rules_lowercase, {
      message: PASSWORD_VALIDATION_KZ.message_lowercase
    })
    .matches(PASSWORD_VALIDATION_KZ.rules_uppercase, {
      message: PASSWORD_VALIDATION_KZ.message_uppercase
    })
    .matches(PASSWORD_VALIDATION_KZ.rules_digit, {
      message: PASSWORD_VALIDATION_KZ.message_digit
    })
    .matches(PASSWORD_VALIDATION_KZ.rules_specials, {
      message: PASSWORD_VALIDATION_KZ.message_specials
    })
    .min(8, PASSWORD_VALIDATION_KZ.message_length)
});

const signUpSchemaKz = signInSchemaKz.concat(
  object({
    passwordConfirm: string()
      .oneOf([ref('password')], 'Құпия сөздер сәйкес келуі тиіс')
      .required('Өтінеміз, өзіңіздің құпия сөзіңізді растауыңызды растау')
  })
);

export type SignUpFormKz = InferType<typeof signUpSchemaKz>;
export type SignInFormKz = InferType<typeof signInSchemaKz>;

export { signUpSchemaKz, signInSchemaKz };
