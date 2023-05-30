import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Banner from './index';

describe('Renders Banner', () => {
  test('should show the home page banner with the play and more buttons', () => {
    render(
      <BrowserRouter>
        <Banner />
      </BrowserRouter>
    );
    expect(screen.getByText('More Info')).toBeInTheDocument();
    expect(screen.getByText('Play')).toBeInTheDocument();
  });
});
