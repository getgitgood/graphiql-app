import classes from './UserIcons.module.scss';

export default function UserIcons() {
  return (
    <div className={classes.user_icons_wrapper}>
      <div className={classes.user_icon_signout} aria-label="sign out button" />
    </div>
  );
}
