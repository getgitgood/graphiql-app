import { useDispatch, useSelector } from 'react-redux';

import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { useContext } from 'react';
import { EditorContext } from '../components/EditorContext/EditorContext';
import { AppContext } from '../components/Context/Context';

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

export function useLanguageContext() {
  const context = useContext(AppContext);
  return context.translations[context.currentLanguage];
}
