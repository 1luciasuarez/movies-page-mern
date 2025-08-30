

export const getMoviesFetch = async (page = 1, limit = 12) => {
  const url = `${API}/movies?page=${page}&limit=${limit}`;
  const response = await fetch(url);
  const result = await response.json();
  if (response.status !== 200) throw result;
  return result;
};

export const getMovieFetch = async (id) => {
  const url = `${API}/movie/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  if (res.status !== 200) throw data;
  return data;
};
