import { screen } from '@testing-library/react';
import Editor from '../layouts/Editor/Editor';
import EditorPanel from '../components/EditorPanel/EditorPanel';
import { renderWithAct, visibleElement, user } from './utils/helpers';

afterEach(() => {
  jest.restoreAllMocks();
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

    const buttons = screen.getAllByTestId('panel-buttons');
    const endpointInputs = screen.getAllByPlaceholderText(
      'New graphql endpoint'
    );
    const endpointChangeBtn = screen.getAllByText(/change/i);

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

  test('Toolkit in QueryEditor component should expand and collapse on btn click', async () => {
    await renderWithAct(<Editor />);

    const toolkit = screen.getByTestId('toolkit');
    const expandBtn = screen.getByTestId('expand-btn');
    expect(toolkit).toHaveClass('collapsed');

    await user.click(expandBtn);

    expect(toolkit).not.toHaveClass('collapsed');

    await user.click(expandBtn);

    expect(toolkit).toHaveClass('collapsed');
  });

  test('Headers and variables in EditorToolkit must correct reflect active state', async () => {
    await renderWithAct(<Editor />);

    const headers = screen.getByText('Headers');
    const variables = screen.getByText('Variables');

    await user.click(headers);

    expect(headers).toHaveClass('active');
    expect(variables).not.toHaveClass('active');
    await user.click(variables);

    expect(headers).not.toHaveClass('active');
    expect(variables).toHaveClass('active');
  });

  test('Send query button in panel should be rendered', async () => {
    await renderWithAct(<EditorPanel />);
    const endpointInput = screen.getAllByPlaceholderText(
      'New graphql endpoint'
    );

    const endpointChangeBtn = screen.getAllByText(/change/i);

    await user.type(
      visibleElement(endpointInput) as HTMLElement,
      'https://test-submit.com'
    );
    await user.click(visibleElement(endpointChangeBtn) as HTMLElement);

    const submitBtn = screen.getAllByTestId('submit-btn');
    await user.click(visibleElement(submitBtn) as HTMLElement);
  });
});
