import React, { useState, useEffect } from "react";
import { fetchApi } from "../../utils/response";
import Title from "../menu/Title";
import DeleteUser from "./DeleteUser";
import EditUser from "./EditUser";
import UserItem from "./UserItem";

export default function ActionMenu({ props }) {
  const [users, setUsers] = useState([]);
  const [id, setId] = useState();
  const [hasClickedDelete, setHasClickedDelete] = useState(false);
  const [hasClickedEdit, setHasClickedEdit] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      const response = await fetchApi("/dashboard/users/all");

      if (!response.ok) return console.log(response.status);

      console.log(response.data.data);
      setUsers(response.data.data);
    }
    fetchUser();
  }, []);

  return (
    <section>
      <Title props={{ title: "Actions menu" }} />
      {hasClickedEdit ? (
        <EditUser user={users.find((user) => user.id === id)} />
      ) : (
        ""
      )}
      {hasClickedDelete ? (
        <DeleteUser user={users.find((user) => user.id === id)} />
      ) : (
        ""
      )}
      {!hasClickedDelete && !hasClickedEdit ? (
        <>
          {users.map((user) => (
            <div className="post-item p-3 border-2 border-orange-600 rounded-lg flex gap-x-3 mb-1 items-center justify-between">
              <UserItem key={user?.id} user={user}></UserItem>
              <div className="flex gap-x-1">
                <button
                  className="flex-shrink-0 border-transparent border-2 bg-gray-800 text-orange-500 hover:text-orange-700 text-sm p-2 rounded"
                  onClick={() => {
                    setId(user.id);
                    setHasClickedEdit(true);
                    setHasClickedDelete(false);
                  }}
                >
                  Edit
                </button>
                <button
                  className="flex-shrink-0 border-transparent border-2 bg-gray-800 text-orange-500 hover:text-orange-700 text-sm p-2 rounded"
                  onClick={() => {
                    setId(user.id);
                    setHasClickedDelete(true);
                    setHasClickedEdit(false);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </>
      ) : (
        ""
      )}
    </section>
  );
}
