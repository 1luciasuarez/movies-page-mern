export const getMoviesFetch = async (page = 1, limit = 12) => {
  const url = `http://localhost:3977/api/v1/movies?page=${page}&limit=${limit}`;
  const response = await fetch(url);
  const result = await response.json();
  if (response.status !== 200) throw result;
  return result; // {items,total,page,pages,limit}  (o array [])
};

export const getMovieFetch = async (id) => {
  const url = `http://localhost:3977/api/v1/movie/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  if (res.status !== 200) throw data;
  return data;
};