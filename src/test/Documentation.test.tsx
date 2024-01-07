import Documentation from '../layouts/Documentation/Documentation';
import '@testing-library/jest-dom';
import { renderWithRtkProviders } from './utils/helpers';

describe('Test Documentation Component', () => {
  it('renders error message when there is an error in fetching schema', async () => {
    renderWithRtkProviders(<Documentation />);
  });
});
