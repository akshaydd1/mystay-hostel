import type { Meta, StoryObj } from '@storybook/react';
import GoogleSignInButton from '../GoogleSignInButton';
import { useState } from 'react';

/**
 * GoogleSignInButton - Google OAuth sign-in button
 * 
 * A button component for Google OAuth authentication.
 * Integrates with @react-oauth/google for Google sign-in flow.
 * 
 * **Note:** This component requires Google OAuth setup and will not function
 * in Storybook without proper OAuth configuration and API mocking.
 * 
 * **Features:**
 * - Google OAuth integration
 * - Error message display
 * - Multiple use cases (login, signup, update-user)
 * - Backend authentication flow
 * 
 * **When to use:**
 * - Login/signup flows
 * - Social authentication
 * - User profile updates with Google
 * 
 * **When not to use:**
 * - When Google OAuth is not configured
 * - For non-authentication purposes
 * - When email/password is required
 * 
 * **Requirements:**
 * - Google OAuth Client ID configured
 * - GoogleOAuthProvider wrapper in app
 * - Backend API endpoints for authentication
 */
const meta: Meta<typeof GoogleSignInButton> = {
  title: 'Elements/GoogleSignInButton',
  component: GoogleSignInButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A Google OAuth sign-in button component. **Note:** Requires OAuth setup and will not be functional in Storybook.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    errorMessage: {
      control: 'text',
      description: 'Error message to display',
      table: {
        type: { summary: 'string' },
      },
    },
    setErrorMessage: {
      description: 'Callback to set error message',
      table: {
        type: { summary: 'React.Dispatch<React.SetStateAction<string>>' },
      },
    },
    buttonFor: {
      control: 'radio',
      options: ['login', 'signup', 'update-user'],
      description: 'Use case for the button',
      table: {
        type: { summary: "'login' | 'signup' | 'update-user'" },
      },
    },
    setShowPincode: {
      description: 'Callback to show pincode input (for update-user)',
      table: {
        type: { summary: 'React.Dispatch<React.SetStateAction<boolean>>' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof GoogleSignInButton>;

// Wrapper component for interactive stories
const GoogleButtonWrapper = (args: any) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [showPincode, setShowPincode] = useState(false);
  
  return (
    <div className="min-w-[320px]">
      <GoogleSignInButton 
        {...args} 
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        setShowPincode={setShowPincode}
      />
      {errorMessage && (
        <div className="mt-4 p-3 bg-mo-red-soft rounded text-sm text-mo-red-error">
          {errorMessage}
        </div>
      )}
      {showPincode && (
        <div className="mt-4 p-3 bg-mo-green-soft rounded text-sm text-mo-green-success">
          Pincode step triggered
        </div>
      )}
    </div>
  );
};

/**
 * Login button (default)
 * 
 * **Note:** Button will not function in Storybook without OAuth setup.
 */
export const Login: Story = {
  render: GoogleButtonWrapper,
  args: {
    buttonFor: 'login',
  },
  parameters: {
    docs: {
      description: {
        story: 'Google sign-in button for login flow. Clicking will attempt OAuth flow (non-functional in Storybook).',
      },
    },
  },
};

/**
 * Signup button
 */
export const Signup: Story = {
  render: GoogleButtonWrapper,
  args: {
    buttonFor: 'signup',
  },
};

/**
 * Update user profile button
 */
export const UpdateUser: Story = {
  render: GoogleButtonWrapper,
  args: {
    buttonFor: 'update-user',
  },
};

/**
 * With error message displayed
 */
export const WithError: Story = {
  render: (args) => {
    const [errorMessage, setErrorMessage] = useState('Email already exists. Please use a different email.');
    const [showPincode, setShowPincode] = useState(false);
    
    return (
      <div className="min-w-[320px]">
        <GoogleSignInButton 
          {...args} 
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          setShowPincode={setShowPincode}
        />
      </div>
    );
  },
  args: {
    buttonFor: 'login',
  },
};

/**
 * In a login form layout
 */
export const InLoginForm: Story = {
  render: GoogleButtonWrapper,
  args: {
    buttonFor: 'login',
  },
  decorators: [
    (Story) => (
      <div className="max-w-md mx-auto border border-mo-gray-border rounded-lg p-8 bg-white shadow-sm">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-mo-text-dark mb-2">Welcome Back</h2>
          <p className="text-sm text-mo-text-muted">Sign in to your account</p>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-mo-text-dark mb-2">Email or Phone</label>
          <input 
            type="text" 
            className="w-full px-3 py-2 border border-mo-gray-border rounded focus:outline-none focus:ring-2 focus:ring-mo-primary"
            placeholder="Enter email or phone"
          />
        </div>
        
        <button className="w-full py-2 bg-mo-primary text-white rounded font-medium hover:bg-mo-blue-secondary mb-4">
          Continue
        </button>
        
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-mo-gray-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-mo-text-muted">OR</span>
          </div>
        </div>
        
        <Story />
      </div>
    ),
  ],
};

/**
 * Visual reference only (non-interactive)
 */
export const VisualReference: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <div className="p-4 bg-mo-blue-light rounded border border-mo-blue-primary">
        <p className="text-sm text-mo-blue-primary mb-3">
          <strong>Note:</strong> This component requires Google OAuth configuration to function.
        </p>
        <div className="flex justify-center items-center w-full cursor-not-allowed space-x-3 py-2 px-8 border border-mo-gray-border rounded bg-white opacity-60">
          <svg viewBox="0 0 24 24" className="w-5 h-5">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span className="text-sm">Continue with Google</span>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Visual reference showing the button appearance. The actual component requires OAuth setup to function.',
      },
    },
  },
};
