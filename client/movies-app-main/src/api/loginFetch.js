export const loginFetch = async (data) => {
  try {
    const url = 'http://localhost:3977/api/v1/auth/login';
    const params = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
    const res = await fetch(url, params);
    const json = await res.json();
    if (res.status !== 200) throw json;
    return json; // { token }
  } catch (err) {
    throw err;
  }
};
