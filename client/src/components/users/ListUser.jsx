import React, { useState, useEffect } from "react";
import { fetchApi } from "../../utils/response";
import Title from "../menu/Title";
import UserItem from "./UserItem";

export default function ListUsers({ props }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUser() {
      const response = await fetchApi("/dashboard/users/all");

      if (!response.ok) return console.log(response.status);

      setUsers(response.data.data);
    }
    fetchUser();
  }, []);

  return (
    <section>
      <Title props={{ title: "List all users" }} />
      <ul>
        {users.map((user) => (
          <UserItem key={user?.id} user={user}></UserItem>
        ))}
      </ul>
    </section>
  );
}
