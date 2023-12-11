import React, { useState } from 'react';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import './Forms.scss';
import {
  VALIDATION_MESSAGES,
  EMAIL_VALIDATION,
  PASSWORD_VALIDATION
} from '../../utils/ValidationRules';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const handleSignUp = async () => {
    try {
      const schema = Yup.object({
        email: Yup.string()
          .required(VALIDATION_MESSAGES.message_required)
          .email(EMAIL_VALIDATION.message)
          .matches(EMAIL_VALIDATION.rules, EMAIL_VALIDATION.message),
        password: Yup.string()
          .matches(PASSWORD_VALIDATION.rules_lowercase, {
            message: PASSWORD_VALIDATION.message_lowercase
          })
          .matches(PASSWORD_VALIDATION.rules_uppercase, {
            message: PASSWORD_VALIDATION.message_uppercase
          })
          .matches(PASSWORD_VALIDATION.rules_digit, {
            message: PASSWORD_VALIDATION.message_digit
          })
          .matches(PASSWORD_VALIDATION.rules_specials, {
            message: PASSWORD_VALIDATION.message_specials
          })
          .min(8, PASSWORD_VALIDATION.message_length)
      });

      await schema.validate({ email, password }, { abortEarly: false });

      // Handle successful validation (you can add your logic here)

      // Clear errors on success
      setErrors({});
    } catch (validationError) {
      // Handle validation error
      if (validationError instanceof Yup.ValidationError) {
        // Extract errors into an object
        const validationErrors: { [key: string]: string } = {};
        validationError.inner.forEach((err) => {
          if (err.path) {
            validationErrors[err.path] = err.message;
          }
        });

        // Set errors
        setErrors(validationErrors);
      }
    }
  };

  return (
    <>
      <div className="sign-container">
        <div className="buttons-container">
          <Link to="/signin" className="button signIn">
            Sign In
          </Link>
          <Link to="/signup" className="button signUp">
            Sign Up
          </Link>
        </div>
        <div className="form-container">
          <div className="input-container">
            <h2>Sign Up</h2>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              style={{
                outlineColor: errors.email ? 'red' : '',
                borderColor: errors.email ? 'red' : ''
              }}
            />
            <div className="error-wrapper">
              <p className="error-message">{errors.email && errors.email}</p>
            </div>

            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              style={{
                outlineColor: errors.password ? 'red' : '',
                borderColor: errors.password ? 'red' : ''
              }}
            />
            <div className="error-wrapper">
              <p className="error-message">
                {errors.password && errors.password}
              </p>
            </div>

            <button className="button-submit" onClick={handleSignUp}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
