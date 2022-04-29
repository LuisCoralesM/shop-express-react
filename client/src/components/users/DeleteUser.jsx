import React, { useState, useEffect } from "react";
import { fetchApi } from "../../utils/response";
import Title from "../menu/Title";
import UserItem from "./UserItem";

export default function DeleteUser({ props }) {
  const [user, setUser] = useState();
  const [isDeleted, setDeleted] = useState(false);

  useEffect(() => {
    // GET OWN USER DATA TO THEN DELETE
    async function fetchOwnUser() {
      const response = await fetchApi("/dashboard/users/", "GET");

      if (!response.ok) return console.log(response.status);

      response.data.data === null
        ? setUser(undefined)
        : setUser(response.data.data);

      if (response.data.deleted_at != null) setDeleted(true);
    }
    fetchOwnUser();
  }, []);

  async function deleteUser(e) {
    e.preventDefault();
    const response = await fetchApi("/dashboard/users/", "DELETE");

    if (!response.ok) return console.log(response.data.status);

    setDeleted(true);
    localStorage.clear();
  }

  return (
    <section>
      <Title props={{ title: "Delete own user" }} />
      {isDeleted ? (
        <p>User deleted</p>
      ) : (
        <>
          <p>Are you sure you want to delete your user?</p>
          <UserItem key={user?.id} user={user}></UserItem>
          <form onSubmit={(e) => deleteUser(e)}>
            <button className="mt-3 flex-shrink-0 border-transparent border-2 bg-gray-800 text-orange-500 hover:text-orange-700 text-sm p-2 rounded">
              Confirm delete
            </button>
          </form>
        </>
      )}
    </section>
  );
}
