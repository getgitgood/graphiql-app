import classes from './Editor.module.scss';

import { useRef, useEffect, useState } from 'react';

import { EditorView } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import EditorPanel from '../EditorPanel/EditorPanel';
import { useAppSelector } from '../../hooks/appHooks';
import { useGetDataQuery } from '../../features/apiSlice';
import { viewerBasicSetup } from '../../utils/cmViewerSetup';
import { editorBasicSetup } from '../../utils/cmEditorSetup';
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
        editorBasicSetup,
        saveContent,
        EditorView.editorAttributes.of({
          class: 'editor_editable_cm'
        })
      ]
    });

    const editorView = new EditorView({
      state: initialEditorState,
      parent: editorRef.current as HTMLDivElement
    });

    const initialViewerState = EditorState.create({
      doc: 'read only',
      extensions: [
        viewerBasicSetup,
        EditorView.editorAttributes.of({
          class: 'editor_view_cm'
        }),
        EditorView.theme({
          '&.cm-focused': {
            outline: 'none'
          }
        })
      ]
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
      <section className={classes.editor_editable} ref={editorRef}>
        <EditorPanel userQuery={userQuery} />
      </section>

      <section ref={viewerRef} className={classes.editor_readonly}>
        {isFetching && <Loader />}
      </section>
    </div>
  );
}
