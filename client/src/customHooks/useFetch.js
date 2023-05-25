import { useState, useEffect } from "react";
import serverRequest from "../api/serverRequest";
import { useNavigate } from "react-router-dom";

const useFetch = (url) => {
  const navigate = useNavigate();

  const [obtainedData, setObtainedData] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await serverRequest.get(url);
        setObtainedData(data);
      } catch (error) {
        setIsAuthorized(false);
        setTimeout(() => {
          navigate("/");
        }, 5000);
      }
    })();
  }, []);

  return {
    obtainedData,
    isAuthorized,
    setIsAuthorized,
    setObtainedData,
  };
};

export default useFetch;
