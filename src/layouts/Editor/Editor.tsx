import EditorPanel from '../../components/EditorPanel/EditorPanel';
import EditorToolkit from '../../components/EditorToolkit/EditorToolkit';
import EditorViewier from '../../components/EditorViewier/EditorViewier';
import QueryEditor from '../../components/QueryEditor/QueryEditor';
import classes from './Editor.module.scss';

export default function Editor() {
  return (
    <div className={classes.editor_wrapper} data-testid={'editor'}>
      <QueryEditor>
        <EditorToolkit />
        <EditorPanel />
      </QueryEditor>
      <EditorViewier />
    </div>
  );
}
