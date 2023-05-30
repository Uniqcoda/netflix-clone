import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';

describe('Renders App', () => {
  test('renders App component', async () => {

  render(
    <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    
    await waitForElementToBeRemoved(() => screen.queryByTestId('loading-spinner'));
  });
});
