import React, { useState } from "react";
import { fetchApi } from "../../utils/response";
import Title from "../menu/Title";

export default function EditUser({ user }) {
  const [isUpdated, setIsUpdated] = useState(false);
  const [newRole, setNewRole] = useState();

  async function updateUser(e) {
    e.preventDefault();

    console.log(newRole);

    const response = await fetchApi("/dashboard/users/" + user.id, "PUT", {
      role: newRole,
    });

    console.log(response.data);

    if (!response.ok) return console.log(response.data.status);

    setIsUpdated(true);
  }

  return (
    <>
      <Title props={{ title: "Change role" }} />

      {!isUpdated ? (
        <form className="w-full" onSubmit={updateUser}>
          <select
            className="w-full bg-gray-700 border-transparent rounded"
            defaultValue={user ? user.role : ""}
            onChange={(e) => setNewRole(e.target.value)}
          >
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
          <br />
          <button
            className="my-3 flex-shrink-0 border-transparent border-2 bg-gray-800 text-orange-500 hover:text-orange-700 text-sm p-2 rounded"
            type="submit"
          >
            Update
          </button>
        </form>
      ) : (
        <p className="mb-3">User updated!</p>
      )}
    </>
  );
}
