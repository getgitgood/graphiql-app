import { SideMenuOptions } from '../../types';
import { toggleSideMenu } from '../../features/projectSlice';
import classes from './AsideMenu.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/appHooks';

export default function AsideMenu() {
  const dispatch = useAppDispatch();
  const { sideMenuMode } = useAppSelector((state) => state.project);

  const handleToggleDocumentation = () => {
    dispatch(
      toggleSideMenu(
        sideMenuMode === SideMenuOptions.Hidden
          ? SideMenuOptions.Documentation
          : SideMenuOptions.Hidden
      )
    );
  };

  return (
    <button
      data-testid={'doc-btn'}
      title="Show documentation"
      onClick={handleToggleDocumentation}
      className={`${classes.aside_menu_button} ${classes.btn_doc} ${
        sideMenuMode === SideMenuOptions.Documentation && classes.selected
      }`}
    />
  );
}
