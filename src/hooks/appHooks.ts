import { useDispatch, useSelector } from 'react-redux';

import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { useContext } from 'react';
import { EditorContext } from '../components/EditorContext/EditorContext';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useEditorContext() {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error(
      'useEditorContext must be used within a EditorContextProvider'
    );
  }
  return context;
}
