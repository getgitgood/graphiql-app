import { useNavigate } from 'react-router-dom';
import classes from './Forms.module.scss';
import { signInSchema } from '../../utils/ValidationSchemas';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SignUpFormProps } from '../../types';

export default function SignIn({ switchFormHandler }: SignUpFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    resolver: yupResolver(signInSchema),
    mode: 'onChange'
  });

  const navigate = useNavigate();

  const onSubmit = async () => {
    console.log('submitted');
    navigate('/');
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
          className={`${classes.input} ${errors.email && classes.error_border}`}
          // style={{
          //   // outlineColor: errors.email ? 'red' : '',
          //   borderColor: errors.email ? 'red' : ''
          // }}
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
            errors.password && classes.error_border
          }`}
          // style={{
          //   outlineColor: errors.password ? 'red' : '',
          //   borderColor: errors.password ? 'red' : ''
          // }}
        />
        {errors.password && (
          <p className={classes.error_message}>{errors.password.message}</p>
        )}
      </div>
      <button
        type="submit"
        className={`${classes.button_submit} ${
          !isValid && classes.button_disabled
        }`}
        disabled={!isValid}
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
