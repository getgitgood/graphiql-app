import classes from './Editor.module.scss';

import { useRef, useEffect, useState } from 'react';

import { EditorView } from '@codemirror/view';
import EditorPanel from '../../components/EditorPanel/EditorPanel';
import { useAppSelector } from '../../hooks/appHooks';
import { useGetDataQuery } from '../../features/apiSlice';
import { initialViewerState } from '../../utils/cmViewerSetup';
import { initialEditorState } from '../../utils/cmEditorSetup';
import Loader from '../../components/Loader/Loader';
import { saveEditorContent } from '../../utils/helpers';
import EditorToolkit from '../../components/EditorToolkit/EditorToolkit';

export default function Editor() {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);

  const viewerViewRef = useRef<EditorView | null>(null);

  const [isQuerySend, setIsQuerySend] = useState(false);

  const [userQuery, setUserQuery] = useState('');
  const [userVars, setUserVars] = useState('');
  const [userHeaders, setUserHeaders] = useState('');

  const { request } = useAppSelector((state) => state.project);

  const { query, variables, headers } = request;
  const { data, isError, error, isFetching, isSuccess } = useGetDataQuery(
    { query, variables, headers },
    {
      skip: !isQuerySend
    }
  );

  useEffect(() => {
    setIsQuerySend(isSuccess);
  }, [isSuccess]);

  useEffect(() => {
    const saveContent = saveEditorContent(setUserQuery);
    const editorView = new EditorView({
      state: initialEditorState(saveContent),
      parent: editorRef.current as HTMLDivElement
    });

    const viewerView = new EditorView({
      state: initialViewerState,
      parent: viewerRef.current as HTMLDivElement
    });

    viewerViewRef.current = viewerView;

    return () => {
      editorView.destroy();
      viewerView.destroy();
    };
  }, []);

  useEffect(() => {
    if (viewerViewRef.current) {
      if (isError && error && 'data' in error) {
        viewerViewRef.current.dispatch({
          changes: {
            from: 0,
            to: viewerViewRef.current.state.doc.length,
            insert: JSON.stringify(error.data, null, 2)
          }
        });
      } else {
        viewerViewRef.current.dispatch({
          changes: {
            from: 0,
            to: viewerViewRef.current.state.doc.length,
            insert: JSON.stringify(data, null, 2)
          }
        });
      }
    }
  }, [data, error, isError]);

  return (
    <div className={classes.editor_wrapper}>
      <section ref={editorRef} className={classes.editor_editable}>
        <EditorPanel
          {...{ userQuery, userVars, userHeaders, setIsQuerySend }}
        />
        <EditorToolkit {...{ setUserVars, setUserHeaders }} />
      </section>

      <section ref={viewerRef} className={classes.editor_readonly}>
        {isFetching && <Loader />}
      </section>
    </div>
  );
}
