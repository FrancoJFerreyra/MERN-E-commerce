import React from "react";
import Spinner from "./Spinner";

const LoadedContent = ({ loading, children }) => {
  return <>{loading ? <Spinner /> : <>{children}</>}</>;
};

export default LoadedContent;
