import classes from './Header.module.scss';
import { useEffect, useState } from 'react';
import Navigation from '../../components/Navigation/Navigation';
import { useAppSelector } from '../../hooks/appHooks';
import BurgerMenu from '../../components/BurgerMenu/BurgerMenu';

export default function Header() {
  const [isHeaderAnimated, setIsHeaderAnimate] = useState(false);

  const { isUserSignIn } = useAppSelector((state) => state.project);

  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  useEffect(() => {
    const burgerMenuDisplayHandler = () => {
      const { innerWidth } = window;
      if (innerWidth > 768) {
        setIsBurgerOpen(false);
      }
    };

    const headerAnimationStateHandler = () => {
      const { scrollY } = window;
      setIsHeaderAnimate(scrollY > 0);
    };
    window.addEventListener('scroll', headerAnimationStateHandler);

    window.addEventListener('resize', burgerMenuDisplayHandler);
    return () => {
      window.removeEventListener('scroll', headerAnimationStateHandler);
      window.removeEventListener('resize', burgerMenuDisplayHandler);
    };
  }, []);

  const headerAnimationHandler = () => {
    return isHeaderAnimated ? classes.header_animated : '';
  };

  return (
    <>
      <header className={`${classes.header} ${headerAnimationHandler()}`}>
        {isUserSignIn !== null && (
          <Navigation {...{ isBurgerOpen, setIsBurgerOpen }} />
        )}
        <BurgerMenu {...{ isBurgerOpen, setIsBurgerOpen }} />
      </header>
    </>
  );
}
