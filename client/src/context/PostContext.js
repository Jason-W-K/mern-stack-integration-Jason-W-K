import { createContext, useContext } from 'react';

export const PostContext = createContext();

export const usePosts = () => useContext(PostContext);