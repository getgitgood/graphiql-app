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
    <aside className={classes.aside_menu}>
      <div className={classes.buttons}>
        <button
          title="Show documentation"
          onClick={handleToggleDocumentation}
          className={`${classes.aside_menu_button} ${classes.btn_doc} ${
            sideMenuMode === SideMenuOptions.Documentation && classes.selected
          }`}
        ></button>
        <button
          title="Show history"
          className={`${classes.aside_menu_button} ${classes.btn_history} ${
            sideMenuMode === SideMenuOptions.History && classes.selected
          }`}
        ></button>
      </div>
    </aside>
  );
}
