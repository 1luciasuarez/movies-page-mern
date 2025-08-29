export const getMeFetch = async (token) => {
  try {
    const url = 'http://localhost:3977/api/v1/user/me';
    const params = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const res = await fetch(url, params);
    const json = await res.json();
    if (res.status !== 200) throw json;
    return json;
  } catch (err) {
    throw err;
  }
};
