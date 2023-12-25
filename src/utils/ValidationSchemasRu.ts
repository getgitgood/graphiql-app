import { InferType, object, ref, string } from 'yup';
import {
  EMAIL_VALIDATION_RU,
  PASSWORD_VALIDATION_RU,
  REQUIRED_MESSAGE_RU
} from './ValidationRulesRu';

const signInSchemaRu = object({
  email: string()
    .required(REQUIRED_MESSAGE_RU)
    .email(EMAIL_VALIDATION_RU.message)
    .matches(EMAIL_VALIDATION_RU.rules, EMAIL_VALIDATION_RU.message),
  password: string()
    .required(REQUIRED_MESSAGE_RU)
    .matches(PASSWORD_VALIDATION_RU.rules_lowercase, {
      message: PASSWORD_VALIDATION_RU.message_lowercase
    })
    .matches(PASSWORD_VALIDATION_RU.rules_uppercase, {
      message: PASSWORD_VALIDATION_RU.message_uppercase
    })
    .matches(PASSWORD_VALIDATION_RU.rules_digit, {
      message: PASSWORD_VALIDATION_RU.message_digit
    })
    .matches(PASSWORD_VALIDATION_RU.rules_specials, {
      message: PASSWORD_VALIDATION_RU.message_specials
    })
    .min(8, PASSWORD_VALIDATION_RU.message_length)
});

const signUpSchemaRu = signInSchemaRu.concat(
  object({
    passwordConfirm: string()
      .oneOf([ref('password')], 'Пароли должны совпадать')
      .required('Пожалуйста, подтвердите ваш пароль')
  })
);

export type SignUpFormRu = InferType<typeof signUpSchemaRu>;
export type SignInFormRu = InferType<typeof signInSchemaRu>;

export { signUpSchemaRu, signInSchemaRu };
