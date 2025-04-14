import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import {MemoryRouter, Routes, Route} from 'react-router-dom';
import App from './App';
import Signup from './components/Signup';
import CreatePost from './components/CreatePost';
import PostDetail from './components/PostDetail';
import userEvent from '@testing-library/user-event';
import BlogsDataService from './services/blogs';

jest.mock('./services/blogs', () => ({
    createPost: jest.fn(),
    postDetail: jest.fn(),
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
                <Route path="/posts/:id" element={<PostDetail />}/>
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
console.log("integrate test passed")
