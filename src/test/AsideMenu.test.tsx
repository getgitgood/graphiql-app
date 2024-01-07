import { render, screen, fireEvent } from '@testing-library/react';
import AsideMenu from '../layouts/Aside/AsideMenu';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { setupStore } from '../store';

describe('AsideMenu Component', () => {
  test('renders AsideMenu component', () => {
    const store = setupStore();
    render(
      <Provider store={store}>
        <AsideMenu />
      </Provider>
    );

    expect(screen.getByTitle(/Show documentation/i)).toBeInTheDocument();
  });

  test('handles button click', () => {
    const store = setupStore();
    render(
      <Provider store={store}>
        <AsideMenu />
      </Provider>
    );

    fireEvent.click(screen.getByTitle(/Show documentation/i));

    expect(store.getState().project.sideMenuMode).toBe('Documentation');
  });
});
