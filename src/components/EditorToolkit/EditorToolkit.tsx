import { EditorView } from 'codemirror';
import { useEffect, useRef, useState } from 'react';
import { useEditorContext, useLanguageContext } from '../../hooks/appHooks';
import { initialEditorState } from '../../utils/cmEditorSetup';
import { saveEditorContent } from '../../utils/helpers';
import classes from './EditorToolkit.module.scss';

export type EditorToolkitProps = {
  setUserVariables: (vars: string) => void;
  setUserHeaders: (headers: string) => void;
};

export default function EditorToolkit() {
  const { setUserVariables, setUserHeaders } = useEditorContext();
  const { variables, headers } = useLanguageContext();
  const varsRef = useRef<HTMLDivElement>(null);
  const headersRef = useRef<HTMLDivElement>(null);

  const [isVarsShown, setIsVarsShown] = useState(true);
  const [isHeadersShown, setIsHeadersShown] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

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
    const saveVarsContent = saveEditorContent(setUserVariables);
    const saveHeadersContent = saveEditorContent(setUserHeaders);

    const varsInitialState = initialEditorState([saveVarsContent]);
    const headersInitialState = initialEditorState([saveHeadersContent]);

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
  }, [setUserVariables, setUserHeaders]);

  return (
    <div
      className={`${classes.editor_toolkit} ${
        isExpanded ? '' : classes.collapsed
      }`}
      data-testid={'toolkit'}
    >
      <div className={classes.toolkit_header}>
        <div className={classes.button_wrapper}>
          <button
            onClick={toggleVarsTool}
            className={`${classes.toolkit_button} ${
              isVarsShown ? classes.active : ''
            }`}
          >
            {variables}
          </button>
          <button
            onClick={toggleHeadersTool}
            className={`${classes.toolkit_button} ${
              isHeadersShown ? classes.active : ''
            }`}
          >
            {headers}
          </button>
        </div>
        <button
          onClick={expandToolkit}
          className={classes.toggle_toolkit_button}
          data-testid={'expand-btn'}
        >
          {isExpanded ? '▼' : '▲'}
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
