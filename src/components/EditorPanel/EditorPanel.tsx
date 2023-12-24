import { ChangeEvent, useState } from 'react';
import { useSchemaQuery } from '../../features/apiSlice';
import {
  updateUserEndpoint,
  updateUserRequest
} from '../../features/projectSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/appHooks';
import { EditorPanelProps } from '../../types';
import Loader from '../Loader/Loader';
import classes from './EditorPanel.module.scss';

export default function EditorPanel({
  userQuery,
  userVars,
  userHeaders,
  setIsQuerySend
}: EditorPanelProps) {
  const { userEndpoint } = useAppSelector((state) => state.project);
  const [endpoint, setEndpoint] = useState(userEndpoint);
  const dispatch = useAppDispatch();

  const { isError, isFetching } = useSchemaQuery(userEndpoint);

  const updateEndpoint = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (endpoint !== userEndpoint && endpoint !== '') {
      dispatch(updateUserEndpoint(endpoint.toString()));
    }
    if (endpoint === '') {
      setEndpoint(userEndpoint);
    }
  };

  const submitQuery = async () => {
    const request = {
      query: userQuery,
      variables: userVars,
      headers: userHeaders
    };
    dispatch(updateUserRequest(request));
    setIsQuerySend(true);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target;
    setEndpoint(value);
  };

  return (
    <div className={classes.panel}>
      <div className={classes.panel_items}>
        <a
          className={`${classes.editor_btn} ${classes.request_btn}`}
          onClick={submitQuery}
        />
        <div className={classes.endpoint_container}>
          <input
            className={classes.endpoint_input}
            placeholder="New GraphQL endpoint..."
            onBlur={updateEndpoint}
            onChange={onChangeHandler}
            value={endpoint}
            id="url"
            name="url"
            type="text"
          />
          {isFetching ? (
            <Loader />
          ) : isError ? (
            <span
              title="Server status"
              className={`${classes.indicator} ${classes.indicator_error}`}
            />
          ) : (
            <span className={`${classes.indicator} ${classes.indicator_ok}`} />
          )}
        </div>
      </div>
    </div>
  );
}
