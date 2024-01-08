import { render } from '@testing-library/react';
import Loader from '../components/Loader/Loader';
import { screen } from '@testing-library/react';
describe('Test Loader Component', () => {
  test('it should be displayed on screen', () => {
    render(<Loader />);

    const loader = screen.getByTestId('loader');

    expect(loader).toBeInTheDocument();
  });
});
