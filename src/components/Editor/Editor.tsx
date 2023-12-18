import classes from './Editor.module.scss';

import { useRef, useEffect, useState } from 'react';

import { basicSetup } from 'codemirror';
import { EditorView, keymap, gutter } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { defaultKeymap } from '@codemirror/commands';
import { barf } from 'thememirror';
import EditorPanel from '../EditorPanel/EditorPanel';
import { useAppSelector } from '../../hooks/appHooks';
import { useGetDataQuery } from '../../features/apiSlice';
import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
import Loader from '../Loader/Loader';

export default function Editor() {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);

  const viewerViewRef = useRef<EditorView | null>(null);

  const [userQuery, setUserQuery] = useState('');

  const { query } = useAppSelector((state) => state.project.request);

  const { data, isError, error, isFetching } = useGetDataQuery(query, {
    skip: query === ''
  });

  useEffect(() => {
    const saveContent = EditorView.updateListener.of((content) => {
      if (content.changes) {
        setUserQuery(content.state.doc.toString());
      }
    });

    const initialEditorState = EditorState.create({
      doc: 'editor',
      extensions: [
        basicSetup,
        keymap.of(defaultKeymap),
        barf,
        gutter({ renderEmptyElements: true }),
        saveContent,
        javascript()
      ]
    });

    const editorView = new EditorView({
      state: initialEditorState,
      parent: editorRef.current as HTMLDivElement
    });

    const initialViewerState = EditorState.create({
      doc: 'read only',
      extensions: [basicSetup, barf, EditorState.readOnly.of(true), json()]
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
      <div className={classes.editor_editable} ref={editorRef} />
      <EditorPanel userQuery={userQuery} />

      <div ref={viewerRef} className={classes.editor_readonly}>
        {isFetching && <Loader />}
      </div>
    </div>
  );
}
