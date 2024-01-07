import classes from './Header.module.scss';
import { useEffect, useState } from 'react';
import Navigation from '../../components/Navigation/Navigation';
import { useAppSelector } from '../../hooks/appHooks';
import BurgerMenu from '../../components/BurgerMenu/BurgerMenu';
import { useRef } from 'react';

export default function Header() {
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  const burgerButtonRef = useRef<HTMLDivElement>(null);
  const [isHeaderAnimated, setIsHeaderAnimate] = useState(false);

  const { isUserSignIn } = useAppSelector((state) => state.project);

  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  useEffect(() => {
    const burgerMenuDisplayHandler = () => {
      const { innerWidth } = window;
      if (innerWidth > 768) {
        setIsBurgerOpen(innerWidth < 768);
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

  useEffect(() => {
    const burgerMenuTargetClickHandler = (event: Event) => {
      if (!event.target) return;
      if (
        (burgerMenuRef.current &&
          burgerMenuRef.current.contains(event.target as Node)) ||
        (burgerButtonRef.current &&
          !burgerButtonRef.current.contains(event.target as Node))
      ) {
        setIsBurgerOpen(false);
      }
    };

    document.addEventListener('click', burgerMenuTargetClickHandler);

    return () =>
      document.removeEventListener('click', burgerMenuTargetClickHandler);
  }, [burgerMenuRef]);

  const headerAnimationHandler = () => {
    return isHeaderAnimated ? classes.header_animated : '';
  };

  return (
    <header
      className={`${classes.header} ${headerAnimationHandler()}`}
      data-testid={'header'}
    >
      {isUserSignIn !== null && (
        <Navigation
          {...{ isBurgerOpen, setIsBurgerOpen }}
          ref={burgerButtonRef}
        />
      )}
      <BurgerMenu {...{ isBurgerOpen, setIsBurgerOpen }} ref={burgerMenuRef} />
    </header>
  );
}
