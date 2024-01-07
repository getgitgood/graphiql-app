import { EditorView } from 'codemirror';
import { useEffect, useRef } from 'react';
import { useEditorContext } from '../../hooks/appHooks';
import { ContextProps } from '../../types';
import { initialEditorState } from '../../utils/cmEditorSetup';
import { codeMirrorDispatcher, saveEditorContent } from '../../utils/helpers';
import classes from './QueryEditor.module.scss';

export default function QueryEditor({ children }: ContextProps) {
  const { setUserQuery, prettifiedQuery, queryUpdateCounter } =
    useEditorContext();
  const editorRef = useRef<HTMLDivElement>(null);

  const editorViewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    const saveContent = saveEditorContent(setUserQuery);
    const editorView = new EditorView({
      state: initialEditorState([saveContent]),
      parent: editorRef.current as HTMLDivElement
    });

    editorViewRef.current = editorView;

    return () => editorView.destroy();
  }, [setUserQuery]);

  useEffect(() => {
    if (!editorViewRef.current) return;

    const currentDocContent = editorViewRef.current.state.doc.toString();
    if (currentDocContent === prettifiedQuery) return;
    codeMirrorDispatcher(editorViewRef.current, prettifiedQuery);
  }, [prettifiedQuery, queryUpdateCounter]);

  return (
    <div
      ref={editorRef}
      className={classes.editor_editable}
      data-testid={'query-editor'}
    >
      {children}
    </div>
  );
}
