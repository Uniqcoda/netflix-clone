import { render, screen, fireEvent, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
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
    <BrowserRouter>
      <SignUpScreen email={email} />
    </BrowserRouter>
  );
};

describe('SignUpScreen:', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Visible elements:', () => {
    test('shows the right elements on page render', () => {
      render(<MockSignUpScreen />);
      // const signInButton = screen.getByRole('button', { name: 'Sign In' });
      const signInButton = screen.getByTestId('sign-in');
      // const errorAlert = screen.getByRole('alert');
      const errorAlert = screen.queryByRole('alert');
      const emailInput = screen.getByPlaceholderText(/email/i);
      const passwordInput = screen.getByPlaceholderText('Password');
      const invalidEmail = screen.queryByText('Please enter a valid email address');
      // const invalidEmail = screen.getByText('Please enter a valid email address');
      const invalidPassword = screen.queryByText('Password should be at least 6 characters');
      const wrongCredentials = screen.queryByText('Wrong email or password');

      expect(signInButton).toBeInTheDocument();
      expect(errorAlert).toBeNull();
      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
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
      const mockSignInResolve = signInWithEmailAndPassword.mockResolvedValue({
        user: {
          email: 'validemail@example.com',
          uid: 'sampleId',
        },
      });

      const signInButton = screen.getByRole('button', { name: 'Sign In' });
      fillAndSubmitForm('validemail@example.com', 'password123', signInButton);

      expect(mockSignInResolve).toHaveBeenCalledWith({}, 'validemail@example.com', 'password123');
      expect(mockSignInResolve).toHaveBeenCalledTimes(1);

      await act(async () => {
        await mockSignInResolve;
      });
    });

    test('Sign In: displays error message for wrong email or password', async () => {
      render(<MockSignUpScreen />);

      //  Mock the signInWithEmailAndPassword function to throw an error
      const mockSignInReject = signInWithEmailAndPassword.mockRejectedValue(new Error('Wrong email or password'));

      const signInButton = screen.getByRole('button', { name: 'Sign In' });
      fillAndSubmitForm('validemail@example.com', 'wrongpassword', signInButton);

      expect(mockSignInReject).toHaveBeenCalledWith({}, 'validemail@example.com', 'wrongpassword');

      // Wait for the error message to be displayed
      const errorMessage = await screen.findByRole('alert');
      expect(errorMessage).toHaveTextContent('Wrong email or password');

      await act(async () => {
        await mockSignInReject;
      });
    });

    test('Register: calls createUserWithEmailAndPassword on valid registration', async () => {
      render(<MockSignUpScreen />);

      //  Mock the createUserWithEmailAndPassword function to return user details
      const mockRegisterResolve = createUserWithEmailAndPassword.mockResolvedValue({
        user: {
          email: 'validemail@example.com',
          uid: 'sampleId',
        },
      });
      const signUpLink = screen.getByText('Sign up now.');

      fillAndSubmitForm('validemail@example.com', 'password123', signUpLink);

      expect(mockRegisterResolve).toHaveBeenCalledWith({}, 'validemail@example.com', 'password123');
      expect(mockRegisterResolve).toHaveBeenCalledTimes(1);

      await act(async () => {
        await mockRegisterResolve;
      });
    });

    test('Register: displays error message for registration failure', async () => {
      render(<MockSignUpScreen />);

      // Mock the createUserWithEmailAndPassword function to throw an error
      const mockRegisterReject = createUserWithEmailAndPassword.mockRejectedValue(new Error('Registration failed'));

      const signUpLink = screen.getByText('Sign up now.');

      fillAndSubmitForm('validemail@example.com', 'password123', signUpLink);

      expect(mockRegisterReject).toHaveBeenCalledWith({}, 'validemail@example.com', 'password123');
      expect(mockRegisterReject).toHaveBeenCalledTimes(1);
      // Wait for the error message to be displayed
      const errorMessage = await screen.findByRole('alert');
      expect(errorMessage).toHaveTextContent('Wrong email or password');

      await act(async () => {
        await mockRegisterReject;
      });
    });
  });
});
