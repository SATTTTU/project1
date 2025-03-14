import { useState } from "react";

export const useToggleVisibility = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggle = () => {
    setIsVisible(prev => !prev);
  };

  return { isVisible, toggle };
};