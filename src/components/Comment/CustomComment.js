// src/components/CustomComment.js
import React from 'react';
import './CustomComment.css';

const CustomComment = ({ author, avatar, content, actions, children }) => (
  <div className="custom-comment">
    <div className="comment-header">
      <div className="avatar">{avatar}</div>
      <div className="author">{author}</div>
    </div>
    <div className="comment-content">{content}</div>
    <div className="comment-actions">
      {actions && actions.map((action, index) => <span key={index} className="action-item">{action}</span>)}
    </div>
    {children}
  </div>
);

export default CustomComment;
