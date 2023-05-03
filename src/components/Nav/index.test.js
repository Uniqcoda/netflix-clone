import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Nav from './index';

test('should show login form', () => {
  render(
    <MemoryRouter>
      <Nav />
    </MemoryRouter>
  );
  expect(screen.getByText('Home')).toBeInTheDocument();
  expect(screen.getByText('TV Shows')).toBeInTheDocument();
  expect(screen.getByText('Movies')).toBeInTheDocument();
  expect(screen.getByText('New & Popular')).toBeInTheDocument();
  expect(screen.getByText('My List')).toBeInTheDocument();
});
