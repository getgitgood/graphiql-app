import { EditorView } from 'codemirror';
import { useEffect, useRef, useState } from 'react';
import { initialEditorState } from '../../utils/cmEditorSetup';
import { saveEditorContent } from '../../utils/helpers';
import classes from './EditorToolkit.module.scss';

export type EditorToolkitProps = {
  setUserVars: (vars: string) => void;
  setUserHeaders: (headers: string) => void;
};

export default function EditorToolkit({
  setUserVars,
  setUserHeaders
}: EditorToolkitProps) {
  const varsRef = useRef<HTMLDivElement>(null);
  const headersRef = useRef<HTMLDivElement>(null);

  const [isVarsShown, setIsVarsShown] = useState(true);

  const [isHeadersShown, setIsHeadersShown] = useState(false);

  const [isExpanded, setIsExpanded] = useState(false);

  const [currentVars, setCurrentVars] = useState('');

  const [currentHeaders, setCurrentHeaders] = useState('');

  const toggleHeadersTool = () => {
    setIsExpanded(true);
    setIsHeadersShown(true);
    setIsVarsShown(false);
  };

  const toggleVarsTool = () => {
    setIsExpanded(true);
    setIsHeadersShown(false);
    setIsVarsShown(true);
  };

  const expandToolkit = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    setUserVars(currentVars);
  }, [setUserVars, currentVars]);

  useEffect(() => {
    setUserHeaders(currentHeaders);
  }, [setUserHeaders, currentHeaders]);

  useEffect(() => {
    const saveVarsContent = saveEditorContent(setCurrentVars);
    const saveHeadersContent = saveEditorContent(setCurrentHeaders);

    const varsInitialState = initialEditorState(saveVarsContent);
    const headersInitialState = initialEditorState(saveHeadersContent);

    const varsView = new EditorView({
      state: varsInitialState,
      parent: varsRef.current as HTMLDivElement
    });

    const headersView = new EditorView({
      state: headersInitialState,
      parent: headersRef.current as HTMLDivElement
    });

    return () => {
      varsView.destroy();
      headersView.destroy();
    };
  }, [isVarsShown, isHeadersShown]);

  return (
    <div
      className={`${classes.editor_toolkit} ${
        isExpanded ? '' : classes.collapsed
      }`}
    >
      <div className={classes.toolkit_header}>
        <div className={classes.button_wrapper}>
          <button onClick={toggleVarsTool} className={classes.toolkit_button}>
            Variables
          </button>
          <button
            onClick={toggleHeadersTool}
            className={classes.toolkit_button}
          >
            Headers
          </button>
        </div>
        <button
          onClick={expandToolkit}
          className={classes.toggle_toolkit_button}
        >
          ^
        </button>
      </div>
      <div
        className={`${classes.toolkit_wrapper} ${
          isExpanded ? '' : classes.toolkit_hidden
        }`}
      >
        <div
          className={`${!isVarsShown ? classes.hidden : ''}`}
          ref={varsRef}
        />
        <div
          className={`${!isHeadersShown ? classes.hidden : ''}`}
          ref={headersRef}
        />
      </div>
    </div>
  );
}
