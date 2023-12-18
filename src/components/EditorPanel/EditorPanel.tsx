import { updateUserQuery } from '../../features/projectSlice';
import { useAppDispatch } from '../../hooks/appHooks';
import classes from './EditorPanel.module.scss';

export type EditorPanelProps = {
  userQuery: string;
};

export default function EditorPanel({ userQuery }: EditorPanelProps) {
  const dispatch = useAppDispatch();
  const submitQuery = async () => {
    dispatch(updateUserQuery(userQuery));
  };
  return (
    <div className={classes.panel}>
      <button className={classes.send_btn} onClick={submitQuery} />
    </div>
  );
}
