import classes from './UserPanel.module.scss';
import UserIcons from '../../components/UserIcons/UserIcons';
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';

export default function UserPanel() {
  return (
    <div className={classes.user_panel}>
      <LanguageSelector />
      <UserIcons />
    </div>
  );
}
