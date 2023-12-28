import { EditorView } from 'codemirror';
import { toast } from 'react-toastify';
import { RedirectProps } from '../types';

function formatDisplayedName(email: string) {
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

function isRedirectionRequired({
  isUserSignIn,
  isReversedDirection
}: RedirectProps) {
  const value =
    (isUserSignIn && !isReversedDirection) ||
    (!isUserSignIn && isReversedDirection);
  return value;
}

function saveEditorContent(callback: (data: string) => void) {
  return EditorView.updateListener.of((content) => {
    if (content.changes) {
      callback(content.state.doc.toString());
    }
  });
}

export function codeMirrorDispatcher(cmInstance: EditorView, value: string) {
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

export { formatDisplayedName, isRedirectionRequired, saveEditorContent };
