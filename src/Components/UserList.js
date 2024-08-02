import React from "react";

const UserList = ({ data }) => {
  return (
    <div className="w-[70%] m-auto">
      {data.map((obj) => (
        <div key={obj._id} className="mt-6 border-b">
          <div className="flex justify-between">
            <h1>Name: {obj.name}</h1>
            <p>Email: {obj.email}</p>
          </div>
          <p className="mt-2">BIO: {obj.bio===""?"NA":obj.bio}</p>
        </div>
      ))}
    </div>
  );
};
export default UserList;

