import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

let container;
const likeBlog = jest.fn();
const deleteBlog = jest.fn();

beforeEach(() => {
  const blog = {
    title: "testTitle",
    author: "testAuthor",
    url: "testUrl",
    id: "65d743e047bb64aeeb3116ed",
    user: {
      name: "testUser",
      username: "testUsername",
    },
  };
  container = render(<Blog
    blog={blog}
    likeBlog={likeBlog}
    deleteBlog={deleteBlog}
  />).container;
});

test(
  "Title and author are rendered by default, but likes or URL are not",
  () => {
    const div = container.querySelector(".blog");
    expect(div).toHaveTextContent("testTitle");
    expect(div).toHaveTextContent("testAuthor");
    expect(div).not.toHaveTextContent("testUrl");
    expect(div).not.toHaveTextContent("likes");
  },
);

test(
  "URL and likes are shown once 'show'-button has been clicked",
  async () => {
    const user = userEvent.setup();
    const button = screen.getByText("view");
    const div = container.querySelector(".blog");
    await user.click(button);
    expect(div).toHaveTextContent("testUrl");
    expect(div).toHaveTextContent("like");
  },
);

test(
  "When like button is clicked twice, the event handler assigned to it is called twice",
  async () => {
    const user = userEvent.setup();
    const viewButton = screen.getByText("view");
    await user.click(viewButton);
    const likeButton = screen.getByText("like");
    await user.click(likeButton);
    await user.click(likeButton);
    expect(likeBlog.mock.calls.length).toBe(2);
  },
);
