import { ReactNode, useEffect, useMemo, useState } from "react";
import CommentsContext from "./commentsContext";
import { apiPaths } from "../config/apiPaths";
import CommentsProviderValue from "../interfaces/commentsProviderValue";
import CommentGetDto from "../interfaces/commentGet";
import { useImmer } from "use-immer";
import PaginationMetadata from "../interfaces/PaginationMetadata";
import { initialPaginationMetadata } from "./initialData";

interface CommentsProviderProps {
  children: ReactNode;
}

function CommentsProvider({ children }: Readonly<CommentsProviderProps>) {
  const [comments, setComments] = useImmer<CommentGetDto[]>([]); // Immer !!!
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [paginationMetadata, setPaginationMetadata] = useState<PaginationMetadata>(initialPaginationMetadata);

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      setFetchError(false);

      try {
        const pageNumberQuery = `?pageNumber=${paginationMetadata.currentPage}`;
        const pageSizeQuery = `&pageSize=${paginationMetadata.pageSize}`;

        const response = await fetch(
          `${apiPaths.getParentComments}${pageNumberQuery}${pageSizeQuery}`
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
  }, [setComments, paginationMetadata.currentPage, paginationMetadata.pageSize]);


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
        setPaginationMetadata
      }
    },
    [comments, loading, fetchError, setComments, paginationMetadata]);

  return (
    <CommentsContext.Provider value={commentsProviderValue}>
      {children}
    </CommentsContext.Provider>
  );
}

export default CommentsProvider;