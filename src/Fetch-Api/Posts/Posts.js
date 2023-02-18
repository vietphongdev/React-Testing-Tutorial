import React, { useEffect, useState } from "react";
import AddNewPostBtn from "./AddNewPostBtn";

const Posts = () => {
  // https://jsonplaceholder.typicode.com/posts

  const newPostdefaultValues = { title: "", body: "" };
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState(newPostdefaultValues);
  const [postFormIsVisible, setPostFormIsVisible] = useState(false);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    })
      .then((response) => response.json())
      .then((data) => {
        setPostFormIsVisible(false);
        setNewPost(newPostdefaultValues);
        setPosts([...posts, data]);
      });
  };

  const handleCancel = () => {
    setPostFormIsVisible(false);
    setNewPost(newPostdefaultValues);
  };

  return (
    <div>
      {!postFormIsVisible && (
        <AddNewPostBtn onClick={() => setPostFormIsVisible(true)} />
      )}

      {postFormIsVisible && (
        <form onSubmit={handleSubmit}>
          <h3>New Post</h3>
          <input
            type="text"
            placeholder="Title"
            value={newPost.title}
            onChange={(event) =>
              setNewPost({ ...newPost, title: event.target.value })
            }
          />

          <br />

          <textarea
            placeholder="Body"
            value={newPost.body}
            onChange={(event) =>
              setNewPost({ ...newPost, body: event.target.value })
            }
          ></textarea>

          <br />

          <button type="submit">Submit</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      )}

      <h1>Posts</h1>
      <ul>
        {posts.map((post, index) => (
          <li key={index}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
