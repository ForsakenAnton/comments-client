import CommentsProviderValue from "../interfaces/commentsProviderValue";
import PaginationMetadata from "../interfaces/PaginationMetadata";

export const initialPaginationMetadata: PaginationMetadata = {
  currentPage: 1,
  totalPages: 1,
  pageSize: 25,
  totalCount: 0,
  hasPrevious: false,
  hasNext: false,
};

export const initialCommentsProviderValue: CommentsProviderValue = {
  comments: [],
  setComments: () => { },
  loading: false,
  setLoading: () => { },
  fetchError: false,
  setFetchError: () => { },
  paginationMetadata: initialPaginationMetadata,
  setPaginationMetadata: () => { },
};