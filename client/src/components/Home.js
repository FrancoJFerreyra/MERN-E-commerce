import Header from "./Header";
import HomeContent from "./HomeContent";
import Unauthorized from "./Unauthorized";
import useFetch from "../customHooks/useFetch";

//TENGO QUE CORREGIR ERROES AL EXPIRAR EL USUARIO YA QUE AGREGUE EL USEFETCH

const Home = () => {
  const { obtainedData, isAuthorized, setIsAuthorized } = useFetch("/content/products");
  const { admin, products } = obtainedData;

  return (
    <>
      {isAuthorized ? (
        <>
          <Header admin={admin} />
          <HomeContent listOfProducts={products} admin={admin} setExpired={setIsAuthorized} />
        </>
      ) : (
        <Unauthorized />
      )}
    </>
  );
};

export default Home;
