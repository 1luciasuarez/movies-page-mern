const Movie = require('../models/movie');
const image = require('../utils/image');

// Crear
async function createMovie(req, res) {
  try {
    const movie = new Movie(req.body);
    if (req.files && req.files.image) {
      const imagePath = image.getFileName(req.files.image);
      movie.image = imagePath;
    }
    await movie.save();
    res.status(201).send(movie);
  } catch (error) {
    res.status(500).send({ msg: 'Error al crear la película', error: String(error) });
  }
}

// Listar con paginación simple ?page=1&limit=12
async function getMovies(req, res) {
  try {
    const page = Math.max(parseInt(req.query.page || '1', 10), 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit || '12', 10), 1), 100);
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      Movie.find().sort({ _id: -1 }).skip(skip).limit(limit),
      Movie.countDocuments(),
    ]);

    res.status(200).send({
      items,
      total,
      page,
      pages: Math.ceil(total / limit),
      limit,
    });
  } catch (error) {
    res.status(500).send({ msg: 'Error al obtener las películas', error: String(error) });
  }
}

// Actualizar
async function updateMovie(req, res) {
  try {
    const { id } = req.params;
    const data = { ...req.body };
    if (req.files && req.files.image) {
      data.image = image.getFileName(req.files.image);
    }
    const updated = await Movie.findByIdAndUpdate(id, data, { new: true });
    if (!updated) return res.status(404).send({ msg: 'Película no encontrada' });
    res.status(200).send(updated);
  } catch (error) {
    res.status(500).send({ msg: 'Error al actualizar la película', error: String(error) });
  }
}

// Eliminar
async function deleteMovie(req, res) {
  try {
    const { id } = req.params;
    const deleted = await Movie.findByIdAndDelete(id);
    if (!deleted) return res.status(404).send({ msg: 'Película no encontrada' });
    res.status(200).send({ msg: 'Película eliminada' });
  } catch (error) {
    res.status(500).send({ msg: 'Error al eliminar la película', error: String(error) });
  }
}

// Obtener una
async function getMovie(req, res) {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    if (!movie) return res.status(404).send({ msg: 'Película no encontrada' });
    res.status(200).send(movie);
  } catch (error) {
    res.status(500).send({ msg: 'Error al obtener la película', error: String(error) });
  }
}

module.exports = { createMovie, getMovies, updateMovie, deleteMovie, getMovie };
