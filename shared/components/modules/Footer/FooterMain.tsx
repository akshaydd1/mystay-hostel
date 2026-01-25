import React from "react";

const productLinks = [
  { label: "Bed Tracking", href: "#bed-tracking" },
  { label: "Rent Collection", href: "#rent-collection" },
  { label: "Reports", href: "#reports" },
  { label: "Pricing", href: "#pricing" },
];
const companyLinks = [
  { label: "About Us", href: "#about" },
  { label: "Careers", href: "#careers" },
  { label: "Success Stories", href: "#success" },
  { label: "Blog", href: "#blog" },
];
const legalLinks = [
  { label: "Privacy Policy", href: "#privacy" },
  { label: "Terms of Service", href: "#terms" },
  { label: "Security", href: "#security" },
  { label: "GDPR", href: "#gdpr" },
];

export default function FooterMain() {
  return (
    <footer className="w-full bg-gray-50 border-t border-gray-100 mt-12">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row md:justify-between gap-10">
        <div className="flex-1 min-w-[220px]">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-blue-500">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="12" height="12" rx="2" fill="#fff"/>
                <path d="M9 3L15 9L9 15L3 9L9 3Z" fill="#2196F3"/>
              </svg>
            </span>
            <span className="font-bold text-lg tracking-tight">HostelManage</span>
          </div>
          <p className="text-gray-600 text-sm mb-4">Leading the transformation of hostel and shared accommodation management through smart automation.</p>
          <div className="flex gap-3 text-gray-500">
            <a href="#" aria-label="Website" className="hover:text-blue-500 transition-colors">
              <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M10 18.333A8.333 8.333 0 1 0 10 1.667a8.333 8.333 0 0 0 0 16.666Zm0 0c2.301 0 4.167-3.731 4.167-8.333S12.301 1.667 10 1.667m0 16.666c-2.301 0-4.167-3.731-4.167-8.333S7.699 1.667 10 1.667" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
            <a href="#" aria-label="Email" className="hover:text-blue-500 transition-colors">
              <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M2.5 5.833A2.5 2.5 0 0 1 5 3.333h10a2.5 2.5 0 0 1 2.5 2.5v8.334a2.5 2.5 0 0 1-2.5 2.5H5a2.5 2.5 0 0 1-2.5-2.5V5.833Zm0 0L10 11.667l7.5-5.834" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
            <a href="#" aria-label="Share" className="hover:text-blue-500 transition-colors">
              <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M15.833 6.667a2.5 2.5 0 1 0-2.5-2.5m2.5 2.5L6.667 13.333m6.666-8.333a2.5 2.5 0 1 1-2.5 2.5m2.5-2.5a2.5 2.5 0 1 1-2.5 2.5m0 0L4.167 15.833m0 0a2.5 2.5 0 1 0 2.5-2.5m-2.5 2.5a2.5 2.5 0 1 1 2.5-2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>
        </div>
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2 text-sm">PRODUCT</h4>
            <ul className="space-y-1">
              {productLinks.map(link => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-600 text-sm hover:text-blue-600 transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2 text-sm">COMPANY</h4>
            <ul className="space-y-1">
              {companyLinks.map(link => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-600 text-sm hover:text-blue-600 transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-2 text-sm">LEGAL</h4>
            <ul className="space-y-1">
              {legalLinks.map(link => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-600 text-sm hover:text-blue-600 transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 pb-6 flex flex-col md:flex-row md:justify-between items-center text-xs text-gray-500 gap-2">
        <span>© 2024 HostelManage Inc. All rights reserved.</span>
        <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
          <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M8 2.667A5.333 5.333 0 1 0 8 13.333 5.333 5.333 0 0 0 8 2.667Zm0 0V8l2.667 2.667" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Toggle Theme
        </button>
      </div>
    </footer>
  );
}
