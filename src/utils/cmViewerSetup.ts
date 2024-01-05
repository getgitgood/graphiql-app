import {
  highlightSpecialChars,
  dropCursor,
  crosshairCursor
} from '@codemirror/view';
import { Extension, EditorState } from '@codemirror/state';
import {
  defaultHighlightStyle,
  syntaxHighlighting,
  bracketMatching,
  foldGutter
} from '@codemirror/language';
import { history } from '@codemirror/commands';
import { highlightSelectionMatches } from '@codemirror/search';
import { autocompletion, closeBrackets } from '@codemirror/autocomplete';
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
  EditorView.lineWrapping,
  union,
  syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
  bracketMatching(),
  closeBrackets(),
  autocompletion(),
  crosshairCursor(),
  highlightSelectionMatches(),
  json()
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
