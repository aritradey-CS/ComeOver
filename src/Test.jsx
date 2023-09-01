import React, { useState } from "react";
import "./BlogPostForm.css";
import BlogPost from "../components/BlogPost"; // Assuming you have a BlogPost component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons"; // Import the close icon

function BlogList() {
  const [posts, setPosts] = useState([]);

  const handleNewPostSubmit = (newPost) => {
    setPosts([...posts, newPost]);
  };

  return (
    <div className="blog-list">
      <div className="blog-section">
        {posts.map((post, index) => (
          <BlogPost key={index} post={post} />
        ))}
      </div>
      <div className="blog-form-section">
        <BlogPostForm onSubmit={handleNewPostSubmit} />
      </div>
    </div>
  );
}

function BlogPostForm({ onSubmit, onClose }) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    const post = {
      name,
      contact,
      category,
      content,
    };

    onSubmit(post);

    // Generate content for the Word document
    const wordContent = `
      Name: ${name}
      Contact Details: ${contact}
      Category: ${category}
      Post Content: ${content}
    `;

    // Create a Blob with the Word content
    const blob = new Blob([wordContent], { type: "application/msword" });

    // Create a URL for the Blob
    const blobUrl = URL.createObjectURL(blob);

    // Create a link for downloading the Word document
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = "blog_post.docx";
    link.click();

    // Clean up
    URL.revokeObjectURL(blobUrl);
  };

  return (
    <div className="blog-post-form">
      <h2>Create a New Post</h2>
      {/* Close button */}
      <button className="close-button" onClick={onClose}>
        <FontAwesomeIcon icon={faTimes} /> Close
      </button>
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Contact Details:</label>
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Post Category:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Post Content:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button className="submit-button" onClick={handleSubmit}>
        Submit and Download as Word
      </button>
    </div>
  );
}

export default BlogList;
