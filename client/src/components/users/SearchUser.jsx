import React, { useState } from "react";
import { fetchApi } from "../../utils/response";
import Title from "../menu/Title";
import UserItem from "./UserItem";

export default function SearchUser({ props }) {
  const [user, setUser] = useState();
  const [id, setId] = useState(0);
  const [hasSearched, setSearch] = useState(false);

  async function fetchUser(e) {
    e.preventDefault();
    setSearch(true);

    const response = await fetchApi("/dashboard/users/" + id);
    if (!response.ok) return console.log(response.data.status);

    setUser(response.data.data ?? undefined);
  }

  return (
    <section>
      <Title props={{ title: "Searching user by id" }} />
      <form
        className="w-full max-w-sm mb-3 flex align-middle"
        onSubmit={fetchUser}
      >
        <input
          className="bg-gray-700 border-transparent rounded"
          type="text"
          placeholder="get by id"
          name="id"
          id="search-input"
          onChange={(e) => setId(Number(e.target.value) ? e.target.value : 0)}
        />
        <button
          className="flex-shrink-0 ml-1 border-transparent border-2 bg-gray-800 text-orange-500 hover:text-orange-700 text-sm p-2 rounded"
          type="submit"
        >
          Search
        </button>
      </form>
      {hasSearched === true ? (
        <UserItem key={user?.id} user={user}></UserItem>
      ) : (
        ""
      )}
    </section>
  );
}
