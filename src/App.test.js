import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import {MemoryRouter, Routes, Route} from 'react-router-dom';
import App from './App';
import Signup from './components/Signup';
import Login from './components/Login';
import CreatePost from './components/CreatePost';
import PostDetail from './components/PostDetail';
import PostList from './components/PostList';
import userEvent from '@testing-library/user-event';
import BlogsDataService from './services/blogs';

jest.mock('./services/blogs', () => ({
    createPost: jest.fn(),
    postDetail: jest.fn(),
    postList: jest.fn(),
}));
console.log("integrate test start")
test('renders home page and navigates to signup', async () => {
    const mockSignup = jest.fn();
    console.log("integrate signup test start")
    render(
        <MemoryRouter initialEntries={['/']}>
            <Routes>
                <Route path="/" element={<App/>}/>
                <Route path="/signup" element={<Signup signup={mockSignup}/>}/>
            </Routes>
        </MemoryRouter>
    );

    expect(screen.getByText(/Blogs/i)).toBeInTheDocument();

    const link = screen.getByRole('link', {name: /Signup/i});
    userEvent.click(link);

    expect(await screen.findByPlaceholderText(/Username/i)).toBeInTheDocument();
    console.log("integrate signup test passed")
});

test('navigates to CreatePost and submits post', async () => {
    console.log("integrate create post test start")
    BlogsDataService.createPost.mockResolvedValue({
        data: {id: 1, title: 'New Post'},
    });

    render(
        <MemoryRouter initialEntries={['/posts/create']}>
            <Routes>
                <Route path="/posts/create" element={<CreatePost/>}/>
            </Routes>
        </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Enter title/i), {
        target: {value: 'New Post'},
    });

    fireEvent.change(screen.getByPlaceholderText(/Write your post content here/i), {
        target: {value: 'Post content here'},
    });

    fireEvent.click(screen.getByRole('button', {name: /Create Post/i}));

    await waitFor(() => {
        expect(BlogsDataService.createPost).toHaveBeenCalledWith(
            JSON.stringify({
                title: 'New Post',
                content: 'Post content here',
                category: 'Tech',
            })
        );

        expect(screen.getByText(/Successfully created post/i)).toBeInTheDocument();
        console.log("integrate create post test passed")
    });
});

test('renders post detail page', async () => {
    console.log("integrate post detail test start");

    BlogsDataService.postDetail.mockResolvedValue({
        data: {
            id: 1,
            title: 'Test Post',
            content: 'This is test content',
            author: 'TestUser',
            category: 'Tech',
            created_at: '2025-04-14T00:00:00Z',
        },
    });

    render(
        <MemoryRouter initialEntries={['/posts/1']}>
            <Routes>
                <Route path="/posts/:id" element={<PostDetail/>}/>
            </Routes>
        </MemoryRouter>
    );

    await waitFor(() => {
        expect(screen.getByText('Test Post')).toBeInTheDocument();
        expect(screen.getByText(/TestUser/i)).toBeInTheDocument();
        expect(screen.getByText(/This is test content/i)).toBeInTheDocument();
        console.log("integrate post detail test passed");
    });

    expect(BlogsDataService.postDetail).toHaveBeenCalledWith('1');
});


test('renders post list page', async () => {
    console.log("integrate post list test start");
    BlogsDataService.postList.mockResolvedValue({
        data: [
            {
                id: 1,
                title: 'Exploring Django REST Framework',
                content: 'Learn how to build APIs with DRF...',
                category: 'Tech',
                updated_at: '2024-04-10T12:00:00Z',
            },
            {
                id: 2,
                title: 'Understanding React Router',
                content: 'Navigate like a pro with React Router...',
                category: 'Tech',
                updated_at: '2024-04-11T08:30:00Z',
            },
        ],
    });

    render(
        <MemoryRouter initialEntries={['/posts']}>
            <Routes>
                <Route path="*" element={<PostList />}/>
            </Routes>
        </MemoryRouter>
    );

    await waitFor(() => {
        expect(screen.getByText(/Exploring Django REST Framework/i)).toBeInTheDocument();
        expect(screen.getByText(/Understanding React Router/i)).toBeInTheDocument();
    });
    console.log("integrate post list test passed");
});

test('navigates to login page and performs login', async () => {
    console.log("integrate login test start");

    // 1. 模拟登录函数
    const mockLogin = jest.fn().mockResolvedValue({ token: "mock_token" });

    // 2. 渲染带有路由的测试环境
    render(
        <MemoryRouter initialEntries={['/']}>
            <Routes>
                <Route path="/" element={<App />} />
                <Route
                    path="/login"
                    element={<Login login={mockLogin} />}  // 注入模拟的登录函数
                />
            </Routes>
        </MemoryRouter>
    );

    // 3. 从首页导航到登录页面
    const loginLink = screen.getByRole('link', { name: /Login/i });
    userEvent.click(loginLink);

    // 4. 验证登录表单元素
    await waitFor(() => {
        expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    });

    // 5. 填写登录表单
    fireEvent.change(screen.getByPlaceholderText(/Username/i), {
        target: { value: 'user7' }
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
        target: { value: '123456' }
    });

    // 6. 提交表单
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    // 7. 验证登录逻辑
    await waitFor(() => {
        // 检查是否以正确参数调用了登录函数
        expect(mockLogin).toHaveBeenCalledWith({
            username: 'user7',
            password: '123456'
        });
        // 检查是否显示成功消息
        expect(screen.getByText(/Login-success/i)).toBeInTheDocument();
    });

    console.log("integrate login test passed");
});

console.log("integrate test passed")
