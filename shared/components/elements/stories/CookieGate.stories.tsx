import type { Meta, StoryObj } from '@storybook/react';
import CookieGate from '../CookieGate';

/**
 * CookieGate - Cookie-based render gate component
 * 
 * Waits until specified cookies are readable client-side before rendering children.
 * Prevents hydration mismatch and ensures cookies are available before rendering.
 * 
 * **Features:**
 * - Waits for cookies post-hydration
 * - Configurable timeout and polling
 * - Custom fallback UI
 * - Multiple cookie checks
 * 
 * **When to use:**
 * - Gating content that depends on user_id cookie
 * - Preventing hydration mismatches
 * - Ensuring authentication state is available
 * - Protected routes or components
 * 
 * **When not to use:**
 * - For server-side only checks
 * - When cookies are not the authentication method
 * - For public content
 * 
 * **Note:** This component is primarily for internal use and may not display
 * correctly in Storybook without actual cookies set.
 */
const meta: Meta<typeof CookieGate> = {
  title: 'Elements/CookieGate',
  component: CookieGate,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A gate component that waits for specified cookies before rendering children. Used for authentication-dependent content.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    required: {
      control: 'object',
      description: 'Array of cookie names that must be present',
      table: {
        type: { summary: 'string[]' },
        defaultValue: { summary: '["user_id"]' },
      },
    },
    fallback: {
      description: 'Component to show while waiting for cookies',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    children: {
      description: 'Content to render once cookies are available',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    timeoutMs: {
      control: 'number',
      description: 'Maximum time to wait before rendering anyway',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '4000' },
      },
    },
    pollIntervalMs: {
      control: 'number',
      description: 'Polling interval while waiting for cookies',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '250' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CookieGate>;

/**
 * Default gate waiting for user_id cookie
 * 
 * **Note:** Will show fallback in Storybook as user_id cookie is not set.
 */
export const Default: Story = {
  args: {
    required: ['user_id'],
    children: (
      <div className="p-6 bg-mo-bg-light rounded border border-mo-gray-border">
        <h3 className="text-lg font-semibold text-mo-text-dark mb-2">Protected Content</h3>
        <p className="text-sm text-mo-text-muted">This content is only shown when user_id cookie is present.</p>
      </div>
    ),
  },
};

/**
 * Custom fallback UI
 */
export const CustomFallback: Story = {
  args: {
    required: ['user_id'],
    fallback: (
      <div className="p-6 bg-mo-blue-light rounded border border-mo-blue-primary text-center">
        <p className="text-sm text-mo-blue-primary">Loading user data...</p>
      </div>
    ),
    children: (
      <div className="p-6 bg-mo-bg-light rounded border border-mo-gray-border">
        <h3 className="text-lg font-semibold text-mo-text-dark mb-2">User Dashboard</h3>
        <p className="text-sm text-mo-text-muted">Welcome back! This is your personalized dashboard.</p>
      </div>
    ),
  },
};

/**
 * Multiple required cookies
 */
export const MultipleRequiredCookies: Story = {
  args: {
    required: ['user_id', 'session_token', 'auth_status'],
    children: (
      <div className="p-6 bg-mo-green-soft rounded border border-mo-green-success">
        <h3 className="text-lg font-semibold text-mo-green-success mb-2">Fully Authenticated</h3>
        <p className="text-sm text-mo-text-dark">All required cookies are present.</p>
      </div>
    ),
  },
};

/**
 * Shorter timeout (2 seconds)
 */
export const ShortTimeout: Story = {
  args: {
    required: ['user_id'],
    timeoutMs: 2000,
    children: (
      <div className="p-6 bg-mo-bg-light rounded border border-mo-gray-border">
        <h3 className="text-lg font-semibold text-mo-text-dark mb-2">Quick Check</h3>
        <p className="text-sm text-mo-text-muted">Timeout after 2 seconds.</p>
      </div>
    ),
  },
};

/**
 * Simulated success (no required cookies)
 */
export const SimulatedSuccess: Story = {
  args: {
    required: [],
    children: (
      <div className="p-6 bg-mo-green-soft rounded border border-mo-green-success">
        <h3 className="text-lg font-semibold text-mo-green-success mb-2">Content Loaded</h3>
        <p className="text-sm text-mo-text-dark">No cookies required, content shows immediately.</p>
        <ul className="mt-4 space-y-2 text-sm text-mo-text-muted">
          <li>✓ Portfolio overview</li>
          <li>✓ Recent transactions</li>
          <li>✓ Watchlist</li>
          <li>✓ Market insights</li>
        </ul>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty required array means content renders immediately without cookie checks.',
      },
    },
  },
};

/**
 * Usage in authentication flow
 */
export const AuthenticationFlow: Story = {
  args: {
    required: ['user_id'],
    fallback: (
      <div className="flex flex-col items-center justify-center p-12 space-y-4">
        <div className="animate-spin h-8 w-8 border-4 border-mo-primary border-t-transparent rounded-full" />
        <p className="text-sm text-mo-text-muted">Verifying authentication...</p>
      </div>
    ),
    children: (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg border border-mo-gray-border shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-mo-primary flex items-center justify-center text-white text-xl font-bold">
            U
          </div>
          <div>
            <h3 className="text-base font-semibold text-mo-text-dark">User Dashboard</h3>
            <p className="text-sm text-mo-text-muted">user@example.com</p>
          </div>
        </div>
        <div className="space-y-3">
          <div className="p-3 bg-mo-bg-light rounded">
            <p className="text-sm font-medium text-mo-text-dark">Account Status</p>
            <p className="text-xs text-mo-green-success">Active</p>
          </div>
          <div className="p-3 bg-mo-bg-light rounded">
            <p className="text-sm font-medium text-mo-text-dark">Subscription</p>
            <p className="text-xs text-mo-blue-primary">Premium (30 days left)</p>
          </div>
        </div>
      </div>
    ),
  },
};
