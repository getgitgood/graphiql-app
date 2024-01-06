import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import WelcomePage from '../layouts/WelcomePage/WelcomePage';

describe('WelcomePage component', () => {
  test('renders WelcomePage component', () => {
    render(<WelcomePage />);
    expect(screen.getByText(/About the Project/i)).toBeInTheDocument();
    expect(screen.getByText(/About the Developers/i)).toBeInTheDocument();
    expect(screen.getByText(/About the Course/i)).toBeInTheDocument();
  });

  // Тесты для проверки контента
  test('renders project content', () => {
    render(<WelcomePage />);
    expect(
      screen.getByText(/GraphiQL is a powerful playground/i)
    ).toBeInTheDocument(); // Замените на фактический текст
  });

  test('renders developers content', () => {
    render(<WelcomePage />);
    expect(
      screen.getByText(/We are the LuckyCoders team/i)
    ).toBeInTheDocument(); // Замените на фактический текст
  });

  test('renders course content', () => {
    render(<WelcomePage />);
    expect(screen.getByText(/The React RS School course/i)).toBeInTheDocument(); // Замените на фактический текст
  });
});
