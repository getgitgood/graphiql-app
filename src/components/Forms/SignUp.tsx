import { useNavigate } from 'react-router-dom';
import classes from './Forms.module.scss';
import { signUpSchema } from '../../utils/ValidationSchemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldValues, useForm } from 'react-hook-form';
import { SignUpFormProps } from '../../types';
import { useState } from 'react';
import { AuthError, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebaseAuth';
import { FirebaseError } from 'firebase/app';

export default function SignUp({ switchFormHandler }: SignUpFormProps) {
  const [firebaseErrors, setFirebaseErrors] = useState<AuthError | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    resolver: yupResolver(signUpSchema),
    mode: 'onChange'
  });

  const navigate = useNavigate();

  const onSubmit = async (formData: FieldValues) => {
    const { email, password } = formData;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setFirebaseErrors(null);
      navigate('/');
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e.code, firebaseErrors);
        // setFirebaseErrors((previousErrors) => [
        //   ...previousErrors,
        //   e as AuthError
        // ]);
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
          className={`${classes.input} ${errors.email && classes.error_border}`}
        />
        {errors.email && (
          <p className={classes.error_message}>{errors.email.message}</p>
        )}
        {/* {firebaseErrors.length > 0 && (
          <p className={classes.error_message}>{errors.email.message}</p>
        )} */}
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
