import { useCallback, useEffect, useState } from "react";

export function useScroll() {
  const [show, setShow] = useState(true);
  const [scroll, setScroll] = useState(0);

  const handleScroll = useCallback(() => {
    const position = document.documentElement.scrollTop;

    // console.log(position);
    // console.log(scroll);

    if (position > scroll) {
      setShow(false);
    } else if (position < scroll) {
      setShow(true);
    }

    setScroll(position <= 0 ? 0 : position);
  }, [setShow, scroll, setScroll]);

  useEffect(() => {
    document.addEventListener("scroll", handleScroll, { passive: true });
    return () => document.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return { show, scroll };
}
