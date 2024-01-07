import { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classes from './Forms.module.scss';
import { signInSchema } from '../../utils/ValidationSchemas';
import { signInSchemaRu } from '../../utils/ValidationSchemasRu';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LanguageEnum } from '../../types';
import { auth, signInWithEmailAndPassword } from '../../services/firebaseAuth';
import { FirebaseError } from 'firebase/app';
import { isUserInputAuthError } from '../../utils/authErrorMessages';
import { AppContext } from '../Context/Context';
import { useLanguageContext } from '../../hooks/appHooks';
import Loader from '../Loader/Loader';
import { emitNotification } from '../../utils/helpers';
import { signInSchemaKz } from '../../utils/ValidationSchemasKz';

export default function SignIn() {
  const [firebaseErrors, setFirebaseErrors] = useState<FirebaseError | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const context = useContext(AppContext);
  const validationSchema =
    context.currentLanguage === LanguageEnum.RU
      ? signInSchemaRu
      : context.currentLanguage === LanguageEnum.EN
        ? signInSchema
        : context.currentLanguage === LanguageEnum.KZ
          ? signInSchemaKz
          : signInSchema;
  const {
    signIn,
    email,
    password,
    enterYourEmail,
    enterYourPassword,
    signInButton,
    dontHaveAccount,
    registerHere,
    noUserFound,
    toastSuccessSignIn,
    toastSuccessLogout
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

  const watchEmailField = watch('email');
  const watchPasswordField = watch('password');

  useEffect(() => {
    setFirebaseErrors(null);
  }, [watchEmailField, watchPasswordField]);

  const navigate = useNavigate();

  const isFormValid = () => {
    return isValid && !Boolean(firebaseErrors);
  };

  const onSubmit = async (fieldValues: FieldValues) => {
    const { email, password } = fieldValues;

    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      setFirebaseErrors(null);
      navigate('/graphiql');
      emitNotification('success', toastSuccessSignIn);
    } catch (e) {
      if (e instanceof FirebaseError) {
        setFirebaseErrors(e);
      } else {
        emitNotification('error', toastSuccessLogout);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isAuthError = () => {
    if (firebaseErrors) {
      return isUserInputAuthError(firebaseErrors, 'invalid-credential');
    }
    return false;
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <form
      className={classes.form}
      onSubmit={handleSubmit(onSubmit)}
      data-testid={'signin-form'}
    >
      <h2 className={classes.form_heading}>{signIn}</h2>
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
      </div>
      <div className={classes.input_container}>
        <label htmlFor="password">{password}</label>
        <input
          id="password"
          type="password"
          placeholder={enterYourPassword}
          {...register('password')}
          className={`${classes.input} ${
            (errors.password || isAuthError()) && classes.error_border
          }`}
          autoComplete="new-password"
        />
        {errors.password && (
          <p className={classes.error_message}>{errors.password.message}</p>
        )}
        {isAuthError() && (
          <p
            className={`${classes.error_message} ${classes.error_message_auth}`}
          >
            {noUserFound}
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
        type="submit"
        className={`${classes.button_submit} ${
          !isFormValid() && classes.button_disabled
        }`}
        disabled={!isFormValid()}
      >
        {signInButton}
      </button>
      <p className={classes.sign}>
        {dontHaveAccount}
        <Link
          className={classes.sign_link}
          to={'/auth'}
          state={{ formType: 'signup' }}
        >
          {' '}
          {registerHere}
        </Link>
      </p>
    </form>
  );
}
