import classes from './Header.module.scss';
import { useEffect, useState } from 'react';
import Navigation from '../../components/Navigation/Navigation';

export default function Header() {
  const [isHeaderAnimated, setIsHeaderAnimate] = useState(false);

  useEffect(() => {
    const headerAnimationStateHandler = () => {
      const { scrollY } = window;
      setIsHeaderAnimate(scrollY > 0);
    };
    window.addEventListener('scroll', headerAnimationStateHandler);

    return () =>
      window.removeEventListener('scroll', headerAnimationStateHandler);
  }, []);

  const headerAnimationHandler = () => {
    return isHeaderAnimated ? classes.header_animated : '';
  };

  return (
    <header className={`${classes.header} ${headerAnimationHandler()}`}>
      <Navigation />
    </header>
  );
}
