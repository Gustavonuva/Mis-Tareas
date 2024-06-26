
import axios from 'axios';
import { getUsersPosts } from './usersService';


jest.mock('axios');


const samplePostsData = [
  { userId: 1, id: 1, title: 'Post 1', body: 'Body of post 1' },
  { userId: 1, id: 2, title: 'Post 2', body: 'Body of post 2' },
];

describe('getUsersPosts', () => {
  it('fetches user posts successfully', async () => {
    
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({ data: samplePostsData });

    const userId = 1;
    const posts = await getUsersPosts(userId);

    expect(posts).toEqual(samplePostsData);
    expect(axios.get).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
  });

  it('handles errors', async () => {
    const errorMessage = 'Network Error';
    
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValueOnce(new Error(errorMessage));

    const userId = 1;

    await expect(getUsersPosts(userId)).rejects.toThrow(errorMessage);
    expect(axios.get).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
  });
});
