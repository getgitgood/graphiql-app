import {
  keymap,
  highlightSpecialChars,
  dropCursor,
  crosshairCursor
} from '@codemirror/view';
import { Extension, EditorState } from '@codemirror/state';
import {
  defaultHighlightStyle,
  syntaxHighlighting,
  bracketMatching,
  foldGutter,
  foldKeymap
} from '@codemirror/language';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { searchKeymap, highlightSelectionMatches } from '@codemirror/search';
import {
  autocompletion,
  completionKeymap,
  closeBrackets,
  closeBracketsKeymap
} from '@codemirror/autocomplete';
import { lintKeymap } from '@codemirror/lint';
import { json } from '@codemirror/lang-json';
import { union } from './theme';
import { EditorView } from 'codemirror';

export const viewerBasicSetup: Extension = (() => [
  highlightSpecialChars(),
  history(),
  foldGutter({
    openText: '⇩',
    closedText: '⇨'
  }),
  dropCursor(),
  EditorState.allowMultipleSelections.of(true),
  EditorState.readOnly.of(true),
  union,
  syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
  bracketMatching(),
  closeBrackets(),
  autocompletion(),
  crosshairCursor(),
  highlightSelectionMatches(),
  json(),
  keymap.of([
    ...closeBracketsKeymap,
    ...defaultKeymap,
    ...searchKeymap,
    ...historyKeymap,
    ...foldKeymap,
    ...completionKeymap,
    ...lintKeymap
  ])
])();

export const initialViewerState = EditorState.create({
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
