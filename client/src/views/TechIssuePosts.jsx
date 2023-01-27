import React, { useEffect, useState } from "react";
import { fetchApi } from "../utils/response";

const TechIssuePosts = () => {
  const [post, setPost] = useState();
  const [decryptedText, setDecryptedText] = useState();

  useEffect(() => {
    async function callTechIssue() {
      const a = await fetch("https://localhost:7017/api/posts/search/1", {
        headers: {
          authorization:
            "Bearer " + JSON.parse(localStorage.getItem("techIssueToken")),
        },
      });
      const b = await a.json();
      setPost(JSON.stringify(b));
    }

    callTechIssue();
  }, []);

  useEffect(() => {
    async function decrypt() {
      const a = await fetchApi("/api/kms/decrypt", "POST");
      const b = await a.json();
      setDecryptedText(JSON.stringify(b));
    }

    decrypt();
  }, []);

  return (
    <div>
      <h1 className="text-xl">Tech Issue Repo</h1>
      <br />
      <p>{post}</p>

      <h2>Decrypted Text</h2>
      <p>{decryptedText}</p>
    </div>
  );
};

export default TechIssuePosts;
