import { EditorView } from 'codemirror';
import { useEffect, useRef } from 'react';
import { useGetDataQuery } from '../../features/apiSlice';
import { useAppSelector, useEditorContext } from '../../hooks/appHooks';
import { initialViewerState } from '../../utils/cmViewerSetup';
import { codeMirrorDispatcher, emitNotification } from '../../utils/helpers';
import Loader from '../Loader/Loader';
import classes from './EditorViewier.module.scss';

export type ViewierProps = {
  isRequestReady: boolean;
  parseError: Error | null;
};

export default function EditorViewier() {
  const { isRequestCollecting, parseError } = useEditorContext();
  const viewerRef = useRef<HTMLDivElement>(null);
  const viewerViewRef = useRef<EditorView | null>(null);

  const { query, userVariables, userHeaders } = useAppSelector(
    (state) => state.project.request
  );
  const { data, isError, error, isFetching } = useGetDataQuery(
    { query, userVariables, userHeaders },
    {
      skip: isRequestCollecting
    }
  );

  useEffect(() => {
    const viewerView = new EditorView({
      state: initialViewerState,
      parent: viewerRef.current as HTMLDivElement
    });

    viewerViewRef.current = viewerView;

    return () => {
      viewerView.destroy();
    };
  }, []);

  useEffect(() => {
    if (viewerViewRef.current) {
      let content = '';

      if (parseError) {
        emitNotification('error', parseError.message);
        return;
      }

      const contentData = error && 'data' in error ? error.data : data?.data;
      if (contentData && error && 'data' in error) {
        type ErrorObj = {
          errors: ErrorArray[];
        };
        type ErrorArray = {
          extensions?: {
            code: string;
          };
          locations?: { line: number; column: number }[];
          message: string;
        };
        const { errors } = error.data as ErrorObj;
        errors.forEach((item) => {
          let errorString = item.message.split(':').join(':\n');
          if (item.locations) {
            const [locations] = [...item.locations];
            const { line, column } = locations;
            errorString += ' at line: ' + line + ', column: ' + column;
          }

          emitNotification('error', errorString);
        });
        return;
      }
      if (contentData) {
        content = JSON.stringify(contentData, undefined, 2);
      }
      codeMirrorDispatcher(viewerViewRef.current, content);
    }
  }, [data, error, isError, parseError]);

  return (
    <div
      ref={viewerRef}
      className={classes.editor_readonly}
      data-testid={'editor-viewer'}
    >
      {isFetching && <Loader />}
    </div>
  );
}
