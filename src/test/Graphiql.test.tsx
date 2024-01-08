import '@testing-library/jest-dom';
import { renderWithRtkProviders } from './utils/helpers';
import Graphiql from '../pages/Graphiql/Graphiql';
import { screen, waitFor } from '@testing-library/dom';
import EditorContextProvider from '../components/EditorContext/EditorContext';
describe('Test GraphiQl Component', () => {
  it('renders graphiql component', async () => {
    renderWithRtkProviders(
      <EditorContextProvider>
        <Graphiql />
      </EditorContextProvider>
    );

    const graphiql = screen.getByTestId('graphiql');

    await waitFor(() => expect(graphiql).toBeInTheDocument());
  });
});
