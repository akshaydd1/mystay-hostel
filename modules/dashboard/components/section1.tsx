import React from 'react';

export default function Section1() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between bg-[#F8F9FB] rounded-3xl p-8 md:p-16 gap-8 shadow-md">
      {/* Left Side: Text Content */}
      <div className="flex-1 max-w-xl">
        <div className="text-xs font-semibold text-blue-700 tracking-widest mb-4 uppercase">All-in-one management</div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
          Manage Your <br /> Hostel Effortlessly
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          The modern platform to track residents, automate payments, and scale your property business with a centralized dashboard.
        </p>
        <div className="flex gap-4 mb-8">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow transition">Get Started Free</button>
          <button className="bg-white border border-gray-300 hover:bg-gray-100 text-gray-900 font-semibold py-3 px-6 rounded-xl transition">Watch Demo</button>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <img src="/avatars/avatar1.png" alt="User 1" className="w-8 h-8 rounded-full border-2 border-white -ml-0" />
          <img src="/avatars/avatar2.png" alt="User 2" className="w-8 h-8 rounded-full border-2 border-white -ml-2" />
          <img src="/avatars/avatar3.png" alt="User 3" className="w-8 h-8 rounded-full border-2 border-white -ml-2" />
          <span className="text-sm text-gray-500 ml-2">Joined by 1,000+ hostel managers</span>
        </div>
      </div>
      {/* Right Side: Image Card */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative rounded-2xl overflow-hidden shadow-lg w-full max-w-md">
          <img
            src="/assets/bed.png"
            alt="Hostel Room"
            className="w-full h-72 object-cover"
          />
          <div className="absolute bottom-4 left-4 right-4 bg-white/90 rounded-xl px-6 py-4 flex items-center justify-between shadow">
            <div>
              <div className="text-xs text-blue-600 font-bold uppercase">Live Stats</div>
              <div className="font-semibold text-gray-900">Central Heights Hostel</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500 inline-block"></span>
              <span className="text-sm font-medium text-green-600">98% Occupied</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
