"use client";

import { usePathname } from "next/navigation";
import HeaderMain from "./Header/HeaderMain";
import Footer from "./Footer/Footer";

// Add pathnames here where you want to hide header and footer
const PATHS_WITHOUT_LAYOUT = ["/budget"];

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();

  // Check if current pathname should hide header/footer
  const shouldHideLayout = PATHS_WITHOUT_LAYOUT.some((path) =>
    pathname.startsWith(path)
  );

  if (shouldHideLayout) {
    return <>{children}</>;
  }

  return (
    <>
      <HeaderMain />
      {children}
      <Footer />
    </>
  );
}
