import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Banner from './index';

describe('Renders Banner', () => {
  test('should show the home page banner with the play and more buttons', () => {
    render(
      <MemoryRouter>
        <Banner />
      </MemoryRouter>
    );
    expect(screen.getByText('More Info')).toBeInTheDocument();
    expect(screen.getByText('Play')).toBeInTheDocument();
  });
});
