// context.js
import React from 'react';

export const PostContext = React.createContext({
  posts: [],
  addPost: () => {},
});
