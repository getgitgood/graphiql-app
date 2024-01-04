import classes from './Auth.module.scss';
import SignIn from '../../components/Forms/SignIn';
import SignUp from '../../components/Forms/SignUp';
import { useLocation } from 'react-router';

export default function Auth() {
  const location = useLocation();
  let { formType } = location.state || {};

  if (!formType) formType = 'signin';

  return (
    <section className={classes.auth}>
      {formType === 'signup' ? <SignUp /> : <SignIn />}
    </section>
  );
}
