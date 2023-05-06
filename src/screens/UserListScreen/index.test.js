import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store';
import UserList from './index';

describe('Renders Users List screen', () => {
  test('renders user list', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <UserList />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('You have not added any movie to your list yet')).toBeInTheDocument();
  });
});
