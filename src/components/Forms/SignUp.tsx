import { Link, useNavigate } from 'react-router-dom';
import classes from './Forms.module.scss';
import { signUpSchema } from '../../utils/ValidationSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldValues, useForm } from 'react-hook-form';
import { LanguageEnum } from '../../types';
import { useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebaseAuth';
import { FirebaseError } from 'firebase/app';
import {
  transformAuthErrorMessage,
  isUserInputAuthError
} from '../../utils/authErrorMessages';
import { AppContext } from '../Context/Context';
import { signUpSchemaRu } from '../../utils/ValidationSchemasRu';
import { useLanguageContext } from '../../hooks/appHooks';
import Loader from '../Loader/Loader';
import { emitNotification } from '../../utils/helpers';
import { signUpSchemaKz } from '../../utils/ValidationSchemasKz';

export default function SignUp() {
  const [firebaseErrors, setFirebaseErrors] = useState<FirebaseError | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const context = useContext(AppContext);
  const validationSchema =
    context.currentLanguage === LanguageEnum.RU
      ? signUpSchemaRu
      : context.currentLanguage === LanguageEnum.EN
        ? signUpSchema
        : context.currentLanguage === LanguageEnum.KZ
          ? signUpSchemaKz
          : signUpSchema;
  const {
    signUp,
    email,
    password,
    confirmPassword,
    enterYourEmail,
    enterYourPassword,
    confirmYourPassword,
    signInButton,
    signUpButton,
    alreadyHaveAccount,
    toastSuccessSignUp,
    toastErrorSignUp
  } = useLanguageContext();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange'
  });

  const navigate = useNavigate();

  const watchEmailField = watch('email');

  useEffect(() => {
    setFirebaseErrors(null);
  }, [watchEmailField]);

  const isAuthError = () => {
    if (firebaseErrors) {
      return isUserInputAuthError(firebaseErrors, 'email');
    }
    return false;
  };

  const isFormValid = () => {
    return isValid && !Boolean(firebaseErrors);
  };

  const onSubmit = async (fieldValues: FieldValues) => {
    const { email, password } = fieldValues;
    try {
      setIsLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      setFirebaseErrors(null);
      emitNotification('success', toastSuccessSignUp);
      navigate('/graphiql');
    } catch (e) {
      if (e instanceof FirebaseError) {
        setFirebaseErrors(e);
      } else {
        emitNotification('error', toastErrorSignUp);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <form
      className={classes.form}
      onSubmit={handleSubmit(onSubmit)}
      data-testid={'signup-form'}
    >
      <h2 className={classes.form_heading}>{signUp}</h2>
      <div className={classes.input_container}>
        <label htmlFor="email">{email}</label>
        <input
          id="email"
          {...register('email')}
          placeholder={enterYourEmail}
          className={`${classes.input} ${
            (errors.email || isAuthError()) && classes.error_border
          }`}
          autoComplete="email"
        />
        {errors.email && (
          <p className={classes.error_message}>{errors.email.message}</p>
        )}
        {isAuthError() && (
          <p className={classes.error_message}>
            {transformAuthErrorMessage(firebaseErrors!.code)}
          </p>
        )}
      </div>
      <div className={classes.input_container}>
        <label htmlFor="password">{password}</label>
        <input
          id="password"
          type="password"
          placeholder={enterYourPassword}
          {...register('password')}
          className={`${classes.input} ${
            errors.password && classes.error_border
          }`}
          autoComplete="new-password"
        />
        {errors.password && (
          <p className={classes.error_message}>{errors.password.message}</p>
        )}
      </div>
      <div className={classes.input_container}>
        <label htmlFor="passwordConfirm">{confirmPassword}</label>
        <input
          id="passwordConfirm"
          type="password"
          placeholder={confirmYourPassword}
          {...register('passwordConfirm')}
          className={`${classes.input} ${
            errors.passwordConfirm && classes.error_border
          }`}
          autoComplete="new-password"
        />
        {errors.passwordConfirm && (
          <p className={classes.error_message}>
            {errors.passwordConfirm.message}
          </p>
        )}
      </div>

      {firebaseErrors && !isAuthError() && (
        <p
          className={`${classes.error_message} ${classes.error_message_unknown}`}
        >
          {firebaseErrors.message}
        </p>
      )}

      <button
        className={`${classes.button_submit} ${
          !isFormValid() && classes.button_disabled
        }`}
        disabled={!isFormValid()}
      >
        {signUpButton}
      </button>
      <p className={classes.sign}>
        {alreadyHaveAccount}
        <Link
          className={classes.sign_link}
          to={'/auth'}
          state={{ formType: 'signin' }}
        >
          {' '}
          {signInButton}
        </Link>
      </p>
    </form>
  );
}
