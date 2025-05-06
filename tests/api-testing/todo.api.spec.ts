import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
import {
  createTodo,
  fetchLatestTodo,
  fetchTodoById,
  toggleTodoCompletion,
  deleteTodo,
} from "./todo.api";
dotenv.config();

// Test data
const TEST_TODO_NAME = "Example API Test Todo 1";

test.describe.configure({ mode: "serial" }); // In sequence yung pag run ng mga test cases
test.describe("Supabase ToDoList API Tests", { tag: "@Api-Testing" }, () => {
  let todoId: string;
  
  // ✅ Test 1: Add a new todo
  test("Add a new todo", async ({ request }) => { // POST Method
    await test.step("Create a new todo", async () => {
      const createResponse = await createTodo(request, TEST_TODO_NAME);
      expect(createResponse.status()).toBe(201);
    });

    await test.step("Fetch and validate the latest todo", async () => {
      const latestTodo = await fetchLatestTodo(request);
      todoId = latestTodo.id;

      console.log("Created Todo ID:", todoId);
      console.log(latestTodo.item_name);

      expect(latestTodo.item_name).toBe(TEST_TODO_NAME);
      expect(latestTodo.isCompleted).toBe(false);
    });
  });
  // ✅ Test 2: Fetch all todos
  test("Fetch all todos", async ({ request }) => { // GET Method
    const response = await request.get(`${process.env.SUPABASE_URL}/rest/v1/ToDoList`, {
      headers: {
        Authorization: `Bearer ${process.env.SUPA_API_KEY}`,
        apikey: `${process.env.SUPA_API_KEY}`,
      },
    });

    console.log("Response Status:", response.status());
    console.log("Response Body:", await response.text());

    expect(response.status()).toBe(200);

    const todos = await response.json();
    console.log("All Todos:", todos);

    expect(Array.isArray(todos)).toBeTruthy();
    expect(todos.length).toBeGreaterThan(0);
  });
  
  // ✅ Test 3: Toggle todo completion
  test("Toggle todo completion", async ({ request }) => {
    expect(todoId).toBeDefined();
    console.log("Todo ID for Toggle Test:", todoId);
  
    await test.step("Toggle completion status", async () => {
      const toggleResponse = await toggleTodoCompletion(request, todoId);
      console.log("Toggle Response Status:", toggleResponse.status());
      expect([200, 204]).toContain(toggleResponse.status());
    });
  
    await test.step("Verify the updated todo", async () => {
      const updatedTodo = await fetchTodoById(request, todoId);
      console.log("Updated Todo:", updatedTodo);
  
      expect(updatedTodo).toBeDefined();
      expect(updatedTodo.isCompleted).toBe(true);
    });
  });
  // ✅ Test 4: Delete a todo
  test("Delete a todo", async ({ request }) => {
    expect(todoId).toBeDefined();
    console.log("Todo ID for Delete Test:", todoId);

    await test.step("Delete the todo", async () => {
      const deleteResponse = await deleteTodo(request, todoId);
      console.log("Delete Response Status:", deleteResponse.status());
      expect(deleteResponse.status()).toBe(204);
    });
  });
});