import type { Meta, StoryObj } from '@storybook/react';
import { InfoCard } from '../InfoCard';
import { IconWrapper } from '../IconWrapper';

const meta: Meta<typeof InfoCard> = {
  title: 'Components/Elements/Cards/InfoCard',
  component: InfoCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `A flexible information card component that displays content in a horizontal layout with left content (typically an icon), text content (title and subtitle), and optional right content.

**Features:**
- Flexible content slots (left, center text, right)
- Customizable background color
- Supports any React element for left and right content
- Responsive padding and spacing
- Clean, modern design with rounded corners
- Built-in skeleton loader accessible via \`InfoCard.Skeleton\`

**When to use:**
- To display information with an icon or image
- For list items that need left icon and right action/badge
- In dashboards to show status or metrics
- For user profile cards or contact cards
- As a container for two-sided information display

**When not to use:**
- For complex layouts with multiple rows or columns
- When you need more than three content sections
- For full-page content (use appropriate page layouts instead)

**Loading State:**
Use \`InfoCard.Skeleton\` or \`InfoCardSkeleton\` for loading states.
\`\`\`tsx
// Loading state
<InfoCard.Skeleton />

// Loaded state
<InfoCard title="Title" subtitle="Subtitle" />
\`\`\``,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    leftContent: {
      control: false,
      description: 'Content to display on the left side (icon, image, or any React element)',
    },
    title: {
      control: 'text',
      description: 'Main title text',
    },
    subtitle: {
      control: 'text',
      description: 'Subtitle or description text',
    },
    rightContent: {
      control: false,
      description: 'Content to display on the right side (text, badge, or any React element)',
    },
    backgroundColor: {
      control: 'color',
      description: 'Background color',
    },
    className: {
      control: 'text',
      description: 'Optional className for customization',
    },
  },
};

export default meta;
type Story = StoryObj<typeof InfoCard>;

// Default story
export const Default: Story = {
  args: {
    title: 'Information Card',
    subtitle: 'This is a subtitle',
  },
};

// With icon wrapper
export const WithIcon: Story = {
  args: {
    leftContent: (
      <IconWrapper size={40}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="#2e2a94" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="7" r="4" stroke="#2e2a94" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </IconWrapper>
    ),
    title: 'User Profile',
    subtitle: 'Active Member',
  },
};

// With right content
export const WithRightContent: Story = {
  args: {
    leftContent: (
      <IconWrapper size={40} backgroundColor="rgba(0, 168, 80, 0.1)" borderColor="rgba(0, 168, 80, 0.3)">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polyline points="20 6 9 17 4 12" stroke="#00a850" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </IconWrapper>
    ),
    title: 'Task Completed',
    subtitle: '2 hours ago',
    rightContent: (
      <span className="text-mo-green-success font-semibold text-sm">✓ Done</span>
    ),
  },
};

// With badge
export const WithBadge: Story = {
  args: {
    leftContent: (
      <IconWrapper size={40} backgroundColor="rgba(0, 110, 185, 0.1)" borderColor="rgba(0, 110, 185, 0.3)">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="#006eb9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </IconWrapper>
    ),
    title: 'Market Update',
    subtitle: 'Real-time data',
    rightContent: (
      <span className="bg-mo-blue-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
        Live
      </span>
    ),
  },
};

// Stock card example
export const StockCard: Story = {
  args: {
    leftContent: (
      <IconWrapper size={40}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#2e2a94" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="#2e2a94" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="#2e2a94" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </IconWrapper>
    ),
    title: 'RELIANCE',
    subtitle: 'Reliance Industries Ltd',
    rightContent: (
      <div className="text-right">
        <div className="text-mo-text-dark font-semibold text-sm">₹2,450.50</div>
        <div className="text-mo-green-success text-xs">+2.5%</div>
      </div>
    ),
  },
};

// Notification card
export const NotificationCard: Story = {
  args: {
    leftContent: (
      <IconWrapper size={40} backgroundColor="rgba(250, 173, 25, 0.1)" borderColor="rgba(250, 173, 25, 0.3)">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#faad19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="#faad19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </IconWrapper>
    ),
    title: 'New Notification',
    subtitle: '5 minutes ago',
    rightContent: (
      <div className="w-2 h-2 bg-mo-accent-yellow rounded-full" />
    ),
  },
};

// Error card
export const ErrorCard: Story = {
  args: {
    leftContent: (
      <IconWrapper size={40} backgroundColor="rgba(238, 33, 46, 0.1)" borderColor="rgba(238, 33, 46, 0.3)">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="#ee212e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="15" y1="9" x2="9" y2="15" stroke="#ee212e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="9" y1="9" x2="15" y2="15" stroke="#ee212e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </IconWrapper>
    ),
    title: 'Transaction Failed',
    subtitle: 'Insufficient balance',
    rightContent: (
      <span className="text-mo-red-error text-xs font-semibold">Retry</span>
    ),
    backgroundColor: '#fdd8d8',
  },
};

