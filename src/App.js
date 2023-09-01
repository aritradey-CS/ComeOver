import React from 'react';
import './BlogPopup.css'; // Create this CSS file for styling the popup

function BlogPopup({ blog, onClose }) {
  return (
    <div className="blog-popup-overlay">
      <div className="blog-popup-content">
        <h2>{blog.title}</h2>
        <p>{blog.content}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default BlogPopup;
