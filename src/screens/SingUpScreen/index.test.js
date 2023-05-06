import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SignupScreen from './index';

test('renders Signup screen', () => {
  render(
    <MemoryRouter>
      <SignupScreen />
    </MemoryRouter>
  );
  expect(screen.queryAllByText('Sign In').length).toBe(2);
  expect(screen.getByText('New to Netflix?')).toBeInTheDocument();
  expect(screen.getByText('Sign up now.')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
});

test('shows an alert message when form validation fails', async () => {
  render(
    <MemoryRouter>
      <SignupScreen />
    </MemoryRouter>
  );
  
  // Leave form fields empty
  fireEvent.change(screen.getByPlaceholderText('Email'), {
    target: { value: '' },
  });
  fireEvent.change(screen.getByPlaceholderText('Password'), {
    target: { value: '' },
  });
  

  // Submit form
  fireEvent.click(screen.queryAllByText('Sign In')[1]);

  // wait for error message
  const alert = await screen.findByRole('alert')

  // Check content of error message
  expect(alert).toHaveTextContent('Please enter a valid email address')
});
