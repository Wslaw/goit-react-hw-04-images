import React from 'react';

const Button = ({ onLoadMore }) => (
  <button className="Button" onClick={onLoadMore}>
    Load more
  </button>
);

export default Button;
