import type { Meta, StoryObj } from '@storybook/react';
import TabNavigation from '../TabNavigation';
import { useState } from 'react';

const meta: Meta<typeof TabNavigation> = {
  title: 'Components/Elements/TabNavigation',
  component: TabNavigation,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A horizontal tab navigation component with support for many tabs. Automatically creates a "More" dropdown when tabs exceed the visible count.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    tabs: {
      control: 'object',
      description: 'Array of tab objects with key and label',
    },
    activeTab: {
      control: 'text',
      description: 'Currently active tab key',
    },
    onTabChange: {
      action: 'tab-changed',
      description: 'Callback when a tab is clicked',
    },
    visibleTabsCount: {
      control: 'number',
      description: 'Number of tabs to show before "More" dropdown',
    },
    ariaLabel: {
      control: 'text',
      description: 'ARIA label for accessibility',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TabNavigation>;

// Simple tabs
export const SimpleTabs: Story = {
  render: (args) => {
    const [activeTab, setActiveTab] = useState('tab1');
    return (
      <TabNavigation
        {...args}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    );
  },
  args: {
    tabs: [
      { key: 'tab1', label: 'Overview' },
      { key: 'tab2', label: 'Details' },
      { key: 'tab3', label: 'Settings' },
    ],
    visibleTabsCount: 15,
  },
};

// Many tabs with dropdown
export const ManyTabs: Story = {
  render: (args) => {
    const [activeTab, setActiveTab] = useState('tab1');
    return (
      <TabNavigation
        {...args}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    );
  },
  args: {
    tabs: [
      { key: 'tab1', label: 'Dashboard' },
      { key: 'tab2', label: 'Analytics' },
      { key: 'tab3', label: 'Reports' },
      { key: 'tab4', label: 'Users' },
      { key: 'tab5', label: 'Settings' },
      { key: 'tab6', label: 'Billing' },
      { key: 'tab7', label: 'Integrations' },
      { key: 'tab8', label: 'API Keys' },
      { key: 'tab9', label: 'Webhooks' },
      { key: 'tab10', label: 'Logs' },
      { key: 'tab11', label: 'Backups' },
      { key: 'tab12', label: 'Security' },
      { key: 'tab13', label: 'Notifications' },
      { key: 'tab14', label: 'Preferences' },
      { key: 'tab15', label: 'Help' },
      { key: 'tab16', label: 'About' },
    ],
    visibleTabsCount: 10,
  },
};

// Custom visible count
export const CustomVisibleCount: Story = {
  render: (args) => {
    const [activeTab, setActiveTab] = useState('tab1');
    return (
      <TabNavigation
        {...args}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    );
  },
  args: {
    tabs: [
      { key: 'tab1', label: 'First' },
      { key: 'tab2', label: 'Second' },
      { key: 'tab3', label: 'Third' },
      { key: 'tab4', label: 'Fourth' },
      { key: 'tab5', label: 'Fifth' },
      { key: 'tab6', label: 'Sixth' },
      { key: 'tab7', label: 'Seventh' },
    ],
    visibleTabsCount: 3,
  },
};

// Long tab labels
export const LongLabels: Story = {
  render: (args) => {
    const [activeTab, setActiveTab] = useState('tab1');
    return (
      <TabNavigation
        {...args}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    );
  },
  args: {
    tabs: [
      { key: 'tab1', label: 'User Management' },
      { key: 'tab2', label: 'System Configuration' },
      { key: 'tab3', label: 'Data Analytics Dashboard' },
      { key: 'tab4', label: 'Security Settings' },
    ],
    visibleTabsCount: 15,
  },
};

