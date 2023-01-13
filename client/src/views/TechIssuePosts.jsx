import React, { useEffect, useState } from "react";

const TechIssuePosts = () => {
  const [post, setPost] = useState();
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

  return (
    <div>
      <h1 className="text-xl">Tech Issue Repo</h1>
      <br />
      <p>{post}</p>
    </div>
  );
};

export default TechIssuePosts;
