import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import userEvent from '@testing-library/user-event';



console.log("integration testing start")

test('renders home page and navigates to signup', async () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );

  // 检查首页内容
  expect(screen.getByText(/Blogs/i)).toBeInTheDocument();

  // 模拟点击跳转链接（假设有链接）
  const link = screen.getByRole('link', { name: /Signup/i });
  userEvent.click(link);

  // 确认跳转到了注册页面
  expect(await screen.findByPlaceholderText(/Username/i)).toBeInTheDocument();
});

console.log("register pass,integration testing end")




console.log("integration testing end")
