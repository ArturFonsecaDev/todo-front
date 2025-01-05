import { fetchUrls } from './auth.js';
import store from '../store.js';

function getHeaders(){
  return {
    'Authorization': `Bearer ${store.state.accessToken}`,
    'Content-Type': 'application/json',
  }
}

export async function listKanbans(){
  const url = 'http://127.0.0.1:8000/api/todo';
  const token = store.state.accessToken;
  const refreshToken = store.state.refreshToken;
  const payload = {
    method: 'GET',
    headers: getHeaders(token)
  };

  const data = await fetchUrls(url, payload, refreshToken);
  const newToken = data.newAccess || null;
  const response = await data.json();
  return {
    kanbans: response,
    newAccess: newToken
  }
}

export async function createKanban(name){
  const url = 'http://127.0.0.1:8000/api/todo';
  const options = {
    method: 'POST',
    headers: getHeaders(store.state.accessToken),
    body: {
      name: name,
      user: id
    }
  };

  const data = await fetchUrls(url, options, store.state.refreshToken);


}