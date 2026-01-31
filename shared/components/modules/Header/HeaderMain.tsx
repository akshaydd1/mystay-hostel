"use client";
import React from "react";
import Modal from "./Modal";
import RegistrationForm from "./registration";
import LoginForm from "./login";
import Link from "next/link";

const navLinks = [
  { label: "Booking", href: "/booking" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function HeaderMain() {
  const [open, setOpen] = React.useState(false);
  const [loginOpen, setLoginOpen] = React.useState(false);
  return (
    <>
      <header className="w-full flex items-center justify-between px-6 py-3 bg-white shadow-sm">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-blue-500">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="12" height="12" rx="2" fill="#fff"/>
              <path d="M9 3L15 9L9 15L3 9L9 3Z" fill="#2196F3"/>
            </svg>
          </span>
          <Link href="/" className="font-bold text-lg tracking-tight">
             HostelManage
          </Link>
        </div>
        <nav className="flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="px-4 py-2 rounded-md bg-blue-500 text-white font-semibold text-sm shadow hover:bg-blue-600 transition-colors"
            onClick={() => setOpen(true)}
          >
            Register
          </button>
          <button
            type="button"
            className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 font-semibold text-sm hover:bg-gray-200 transition-colors"
            onClick={() => setLoginOpen(true)}
          >
            Login
          </button>
        </div>
      </header>
      <Modal open={open} onClose={() => setOpen(false)}>
        <RegistrationForm />
      </Modal>
      <Modal open={loginOpen} onClose={() => setLoginOpen(false)}>
        <LoginForm />
      </Modal>
    </>
  );
}
