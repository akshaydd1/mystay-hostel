import type { Meta, StoryObj } from '@storybook/react';
import { IconWrapper } from '../IconWrapper';
import Image from 'next/image';

const meta: Meta<typeof IconWrapper> = {
  title: 'Components/Elements/Cards/IconWrapper',
  component: IconWrapper,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `A circular icon wrapper component that provides consistent styling for icons and images. 
        
**Features:**
- Configurable size with proportional icon sizing
- Customizable background and border colors
- Supports any React element as content (images, icons, SVGs)
- Maintains consistent circular shape with border

**When to use:**
- To display icons or images in a circular container with border
- For avatar-like UI elements
- As part of card components that need icon containers
- When consistent icon sizing and styling is needed

**When not to use:**
- For rectangular or square icon containers
- When icons don't need a background circle
- For simple icon displays without borders`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'number', min: 20, max: 100, step: 10 },
      description: 'Size of the wrapper in pixels',
    },
    backgroundColor: {
      control: 'color',
      description: 'Background color for the circle',
    },
    borderColor: {
      control: 'color',
      description: 'Border color',
    },
    children: {
      control: false,
      description: 'Icon content (image URL, img element, or any React element)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof IconWrapper>;

// Default story with SVG icon
export const Default: Story = {
  args: {
    size: 40,
    children: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#2e2a94" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 17L12 22L22 17" stroke="#2e2a94" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12L12 17L22 12" stroke="#2e2a94" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
};

// Size variants
export const Small: Story = {
  args: {
    size: 30,
    children: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="#2e2a94" strokeWidth="2"/>
      </svg>
    ),
  },
};

export const Medium: Story = {
  args: {
    size: 40,
    children: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="#2e2a94" strokeWidth="2"/>
      </svg>
    ),
  },
};

export const Large: Story = {
  args: {
    size: 60,
    children: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="#2e2a94" strokeWidth="2"/>
      </svg>
    ),
  },
};

export const ExtraLarge: Story = {
  args: {
    size: 80,
    children: (
      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="#2e2a94" strokeWidth="2"/>
      </svg>
    ),
  },
};

// Color variants
export const WithCustomBackground: Story = {
  args: {
    size: 40,
    backgroundColor: 'rgba(46, 42, 148, 0.1)',
    borderColor: 'rgba(46, 42, 148, 0.3)',
    children: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="#2e2a94" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="7" r="4" stroke="#2e2a94" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
};

export const WithBlueBackground: Story = {
  args: {
    size: 40,
    backgroundColor: 'rgba(0, 110, 185, 0.1)',
    borderColor: 'rgba(0, 110, 185, 0.3)',
    children: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="#006eb9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="10" r="3" stroke="#006eb9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
};

export const WithGreenBackground: Story = {
  args: {
    size: 40,
    backgroundColor: 'rgba(0, 168, 80, 0.1)',
    borderColor: 'rgba(0, 168, 80, 0.3)',
    children: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polyline points="20 6 9 17 4 12" stroke="#00a850" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
};

// Icon type variants
export const WithEmoji: Story = {
  args: {
    size: 40,
    children: <span style={{ fontSize: '22px' }}>🎯</span>,
  },
};

export const WithText: Story = {
  args: {
    size: 40,
    children: <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#2e2a94' }}>AB</span>,
  },
};

export const WithStarIcon: Story = {
  args: {
    size: 40,
    children: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="#faad19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    backgroundColor: 'rgba(250, 173, 25, 0.1)',
    borderColor: 'rgba(250, 173, 25, 0.3)',
  },
};

export const WithHeartIcon: Story = {
  args: {
    size: 40,
    children: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="#ee212e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    backgroundColor: 'rgba(238, 33, 46, 0.1)',
    borderColor: 'rgba(238, 33, 46, 0.3)',
  },
};

// Multiple icons showcase
export const Showcase: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <IconWrapper size={40}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#2e2a94" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="#2e2a94" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="#2e2a94" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </IconWrapper>
      <IconWrapper size={40} backgroundColor="rgba(0, 110, 185, 0.1)" borderColor="rgba(0, 110, 185, 0.3)">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="#006eb9" strokeWidth="2"/>
        </svg>
      </IconWrapper>
      <IconWrapper size={40} backgroundColor="rgba(0, 168, 80, 0.1)" borderColor="rgba(0, 168, 80, 0.3)">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polyline points="20 6 9 17 4 12" stroke="#00a850" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </IconWrapper>
      <IconWrapper size={40} backgroundColor="rgba(250, 173, 25, 0.1)" borderColor="rgba(250, 173, 25, 0.3)">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="#faad19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </IconWrapper>
      <IconWrapper size={40} backgroundColor="rgba(238, 33, 46, 0.1)" borderColor="rgba(238, 33, 46, 0.3)">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="#ee212e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </IconWrapper>
    </div>
  ),
};

// Empty state
export const Empty: Story = {
  args: {
    size: 40,
  },
};
