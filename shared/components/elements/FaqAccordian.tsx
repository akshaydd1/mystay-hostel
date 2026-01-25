"use client";

import { useState } from "react";
import { LuChevronUp, LuChevronDown } from "react-icons/lu";

interface FaqItem {
  question: string;
  answer: string | React.ReactNode;
}

interface FaqsProps {
  title?: string;
  faqs: FaqItem[];
}

const FaqAccordian: React.FC<FaqsProps> = ({ title = "FAQs", faqs }) => {
  const [activeAccordion, setActiveAccordion] = useState<number>(0);

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? -1 : index);
  };

  return (
    <section className="w-full" aria-labelledby={title ? "faq-heading" : undefined}>
      {/* {title && (
        <h2 id="faq-heading" className="text-lg font-light mb-4">
          {title}
        </h2>
      )} */}
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isExpanded = activeAccordion === index;
          const contentId = `faq-content-${index}`;
          const buttonId = `faq-button-${index}`;

          return (
            <article
              key={index}
              className="bg-mo-white rounded-sm overflow-hidden shadow-[4px_4px_24px_0px_rgba(31,72,114,0.08)]"
            >
              <h3>
                <button
                  id={buttonId}
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={isExpanded}
                  aria-controls={contentId}
                  aria-label={`${faq.question}${isExpanded ? ', expanded' : ', collapsed'}`}
                  className="w-full flex items-center justify-between p-6 text-left transition-colors hover:bg-mo-bg-light focus:outline-none"
                >
                  <span className="text-[16px] font-semibold text-mo-text-black pr-4">{faq.question}</span>
                  <span
                    className="shrink-0 transition-transform duration-300 text-mo-black"
                    aria-hidden="true"
                  >
                    {isExpanded ? (
                      <LuChevronUp size={24} />
                    ) : (
                      <LuChevronDown size={24} />
                    )}
                  </span>
                </button>
              </h3>
              <div
                id={contentId}
                role="region"
                aria-labelledby={buttonId}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isExpanded
                    ? "max-h-[500px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6 text-[16px] font-normal text-mo-text-muted space-y-2">
                  {typeof faq.answer === "string" ? (
                    <p>{faq.answer}</p>
                  ) : (
                    faq.answer
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default FaqAccordian;
