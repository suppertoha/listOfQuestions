import { useEffect, useState } from "react";

interface UseCheckMobileOptions {
  breakpoint?: number;
  onDesktopTransition?: () => void;
}

export const useCheckMobile = ({
  breakpoint = 992,
  onDesktopTransition,
}: UseCheckMobileOptions = {}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= breakpoint;
      setIsMobile(mobile);
      if (!mobile) onDesktopTransition?.();
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [breakpoint, onDesktopTransition]);

  return isMobile;
};
