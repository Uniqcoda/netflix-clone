import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Banner from './index';

test('should show login form', () => {
  render(
    <MemoryRouter>
      <Banner />
    </MemoryRouter>
  );
  expect(screen.getByText('More Info')).toBeInTheDocument();
  expect(screen.getByText('Play')).toBeInTheDocument();
});
