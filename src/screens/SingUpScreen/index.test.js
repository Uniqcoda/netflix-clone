import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SignUpScreen from './index';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

// Mock the firebase auth methods
jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  getAuth: jest.fn(() => ({})),
}));

describe('SignUpScreen', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders email and password input elements', () => {
    render(
      <MemoryRouter>
        <SignUpScreen />
      </MemoryRouter>
    );
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test('Sign In: displays error message for invalid email', () => {
    render(
      <MemoryRouter>
        <SignUpScreen />
      </MemoryRouter>
    );
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const signInButton = screen.queryAllByText('Sign In')[1];

    fireEvent.change(emailInput, { target: { value: 'invalid.email' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(signInButton);

    const errorMessage = screen.getByRole('alert');
    expect(errorMessage).toHaveTextContent('Please enter a valid email address');
    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(0);
  });

  test('Sign In: displays error message for short password', () => {
    render(
      <MemoryRouter>
        <SignUpScreen />
      </MemoryRouter>
    );
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const signInButton = screen.queryAllByText('Sign In')[1];

    fireEvent.change(emailInput, { target: { value: 'validemail@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'pass' } });
    fireEvent.click(signInButton);

    const errorMessage = screen.getByRole('alert');
    expect(errorMessage).toHaveTextContent('Password should be at least 6 characters');
    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(0);
  });

  test('Sign In: calls signInWithEmailAndPassword on valid form submission', async () => {
    render(
      <MemoryRouter>
        <SignUpScreen />
      </MemoryRouter>
    );
    //  Mock the signInWithEmailAndPassword function to return user details
    signInWithEmailAndPassword.mockResolvedValueOnce({
      user: {
        email: 'validemail@example.com',
        uid: 'sampleId',
      },
    });

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const signInButton = screen.queryAllByText('Sign In')[1];

    fireEvent.change(emailInput, { target: { value: 'validemail@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(signInButton);

    // Wait for the signInWithEmailAndPassword call to finish
    await waitFor(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith({}, 'validemail@example.com', 'password123');
    });
    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
  });

  test('Sign In: displays error message for wrong email or password', async () => {
    render(
      <MemoryRouter>
        <SignUpScreen />
      </MemoryRouter>
    );
    //  Mock the signInWithEmailAndPassword function to throw an error
    signInWithEmailAndPassword.mockRejectedValueOnce(new Error('Wrong email or password'));

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const signInButton = screen.queryAllByText('Sign In')[1];

    fireEvent.change(emailInput, { target: { value: 'validemail@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
    fireEvent.click(signInButton);

    // Wait for the error message to be displayed
    await waitFor(() => {
      const errorMessage = screen.getByRole('alert');
      expect(errorMessage).toHaveTextContent('Wrong email or password');
    });
    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
  });

  test('Sign Up: calls createUserWithEmailAndPassword on valid registration', async () => {
    render(
      <MemoryRouter>
        <SignUpScreen />
      </MemoryRouter>
    );
    //  Mock the createUserWithEmailAndPassword function to return user details
    createUserWithEmailAndPassword.mockResolvedValueOnce({
      user: {
        email: 'validemail@example.com',
        uid: 'sampleId',
      },
    });
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const signUpLink = screen.getByText('Sign up now.');

    fireEvent.change(emailInput, { target: { value: 'validemail@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(signUpLink);

    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith({}, 'validemail@example.com', 'password123');
    expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
  });

  test('Sign Up: displays error message for registration failure', async () => {
    render(
      <MemoryRouter>
        <SignUpScreen />
      </MemoryRouter>
    );
    // Mock the createUserWithEmailAndPassword function to throw an error
    createUserWithEmailAndPassword.mockRejectedValueOnce(new Error('Registration failed'));

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const signUpLink = screen.getByText('Sign up now.');

    fireEvent.change(emailInput, { target: { value: 'validemail@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(signUpLink);

    // Wait for the error message to be displayed
    await waitFor(() => {
      const errorMessage = screen.getByRole('alert');
      expect(errorMessage).toHaveTextContent('Wrong email or password');
    });
    expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
  });
});
