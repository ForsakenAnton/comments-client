import { ReactNode, useEffect, useMemo, useState } from "react";
import CommentsContext from "./commentsContext";
import { apiPaths } from "../config/apiPaths";
import CommentsProviderValue from "../interfaces/commentsProviderValue";
import CommentGetDto from "../interfaces/commentGet";
import { useImmer } from "use-immer";
import PaginationMetadata from "../interfaces/paginationMetadata";
import { initialPaginationMetadata } from "./initialData";
import OrderBy from "../types/orderBy";

interface CommentsProviderProps {
  children: ReactNode;
}

function CommentsProvider({ children }: Readonly<CommentsProviderProps>) {
  const [comments, setComments] = useImmer<CommentGetDto[]>([]); // Immer !!!
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [paginationMetadata, setPaginationMetadata] = useState<PaginationMetadata>(initialPaginationMetadata);
  const [orderBy, setOrderBy] = useState<OrderBy>("date desc");

  useEffect(
    () => {
      const fetchComments = async () => {
        setLoading(true);
        setFetchError(false);

        try {
          const pageNumberQuery = `?pageNumber=${paginationMetadata.currentPage}`;
          const pageSizeQuery = `&pageSize=${paginationMetadata.pageSize}`;
          const orderByQuery = `&orderBy=${orderBy}`;

          const response = await fetch(
            `${apiPaths.getParentComments}${pageNumberQuery}${pageSizeQuery}${orderByQuery}`
          );
          if (response.ok) {
            const data = await response.json();
            const paginationMetadata: PaginationMetadata = JSON.parse(response.headers.get("X-Pagination")!);

            setComments(() => {
              return data;
            });

            setPaginationMetadata(paginationMetadata);
          } else {
            console.log(response);
          }
        } catch (error) {
          console.log(error);
          setFetchError(true);
        }

        setLoading(false);
      }

      fetchComments();
    },
    [
      setComments,
      paginationMetadata.currentPage,
      paginationMetadata.pageSize,
      orderBy
    ]);


  const commentsProviderValue: CommentsProviderValue = useMemo(
    () => {
      return {
        comments,
        setComments,
        loading,
        setLoading,
        fetchError,
        setFetchError,
        paginationMetadata,
        setPaginationMetadata,
        orderBy,
        setOrderBy
      }
    },
    [comments, loading, fetchError, setComments, paginationMetadata, orderBy]);

  return (
    <CommentsContext.Provider value={commentsProviderValue}>
      {children}
    </CommentsContext.Provider>
  );
}

export default CommentsProvider;