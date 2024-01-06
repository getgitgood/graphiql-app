import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '../layouts/Footer/Footer';

describe('Footer component', () => {
  test('renders Footer component', () => {
    render(<Footer />);
    expect(screen.getByAltText(/course logo/i)).toBeInTheDocument();
    expect(screen.getByText(/alima987/i)).toBeInTheDocument();
    expect(screen.getByText(/getgitgood/i)).toBeInTheDocument();
    expect(screen.getByText(/ArtemDolgopolov/i)).toBeInTheDocument();
    expect(screen.getByText(/© 2023/i)).toBeInTheDocument();
  });

  test('renders correct link for rs.school', () => {
    render(<Footer />);
    const rsSchoolLink = screen.getByRole('link', { name: /Course Logo/i });
    expect(rsSchoolLink).toHaveAttribute('href', 'https://rs.school/');
    expect(rsSchoolLink).toHaveAttribute('target', '_blank');
    expect(rsSchoolLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('renders correct link for alima987', () => {
    render(<Footer />);
    const alima987Link = screen.getByRole('link', { name: /alima987/i });
    expect(alima987Link).toHaveAttribute('href', 'https://github.com/alima987');
    expect(alima987Link).toHaveAttribute('target', '_blank');
    expect(alima987Link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('renders correct link for getgitgood', () => {
    render(<Footer />);
    const getgitgoodLink = screen.getByRole('link', { name: /getgitgood/i });
    expect(getgitgoodLink).toHaveAttribute(
      'href',
      'https://github.com/getgitgood'
    );
    expect(getgitgoodLink).toHaveAttribute('target', '_blank');
    expect(getgitgoodLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('renders correct link for ArtemDolgopolov', () => {
    render(<Footer />);
    const artemDolgopolovLink = screen.getByRole('link', {
      name: /ArtemDolgopolov/i
    });
    expect(artemDolgopolovLink).toHaveAttribute(
      'href',
      'https://github.com/ArtemDolgopolov'
    );
    expect(artemDolgopolovLink).toHaveAttribute('target', '_blank');
    expect(artemDolgopolovLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
