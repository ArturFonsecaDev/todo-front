import { fetchUrls } from './auth.js';

export async function listKanbans(token, refreshToken){
  const url = 'http://127.0.0.1:8000/api/todo';
  const payload = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  };

  const data = await fetchUrls(url, payload, refreshToken);
  const newToken = data.newAccess || null;
  const response = await data.json();
  return {
    kanbans: response,
    newAccess: newToken
  }
}