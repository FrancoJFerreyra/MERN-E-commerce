export const handleError = (error, setIsAuthorized) => {
  console.log(error);
  setIsAuthorized(false);
};
