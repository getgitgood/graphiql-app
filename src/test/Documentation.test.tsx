import Documentation from '../layouts/Documentation/Documentation';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { renderWithAct, renderWithRtkProviders } from './utils/helpers';
import { SideMenuOptions } from '../types';

describe('Test Documentation Component', () => {
  it('renders error message when there is an error in fetching schema', async () => {
    const state = {
      project: {
        userEndpoint: 'https://test.io',
        sideMenuMode: SideMenuOptions.Documentation
      }
    };

    renderWithRtkProviders(<Documentation />, { preloadedState: state });

    const error = await screen.findByText(/AN UNKNOWN ERROR HAS OCCURRED/i);
    expect(error).toBeInTheDocument();
  });

  it('renders error message when there is an error in fetching schema', async () => {
    renderWithAct(<Documentation />);
    expect(screen.queryByText('docs')).not.toBeInTheDocument();
  });
});
