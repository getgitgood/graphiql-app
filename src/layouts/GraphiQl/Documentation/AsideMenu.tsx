import { useDispatch, useSelector } from 'react-redux';
import { SideMenuOptions } from '../../../types/appTypes';
import { toggleSideMenu } from '../../../redux/SideMenu/sideMenuSlice';
import { RootState } from '../../../store';
import {
  AsideMenuDocumentationButton,
  AsideMenuHistoryButton
} from '../../AsideMenuButton/AsideMenuButton';
import classes from './AsideMenu.module.scss';

export default function AsideMenu() {
  const dispatch = useDispatch();
  const sideMenu = useSelector((state: RootState) => state.sideMenu.value);

  const handleToggleDocumentation = () => {
    dispatch(
      toggleSideMenu(
        sideMenu === SideMenuOptions.Documentation
          ? SideMenuOptions.Hidden
          : SideMenuOptions.Documentation
      )
    );
  };

  return (
    <aside className={classes.aside_menu}>
      <div className={classes.buttons}>
        <div className={classes.top_btns}>
          <button
            title="Show documentation"
            onClick={handleToggleDocumentation}
            className={`${classes.aside_menu_button} ${
              sideMenu === SideMenuOptions.Documentation ? classes.selected : ''
            }`}
          >
            <AsideMenuDocumentationButton />
          </button>
          <button
            title="Show history"
            // onClick={handleToggleHistory}
            className={`${classes.aside_menu_button} ${
              sideMenu === SideMenuOptions.History ? classes.selected : ''
            }`}
          >
            <AsideMenuHistoryButton />
          </button>
        </div>
      </div>
    </aside>
  );
}
