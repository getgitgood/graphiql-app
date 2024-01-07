import { screen, waitFor } from '@testing-library/react';
import Editor from '../layouts/Editor/Editor';
import server from './server/server';
import { renderWithAct, visibleElement, user } from './utils/helpers';

let isRequestFired = false;
let isDocRequestFired = false;
let isSubmitFired = false;

afterEach(() => {
  isRequestFired = false;
  isDocRequestFired = false;
  isSubmitFired = false;
});

server.events.on('request:start', ({ request }) => {
  const { url } = request;
  switch (url) {
    case 'test':
      isRequestFired = true;
      return;
    case 'test-doc':
      isDocRequestFired = true;
      return;
    case 'test-submit':
      isSubmitFired = true;
      return;
  }
});

describe('Test Editor component', () => {
  test('Editor should be presented on the page', async () => {
    await renderWithAct(<Editor />);

    const editor = screen.getByTestId('editor');
    expect(editor).toBeInTheDocument();
  });

  test('QueryEditor and EditorViewier should be presented on the page', async () => {
    await renderWithAct(<Editor />);
    const queryEditor = screen.getByTestId('query-editor');
    const editorViewer = screen.getByTestId('editor-viewer');

    expect(queryEditor).toBeInTheDocument();
    expect(editorViewer).toBeInTheDocument();
  });

  test('QueryEditor should have user panel with bounded UI presented', async () => {
    await renderWithAct(<Editor />);

    const endpointWindows = screen.getAllByText(/rickandmortyapi.com/i);
    const indicators = screen.getAllByTestId('indicator');
    const buttons = screen.getAllByTestId('panel-buttons');
    const endpointInputs = screen.getAllByPlaceholderText(
      'New graphql endpoint'
    );
    const endpointChangeBtn = screen.getAllByText(/change/i);

    expect(visibleElement(endpointWindows)).toBeInTheDocument();
    expect(visibleElement(indicators)).toBeInTheDocument();
    expect(visibleElement(buttons)).toBeInTheDocument();
    expect(visibleElement(endpointInputs)).toBeInTheDocument();
    expect(visibleElement(endpointChangeBtn)).toBeInTheDocument();
  });

  test('QueryEditor should have headers and variables toolkit presented', async () => {
    await renderWithAct(<Editor />);

    const toolkit = screen.getByTestId('toolkit');
    const headersBtn = screen.getByText(/headers/i);
    const varsBtn = screen.getByText(/variables/i);
    const expandBtn = screen.getByTestId('expand-btn');

    expect(toolkit).toBeInTheDocument();
    expect(headersBtn).toBeInTheDocument();
    expect(varsBtn).toBeInTheDocument();
    expect(expandBtn).toBeInTheDocument();
  });

  test('Toolkit in QueryEditor component should expand on btn click', async () => {
    await renderWithAct(<Editor />);

    const toolkit = screen.getByTestId('toolkit');
    const expandBtn = screen.getByTestId('expand-btn');
    expect(toolkit).toHaveClass('collapsed');

    await user.click(expandBtn);

    expect(toolkit).not.toHaveClass('collapsed');
  });

  test('Endpoint change should trigger endpoint call', async () => {
    await renderWithAct(<Editor />);

    const endpointInput = screen.getAllByPlaceholderText(
      'New graphql endpoint'
    );

    const endpointChangeBtn = screen.getAllByText(/change/i);

    await user.type(visibleElement(endpointInput) as HTMLElement, 'test');
    await user.click(visibleElement(endpointChangeBtn) as HTMLElement);

    await waitFor(() => {
      expect(isRequestFired).toBe(true);
    });
  });

  test('Documentation button in panel should trigger additional API call', async () => {
    await renderWithAct(<Editor />);

    const endpointInput = screen.getAllByPlaceholderText(
      'New graphql endpoint'
    );

    const endpointChangeBtn = screen.getAllByText(/change/i);

    await user.type(visibleElement(endpointInput) as HTMLElement, 'test-doc');
    await user.click(visibleElement(endpointChangeBtn) as HTMLElement);

    const docBtn = screen.getAllByTestId('doc-btn');
    await user.click(visibleElement(docBtn) as HTMLElement);

    await waitFor(() => {
      expect(isDocRequestFired).toBe(true);
    });
  });

  test('Send query button in panel should trigger API call', async () => {
    await renderWithAct(<Editor />);

    const endpointInput = screen.getAllByPlaceholderText(
      'New graphql endpoint'
    );

    const endpointChangeBtn = screen.getAllByText(/change/i);

    await user.type(
      visibleElement(endpointInput) as HTMLElement,
      'test-submit'
    );
    await user.click(visibleElement(endpointChangeBtn) as HTMLElement);

    const submitBtn = screen.getAllByTestId('submit-btn');
    await user.click(visibleElement(submitBtn) as HTMLElement);

    await waitFor(() => {
      expect(isSubmitFired).toBe(true);
    });
  });
});
