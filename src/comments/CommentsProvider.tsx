import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
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


  const loadChildrenComments = useCallback(async (parentId: number): Promise<CommentGetDto[] | null> => {
    try {
      const response = await fetch(`${apiPaths.getChildrenComments}/${parentId}`);
      if (response.ok) {
        const data = await response.json();

        setComments((draft) => {
          const findAndUpdate = (comments: CommentGetDto[]) => {
            for (const c of comments) {
              if (c.id === parentId) {
                c.replies = data;
                return true;
              }
              if (c.replies && findAndUpdate(c.replies)) return true;
            }
            return false;
          };
          findAndUpdate(draft);
        });

        return data;
      } else {
        console.error("Response not OK:", response.status);
      }
    } catch (error) {
      console.error("Error loading children:", error);
    }

    return null;
  }, [setComments]);


  const addComment = useCallback((newComment: CommentGetDto) => {
    setComments((draft) => {
      if (newComment.parentId == null) {
        draft.push({ ...newComment, replies: [] });
      } else {
        const addToParent = (list: CommentGetDto[]): boolean => {
          for (const comment of list) {
            if (comment.id === newComment.parentId) {
              if (!comment.replies) {
                comment.replies = [];
              }

              comment.replies.push({ ...newComment, replies: [] });
              comment.childrenCommentsCount++;
              return true;
            }
            if (comment.replies && addToParent(comment.replies)) {
              return true;
            }
          }

          return false;
        };

        addToParent(draft);
      }
    });
  }, [setComments]);


  const commentsProviderValue: CommentsProviderValue = useMemo(
    () => {
      return {
        comments,
        addComment,
        loadChildrenComments,
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
    [comments, addComment, loadChildrenComments, loading, fetchError, paginationMetadata, orderBy]);

  return (
    <CommentsContext.Provider value={commentsProviderValue}>
      {children}
    </CommentsContext.Provider>
  );
}

export default CommentsProvider;