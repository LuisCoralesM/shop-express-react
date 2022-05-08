import React from "react";

export default function UserItem({ user }) {
  return user !== undefined ? (
    <li className="list-none">
      {user.email +
        " - " +
        user.role +
        " - " +
        user.created_at +
        " - " +
        (user.deleted_at != null ? "deleted" : "active")}
    </li>
  ) : (
    <li className="list-none">User not found</li>
  );
}
