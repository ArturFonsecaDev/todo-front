export function loginRequest(email, password) {
  const url = 'http://localhost:8000/accounts/token/';
  const payload = { email, password };

  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (response.status !== 200) {
        return response.json().then((err) => {
          throw new Error(err.non_field_errors);
        });
      }
      return response.json();
    })
    .then((data) => {
      if (data.access) {
        return {
          token: data.access,
          refreshToken: data.refresh,
          user: data.user,
        };
      }
      throw new Error('Token not found!');
    });
}


export function registerRequest(email, password, confirmPassword) {
  const url = 'http://localhost:8000/accounts/register/';
  const payload = { email, password, confirm_password: confirmPassword };

  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (response.status !== 201) {
        return response.json().then((err) => {
          throw new Error(err.email);
        });
      }
      return response.json();
    })
    .then(data => {
      if(!data.access){
        throw new Error('Registration failed!');
      }
      const token = data.access;
      const refreshToken = data.refresh;
      const user = data.user;
      return {
        token,
        refreshToken,
        user,
      }
    })
}


export function refreshAccessToken(refreshToken) {
  const url = 'http://localhost:8000/accounts/token/refresh/';
  const payload = { refresh: refreshToken };

  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }
      return response.json();
    })
    .then((data) => {
      if (data.access) {
        return data.access;
      }
      throw new Error('Invalid refresh token');
    });
}


export async function fetchUrls(url, options, refreshToken){
  try{
    // Request Original
    const response = await fetch(url, options);
    if(response.ok){
      return response; // retorna a resposta
    }

    // Tenta Novamente, só que pegando outro token
    if(response.status == 401){
      try{
        const newAccessToken = await refreshAccessToken(refreshToken);
        options.headers['Authorization'] = `Bearer ${newAccessToken}`;
        const newResponse = await fetch(url, options);
        if(newResponse.ok){
          newResponse.newAccess = newAccessToken;
          return newResponse; // retorna novamente a resposta
        }  
        throw new Error(`Error fetching ${url}: ${newResponse.statusText}`);
      }
      catch(err){
        throw new Error('Failed to refresh token');
      }  
    }
  }  
  catch(err){
    throw new Error(`Error fetching ${url}: ${err.message}`);
  }
}