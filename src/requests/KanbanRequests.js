import { fetchUrls } from './auth.js';

function getHeaders(token){
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  }
}

export async function listKanbans(token, refreshToken){
  const url = 'http://127.0.0.1:8000/api/todo';
  const payload = {
    method: 'GET',
    headers: getHeaders()
  };

  const data = await fetchUrls(url, payload, refreshToken);
  const newToken = data.newAccess || null;
  const response = await data.json();
  return {
    kanbans: response,
    newAccess: newToken
  }
}

export async function createKanban(name, id, token, refreshToken){
  const url = 'http://127.0.0.1:8000/api/todo';
  const payload = {

  }
  const options = {
    method: 'POST',
    headers: getHeaders(),
    body: {
      name: name,
      user: id
    }
  };

  const data = await fetchUrls(url, options, )


}