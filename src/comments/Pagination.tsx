import { GrNext, GrPrevious } from "react-icons/gr";
import { useCommentsContext } from "./commentsContext";

function Pagination() {
  const { paginationMetadata, setPaginationMetadata } = useCommentsContext();
  const { currentPage, pageSize, totalPages, hasNext, hasPrevious } = paginationMetadata;
  const maxPagesOnTheLeftOrRight = 2;

  const pages: (number | "...")[] = [];

  const startPage = Math.max(2, currentPage - maxPagesOnTheLeftOrRight);
  const endPage = Math.min(totalPages - 1, currentPage + maxPagesOnTheLeftOrRight);

  pages.push(1);

  if (startPage > 2) {
    pages.push("...");
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (endPage < totalPages - 1) {
    pages.push("...");
  }

  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return (
    <section className='pagination-container'>
      <button
        onClick={() => {
          setPaginationMetadata({
            ...paginationMetadata,
            currentPage: currentPage - 1
          })
        }}
        disabled={!hasPrevious}
        className={`pagination-button ${!hasPrevious ? "disabled" : ""}`}
      >
        <GrPrevious />
      </button>

      {pages.map((page, index) => (
        typeof page === "number" ? (
          <button
            key={`${page}-${index}`}
            onClick={() => {
              setPaginationMetadata({
                ...paginationMetadata,
                currentPage: page
              })
            }}
            className={`pagination-button ${page === currentPage ? "active" : ""}`}
          >
            {page}
          </button>
        ) : (
          <span key={`${page}-${index}`} className="pagination-ellipsis">...</span>
        )
      ))}

      <button
        onClick={() => {
          setPaginationMetadata({
            ...paginationMetadata,
            currentPage: currentPage + 1
          })
        }}
        disabled={!hasNext}
        className={`pagination-button ${!hasNext ? "disabled" : ""}`}
      >
        <GrNext />
      </button>

      <select
        className="page-size-selector"
        id="pageSize"
        value={pageSize}
        onChange={(e) => {
          setPaginationMetadata({
            ...paginationMetadata,
            pageSize: Number(e.target.value),
            currentPage: 1
          })
        }}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="25">25</option>
      </select>
    </section>
  );
}

export default Pagination;
