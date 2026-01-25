"use client";

import React from "react";
import { LuTrendingUp } from "react-icons/lu";

import { Collapsible } from "@/shared/components/elements/Collapsible";
import { cn } from "@/shared/utils/cn";

export type MarketExpertSentiment = "positive" | "neutral" | "negative";

export interface MarketExpertItem {
  /** Expert name */
  name: string;
  /** Expert designation or role */
  role?: string;
  /** Organisation or firm */
  firm?: string;
  /** Short commentary/quote from the expert */
  comment: string;
  /** Optional rating (e.g. 4.5) */
  rating?: number;
  /** Sentiment tag used for colour accenting */
  sentiment?: MarketExpertSentiment;
}

export interface MarketExpertProps {
  /** Section title shown in the header */
  title?: string;
  /** Optional description below the title */
  description?: string;
  /** List of expert opinions to show */
  experts: MarketExpertItem[];
  /** Whether the section is initially collapsed on load */
  defaultCollapsed?: boolean;
  /** Additional className for the outer container */
  className?: string;
}

const sentimentBadgeClasses: Record<MarketExpertSentiment, string> = {
  positive: "bg-mo-green-softer text-mo-green-primary",
  neutral: "bg-mo-bg-neutral text-mo-text-dark",
  negative: "bg-mo-red-soft text-mo-red-primary",
};

export const MarketExpert: React.FC<MarketExpertProps> = ({
  title = "What market experts are saying?",
  description,
  experts,
  defaultCollapsed = true,
  className,
}) => {
  if (!experts || experts.length === 0) {
    return null;
  }

  return (
    <Collapsible
      title={title}
      defaultCollapsed={defaultCollapsed}
      icon={<LuTrendingUp />}
      backgroundColor="bg-mo-bg-light"
      titleColor="text-mo-text-dark"
      chevronColor="text-mo-blue-main"
      className={cn("w-full", className)}
      contentClassName="px-4 py-4 md:px-6 md:py-5"
    >
      <section aria-label={title} className="space-y-4">
        {description && (
          <p className="text-sm md:text-base text-mo-text-muted">
            {description}
          </p>
        )}

        <div className="grid gap-4 md:gap-6 md:grid-cols-2">
          {experts.map((expert) => {
            const sentiment = expert.sentiment ?? "neutral";
            const badgeClass = sentimentBadgeClasses[sentiment];

            return (
              <article
                key={`${expert.name}-${expert.firm ?? expert.role ?? expert.comment}`}
                className="rounded-xl border border-mo-gray-border bg-mo-white p-4 shadow-sm flex flex-col gap-3"
              >
                <header className="flex items-start justify-between gap-3">
                  <div className="flex flex-col gap-0.5">
                    <h3 className="text-sm md:text-base font-semibold text-mo-text-dark">
                      {expert.name}
                    </h3>
                    {(expert.role || expert.firm) && (
                      <p className="text-xs md:text-sm text-mo-text-muted">
                        {[expert.role, expert.firm]
                          .filter(Boolean)
                          .join(" • ")}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {expert.rating != null && (
                      <span className="inline-flex items-center rounded-full bg-mo-bg-soft px-2 py-0.5 text-xs font-medium text-mo-text-dark">
                        {expert.rating.toFixed(1)} / 5
                      </span>
                    )}

                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize",
                        badgeClass
                      )}
                    >
                      {sentiment}
                    </span>
                  </div>
                </header>

                <p className="text-xs md:text-sm leading-relaxed text-mo-text-dark">
                  {expert.comment}
                </p>
              </article>
            );
          })}
        </div>
      </section>
    </Collapsible>
  );
};

export default MarketExpert;
