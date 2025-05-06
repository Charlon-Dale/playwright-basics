import { test, expect } from '../shared/base';

test.describe('JSONPlaceholder API Tests', { tag: [ '@API-Testing', '@Regression-Testing' ]}, () => {
  
  test('Should fetch all posts', async ({ apiJsonPlaceholder }) => {
    const response = await apiJsonPlaceholder.getPosts();
    const json = await response.json();
    console.log("First Post:", json[0]);
    expect(json.length).toBeGreaterThan(0);
  });

  test('Should fetch an existing post by ID', async ({ apiJsonPlaceholder }) => {
    const postId = 1;
  
    console.log(`Fetching post with ID: ${postId}`);
    const response = await apiJsonPlaceholder.getPostById(postId);
    
    console.log("Response Status:", response.status());
    expect(response.status()).toBe(200);
  
    const json = await response.json();
    console.log("Fetched Post:", json);
  
    expect(json.id).toBe(postId);
    expect(json.title).toBeDefined();
    expect(json.body).toBeDefined();
  });

  test('Should create a new post and verify response', async ({ apiJsonPlaceholder }) => {
    const now = new Date();
    const timestamp = now.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour12: false, // Use 24-hour format
    }).replace(/[/,:]/g, '-').replace(/\s/g, '_');
    const newPost = { 
      title: `New Post ${timestamp}`,
      body: 'This is a new post', 
      userId: 1 
    };
    
    const response = await apiJsonPlaceholder.createPost(newPost);
    const json = await response.json();
    console.log("Created Post:", json);

    expect(json.title).toBe(newPost.title);
    expect(json.body).toBe(newPost.body);
    expect(json.userId).toBe(newPost.userId);

    // Cleanup: Delete the created post
    await apiJsonPlaceholder.deletePost(json.id);
  });

  test('Should create and delete a post', async ({ apiJsonPlaceholder }) => {
    // Create a post first
    const newPost = { title: 'To be deleted', body: 'This will be removed', userId: 1 };
    const createResponse = await apiJsonPlaceholder.createPost(newPost);
    const createdPost = await createResponse.json();

    console.log("Created Post for Deletion:", createdPost);

    // Now delete the created post
    const deleteResponse = await apiJsonPlaceholder.deletePost(createdPost.id);
    console.log("Deleted Post Response:", await deleteResponse.text());

    expect(deleteResponse.status()).toBe(200);
  });

});
