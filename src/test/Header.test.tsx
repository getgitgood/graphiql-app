import { screen } from '@testing-library/react';
import Navigation from '../components/Navigation/Navigation';
import Header from '../layouts/Header/Header';
import { renderWithAct } from './utils/helpers';

const HeaderComponent = <Header />;

const setIsBurgerOpen = jest.fn(() => {});

describe('Test Header Component', () => {
  test('it should render header on screen', async () => {
    await renderWithAct(HeaderComponent);
    const header = screen.getByTestId('header');

    expect(header).toBeInTheDocument();
  });

  test('navigation should render as expected', async () => {
    await renderWithAct(
      <Navigation isBurgerOpen={false} setIsBurgerOpen={setIsBurgerOpen} />
    );
    const nav = screen.getByRole('navigation');

    expect(nav).toBeInTheDocument();
  });
});
