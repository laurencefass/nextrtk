import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useScreenWidth = () => {
  // Initialize screenWidth with 0 or a reasonable default for SSR
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    // Define a function to update the screenWidth state
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Ensure code runs only on the client-side
    if (typeof window !== "undefined") {
      // Immediately update screenWidth based on the current window size
      handleResize();
      // Add event listener for subsequent resize events
      window.addEventListener("resize", handleResize);

      // Cleanup function to remove the event listener on component unmount
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []); // Empty dependency array means this runs once on mount

  return screenWidth;
};

// Custom hook for detecting route changes
const useRouteChange = (onRouteChange: () => void) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    onRouteChange();
  }, [pathname, searchParams]);
};

export default useRouteChange;
