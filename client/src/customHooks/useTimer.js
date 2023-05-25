import { useEffect, useState } from "react";

const UseTimer = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, "700");
    return () => clearTimeout(timer);
  }, []);
  return show;
};

export default UseTimer;
