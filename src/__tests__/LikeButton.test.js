import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LikeButton from '../components/LikeButton';
import BlogsDataService from '../services/blogs';

// 模拟服务层
jest.mock('../services/blogs', () => ({
  __esModule: true,
  default: {
    likePost: jest.fn()
  }
}));

// 初始props配置
const mockProps = {
  postId: 1,
  initialLiked: false,
  initialCount: 5,
  token: 'test-token-123'
};

// 模拟成功的API响应
const mockLikeResponse = (likedStatus, count) => ({
  data: {
    liked: likedStatus,
    like_count: count
  }
});

beforeEach(() => {
  BlogsDataService.likePost.mockClear();
});

describe('LikeButton Component Tests', () => {
  test('1. Renders initial like state correctly', () => {
    render(<LikeButton {...mockProps} />);

    expect(screen.getByText('❤️ Like')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  test('2. Triggers like API call on button click', async () => {
    BlogsDataService.likePost.mockResolvedValue(mockLikeResponse(true, 6));

    render(<LikeButton {...mockProps} />);

    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => {
      expect(BlogsDataService.likePost).toHaveBeenCalledWith(1, 'test-token-123');
    });
  });

  test('3. Updates UI after successful like', async () => {
    BlogsDataService.likePost.mockResolvedValue(mockLikeResponse(true, 6));

    render(<LikeButton {...mockProps} />);

    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => {
      expect(screen.getByText('💔 Cancel')).toBeInTheDocument();
      expect(screen.getByText('6')).toBeInTheDocument();
    });
  });

});