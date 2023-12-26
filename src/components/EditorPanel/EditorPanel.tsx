import { ChangeEvent, useState } from 'react';
import { useSchemaQuery } from '../../features/apiSlice';
import {
  updateUserEndpoint,
  updateUserRequest
} from '../../features/projectSlice';
import {
  useAppDispatch,
  useAppSelector,
  useEditorContext
} from '../../hooks/appHooks';
import Loader from '../Loader/Loader';
import classes from './EditorPanel.module.scss';

export default function EditorPanel() {
  const { graphqlQuery, setParseError, setIsRequestCollecting } =
    useEditorContext();
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

  const submitQuery = () => {
    const { query, variables, headers } = graphqlQuery;
    try {
      let userVariables = {};
      let userHeaders = {};
      if (variables.trim()) {
        userVariables = JSON.parse(variables);
      }
      if (headers.trim()) {
        userHeaders = JSON.parse(headers);
      }
      dispatch(updateUserRequest({ query, userVariables, userHeaders }));
      setParseError(null);
      setIsRequestCollecting(false);
    } catch (e) {
      if (e instanceof Error) {
        setParseError(e);
      }
    }
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
