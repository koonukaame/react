import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { Layout } from './Layout';
import { createRoutesStub } from 'react-router';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { mockStore } from '@test';
import { ThemeProvider } from '@app';

it('renders Layout page without errors', () => {
  const Stub = createRoutesStub([
    {
      path: '/character',
      Component: () => {
        return (
          <Provider store={mockStore}>
            <ThemeProvider>
              <Layout />
            </ThemeProvider>
          </Provider>
        );
      },
    },
  ]);

  render(<Stub initialEntries={['/character']} />);

  const layout = screen.getByTestId('layout');
  expect(layout).toBeInTheDocument();
});
