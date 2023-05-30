import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Nav from './index';

describe('Renders Nav', () => {
  test('should show login form', () => {
    render(
      <BrowserRouter>
        <Nav />
      </BrowserRouter>
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('TV Shows')).toBeInTheDocument();
    expect(screen.getByText('Movies')).toBeInTheDocument();
    // expect(screen.getByText('New & Popular')).toBeInTheDocument();
    expect(screen.getByText('My List')).toBeInTheDocument();
  });
});
