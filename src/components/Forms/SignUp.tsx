import { useNavigate } from 'react-router-dom';
import classes from './Forms.module.scss';
import { signUpSchema } from '../../utils/ValidationSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldValues, useForm } from 'react-hook-form';
import { SignUpFormProps } from '../../types';
import { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebaseAuth';
import { FirebaseError } from 'firebase/app';
import transformAuthErrorMessage from '../../utils/authErrorMessages';

export default function SignUp({ switchFormHandler }: SignUpFormProps) {
  const [firebaseErrors, setFirebaseErrors] = useState<FirebaseError | null>(
    null
  );
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm({
    resolver: yupResolver(signUpSchema),
    mode: 'onChange'
  });

  const navigate = useNavigate();

  const watchEmailField = watch('email');

  useEffect(() => {
    firebaseErrorsCleaner();
  }, [watchEmailField]);

  const firebaseErrorsCleaner = () => {
    setFirebaseErrors(null);
  };

  const onSubmit = async (formData: FieldValues) => {
    const { email, password } = formData;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      firebaseErrorsCleaner();
      navigate('/');
    } catch (e) {
      if (e instanceof FirebaseError) {
        setFirebaseErrors(e);
      }
    }
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={classes.form_heading}>Sign Up</h2>
      <div className={classes.input_container}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          {...register('email')}
          placeholder="Enter your email"
          className={`${classes.input} ${
            errors.email ||
            (firebaseErrors?.code.includes('email') && classes.error_border)
          }`}
        />
        {errors.email && (
          <p className={classes.error_message}>{errors.email.message}</p>
        )}
        {firebaseErrors?.code.includes('email') && (
          <p className={classes.error_message}>
            {transformAuthErrorMessage(firebaseErrors.code)}
          </p>
        )}
      </div>
      <div className={classes.input_container}>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="text"
          placeholder="Enter your password"
          {...register('password')}
          className={`${classes.input} ${
            errors.password && classes.error_border
          }`}
        />
        {errors.password && (
          <p className={classes.error_message}>{errors.password.message}</p>
        )}
      </div>
      <div className={classes.input_container}>
        <label htmlFor="passwordConfirm">Confirm password</label>
        <input
          id="passwordConfirm"
          type="password"
          placeholder="Confirm your password"
          {...register('passwordConfirm')}
          className={`${classes.input} ${
            errors.passwordConfirm && classes.error_border
          }`}
        />
        {errors.passwordConfirm && (
          <p className={classes.error_message}>
            {errors.passwordConfirm.message}
          </p>
        )}
      </div>
      <button
        className={`${classes.button_submit} ${
          !isValid && classes.button_disabled
        }`}
        disabled={!isValid}
      >
        Sign Up
      </button>
      <p className={classes.sign}>
        Already have an account?
        <span className={classes.sign_link} onClick={switchFormHandler}>
          {' '}
          Sign In here!
        </span>
      </p>
    </form>
  );
}
