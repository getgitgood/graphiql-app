import { tags as t } from '@lezer/highlight';
import { createTheme } from 'thememirror';

// Author: getgitgood

export const union = createTheme({
  variant: 'dark',
  settings: {
    background: '#15191EFA',
    foreground: '#f8cc30aa',
    caret: '#C4C4C4',
    selection: '#90B2D557',
    gutterBackground: '#15191EFA',
    gutterForeground: '#aaaaaa95',
    lineHighlight: '#57575712'
  },
  styles: [
    {
      tag: t.comment,
      color: '#6E6E6E'
    },
    {
      tag: [t.string, t.regexp, t.special(t.brace)],
      color: '#e535ab'
    },
    {
      tag: t.number,
      color: '#a58dff'
    },
    {
      tag: t.bool,
      color: '#aa667D'
    },
    {
      tag: [t.definitionKeyword, t.modifier, t.function(t.propertyName)],
      color: '#A3D295'
    },
    {
      tag: [t.keyword, t.moduleKeyword, t.operatorKeyword, t.operator],
      color: '#697A8E'
    },
    {
      tag: [t.variableName, t.attributeName],
      color: '#a32c89'
    },
    {
      tag: [
        t.function(t.variableName),
        t.definition(t.propertyName),
        t.derefOperator
      ],
      color: '#f8cc30'
    },
    {
      tag: [t.squareBracket],
      color: '#11cc30'
    },
    {
      tag: [t.brace],
      color: '#77115a'
    },
    {
      tag: t.tagName,
      color: '#13D295'
    }
  ]
});
