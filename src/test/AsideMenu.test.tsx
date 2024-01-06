import { render, screen, fireEvent } from '@testing-library/react';
import AsideMenu from '../layouts/Aside/AsideMenu';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import { setupStore } from '../store';

describe('AsideMenu Component', () => {
  test('renders AsideMenu component', () => {
    const store = setupStore(); // Assuming you have a setupStore function
    render(
      <Provider store={store}>
        <AsideMenu />
      </Provider>
    );

    // Updated assertion using the title attribute
    expect(screen.getByTitle(/Show documentation/i)).toBeInTheDocument();
  });

  test('handles button click', () => {
    const store = setupStore(); // Assuming you have a setupStore function
    render(
      <Provider store={store}>
        <AsideMenu />
      </Provider>
    );

    fireEvent.click(screen.getByTitle(/Show documentation/i));

    // Add your assertions based on the expected behavior after the button click
    // For example:
    expect(store.getState().project.sideMenuMode).toBe('Documentation');
  });
});