// Title only
export const TitleOnly: Story = {
  args: {
    leftContent: (
      <IconWrapper size={40}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="#2e2a94" strokeWidth="2"/>
          <line x1="9" y1="9" x2="15" y2="9" stroke="#2e2a94" strokeWidth="2" strokeLinecap="round"/>
          <line x1="9" y1="15" x2="15" y2="15" stroke="#2e2a94" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </IconWrapper>
    ),
    title: 'Simple Card',
  },
};

// Subtitle only
export const SubtitleOnly: Story = {
  args: {
    leftContent: (
      <IconWrapper size={40}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="#2e2a94" strokeWidth="2"/>
        </svg>
      </IconWrapper>
    ),
    subtitle: 'Only subtitle shown',
  },
};

// No icon
export const NoIcon: Story = {
  args: {
    title: 'Card without Icon',
    subtitle: 'Just text content',
    rightContent: (
      <span className="text-mo-blue-primary text-sm font-semibold">→</span>
    ),
  },
};

// Custom background
export const CustomBackground: Story = {
  args: {
    leftContent: (
      <IconWrapper size={40}>
        <span style={{ fontSize: '22px' }}>🎯</span>
      </IconWrapper>
    ),
    title: 'Custom Styled Card',
    subtitle: 'With custom background',
    backgroundColor: '#daeaf5',
  },
};

// Multiple cards showcase
export const Showcase: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-96">
      <InfoCard
        leftContent={
          <IconWrapper size={40}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#2e2a94" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="#2e2a94" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="#2e2a94" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </IconWrapper>
        }
        title="Portfolio Value"
        subtitle="Total Investment"
        rightContent={
          <div className="text-right">
            <div className="text-mo-text-dark font-semibold">₹1,25,000</div>
            <div className="text-mo-green-success text-xs">+15.5%</div>
          </div>
        }
      />
      <InfoCard
        leftContent={
          <IconWrapper size={40} backgroundColor="rgba(0, 168, 80, 0.1)" borderColor="rgba(0, 168, 80, 0.3)">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="12" y1="1" x2="12" y2="23" stroke="#00a850" strokeWidth="2" strokeLinecap="round"/>
              <polyline points="17 6 12 1 7 6" stroke="#00a850" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </IconWrapper>
        }
        title="Daily Gain"
        subtitle="Today's Performance"
        rightContent={
          <div className="text-right">
            <div className="text-mo-green-success font-semibold">+₹2,450</div>
            <div className="text-mo-text-muted text-xs">+1.96%</div>
          </div>
        }
      />
      <InfoCard
        leftContent={
          <IconWrapper size={40} backgroundColor="rgba(238, 33, 46, 0.1)" borderColor="rgba(238, 33, 46, 0.3)">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="12" y1="23" x2="12" y2="1" stroke="#ee212e" strokeWidth="2" strokeLinecap="round"/>
              <polyline points="17 18 12 23 7 18" stroke="#ee212e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </IconWrapper>
        }
        title="Day Loss"
        subtitle="Yesterday's Performance"
        rightContent={
          <div className="text-right">
            <div className="text-mo-red-error font-semibold">-₹1,200</div>
            <div className="text-mo-text-muted text-xs">-0.97%</div>
          </div>
        }
      />
    </div>
  ),
};

// Long text example
export const LongText: Story = {
  args: {
    leftContent: (
      <IconWrapper size={40}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#2e2a94" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <polyline points="14 2 14 8 20 8" stroke="#2e2a94" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </IconWrapper>
    ),
    title: 'This is a very long title that might wrap to multiple lines',
    subtitle: 'This is also a long subtitle that provides additional context',
  },
};

// Loading State - Default
export const LoadingDefault: Story = {
  render: () => <InfoCard.Skeleton />,
};

// Loading State - Without Left Content
export const LoadingWithoutIcon: Story = {
  render: () => <InfoCard.Skeleton showLeftContent={false} />,
};

// Loading State - Without Subtitle
export const LoadingWithoutSubtitle: Story = {
  render: () => <InfoCard.Skeleton showSubtitle={false} />,
};

// Loading State - Without Right Content
export const LoadingWithoutRightContent: Story = {
  render: () => <InfoCard.Skeleton showRightContent={false} />,
};

// Loading State - Minimal
export const LoadingMinimal: Story = {
  render: () => (
    <InfoCard.Skeleton 
      showLeftContent={false} 
      showSubtitle={false} 
      showRightContent={false} 
    />
  ),
};

// Loading State - List Example
export const LoadingList: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <InfoCard.Skeleton />
      <InfoCard.Skeleton />
      <InfoCard.Skeleton />
      <InfoCard.Skeleton />
    </div>
  ),
};

// Loading to Loaded Comparison
export const LoadingComparison: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-sm font-semibold mb-2 text-mo-text-dark">Loading State:</h3>
        <InfoCard.Skeleton />
      </div>
      <div>
        <h3 className="text-sm font-semibold mb-2 text-mo-text-dark">Loaded State:</h3>
        <InfoCard
          leftContent={
            <IconWrapper size={40}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="#2e2a94" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="7" r="4" stroke="#2e2a94" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </IconWrapper>
          }
          title="User Profile"
          subtitle="Active Member"
          rightContent={
            <span className="text-mo-green-success font-semibold text-sm">✓ Verified</span>
          }
        />
      </div>
    </div>
  ),
};
