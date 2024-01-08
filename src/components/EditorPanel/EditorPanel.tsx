import { ChangeEvent, useState } from 'react';
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
import classes from './EditorPanel.module.scss';

export default function EditorPanel() {
  const { switchEndpointPlaceholder, switchEndpointButton } =
    useLanguageContext();
  const {
    graphqlQuery,
    setParseError,
    setIsRequestCollecting,
    setIsCleanerCalled
  } = useEditorContext();

  const { userEndpoint } = useAppSelector((state) => state.project);
  const [endpoint, setEndpoint] = useState(userEndpoint);
  const [isDropdownShown, setIsDropdownShown] = useState(false);
  const dispatch = useAppDispatch();

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

  const renderButtonsContainer = () => {
    return (
      <div className={classes.buttons} data-testid={'panel-buttons'}>
        <button
          className={`${classes.editor_btn} ${classes.request_btn}`}
          onClick={submitQuery}
          data-testid={'submit-btn'}
        />

        <button
          className={`${classes.editor_btn} ${classes.clean_up_btn}`}
          onClick={cleanUpQuery}
          data-testid={'cleanup-btn'}
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
          id="switch"
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
        {renderButtonsContainer()}
        {renderEndpointContainer()}
      </div>

      <div className={classes.dropdown_wrapper}>
        {renderButtonsContainer()}
        <div
          className={`${classes.dropdown_items} ${
            isDropdownShown ? classes.open : ''
          }`}
        >
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
