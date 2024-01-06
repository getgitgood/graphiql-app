import { ChangeEvent, useRef, useState } from 'react';
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
import AsideMenu from '../../layouts/Aside/AsideMenu';
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

  const infoRef = useRef<HTMLDivElement>(null);
  const { userEndpoint } = useAppSelector((state) => state.project);
  const [endpoint, setEndpoint] = useState(userEndpoint);
  const [isTooltipShown, setIsTooltipShown] = useState(false);
  const [isDropdownShown, setIsDropdownShown] = useState(false);
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

  const renderIndicator = () => {
    return (
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
    );
  };

  const renderInfoContainer = () => {
    return (
      <div
        ref={infoRef}
        className={`${classes.current_endpoint} ${
          isFetching ? classes.fetching : ''
        }`}
      >
        {calculateEndpointStatus()}
      </div>
    );
  };

  const renderButtonsContainer = () => {
    return (
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

        <AsideMenu />
      </div>
    );
  };

  const renderEndpointContainer = () => {
    return (
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
    );
  };

  return (
    <div className={classes.panel}>
      <div className={classes.panel_items}>
        <div className={classes.info_container}>
          {renderInfoContainer()}
          {renderIndicator()}
        </div>
        {renderButtonsContainer()}
        {renderEndpointContainer()}
      </div>

      <div className={classes.dropdown_wrapper}>
        <div className={classes.info_container}>{renderIndicator()}</div>
        {renderButtonsContainer()}
        <div
          className={`${classes.dropdown_items} ${
            isDropdownShown ? classes.open : ''
          }`}
        >
          {renderInfoContainer()}
          {renderEndpointContainer()}
        </div>
        <button
          onClick={() => setIsDropdownShown(!isDropdownShown)}
          className={`${classes.editor_btn} ${classes.expand_btn}`}
        >
          {isDropdownShown ? '▼' : '▲'}
        </button>
      </div>
    </div>
  );
}
