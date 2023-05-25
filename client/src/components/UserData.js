import React from "react";

const UserData = ({ data = {} }) => {
  console.log(data);
  return (
    <div>
      <div className="card profile__card">
        <img src={data.avatar} className="card-img-top" alt="Avatar" />
        <div className="card-body">
          <ul className="p-0">
            <li>Name: {data.username}</li>
            <li>Lastname: {data.lastname}</li>
            <li>Age: {data.age}</li>
            <li>Email: {data.email}</li>
            <li>Direction: {data.direction}</li>
            <li>Phone: {data.phone}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserData;
