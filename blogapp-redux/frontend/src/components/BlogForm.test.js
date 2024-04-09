import React from "react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import BlogForm from "./BlogForm";

const createBlog = jest.fn();

beforeEach(async () => {
  render(<BlogForm createBlog={createBlog} />);
});

test(
  "Blog form calls the event handler passed to it",
  async () => {
    const user = userEvent.setup();
    const inputs = screen.getAllByRole("textbox");
    await user.type(inputs[0], "testTitle");
    await user.type(inputs[1], "testAuthor");
    await user.type(inputs[2], "testUrl");
    const createButton = screen.getByText("create");
    await user.click(createButton);
    expect(createBlog.mock.calls[0][0].title).toBe("testTitle");
    expect(createBlog.mock.calls[0][0].author).toBe("testAuthor");
    expect(createBlog.mock.calls[0][0].url).toBe("testUrl");
  },
);
