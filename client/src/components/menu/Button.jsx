import React from "react";
import { useNavigate } from "react-router-dom";

export default function Button({ props }) {
  let navigate = useNavigate();
  return (
    <button
      className="rounded-lg px-4 py-2 border-2 border-orange-500 text-white hover:bg-orange-600 hover:border-orange-600 hover:text-gray-900 duration-300"
      onClick={() => navigate(props.link)}
    >
      {props.text}
    </button>
  );
}
