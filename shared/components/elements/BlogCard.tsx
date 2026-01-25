"use client";

import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";

interface BlogCardProps {
  id: string;
  title: string;
  summary_image_url: string;
  category: string;
  date: string;
  title_filter?: string;
}

const BlogCard: FC<BlogCardProps> = ({
  id,
  title,
  summary_image_url: summaryImageUrl = "",
  category,
  date,
  title_filter: titleFilter,
}) => {
  const blogUrl = `blogs/${titleFilter}`;
  const [imageError, setImageError] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const handleCardClick = (e: React.MouseEvent) => {
    setIsNavigating(true);
  };

  // Format date to readable format
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const handleShare = (platform: string) => {
    const shareUrl = `${window.location.origin}${blogUrl}`;
    const shareText = title;

    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            shareUrl
          )}`,
          "_blank"
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(
            shareUrl
          )}&text=${encodeURIComponent(shareText)}`,
          "_blank"
        );
        break;
      case "whatsapp":
        window.open(
          `https://wa.me/?text=${encodeURIComponent(
            shareText + " " + shareUrl
          )}`,
          "_blank"
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            shareUrl
          )}`,
          "_blank"
        );
        break;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 relative">
      {/* Loading Overlay */}
      {isNavigating && (
        <div className="absolute inset-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm z-10 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Loading...
            </span>
          </div>
        </div>
      )}

      {/* Image Section */}
      <Link
        href={blogUrl}
        onClick={handleCardClick}
        className="block relative w-full aspect-video overflow-hidden bg-white dark:bg-gray-700"
      >
        {summaryImageUrl ? (
          <Image
            src={summaryImageUrl}
            alt={title}
            priority={true}
            width={400}
            height={230}
            onError={() => setImageError(true)}
            className="object-cover hover:scale-105 transition-transform duration-300"
            loading="eager"
          />
        ) : (
          <div className="w-full onClick={handleCardClick} h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </Link>

      {/* Content Section */}
      <div className="p-4">
        {/* Title and Category in same row */}
        <div className="mb-3">
          <div className="flex items-start justify-between gap-2 mb-2 h-8">
            <Link href={blogUrl} className="flex-1">
              <h3
                className="text-gray-900 dark:text-white line-clamp-2"
                style={{
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "20px",
                }}
              >
                {title}
              </h3>
            </Link>
            <span
              className="inline-block px-2 py-1 text-[11px] font-semibold rounded-lg whitespace-nowrap shrink-0"
              style={{ backgroundColor: "#f5f6fa", color: "#2E2A94" }}
            >
              {category}
            </span>
          </div>
        </div>

        {/* Footer Section */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
          {/* Date */}
          <span className="text-[12px] text-gray-500 dark:text-gray-400">
            {formatDate(date)}
          </span>

          {/* Social Share Icons */}
          <div className="flex items-center gap-1">
            {/* Facebook */}
            <button
              onClick={() => handleShare("facebook")}
              className="w-7 h-7 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
              aria-label="Share on Facebook"
            >
              <Image
                src="/assets/meta.jpg"
                alt="Facebook"
                width={24}
                height={24}
                className="rounded-full"
              />
            </button>

            {/* Twitter/X */}
            <button
              onClick={() => handleShare("twitter")}
              className="w-7 h-7 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
              aria-label="Share on Twitter"
            >
              <Image
                src="/assets/twitter.jpg"
                alt="Twitter"
                width={24}
                height={24}
                className="rounded-full"
              />
            </button>

            {/* WhatsApp */}
            <button
              onClick={() => handleShare("whatsapp")}
              className="w-7 h-7 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
              aria-label="Share on WhatsApp"
            >
              <Image
                src="/assets/whatsapp.png"
                alt="WhatsApp"
                width={24}
                height={24}
                className="rounded-full"
              />
            </button>

            {/* LinkedIn */}
            <button
              onClick={() => handleShare("linkedin")}
              className="w-7 h-7 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
              aria-label="Share on LinkedIn"
            >
              <Image
                src="/assets/linkedin.jpg"
                alt="LinkedIn"
                width={24}
                height={24}
                className="rounded-full"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
