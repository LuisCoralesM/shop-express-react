import React, { useEffect, useState } from "react";
import { fetchApi } from "../utils/response";

const TechIssuePosts = () => {
  const [post, setPost] = useState();
  const [decryptedText, setDecryptedText] = useState();
  const [encryptedText, setEncryptedText] = useState();

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

    async function decrypt() {
      const a = await fetchApi("/api/kms/decrypt", "POST");

      setDecryptedText(a.data.decrypted);
      setEncryptedText(a.data.encrypted);
    }

    callTechIssue();
    decrypt();

    console.log(decryptedText);
  }, [decryptedText]);

  return (
    <div>
      <h1 className="text-xl">Tech Issue Repo</h1>
      <br />
      <p>{post}</p>
      <br />
      <h1 className="text-xl">Decrypted Text</h1>
      <p>{decryptedText}</p>
      <br />
      <h1 className="text-xl">Encrypted Text</h1>
      <div className="break-all">
        <p>{encryptedText}</p>
      </div>
    </div>
  );
};

export default TechIssuePosts;
