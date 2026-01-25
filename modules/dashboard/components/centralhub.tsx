import React from "react";

const features = [
  {
    icon: (
      <span role="img" aria-label="bed" className="text-3xl">🛏️</span>
    ),
    title: "Real-time Bed Tracking",
    description:
      "Get a visual bird's-eye view of your entire inventory. Instant visibility into occupancy, reservations, and upcoming vacancies across all rooms.",
  },
  {
    icon: (
      <span role="img" aria-label="calendar" className="text-3xl">📅</span>
    ),
    title: "Automated Rent Collection",
    description:
      "Automate invoicing and send smart payment reminders. Residents can pay directly through the portal, reducing late payments by 40%.",
  },
  {
    icon: (
      <span role="img" aria-label="analytics" className="text-3xl">📈</span>
    ),
    title: "Advanced Expense Analytics",
    description:
      "Keep track of every dollar spent on maintenance, utilities, and staff. Generate professional P&L reports with a single click.",
  },
];

const CentralHub = () => {
  return (
    <section className="w-full py-16 bg-white flex flex-col items-center">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
        Everything You Need in One<br />Central Hub
      </h2>
      <p className="text-center text-gray-500 max-w-2xl mb-12">
        Say goodbye to spreadsheets and manual paperwork. Our tools are designed specifically for<br />
        the complex needs of modern hostel administrators.
      </p>
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl justify-center">
        {features.map((feature, idx) => (
          <div
            key={feature.title}
            className="flex-1 bg-gray-50 rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col items-start min-w-[260px] max-w-sm mx-auto"
          >
            <div className="mb-4 bg-blue-100 rounded-xl p-3 flex items-center justify-center">
              {feature.icon}
            </div>
            <h3 className="font-semibold text-lg mb-2 text-gray-900">
              {feature.title}
            </h3>
            <p className="text-gray-500 text-sm">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CentralHub;
