
// Logout.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import { BrowserRouter } from 'react-router-dom';

describe('App logout behavior', () => {
  beforeEach(() => {
    localStorage.setItem('token', 'Token e6f4b5d67ed8da2ec7f2a60cc548f7ff5818f5a4');
    localStorage.setItem('user', 'user7');
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should clear token and user from localStorage when Logout is clicked', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // 检查 Logout 按钮是否渲染（此时需要手动设置登录状态）
    const logoutButton = screen.getByText(/Logout\(user7\)/i);
    expect(logoutButton).toBeInTheDocument();

    // 模拟点击 logout
    fireEvent.click(logoutButton);

    // 检查 localStorage 是否被清空
    expect(localStorage.getItem('token')).toBe('');
    expect(localStorage.getItem('user')).toBe('');
  });
});

