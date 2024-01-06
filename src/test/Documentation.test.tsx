import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { setupStore } from '../store';
import Documentation from '../layouts/Documentation/Documentation';
import '@testing-library/jest-dom';
import { SideMenuOptions } from '../types';
// import { graphql } from 'msw';
// import { setupServer } from 'msw/node';

// const server = setupServer(
//   graphql.query('https://rickandmortyapi.com/graphql/', (_, res, ctx) => {
//     return res(
//       ctx.json({
//         data: {
//           __schema: {
//             queryType: {
//               fields: [
//                 {
//                   name: 'character',
//                   type: {
//                     name: 'Character'
//                   },
//                   args: [
//                     {
//                       name: 'id',
//                       type: {
//                         name: 'ID'
//                       }
//                     }
//                   ]
//                 }
//               ]
//             },
//             types: [
//               {
//                 name: 'Character',
//                 fields: [
//                   {
//                     name: 'id',
//                     type: {
//                       name: 'ID'
//                     }
//                   },
//                   {
//                     name: 'name',
//                     type: {
//                       name: 'String'
//                     }
//                   },
//                   {
//                     name: 'age',
//                     type: {
//                       name: 'Int'
//                     }
//                   },
//                   {
//                     name: 'gender',
//                     type: {
//                       name: 'String'
//                     }
//                   }
//                 ]
//               }
//             ]
//           }
//         }
//       })
//     );
//   })
// );

// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());

describe('Documentation Component', () => {
  it('renders Documentation component with loading state', () => {
    const store = setupStore();
    render(
      <Provider store={store}>
        <Documentation />
      </Provider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error message when there is an error fetching schema', async () => {
    const store = setupStore({
      project: {
        userEndpoint: 'invalidEndpoint',
        request: { query: '', userVariables: {}, userHeaders: {} },
        sideMenuMode: SideMenuOptions.Hidden,
        response: {},
        isUserSignIn: false
      }
    });
    render(
      <Provider store={store}>
        <Documentation />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Error/i)).toBeInTheDocument();
    });
  });

  it('renders nothing when schema data is null', async () => {
    jest.mock('../features/apiSlice', () => ({
      ...jest.requireActual('../features/apiSlice'),
      useSchemaQuery: jest.fn(() => ({
        data: {
          __schema: {
            queryType: {
              fields: []
            }
          }
        },
        isFetching: false,
        isError: false
      }))
    }));

    const store = setupStore({
      project: {
        userEndpoint: 'validEndpoint',
        request: { query: '', userVariables: {}, userHeaders: {} },
        sideMenuMode: SideMenuOptions.Documentation,
        response: {
          __schema: {
            queryType: {
              fields: []
            }
          }
        },
        isUserSignIn: false
      }
    });

    render(
      <Provider store={store}>
        <Documentation />
      </Provider>
    );

    // Wait for the asynchronous action to complete
    await waitFor(() => {
      // Check that no content related to the schema is rendered
      expect(screen.queryByText('Your Documentation Title')).toBeNull();
      expect(screen.queryByText('Your Documentation Content')).toBeNull();
    });
  });

  // it('renders documentation when schema is fetched successfully', async () => {
  //   const store = setupStore({
  //     project: {
  //       userEndpoint: 'https://rickandmortyapi.com/graphql/', // Указываем путь, соответствующий вашему MSW маршруту
  //       request: { query: '', userVariables: {}, userHeaders: {} },
  //       sideMenuMode: SideMenuOptions.Documentation,
  //       response: {}, // Мы не будем использовать заготовленный response в этом тесте
  //       isUserSignIn: false
  //     }
  //   });

  //   render(
  //     <Provider store={store}>
  //       <Documentation />
  //     </Provider>
  //   );

  //   // Wait for the asynchronous action to complete
  //   await waitFor(() => {
  //     expect(screen.getByText(/Docs/i)).toBeInTheDocument();
  //     // Добавьте другие проверки, соответствующие вашей документации
  //   });
  // });
});
