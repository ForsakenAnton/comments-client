import { GrNext, GrPrevious } from "react-icons/gr";
import { useCommentsContext } from "./commentsContext";

function Pagination() {
  const { paginationMetadata, setPaginationMetadata } = useCommentsContext();
  const { currentPage, pageSize, totalPages, /*totalCount*/ hasNext, hasPrevious } = paginationMetadata;
  const maxPagesOnTheLeftOrRight = 2;

  const pages: number[] = [];

  const startPage = Math.max(1, currentPage - maxPagesOnTheLeftOrRight);
  const endPage = Math.min(totalPages, currentPage + maxPagesOnTheLeftOrRight);

  if (startPage > 1) {
    pages.push(1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (endPage < totalPages) {
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
        className="pagination-button"
      >
        <GrPrevious />
      </button>

      {pages.map((page) => (
        <button
          key={page}
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
      ))}

      <button
        onClick={() => {
          setPaginationMetadata({
            ...paginationMetadata,
            currentPage: currentPage + 1
          })
        }}
        disabled={!hasNext}
        className="pagination-button"
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