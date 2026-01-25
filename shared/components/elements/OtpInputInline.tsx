'use client';

import { useState, useEffect, useCallback } from 'react';
import { OtpInput } from 'reactjs-otp-input';
import axios from 'axios';
import { isEmail } from '@/shared/utils/validators';
import { FiEdit2 } from 'react-icons/fi';

export interface OtpVerifyResult {
  success: boolean;
  message?: string;
  userId?: string;
  data?: unknown;
}

interface OtpInputInlineProps {
  /**
   * The phone number or email to which OTP was sent
   */
  emailOrMobile: string;
  /**
   * Callback when user clicks edit to change phone number
   */
  onEdit?: () => void;
  /**
   * Callback when OTP is verified successfully
   */
  onVerifySuccess?: (result: OtpVerifyResult) => void;
  /**
   * Callback when OTP verification fails
   */
  onVerifyError?: (error: string) => void;
  /**
   * Custom verify function (optional - uses default API if not provided)
   */
  customVerify?: (otp: string, emailOrMobile: string) => Promise<OtpVerifyResult>;
  /**
   * Custom resend function (optional - uses default API if not provided)
   */
  customResend?: (emailOrMobile: string) => Promise<boolean>;
  /**
   * Initial countdown seconds for resend
   */
  initialCountdown?: number;
  /**
   * Number of OTP digits
   */
  numDigits?: number;
  /**
   * Show edit button
   */
  showEdit?: boolean;
  /**
   * Custom class for container
   */
  className?: string;
  /**
   * Variant style
   */
  variant?: 'default' | 'compact';
}

export const OtpInputInline: React.FC<OtpInputInlineProps> = ({
  emailOrMobile,
  onEdit,
  onVerifySuccess,
  onVerifyError,
  customVerify,
  customResend,
  initialCountdown = 30,
  numDigits = 6,
  showEdit = true,
  className = '',
  variant = 'default',
}) => {
  const [otp, setOtp] = useState('');
  const [counter, setCounter] = useState(initialCountdown);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState('');

  // Countdown timer effect
  useEffect(() => {
    if (counter > 0) {
      const timer = setTimeout(() => setCounter(counter - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [counter]);

  // Format phone number for display (mask middle digits)
  const formatPhoneDisplay = (phone: string) => {
    if (phone.length === 10) {
      return phone; // Show full number as in the design
    }
    return phone;
  };

  // Default verify OTP API call
  const defaultVerify = useCallback(async (otpValue: string): Promise<OtpVerifyResult> => {
    try {
      const res = await axios.get('/api/auth/verify', {
        params: {
          mobile_email: emailOrMobile,
          otp: otpValue,
        },
      });

      if (res.data.data.msg === 'Success') {
        return {
          success: true,
          message: 'OTP verified successfully',
          userId: res.data.data.user_id,
          data: res.data,
        };
      } else {
        return {
          success: false,
          message: res.data.data.msg || 'OTP verification failed',
        };
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Verification failed';
      return {
        success: false,
        message: errorMessage,
      };
    }
  }, [emailOrMobile]);

  // Default resend OTP API call
  const defaultResend = useCallback(async (): Promise<boolean> => {
    try {
      const flag = isEmail(emailOrMobile) ? 'E' : 'M';
      const endpoint = isEmail(emailOrMobile) ? '/api/auth/send/email' : '/api/auth/send/sms';
      
      await axios.get(endpoint, {
        params: {
          login_string: emailOrMobile,
          flag,
        },
      });
      return true;
    } catch {
      return false;
    }
  }, [emailOrMobile]);

  // Handle OTP input change
  const handleOtpChange = (value: string) => {
    setError('');
    setOtp(value);
  };

  // Handle OTP submission
  const handleSubmit = async () => {
    if (otp.length !== numDigits || isSubmitting) return;

    setIsSubmitting(true);
    setError('');

    try {
      const verifyFn = customVerify || defaultVerify;
      const result = await verifyFn(otp, emailOrMobile);

      if (result.success) {
        onVerifySuccess?.(result);
      } else {
        setError(result.message || 'Verification failed');
        setOtp('');
        onVerifyError?.(result.message || 'Verification failed');
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Verification failed';
      setError(errorMessage);
      setOtp('');
      onVerifyError?.(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle resend OTP
  const handleResend = async () => {
    if (counter > 0 || isResending) return;

    setIsResending(true);
    setError('');

    try {
      const resendFn = customResend || defaultResend;
      const success = await resendFn(emailOrMobile);

      if (success) {
        setCounter(initialCountdown);
        setOtp('');
      } else {
        setError('Failed to resend OTP');
      }
    } catch {
      setError('Failed to resend OTP');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className={`flex flex-col w-full gap-2 ${className}`}>
      {/* Header - Phone number with edit */}
      <div className="flex items-center gap-1">
        <span className="font-inter text-sm text-mo-text-muted">
          Enter the OTP sent on <span className="font-medium text-mo-text-light">{formatPhoneDisplay(emailOrMobile)}</span>
        </span>
        {showEdit && onEdit && (
          <button
            type="button"
            onClick={onEdit}
            className="p-1 text-mo-text-muted hover:text-mo-text-muted transition-colors"
            aria-label="Edit phone number"
          >
            <FiEdit2 size={14} />
          </button>
        )}
      </div>

      {/* OTP Input with Submit Button */}
      <div className="flex w-full">
        <div
          className={`flex items-center flex-1 px-4 h-12 bg-mo-white border rounded-l-lg ${
            error ? 'border-mo-red-error' : 'border-mo-gray-border'
          }`}
        >
          <OtpInput
            value={otp}
            onChange={handleOtpChange}
            numInputs={numDigits}
            isDisabled={isSubmitting}
            isInputNum={true}
            shouldAutoFocus={true}
            containerStyle="flex w-full justify-start gap-2"
            inputStyle={{
              width: variant === 'compact' ? '28px' : '32px',
              height: '24px',
              background: 'transparent',
              border: 'none',
              borderRadius: 0,
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontSize: '18px',
              lineHeight: '24px',
              color: error ? '#EE212E' : '#0F0F10',
              textAlign: 'center',
              outline: 'none',
              caretColor: '#0F0F10',
            }}
            disabledStyle={{
              cursor: 'not-allowed',
              opacity: 0.5,
            }}
          />
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={otp.length !== numDigits || isSubmitting}
          className="flex items-center justify-center px-6 h-12 bg-mo-blue-secondary text-mo-white font-inter font-medium text-sm rounded-r-lg disabled:opacity-60 disabled:cursor-not-allowed hover:bg-mo-primary transition-colors"
        >
          {isSubmitting ? (
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            'Submit'
          )}
        </button>
      </div>

      {/* Footer - Resend timer and error */}
      <div className="flex items-center justify-between w-full">
        <div className="text-sm">
          {error ? (
            <span className="text-mo-red-error">{error}</span>
          ) : counter > 0 ? (
            <span className="text-mo-text-muted">
              Resend OTP in: <span className="font-medium">{counter}s</span>
            </span>
          ) : null}
        </div>
        <button
          type="button"
          disabled={counter > 0 || isResending}
          onClick={handleResend}
          className="text-sm font-medium text-mo-text-muted disabled:text-mo-text-muted disabled:cursor-not-allowed hover:underline transition-colors"
        >
          {isResending ? 'Sending...' : 'Resend OTP'}
        </button>
      </div>
    </div>
  );
};

export default OtpInputInline;
