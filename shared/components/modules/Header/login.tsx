import React from "react";

export default function LoginForm() {
  return (
    <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2">
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
          <svg width="28" height="28" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="12" height="12" rx="2" fill="#fff"/>
            <path d="M9 3L15 9L9 15L3 9L9 3Z" fill="#2196F3"/>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-center">Welcome Back, Admin</h2>
        <p className="text-gray-500 text-center text-sm">Manage your residents and bookings seamlessly.</p>
      </div>
      <form className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Email Address</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16v16H4z" stroke="none"/><path d="M22 6l-10 7L2 6"/></svg>
            </span>
            <input type="email" placeholder="name@hostel.com" className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200" />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-semibold">Password</label>
            <a href="#" className="text-xs text-blue-500 hover:underline">Forgot Password?</a>
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            </span>
            <input type="password" placeholder="••••••••" className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" id="remember" className="accent-blue-500" />
          <label htmlFor="remember" className="text-sm text-gray-600">Remember this device</label>
        </div>
        <button type="submit" className="w-full py-2 rounded-md bg-blue-500 text-white font-semibold text-base shadow hover:bg-blue-600 transition-colors">Login to Dashboard <span className="ml-2">→</span></button>
      </form>
      <div className="text-center text-sm text-gray-500">
        New administrator? <a href="#" className="text-blue-500 font-semibold hover:underline">Create an account</a>
      </div>
      <div className="flex items-center gap-2 my-2">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-xs text-gray-400">OR CONTINUE WITH</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>
      <div className="flex justify-center gap-3">
        <button className="w-10 h-10 rounded-md border flex items-center justify-center bg-gray-50" disabled>
          <svg width="20" height="20" fill="none" viewBox="0 0 48 48"><rect width="48" height="48" rx="24" fill="#F5F5F5"/><path d="M24 9V39" stroke="#BDBDBD" strokeWidth="2" strokeLinecap="round"/><path d="M9 24H39" stroke="#BDBDBD" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
        <button className="w-10 h-10 rounded-md border flex items-center justify-center bg-gray-50">
          <svg width="20" height="20" fill="none" viewBox="0 0 48 48"><rect width="48" height="48" rx="24" fill="#F5F5F5"/><path d="M33.6 24.2c0-.6-.1-1.2-.2-1.8H24v3.4h5.4c-.2 1.2-.9 2.2-1.9 2.9v2.4h3c1.8-1.7 2.8-4.2 2.8-6.9z" fill="#4285F4"/><path d="M24 34c2.4 0 4.4-.8 5.9-2.1l-3-2.4c-.8.5-1.8.8-2.9.8-2.2 0-4-1.5-4.7-3.5h-3v2.2C18.1 32.3 20.8 34 24 34z" fill="#34A853"/><path d="M19.3 26.8c-.2-.5-.3-1-.3-1.6s.1-1.1.3-1.6v-2.2h-3c-.6 1.2-.9 2.5-.9 3.8s.3 2.6.9 3.8l3-2.2z" fill="#FBBC05"/><path d="M24 18.8c1.3 0 2.5.4 3.4 1.1l2.6-2.6C28.4 15.8 26.4 15 24 15c-3.2 0-5.9 1.7-7.4 4.2l3 2.2c.7-2 2.5-3.5 4.7-3.5z" fill="#EA4335"/></svg>
        </button>
      </div>
    </div>
  );
}
