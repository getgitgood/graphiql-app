import { useNavigate } from 'react-router-dom';
import classes from './Forms.module.scss';
import { signInSchema } from '../../utils/ValidationSchemas';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignUpFormProps } from '../../types';
import {
  auth,
  onAuthStateChanged,
  signInWithEmailAndPassword
} from '../../services/firebaseAuth';
import { useEffect, useState } from 'react';
import { FirebaseError } from 'firebase/app';
import { isUserInputAuthError } from '../../utils/authErrorMessages';
import { updateUserStatus } from '../../features/projectSlice';
import { useAppDispatch } from '../../hooks/appHooks';

export default function SignIn({ switchFormHandler }: SignUpFormProps) {
  const [firebaseErrors, setFirebaseErrors] = useState<FirebaseError | null>(
    null
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm({
    resolver: yupResolver(signInSchema),
    mode: 'onChange'
  });

  const watchEmailField = watch('email');
  const watchPasswordField = watch('password');

  useEffect(() => {
    setFirebaseErrors(null);
  }, [watchEmailField, watchPasswordField]);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      dispatch(updateUserStatus(Boolean(user)));
    });
  }, [dispatch]);

  const isFormValid = () => {
    return isValid && !Boolean(firebaseErrors);
  };

  const onSubmit = async (fieldValues: FieldValues) => {
    const { email, password } = fieldValues;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setFirebaseErrors(null);

      navigate('/');
    } catch (e) {
      if (e instanceof FirebaseError) {
        setFirebaseErrors(e);
      }
    }
  };

  const isAuthError = () => {
    if (firebaseErrors) {
      return isUserInputAuthError(firebaseErrors, 'invalid-credential');
    }
    return false;
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={classes.form_heading}>Sign In</h2>
      <div className={classes.input_container}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          {...register('email')}
          placeholder="Enter your email"
          className={`${classes.input} ${
            (errors.email || isAuthError()) && classes.error_border
          }`}
        />
        {errors.email && (
          <p className={classes.error_message}>{errors.email.message}</p>
        )}
      </div>
      <div className={classes.input_container}>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          {...register('password')}
          className={`${classes.input} ${
            (errors.password || isAuthError()) && classes.error_border
          }`}
        />
        {errors.password && (
          <p className={classes.error_message}>{errors.password.message}</p>
        )}
        {isAuthError() && (
          <p
            className={`${classes.error_message} ${classes.error_message_auth}`}
          >
            {'No user was found with a provided data!'}
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
        Sign In
      </button>
      <p className={classes.sign}>
        Don`t have an account yet?
        <span className={classes.sign_link} onClick={switchFormHandler}>
          {' '}
          Register here!
        </span>
      </p>
    </form>
  );
}
