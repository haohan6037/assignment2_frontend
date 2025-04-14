import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PostDetail from '../components/PostDetail';
import BlogsDataService from '../services/blogs';
import '@testing-library/jest-dom';

jest.mock('../services/blogs', () => ({
  postDetail: jest.fn(),
}));

const mockPost = {
  id: 1,
  title: 'Test Post',
  content: 'This is test content',
  author: 'TestUser',
  category: 'Tech',
  created_at: '2025-04-14T00:00:00Z',
};

test('renders post detail when post is fetched', async () => {
  console.log("Unit test PostDetail start")
  BlogsDataService.postDetail.mockResolvedValue({ data: mockPost });

  render(
    <MemoryRouter initialEntries={['/posts/1']}>
      <Routes>
        <Route path="/posts/:id" element={<PostDetail />} />
      </Routes>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText('Test Post')).toBeInTheDocument();
    expect(screen.getByText(/TestUser/i)).toBeInTheDocument();
    expect(screen.getByText(/This is test content/i)).toBeInTheDocument();
  });

  expect(BlogsDataService.postDetail).toHaveBeenCalledWith('1');
  console.log("Unit test PostDetail pass")
});
