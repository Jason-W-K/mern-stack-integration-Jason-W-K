const BASE_URL = 'http://localhost:5000/api';

export async function fetchPosts() {
  const res = await fetch(`${BASE_URL}/posts`);
  return res.json();
}

export async function fetchPost(id) {
  const res = await fetch(`${BASE_URL}/posts/${id}`);
  return res.json();
}

export async function createPost(data) {
  const res = await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updatePost(id, data) {
  const res = await fetch(`${BASE_URL}/posts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deletePost(id) {
  const res = await fetch(`${BASE_URL}/posts/${id}`, {
    method: 'DELETE',
  });
  return res.json();
}

export async function fetchCategories() {
  const res = await fetch(`${BASE_URL}/categories`);
  return res.json();
}