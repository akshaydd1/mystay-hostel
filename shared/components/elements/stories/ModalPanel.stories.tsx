import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import ModalPanel from '../ModalPanel';
import Button from '../Button';

/**
 * ModalPanel - Dialog modal component
 * 
 * A flexible modal dialog component built with Headless UI.
 * Features backdrop blur, smooth animations, and flexible positioning.
 * 
 * **Features:**
 * - Multiple position options (center, corners, sides)
 * - Backdrop blur with click-to-close
 * - Smooth enter/exit animations
 * - Customizable title and description
 * - Accessible (ARIA compliant)
 * 
 * **When to use:**
 * - Confirmation dialogs
 * - Forms that need user focus
 * - Important notifications or alerts
 * - Multi-step workflows
 * 
 * **When not to use:**
 * - For simple tooltips (use Tooltip instead)
 * - For non-blocking notifications (use Toast/Snackbar)
 * - For navigation (use proper routing)
 */
const meta: Meta<typeof ModalPanel> = {
  title: 'Elements/ModalPanel',
  component: ModalPanel,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A modal dialog component with backdrop, animations, and flexible positioning options.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Modal title (optional)',
      table: {
        type: { summary: 'string' },
      },
    },
    description: {
      control: 'text',
      description: 'Modal description (optional)',
      table: {
        type: { summary: 'string' },
      },
    },
    isOpen: {
      control: 'boolean',
      description: 'Controls modal visibility',
      table: {
        type: { summary: 'boolean' },
      },
    },
    setIsOpen: {
      description: 'Callback to control modal state',
      table: {
        type: { summary: '(open: boolean) => void' },
      },
    },
    position: {
      control: 'select',
      options: ['center', 'top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right'],
      description: 'Modal position on screen',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'bottom-right' },
      },
    },
    containerClassName: {
      control: 'text',
      description: 'Additional CSS classes for modal panel',
      table: {
        type: { summary: 'string' },
      },
    },
    children: {
      description: 'Modal content',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ModalPanel>;

// Wrapper component for interactive stories
const ModalWrapper = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <ModalPanel {...args} isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

/**
 * Default modal centered on screen
 */
export const Default: Story = {
  render: ModalWrapper,
  args: {
    title: 'Confirm Action',
    description: 'Are you sure you want to proceed with this action?',
    position: 'center',
    containerClassName: 'p-6 min-w-[400px]',
    children: (
      <div className="flex gap-3 justify-end">
        <Button variant="outline">Cancel</Button>
        <Button variant="primary">Confirm</Button>
      </div>
    ),
  },
};

/**
 * Delete confirmation modal
 */
export const DeleteConfirmation: Story = {
  render: ModalWrapper,
  args: {
    title: 'Delete Account',
    description: 'This action cannot be undone. All your data will be permanently removed.',
    position: 'center',
    containerClassName: 'p-6 min-w-[400px]',
    children: (
      <div className="space-y-4">
        <p className="text-sm text-mo-text-muted">
          Please type <span className="font-semibold text-mo-text-dark">DELETE</span> to confirm.
        </p>
        <input 
          type="text" 
          className="w-full px-3 py-2 border border-mo-gray-border rounded focus:outline-none focus:ring-2 focus:ring-mo-primary"
          placeholder="Type DELETE"
        />
        <div className="flex gap-3 justify-end pt-2">
          <Button variant="outline">Cancel</Button>
          <Button variant="error">Delete Account</Button>
        </div>
      </div>
    ),
  },
};

/**
 * Form modal
 */
export const FormModal: Story = {
  render: ModalWrapper,
  args: {
    title: 'Add New Stock',
    position: 'center',
    containerClassName: 'p-6 min-w-[500px]',
    children: (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-mo-text-dark mb-1">Stock Symbol</label>
          <input 
            type="text" 
            className="w-full px-3 py-2 border border-mo-gray-border rounded focus:outline-none focus:ring-2 focus:ring-mo-primary"
            placeholder="e.g., RELIANCE"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-mo-text-dark mb-1">Quantity</label>
          <input 
            type="number" 
            className="w-full px-3 py-2 border border-mo-gray-border rounded focus:outline-none focus:ring-2 focus:ring-mo-primary"
            placeholder="Enter quantity"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-mo-text-dark mb-1">Price</label>
          <input 
            type="number" 
            className="w-full px-3 py-2 border border-mo-gray-border rounded focus:outline-none focus:ring-2 focus:ring-mo-primary"
            placeholder="Enter price"
            step="0.01"
          />
        </div>
        <div className="flex gap-3 justify-end pt-2">
          <Button variant="outline">Cancel</Button>
          <Button variant="success">Add Stock</Button>
        </div>
      </div>
    ),
  },
};

/**
 * Modal positioned at bottom-right (notification style)
 */
export const BottomRight: Story = {
  render: ModalWrapper,
  args: {
    title: 'New Alert',
    position: 'bottom-right',
    containerClassName: 'p-4 min-w-[320px]',
    children: (
      <div className="space-y-3">
        <p className="text-sm text-mo-text-muted">
          You have 3 new notifications. Would you like to view them now?
        </p>
        <div className="flex gap-2 justify-end">
          <Button variant="outline" size="sm">Dismiss</Button>
          <Button variant="primary" size="sm">View</Button>
        </div>
      </div>
    ),
  },
};

/**
 * Modal positioned at top
 */
export const TopPosition: Story = {
  render: ModalWrapper,
  args: {
    title: 'System Update',
    position: 'top',
    containerClassName: 'p-6 min-w-[400px]',
    children: (
      <div className="space-y-3">
        <p className="text-sm text-mo-text-dark">
          A new version is available. Update now to get the latest features.
        </p>
        <div className="flex gap-3 justify-end">
          <Button variant="outline">Later</Button>
          <Button variant="primary">Update Now</Button>
        </div>
      </div>
    ),
  },
};

/**
 * Modal without title and description
 */
export const NoHeader: Story = {
  render: ModalWrapper,
  args: {
    position: 'center',
    containerClassName: 'p-6 min-w-[400px]',
    children: (
      <div className="space-y-4">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-mo-green-soft flex items-center justify-center">
            <svg className="w-8 h-8 text-mo-green-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-mo-text-dark mb-2">Success!</h3>
          <p className="text-sm text-mo-text-muted">Your order has been placed successfully.</p>
        </div>
        <div className="flex justify-center pt-2">
          <Button variant="primary">Close</Button>
        </div>
      </div>
    ),
  },
};

/**
 * Loading modal
 */
export const Loading: Story = {
  render: ModalWrapper,
  args: {
    title: 'Processing',
    position: 'center',
    containerClassName: 'p-6 min-w-[300px]',
    children: (
      <div className="text-center space-y-4">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-mo-gray-border border-t-mo-primary"></div>
        <p className="text-sm text-mo-text-muted">Please wait while we process your request...</p>
      </div>
    ),
  },
};

/**
 * Side panel style (left position)
 */
export const SidePanel: Story = {
  render: ModalWrapper,
  args: {
    title: 'Filters',
    position: 'left',
    containerClassName: 'p-6 min-w-[320px] h-screen rounded-none',
    children: (
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-mo-text-dark mb-2">Price Range</h4>
          <div className="flex gap-2">
            <input type="number" placeholder="Min" className="w-full px-2 py-1 text-sm border border-mo-gray-border rounded" />
            <input type="number" placeholder="Max" className="w-full px-2 py-1 text-sm border border-mo-gray-border rounded" />
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium text-mo-text-dark mb-2">Sector</h4>
          <div className="space-y-2">
            {['Technology', 'Banking', 'Pharma', 'Energy'].map(sector => (
              <label key={sector} className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="rounded" />
                <span>{sector}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="flex gap-2 pt-4">
          <Button variant="outline" size="sm" className="flex-1">Reset</Button>
          <Button variant="primary" size="sm" className="flex-1">Apply</Button>
        </div>
      </div>
    ),
  },
};
