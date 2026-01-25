import React from 'react';

const Revolution: React.FC = () => {
  return (
    <section
      style={{
        background: 'linear-gradient(135deg, #2196F3 0%, #21CBF3 100%)',
        borderRadius: '24px',
        padding: '48px 24px',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0 4px 24px rgba(33, 150, 243, 0.12)',
        maxWidth: '100%',
        margin: '40px auto',
      }}
    >
      <h2
        style={{
          fontWeight: 700,
          fontSize: '2.5rem',
          textAlign: 'center',
          marginBottom: '16px',
          lineHeight: 1.1,
        }}
      >
        Ready to revolutionize your hostel<br />management?
      </h2>
      <p
        style={{
          fontSize: '1.1rem',
          textAlign: 'center',
          marginBottom: '32px',
          color: '#e3f2fd',
        }}
      >
        Join over 1,000 hostel owners who have transformed their<br />
        operations and increased their profitability with HostelManage.
      </p>
      <div style={{ display: 'flex', gap: '16px' }}>
        <button
          style={{
            background: '#fff',
            color: '#1976d2',
            fontWeight: 600,
            border: 'none',
            borderRadius: '10px',
            padding: '14px 36px',
            fontSize: '1rem',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(33, 150, 243, 0.08)',
            transition: 'background 0.2s, color 0.2s',
          }}
        >
          Get Started Now
        </button>
        <button
          style={{
            background: 'transparent',
            color: '#fff',
            fontWeight: 600,
            border: '2px solid #90caf9',
            borderRadius: '10px',
            padding: '14px 36px',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'background 0.2s, color 0.2s',
          }}
        >
          Contact Sales
        </button>
      </div>
    </section>
  );
};

export default Revolution;
