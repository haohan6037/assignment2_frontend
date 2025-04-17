import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PostList from '../components/PostList';
import BlogsDataService from '../services/blogs';
import {MemoryRouter} from "react-router-dom";

jest.mock('../services/blogs', () => ({
  __esModule: true,
  default: {
    postList: jest.fn(),
    deletePost: jest.fn(),
  },
}));

const mockPosts = [
  {
    id: 1,
    title: 'Test Post 1',
    category: 'General',
    content: 'This is a test post',
    author: '13',
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    title: 'Test Post 2',
    category: 'Tech',
    content: 'Another test post',
    author: '42',
    updated_at: new Date().toISOString(),
  }
];

beforeEach(() => {
  localStorage.setItem('userInfo', '13');
  localStorage.setItem('token', 'Token 4ea718d22781e5e085173d05c2cfd03b70a21c42');

  BlogsDataService.postList.mockResolvedValue({ data: mockPosts });
  BlogsDataService.deletePost.mockResolvedValue({ data: {} });
});

afterEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
});

test('renders delete button if currentUser is author', async () => {
  render(
      <MemoryRouter>
        <PostList />
      </MemoryRouter>
    );
  await waitFor(() => expect(screen.getByText(/Test Post 1/i)).toBeInTheDocument());

  const deleteButton = screen.getByText(/Delete/i);
  expect(deleteButton).toBeInTheDocument();
});

test('calls deletePost when delete button is clicked', async () => {
  render(
      <MemoryRouter>
        <PostList />
      </MemoryRouter>
    );
  await waitFor(() => expect(screen.getByText(/Delete/i)).toBeInTheDocument());

  fireEvent.click(screen.getByText(/Delete/i));
  await waitFor(() => {
    expect(BlogsDataService.deletePost).toHaveBeenCalledWith(1, 'Token 4ea718d22781e5e085173d05c2cfd03b70a21c42');
  });
});
