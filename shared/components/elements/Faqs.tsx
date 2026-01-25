"use client";

import { useState } from "react";
import { LuPlus } from "react-icons/lu";
import { LuMinus } from "react-icons/lu";

interface FaqItem {
  question: string;
  answer: string | React.ReactNode;
}

interface FaqsProps {
  title?: string;
  faqs: FaqItem[];
}

const Faqs: React.FC<FaqsProps> = ({ title = "FAQs", faqs }) => {
  const [activeAccordion, setActiveAccordion] = useState<number>(-1);

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? -1 : index);
  };

  return (
    <div className="w-full">
      <h2 className="text-lg font-light mb-4">{title}</h2>
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex items-center justify-between p-4 text-left transition-colors"
            >
              <h3 className="text-sm font-light pr-4">{faq.question}</h3>
              <span 
                className="flex-shrink-0 transform transition-transform duration-300 text-[var(--color-mo-primary)]"
                style={{ transform: activeAccordion === index ? 'rotate(180deg)' : 'rotate(0deg)' }}
              >
                {activeAccordion === index ? <LuMinus size={20} /> : <LuPlus size={20} />}
              </span>
            </button>
            <div 
              className={`overflow-hidden transition-all duration-300 ${
                activeAccordion === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-4 pb-4 text-xs text-gray-700">
                {typeof faq.answer === 'string' ? <p>{faq.answer}</p> : faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faqs;
