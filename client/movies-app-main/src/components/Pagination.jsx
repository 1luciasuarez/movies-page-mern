const Pagination = ({ page, pages, onPrev, onNext }) => {
  return (
    <nav aria-label="Movies pagination">
      <ul className="pagination justify-content-center mt-4">
        <li className="page-item">
          <button className="btn btn-warning" onClick={onPrev} disabled={page <= 1}>Anterior</button>
        </li>
        <li className="page-item mx-2 align-self-center">Página {page} de {pages || 1}</li>
        <li className="page-item">
          <button className="btn btn-primary" onClick={onNext} disabled={pages ? page >= pages : true}>Siguiente</button>
        </li>
      </ul>
    </nav>
  );
};
export default Pagination;
