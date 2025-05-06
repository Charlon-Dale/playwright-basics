import { APIRequestContext, request, expect } from '@playwright/test';

export class APIModel {
  private requestContext: APIRequestContext;

  constructor(requestContext: APIRequestContext) {
    this.requestContext = requestContext;
  }

  async getPosts() {
    console.log("Fetching all posts...");
    const response = await this.requestContext.get('/posts');
    console.log("Response Status:", response.status());
    expect(response.status()).toBe(200);
    return response;
  }

  async getPostById(postId: number) {
    console.log(`Fetching post with ID: ${postId}`);
    const response = await this.requestContext.get(`/posts/${postId}`);
    console.log("Response Status:", response.status());
    expect(response.status()).toBe(200);
    return response;
  }

  async createPost(postData: { title: string; body: string; userId: number }) {
    console.log("Creating a new post...");
    const response = await this.requestContext.post('/posts', {
      data: postData,
    });
    console.log("Response Status:", response.status());
    expect(response.status()).toBe(201);
    return response;
  }

  async deletePost(postId: number) {
    console.log(`Deleting post with ID: ${postId}`);
    const response = await this.requestContext.delete(`/posts/${postId}`);
    console.log("Response Status:", response.status());
    expect(response.status()).toBe(200);
    return response;
  }
}
