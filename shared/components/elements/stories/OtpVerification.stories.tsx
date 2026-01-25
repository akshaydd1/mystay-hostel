import type { Meta, StoryObj } from '@storybook/react';
import OTPVerificationSuccessPopup from '../OtpVerification';
import { useState } from 'react';
import Button from '../Button';

/**
 * OTPVerificationSuccessPopup - OTP verification success dialog
 * 
 * A centered success dialog shown after OTP verification.
 * Features a checkmark icon, customizable message, and highlighted access text.
 * 
 * **Features:**
 * - Portal-based rendering (renders at document root)
 * - Backdrop with blur effect
 * - ESC key to close
 * - Smooth animations
 * - Customizable messages
 * 
 * **When to use:**
 * - After successful OTP verification
 * - After successful authentication
 * - Confirmation of access activation
 * 
 * **When not to use:**
 * - For error messages (use error modal instead)
 * - For intermediate steps (use stepper/progress)
 * - For non-authentication success (use generic success modal)
 */
const meta: Meta<typeof OTPVerificationSuccessPopup> = {
  title: 'Elements/OtpVerification',
  component: OTPVerificationSuccessPopup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A success dialog shown after OTP verification with customizable messages and highlight text.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controls dialog visibility',
      table: {
        type: { summary: 'boolean' },
      },
    },
    onClose: {
      description: 'Callback when dialog is closed',
      table: {
        type: { summary: '() => void' },
      },
    },
    message: {
      control: 'text',
      description: 'Main heading text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'OTP Verification Successful' },
      },
    },
    highlightText: {
      control: 'text',
      description: 'Highlighted text in gradient pill',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Your 7 day Free Access activated' },
      },
    },
    disableBackdropClose: {
      control: 'boolean',
      description: 'Disable closing by clicking backdrop',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof OTPVerificationSuccessPopup>;

// Wrapper component for interactive stories
const VerificationWrapper = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Show Verification Success</Button>
      <OTPVerificationSuccessPopup {...args} open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

/**
 * Default OTP verification success dialog
 */
export const Default: Story = {
  render: VerificationWrapper,
  args: {
    message: 'OTP Verification Successful',
    highlightText: 'Your 7 day Free Access activated',
  },
};

/**
 * Custom success message
 */
export const CustomMessage: Story = {
  render: VerificationWrapper,
  args: {
    message: 'Account Verified!',
    highlightText: 'Welcome to MOFSL Research360',
  },
};

/**
 * Email verification success
 */
export const EmailVerification: Story = {
  render: VerificationWrapper,
  args: {
    message: 'Email Verified Successfully',
    highlightText: 'Your account is now active',
  },
};

/**
 * Premium access activated
 */
export const PremiumActivation: Story = {
  render: VerificationWrapper,
  args: {
    message: 'Premium Access Activated',
    highlightText: 'Enjoy unlimited features for 30 days',
  },
};

/**
 * Registration complete
 */
export const RegistrationComplete: Story = {
  render: VerificationWrapper,
  args: {
    message: 'Registration Complete',
    highlightText: 'Start exploring now',
  },
};

/**
 * Cannot close by clicking backdrop
 */
export const DisableBackdropClose: Story = {
  render: VerificationWrapper,
  args: {
    message: 'OTP Verification Successful',
    highlightText: 'Your 7 day Free Access activated',
    disableBackdropClose: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Backdrop click is disabled. User must click the close button or press ESC.',
      },
    },
  },
};

/**
 * Short highlight text
 */
export const ShortHighlight: Story = {
  render: VerificationWrapper,
  args: {
    message: 'Success!',
    highlightText: 'Access granted',
  },
};

/**
 * Long messages
 */
export const LongMessages: Story = {
  render: VerificationWrapper,
  args: {
    message: 'Your Identity Has Been Successfully Verified',
    highlightText: 'You now have full access to all premium features and services',
  },
};
