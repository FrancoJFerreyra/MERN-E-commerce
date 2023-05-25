import React from "react";
import Header from "./Header";
import Unauthorized from "./Unauthorized";
import UserData from "./UserData";
import useFetch from "../customHooks/useFetch";

const Profile = () => {
  const { isAuthorized, loading, obtainedData } = useFetch("/content/profile");

  return (
    <>
      {isAuthorized ? (
        <>
          <Header />
          <div className="container-xxl profile__container">
            <>
              <div className="text-center">
                <h1>Account</h1>
              </div>
              <div>
                <div className="row justify-content-center pt-2">
                  <div className="col-md-6 d-flex flex-column align-items-center">
                    <UserData data={obtainedData[0]} />
                  </div>
                </div>
              </div>
            </>
          </div>
        </>
      ) : (
        <Unauthorized unauthorized={isAuthorized} />
      )}
    </>
  );
};

export default Profile;
