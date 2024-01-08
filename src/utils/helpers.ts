import { EditorView } from 'codemirror';
import { toast } from 'react-toastify';
import { RedirectProps } from '../types';

export function formatDisplayedName(email: string) {
  const slicedEmail = email.split('@');
  const [prefix, postfix] = slicedEmail as string[];
  let formattedPrefix;
  if (prefix.length > 6) {
    formattedPrefix = `${prefix.slice(0, 2)}`;
  } else {
    const asteriskRepeatTimes = prefix.length - 1;
    formattedPrefix = `${prefix.slice(0, 1)}${'*'.repeat(asteriskRepeatTimes)}`;
  }
  return `${formattedPrefix}***@${postfix}`;
}

export function isRedirectionRequired({
  isUserSignIn,
  isReversedDirection
}: RedirectProps) {
  const value =
    (isUserSignIn && !isReversedDirection) ||
    (!isUserSignIn && isReversedDirection);
  return value;
}

export function saveEditorContent(callback: (data: string) => void) {
  return EditorView.updateListener.of((content) => {
    if (content.changes) {
      callback(content.state.doc.toString());
    }
  });
}

export type CleanUpLineProps = {
  line: string;
  counter: number;
  setCounter: (value: number) => void;
};

export const queryPrettify = (query: string) => {
  const lines = query.split('\n');
  const prettifiedArray: string[] = [];
  let prettifiedLine = '';
  let indentationLevel = 0;
  for (let line of lines) {
    line = line
      .trim()
      .split(' ')
      .filter((item) => item !== '')
      .join(' ');
    if (line === '') continue;
    line = line
      .replace(' (', '(')
      .replace(' )', ')')
      .replace('){', ') {')
      .replace(/(?<! )\{/g, ' {');
    if (line.startsWith('}')) {
      indentationLevel = Math.max(indentationLevel - 1, 0);
    }

    prettifiedLine += '  '.repeat(indentationLevel) + line + '\n';

    if (line.endsWith('{')) {
      indentationLevel += 1;
    }
  }

  prettifiedArray.push(prettifiedLine);

  return prettifiedArray.join('');
};

export function codeMirrorDispatcher(
  cmInstance: EditorView | null,
  value: string
) {
  if (!cmInstance) return;
  cmInstance.dispatch({
    changes: {
      from: 0,
      to: cmInstance.state.doc.length,
      insert: value
    }
  });
}

export function formatEndpointLink(value: string) {
  let url = 'not connected';
  try {
    const { hostname } = new URL(value);
    url = hostname;
  } catch {
    return false;
  } finally {
    return url;
  }
}

export function emitNotification(
  type: 'success' | 'warn' | 'error',
  message: string
) {
  return toast[type](message, {
    position: 'top-right',
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'dark'
  });
}
