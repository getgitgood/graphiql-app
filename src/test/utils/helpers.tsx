import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import AppContextProvider from '../../components/Context/Context';
import EditorContextProvider from '../../components/EditorContext/EditorContext';
import { setupStore } from '../../store';

const user = userEvent.setup();

const ProvidersWrapper = (children: JSX.Element) => {
  const store = setupStore();
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

const renderWithAct = async (children: JSX.Element) => {
  await act(async () => {
    render(ProvidersWrapper(children));
  });
};

const visibleElement = (elements: HTMLElement[]) => {
  return elements.find(
    (element) => window.getComputedStyle(element).display !== 'none'
  );
};

export { renderWithAct, visibleElement, user, ProvidersWrapper };
