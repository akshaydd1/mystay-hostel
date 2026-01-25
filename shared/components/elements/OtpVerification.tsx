"use client";

import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { IoMdClose } from "react-icons/io";
import { GiRoundStar } from "react-icons/gi";

/**
 * OTPVerificationSuccessPopup
 * Renders a centered success dialog after OTP verification.
 * Design adapted from provided spec using Tailwind utility classes instead of absolute positioned Figma export CSS.
 *
 * Props:
 *  - open: boolean controls visibility
 *  - onClose: callback when user clicks close button, backdrop, or presses ESC
 *  - message?: heading text (defaults to 'OTP Verification Successful')
 *  - highlightText?: pill content (defaults to 'Your 7 day Free Access activated')
 */
export interface OTPVerificationSuccessPopupProps {
	open: boolean;
	onClose: () => void;
	message?: string;
	highlightText?: string;
	/** Optional: disable closing by clicking backdrop */
	disableBackdropClose?: boolean;
}

const dialogRootId = "otp-success-dialog-root";

function ensurePortalRoot() {
	if (typeof document === "undefined") return null;
	let el = document.getElementById(dialogRootId);
	if (!el) {
		el = document.createElement("div");
		el.id = dialogRootId;
		document.body.appendChild(el);
	}
	return el;
}

export const OTPVerificationSuccessPopup: React.FC<OTPVerificationSuccessPopupProps> = ({
	open,
	onClose,
	message = "OTP Verification Successful",
	highlightText = "Your 7 day Free Access activated",
	disableBackdropClose = false,
}) => {
	const portalRoot = ensurePortalRoot();
	const dialogRef = useRef<HTMLDivElement | null>(null);

	// Close on ESC
	useEffect(() => {
		if (!open) return;
		const handler = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", handler);
		return () => window.removeEventListener("keydown", handler);
	}, [open, onClose]);

	// Focus dialog when opens
	useEffect(() => {
		if (open && dialogRef.current) {
			dialogRef.current.focus();
		}
	}, [open]);

	if (!open || !portalRoot) return null;

	const content = (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center"
			aria-labelledby="otp-success-title"
			role="dialog"
			aria-modal="true"
		>
			{/* Backdrop */}
			<div
				className="absolute inset-0 bg-black/30 backdrop-blur-sm"
				onClick={() => !disableBackdropClose && onClose()}
			/>
			{/* Dialog */}
			<div
				ref={dialogRef}
				tabIndex={-1}
				className="relative w-full max-w-94 h-auto p-6 pt-4 flex flex-col items-center gap-6 bg-white border border-[#DDDDDD] shadow-[0.25rem_0.25rem_0.75rem_rgba(30,51,72,0.15)] rounded-lg animate-in fade-in zoom-in"
			>
				{/* Close button */}
				<button
					aria-label="Close dialog"
					onClick={onClose}
					className="absolute top-3 right-3 grid place-items-center w-6 h-6 rounded-full hover:bg-gray-100 transition-colors text-[#1E3348]"
				>
					<IoMdClose size={20} />
				</button>

				{/* Icon */}
				<div className="w-15 h-15 rounded-full bg-[#2E2A94] flex items-center justify-center">
					<svg
						width="30"
						height="30"
						viewBox="0 0 30 30"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<rect width="30" height="30" rx="15" fill="transparent" />
						<path
							d="M22.5 10L12.5 20L7.5 15"
							stroke="white"
							strokeWidth="2.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</div>

				{/* Heading */}
						<h2
							id="otp-success-title"
							className="text-2xl leading-7 font-medium tracking-[-0.16px] text-center text-[#2B2E8C] font-[Poppins]"
						>
					{message}
				</h2>

				{/* Gradient pill */}
				<div className="flex items-center justify-center gap-1 px-4 py-3 w-full rounded-full bg-[linear-gradient(90deg,#A9D5F3_0%,#FFFFFF_121.19%)]">
					{/* Star icon component */}
					<GiRoundStar
						aria-label="Star"
						className="text-[1.4rem] text-[#FFC954] drop-shadow-sm"
					/>
					<span className="text-base leading-5 tracking-[-0.03em] text-[#2E3238] font-[Poppins]">
						{highlightText}
					</span>
				</div>
			</div>
		</div>
	);

	return ReactDOM.createPortal(content, portalRoot);
};

export default OTPVerificationSuccessPopup;

// Basic usage:
// <OTPVerificationSuccessPopup open={isOtpVerified} onClose={() => setIsOtpVerified(false)} />
// Trigger `open` once your OTP verification API returns success.
// Props:
//  - open: boolean visibility
//  - onClose: function invoked when user closes (button / backdrop / ESC)
//  - message?: override main heading text
//  - highlightText?: override pill text (currently hard-coded inside pill span)
//  - disableBackdropClose?: disable closing when clicking backdrop
// Example pattern:
// Example usage with custom texts:
// const [verified, setVerified] = useState(false);
// verifyOtp().then(ok => ok && setVerified(true));
// <OTPVerificationSuccessPopup
//    open={verified}
//    onClose={() => setVerified(false)}
//    message="OTP Verification Successful"
//    highlightText="Your 7 day Free Access activated"
// />

