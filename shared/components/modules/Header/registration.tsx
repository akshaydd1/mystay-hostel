import React from "react";

const RegistrationForm = () => {
  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-2">New Resident Registration</h2>
      <p className="text-gray-500 mb-4 text-sm">Please fill in the details below to add a new resident.</p>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input type="text" className="w-full border rounded px-3 py-2" placeholder="Enter resident's full name" />
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <input type="email" className="w-full border rounded px-3 py-2" placeholder="email@example.com" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Mobile Number</label>
            <input type="tel" className="w-full border rounded px-3 py-2" placeholder="+1 234 567 890" />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">City</label>
            <input type="text" className="w-full border rounded px-3 py-2" placeholder="e.g. New York" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">State / Province</label>
            <input type="text" className="w-full border rounded px-3 py-2" placeholder="e.g. NY" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Document Type</label>
          <select className="w-full border rounded px-3 py-2">
            <option>Select identification document</option>
            <option>Passport</option>
            <option>Driver's License</option>
            <option>National ID</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Document Number</label>
          <input type="text" className="w-full border rounded px-3 py-2" placeholder="Enter identification number" />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button type="button" className="px-4 py-2 rounded bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200">Cancel</button>
          <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700">Register Resident</button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
