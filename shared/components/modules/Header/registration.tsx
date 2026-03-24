"use client";

import React, { useState } from "react";

interface RegistrationFormData {
  name: string;
  email: string;
  mobile_no: string;
  city: string;
  state: string;
  docType: string;
  docNumber: string;
}

const initialFormData: RegistrationFormData = {
  name: "",
  email: "",
  mobile_no: "",
  city: "",
  state: "",
  docType: "",
  docNumber: "",
};

const RegistrationForm = () => {
  const [formData, setFormData] = useState<RegistrationFormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
    setSuccess(null);
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Basic validation
    const { name, email, mobile_no, city, state, docType, docNumber } = formData;
    if (!name || !email || !mobile_no || !city || !state || !docType || !docNumber) {
      setError("Please fill in all required fields.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/insertuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          mobile_no,
          city,
          state,
          docType,
          docNumber,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Failed to register user.");
      }

      setSuccess("Resident registered successfully!");
      setFormData(initialFormData);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-2">New Resident Registration</h2>
      <p className="text-gray-500 mb-4 text-sm">
        Please fill in the details below to add a new resident.
      </p>

      {error && (
        <div className="mb-4 p-3 rounded bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 p-3 rounded bg-green-50 border border-green-200 text-green-700 text-sm">
          {success}
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter resident's full name"
            required
          />
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="email@example.com"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Mobile Number</label>
            <input
              type="tel"
              name="mobile_no"
              value={formData.mobile_no}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="e.g. 8892312121"
              required
            />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="e.g. Mumbai"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">State / Province</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="e.g. Maharashtra"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Document Type</label>
          <select
            name="docType"
            value={formData.docType}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Select identification document</option>
            <option value="Aadhar">Aadhar</option>
            <option value="Passport">Passport</option>
            <option value="Driving License">Driving License</option>
            <option value="PAN Card">PAN Card</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Document Number</label>
          <input
            type="text"
            name="docNumber"
            value={formData.docNumber}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter identification number"
            required
          />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 rounded bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register Resident"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
