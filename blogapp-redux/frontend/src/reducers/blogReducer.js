import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",
  initialState: [],
  reducers: {
    concatBlog: (state, action) => state.concat(action.payload),
    setBlogs: (state, action) => action.payload,
    addOneLikeToBlog: (state, action) => {
      const updatedBlogs = state.map(
        (blog) => (
          blog.id === action.payload.id
            ? { ...blog, likes: blog.likes + 1 }
            : blog),
      );
      return updatedBlogs.sort((a, b) => b.likes - a.likes);
    },
    deleteOneBlog: (state, action) => state.filter((blog) => blog.id !== action.payload.id),
  },
});

export const {
  concatBlog, setBlogs, addOneLikeToBlog, deleteOneBlog,
} = blogSlice.actions;

export default blogSlice.reducer;
