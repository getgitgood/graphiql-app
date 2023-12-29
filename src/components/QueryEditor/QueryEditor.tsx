import { EditorView } from 'codemirror';
import { useEffect, useRef } from 'react';
import { useEditorContext } from '../../hooks/appHooks';
import { ContextProps } from '../../types';
import { initialEditorState } from '../../utils/cmEditorSetup';
import { saveEditorContent } from '../../utils/helpers';
import classes from './QueryEditor.module.scss';

export default function QueryEditor({ children }: ContextProps) {
  const { setUserQuery } = useEditorContext();
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saveContent = saveEditorContent(setUserQuery);
    const editorView = new EditorView({
      state: initialEditorState(saveContent),
      parent: editorRef.current as HTMLDivElement
    });

    return () => editorView.destroy();
  }, [setUserQuery]);

  return (
    <div ref={editorRef} className={classes.editor_editable}>
      {children}
    </div>
  );
}
