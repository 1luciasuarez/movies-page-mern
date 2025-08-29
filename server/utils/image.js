const path = require('path');

function getFileName(file) {
  const rel = path.relative(process.cwd(), file.path);
  // Normalize to forward slashes for URLs
  return rel.split(path.sep).slice(rel.split(path.sep).indexOf('uploads')).join('/');
}

module.exports = { getFileName };
