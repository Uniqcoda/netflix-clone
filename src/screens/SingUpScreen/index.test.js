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

const MockSignUpScreen = ({ email }) => {
  return (
    <MemoryRouter>
      <SignUpScreen email={email} />
    </MemoryRouter>
  );
};

describe('SignUpScreen:', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Visible elements:', () => {
    test('shows the right elements on page render', () => {
      render(<MockSignUpScreen />);
      const emailInput = screen.getByPlaceholderText(/email/i);
      const passwordInput = screen.getByPlaceholderText('Password');
      const invalidEmail = screen.queryByText('Please enter a valid email address');
      const invalidPassword = screen.queryByText('Password should be at least 6 characters');
      const wrongCredentials = screen.queryByText('Wrong email or password');

      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(invalidEmail).toBeNull();
      expect(invalidPassword).toBeNull();
      expect(wrongCredentials).toBeNull();
    });

    test('automatically fills in email from login page', () => {
      render(<MockSignUpScreen email={'example@mail.com'} />);

      const emailInput = screen.getByPlaceholderText('Email');
      expect(emailInput).toHaveValue('example@mail.com');
      expect(emailInput.defaultValue).toBe('example@mail.com');
    });
  });

  describe('Functionality:', () => {
    const fillAndSubmitForm = (email, password, button) => {
      const emailInput = screen.getByPlaceholderText('Email');
      const passwordInput = screen.getByPlaceholderText('Password');
      fireEvent.change(emailInput, { target: { value: email } });
      fireEvent.change(passwordInput, { target: { value: password } });
      fireEvent.click(button);
    };

    test('displays error message for invalid email', () => {
      render(<MockSignUpScreen />);
      const signInButton = screen.getByRole('button', { name: 'Sign In' });
      fillAndSubmitForm('invalid.email', 'password', signInButton);

      const errorMessage = screen.getByRole('alert');
      expect(errorMessage).toHaveTextContent('Please enter a valid email address');
      expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(0);
    });

    test('displays error message for short password', () => {
      render(<MockSignUpScreen />);
      const signInButton = screen.getByRole('button', { name: 'Sign In' });
      fillAndSubmitForm('validemail@example.com', 'pass', signInButton);

      const errorMessage = screen.getByRole('alert');
      expect(errorMessage).toHaveTextContent('Password should be at least 6 characters');
      expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(0);
    });

    test('Sign In: calls signInWithEmailAndPassword on valid form submission', async () => {
      render(<MockSignUpScreen />);

      //  Mock the signInWithEmailAndPassword function to return user details
      signInWithEmailAndPassword.mockResolvedValue({
        user: {
          email: 'validemail@example.com',
          uid: 'sampleId',
        },
      });

      const signInButton = screen.getByRole('button', { name: 'Sign In' });
      fillAndSubmitForm('validemail@example.com', 'password123', signInButton);

      expect(signInWithEmailAndPassword).toHaveBeenCalledWith({}, 'validemail@example.com', 'password123');
      expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
    });

    test('Sign In: displays error message for wrong email or password', async () => {
      render(<MockSignUpScreen />);

      //  Mock the signInWithEmailAndPassword function to throw an error
      signInWithEmailAndPassword.mockRejectedValue(new Error('Wrong email or password'));

      const signInButton = screen.getByRole('button', { name: 'Sign In' });
      fillAndSubmitForm('validemail@example.com', 'wrongpassword', signInButton);

      expect(signInWithEmailAndPassword).toHaveBeenCalledWith({}, 'validemail@example.com', 'wrongpassword');

      // Wait for the error message to be displayed
      await waitFor(() => {
        const errorMessage = screen.getByRole('alert');
        expect(errorMessage).toHaveTextContent('Wrong email or password');
      });
    });

    test('Sign Up: calls createUserWithEmailAndPassword on valid registration', async () => {
      render(<MockSignUpScreen />);

      //  Mock the createUserWithEmailAndPassword function to return user details
      createUserWithEmailAndPassword.mockResolvedValue({
        user: {
          email: 'validemail@example.com',
          uid: 'sampleId',
        },
      });
      const signUpLink = screen.getByText('Sign up now.');

      fillAndSubmitForm('validemail@example.com', 'password123', signUpLink);

      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith({}, 'validemail@example.com', 'password123');
      expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
    });

    test('Sign Up: displays error message for registration failure', async () => {
      render(<MockSignUpScreen />);

      // Mock the createUserWithEmailAndPassword function to throw an error
      createUserWithEmailAndPassword.mockRejectedValue(new Error('Registration failed'));

      const signUpLink = screen.getByText('Sign up now.');

      fillAndSubmitForm('validemail@example.com', 'password123', signUpLink);

      expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
      // Wait for the error message to be displayed
      await waitFor(() => {
        const errorMessage = screen.getByRole('alert');
        expect(errorMessage).toHaveTextContent('Wrong email or password');
      });
    });
  });
});
