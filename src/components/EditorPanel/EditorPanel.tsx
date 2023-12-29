import { ChangeEvent, useState } from 'react';
import { useSchemaQuery } from '../../features/apiSlice';
import {
  updateUserEndpoint,
  updateUserRequest
} from '../../features/projectSlice';
import {
  useAppDispatch,
  useAppSelector,
  useEditorContext,
  useLanguageContext
} from '../../hooks/appHooks';
import { formatEndpointLink } from '../../utils/helpers';
import classes from './EditorPanel.module.scss';

export default function EditorPanel() {
  const {
    switchEndpointPlaceholder,
    switchEndpointButton,
    serverStatusOK,
    serverStatusError,
    connectingInfo,
    disconnectedInfo
  } = useLanguageContext();
  const {
    graphqlQuery,
    setParseError,
    setIsRequestCollecting,
    setIsCleanerCalled
  } = useEditorContext();
  const { userEndpoint } = useAppSelector((state) => state.project);
  const [endpoint, setEndpoint] = useState(userEndpoint);
  const [isTooltipShown, setIsTooltipShown] = useState(false);

  const dispatch = useAppDispatch();

  const { isError, isFetching } = useSchemaQuery(userEndpoint);

  const changeEndpoint = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target;
    setEndpoint(value);
  };

  const restoreEndpoint = () => {
    if (!endpoint) {
      setEndpoint(userEndpoint);
    }
  };

  const updateEndpoint = () => {
    dispatch(updateUserEndpoint(endpoint));
  };

  const calculateEndpointStatus = () => {
    if (isFetching) {
      return connectingInfo;
    }
    if (isError) {
      return disconnectedInfo;
    }
    return formatEndpointLink(userEndpoint);
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

  const cleanUpQuery = () => {
    setIsCleanerCalled(true);
  };

  return (
    <div className={classes.panel}>
      <div className={classes.panel_items}>
        <div className={classes.info_container}>
          <div
            className={`${classes.current_endpoint} ${
              isFetching ? classes.fetching : ''
            }`}
          >
            {calculateEndpointStatus()}
          </div>
          <div
            aria-description={isError ? serverStatusError : serverStatusOK}
            className={`${classes.indicator} ${
              isFetching ? classes.fetching : ''
            } ${isError ? classes.indicator_error : classes.indicator_ok}`}
            onMouseEnter={() => setIsTooltipShown(!isTooltipShown)}
            onMouseLeave={() => setIsTooltipShown(!isTooltipShown)}
          >
            {isTooltipShown && (
              <span className={classes.indicator_tooltip}>
                {isError ? serverStatusError : serverStatusOK}
              </span>
            )}
          </div>
        </div>
        <div className={classes.buttons}>
          <button
            disabled={isError}
            className={`${classes.editor_btn} ${classes.request_btn}`}
            onClick={submitQuery}
          />

          <button
            className={`${classes.editor_btn} ${classes.clean_up_btn}`}
            onClick={cleanUpQuery}
          />
        </div>
        <div className={classes.endpoint_container}>
          <label className={classes.switch_label} htmlFor="switch" />
          <input
            className={classes.endpoint_input}
            placeholder={switchEndpointPlaceholder}
            onChange={changeEndpoint}
            onBlur={restoreEndpoint}
            id="url"
            name="url"
            type="text"
          />
          <button onClick={updateEndpoint} className={classes.switch_btn}>
            {switchEndpointButton}
          </button>
        </div>
      </div>
    </div>
  );
}
