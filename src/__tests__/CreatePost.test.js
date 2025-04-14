import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreatePost from '../components/CreatePost'; // 按实际路径调整
import '@testing-library/jest-dom';
import BlogsDataService from '../services/blogs';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../services/blogs', () => ({
  createPost: jest.fn(),
}));

beforeEach(() => {
  localStorage.setItem('token', 'test-token-123');
});

test('submits post with valid data', async () => {
  BlogsDataService.createPost.mockResolvedValue({
    data: { id: 1, title: 'Test Title' }
  });

  render(
    <MemoryRouter>
      <CreatePost />
    </MemoryRouter>
  );

  fireEvent.change(screen.getByPlaceholderText(/Enter title/i), {
    target: { value: 'Test Title' }
  });

  fireEvent.change(screen.getByPlaceholderText(/Write your post content here/i), {
    target: { value: 'This is test content.' }
  });

  fireEvent.click(screen.getByRole('button', { name: /Create Post/i }));

  await waitFor(() => {
    console.log("unit test: start to check create post");
    expect(BlogsDataService.createPost).toHaveBeenCalledWith(JSON.stringify({
      title: 'Test Title',
      content: 'This is test content.',
      category: 'Tech'
    }));
    console.log("unit test: check create post success");
  });
});
