import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginScreen from './index';

describe('Renders Login screen', () => {
  test('renders Login screen', () => {
    render(
      <MemoryRouter>
        <LoginScreen />
      </MemoryRouter>
    );
    expect(screen.getByTestId('company-logo')).toBeVisible();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText('Unlimited films, TV programmes and more.')).toBeInTheDocument();
    expect(screen.getByText('Watch anywhere. Cancel at any time.')).toBeInTheDocument();
    expect(
      screen.getByText('Ready to watch? Enter your email to create or restart your membership.')
    ).toBeInTheDocument();
    expect(screen.getByText('GET STARTED')).toBeInTheDocument();
  });
});
