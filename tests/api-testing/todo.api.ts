import { APIRequestContext, expect } from "@playwright/test";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Supabase API base URL and table endpoint
const SUPABASE_URL = process.env.SUPABASE_URL;
const TODO_API_URL = `${SUPABASE_URL}/rest/v1/ToDoList`;

/**
 * Create a new todo item.
 * @param request - Playwright API request context.
 * @param itemName - Name of the todo item.
 * @returns The API response.
 */
export async function createTodo(request: APIRequestContext, itemName: string) {
  if (!itemName) {
    throw new Error("itemName cannot be empty");
  }

  const response = await request.post(TODO_API_URL, {
    headers: {
      Authorization: `Bearer ${process.env.SUPA_API_KEY}`,
      "Content-Type": "application/json",
      apikey: `${process.env.SUPA_API_KEY}`,
    },
    data: {
      item_name: itemName,
      isCompleted: false,
    },
  });

  console.log("Status Code:", response.status());
  console.log("Response Body:", await response.text());

  expect(response.status()).toBe(201);
  return response;
}

/**
 * Fetch the latest todo item.
 * @param request - Playwright API request context.
 * @returns The latest todo item.
 */
export async function fetchLatestTodo(request: APIRequestContext) {
  const fetchResponse = await request.get(`${TODO_API_URL}?order=created_at.desc&limit=1`, {
    headers: {
      Authorization: `Bearer ${process.env.SUPA_API_KEY}`,
      apikey: `${process.env.SUPA_API_KEY}`,
    },
  });

  const latestTodo = await fetchResponse.json();
  if (latestTodo.length === 0) {
    throw new Error("No todos found");
  }
  return latestTodo[0];
}

/**
 * Fetch a todo item by its ID.
 * @param request - Playwright API request context.
 * @param todoId - ID of the todo item.
 * @returns The todo item.
 */
export async function fetchTodoById(request: APIRequestContext, todoId: string) {
  const response = await request.get(`${TODO_API_URL}?id=eq.${todoId}`, {
    headers: {
      Authorization: `Bearer ${process.env.SUPA_API_KEY}`,
      apikey: `${process.env.SUPA_API_KEY}`,
    },
  });

  console.log("Fetch Todo By ID Response Status:", response.status());
  console.log("Fetch Todo By ID Response Body:", await response.text());

  const todo = await response.json();
  console.log("Fetched Todo:", todo);

  if (todo.length === 0) {
    throw new Error(`Todo with ID ${todoId} not found`);
  }
  return todo[0];
}

/**
 * Toggle the completion status of a todo item.
 * @param request - Playwright API request context.
 * @param todoId - ID of the todo item.
 * @param isCompleted - New completion status (default: true).
 * @returns The API response.
 */
export async function toggleTodoCompletion(request: APIRequestContext, todoId: string, isCompleted = true) {
  if (!todoId) {
    throw new Error("todoId cannot be empty");
  }

  const response = await request.patch(`${TODO_API_URL}?id=eq.${todoId}`, {
    headers: {
      Authorization: `Bearer ${process.env.SUPA_API_KEY}`,
      apikey: `${process.env.SUPA_API_KEY}`,
    },
    data: { isCompleted },
  });

  console.log("Status Code:", response.status());
  console.log("Response Body:", await response.text());

  expect([200, 204]).toContain(response.status());
  return response;
}

/**
 * Delete a todo item by its ID.
 * @param request - Playwright API request context.
 * @param todoId - ID of the todo item.
 * @returns The API response.
 */
export async function deleteTodo(request: APIRequestContext, todoId: string) {
  if (!todoId) {
    throw new Error("todoId cannot be empty");
  }

  const response = await request.delete(`${TODO_API_URL}?id=eq.${todoId}`, {
    headers: {
      Authorization: `Bearer ${process.env.SUPA_API_KEY}`,
      apikey: `${process.env.SUPA_API_KEY}`,
    },
  });

  console.log("Status Code:", response.status());
  console.log("Response Body:", await response.text());

  expect(response.status()).toBe(204);
  return response;
}

/**
 * Utility function to clear all todo items (for testing purposes).
 * @param request - Playwright API request context.
 */
export async function clearAllTodos(request: APIRequestContext) {
  const response = await request.delete(TODO_API_URL, {
    headers: {
      Authorization: `Bearer ${process.env.SUPA_API_KEY}`,
      apikey: `${process.env.SUPA_API_KEY}`,
    },
  });

  console.log("Status Code:", response.status());
  console.log("Response Body:", await response.text());

  expect(response.status()).toBe(204);
  console.log("All todos cleared.");
}