import { screen } from '@testing-library/react';
import BurgerMenu from '../components/BurgerMenu/BurgerMenu';
import { renderWithAct, user } from './utils/helpers';

const setIsBurgerOpen = jest.fn(() => {});

const BurgerComponent = (
  <BurgerMenu isBurgerOpen={true} setIsBurgerOpen={setIsBurgerOpen} />
);

describe('Test BurgerMenu Component', () => {
  test('it should render burger menu on screen', async () => {
    await renderWithAct(BurgerComponent);
    const menu = screen.getByTestId('burger-menu');

    expect(menu).toBeInTheDocument();
  });

  test('it should render signup and signout buttons on screen with both correct hrefs (`auth`)', async () => {
    await renderWithAct(BurgerComponent);
    const signUp = screen.getByLabelText('sign up button');
    const signIn = screen.getByLabelText('sign in button');

    expect(signUp).toBeInTheDocument();
    expect(signIn).toBeInTheDocument();
    expect(signUp).toHaveAttribute('href', '/auth');
    expect(signIn).toHaveAttribute('href', '/auth');
  });

  test('it should render the language switchers with correct active one', async () => {
    await renderWithAct(BurgerComponent);
    const ru = screen.getByText(/ru/i);
    const kz = screen.getByText(/kz/i);
    const en = screen.getByText(/en/i);

    expect(ru).toBeInTheDocument();
    expect(kz).toBeInTheDocument();
    expect(en).toBeInTheDocument();

    expect(ru).not.toHaveClass('lang_active');
    expect(kz).not.toHaveClass('lang_active');
    expect(en).toHaveClass('lang_active');
  });

  test('it should switch the active language classes correctly', async () => {
    await renderWithAct(BurgerComponent);
    const ru = screen.getByText(/ru/i);
    const kz = screen.getByText(/kz/i);
    const en = screen.getByText(/en/i);

    expect(ru).not.toHaveClass('lang_active');
    expect(kz).not.toHaveClass('lang_active');
    expect(en).toHaveClass('lang_active');

    await user.click(kz);

    expect(ru).not.toHaveClass('lang_active');
    expect(kz).toHaveClass('lang_active');
    expect(en).not.toHaveClass('lang_active');

    await user.click(ru);

    expect(ru).toHaveClass('lang_active');
    expect(kz).not.toHaveClass('lang_active');
    expect(en).not.toHaveClass('lang_active');
  });
});
