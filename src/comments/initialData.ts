import CommentsProviderValue from "../interfaces/commentsProviderValue";
import OrderByButton from "../interfaces/orderByButton";
import PaginationMetadata from "../interfaces/paginationMetadata";

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
  fetchComments: () => Promise.resolve(),
  addComment: () => { },
  loadChildrenComments: () => Promise.resolve(null),
  loading: false,
  setLoading: () => { },
  fetchError: false,
  setFetchError: () => { },
  paginationMetadata: initialPaginationMetadata,
  setPaginationMetadata: () => { },
  orderBy: "date desc",
  setOrderBy: () => { },
};

export const initialOrderByButtons: OrderByButton[] = [
  {
    name: "Date",
    order: ["date", "date desc"],
    isDescending: true
  },
  {
    name: "User name",
    order: ["user_name", "user_name desc"],
    isDescending: true
  },
  {
    name: "User email",
    order: ["user_email", "user_email desc"],
    isDescending: true
  },
];