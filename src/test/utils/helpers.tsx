import { PreloadedState } from '@reduxjs/toolkit';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { setupListeners } from '@reduxjs/toolkit/query';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactElement, ReactNode } from 'react';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import AppContextProvider from '../../components/Context/Context';
import EditorContextProvider from '../../components/EditorContext/EditorContext';
import { RootState, setupStore } from '../../store';

const user = userEvent.setup();

const providersWrapper = (children: JSX.Element, initStore?: ToolkitStore) => {
  const store = initStore || setupStore();
  return (
    <MemoryRouter>
      <Provider store={store}>
        <AppContextProvider>
          <EditorContextProvider>{children}</EditorContextProvider>
        </AppContextProvider>
      </Provider>
    </MemoryRouter>
  );
};

const providersWrapperNoRouter = (
  children: JSX.Element,
  initStore?: ToolkitStore
) => {
  const store = initStore || setupStore();
  return (
    <Provider store={store}>
      <AppContextProvider>
        <EditorContextProvider>{children}</EditorContextProvider>
      </AppContextProvider>
    </Provider>
  );
};

const renderWithAct = async (
  children: JSX.Element,
  initStore?: ToolkitStore
) => {
  await act(async () => {
    render(providersWrapper(children, initStore));
  });
};

const visibleElement = (elements: HTMLElement[]) => {
  return elements.find(
    (element) => window.getComputedStyle(element).display !== 'none'
  );
};

function renderWithRtkProviders(
  ui: ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  } = {}
) {
  setupListeners(store.dispatch);

  function Wrapper({ children }: { children: ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export type MockPreloadState = Pick<PreloadedState<RootState>, 'project'>;

export {
  renderWithAct,
  visibleElement,
  user,
  providersWrapper,
  renderWithRtkProviders,
  providersWrapperNoRouter
};
