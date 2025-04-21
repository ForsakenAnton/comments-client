import { ReactNode, useEffect, useMemo, useState } from "react";
import CommentsContext from "./commentsContext";
import { apiPaths } from "../config/apiPaths";
import CommentsProviderValue from "../interfaces/commentsProviderValue";
import CommentGetDto from "../interfaces/commentGet";
import { useImmer } from "use-immer";

interface CommentsProviderProps {
  children: ReactNode;
}

function CommentsProvider({ children }: Readonly<CommentsProviderProps>) {
  const [comments, setComments] = useImmer<CommentGetDto[]>([]); // Immer !!!
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      setFetchError(false);

      try {
        const response = await fetch(apiPaths.getParentComments);
        if (response.ok) {
          const data = await response.json();
          console.log(data);

          setComments(() => {
            return data;
          });
        } else {
          console.log(response.status);
        }
      } catch (error) {
        console.log(error);
        setFetchError(true);
      }

      setLoading(false);
    }


    fetchComments();
  }, [setComments]);


  const commentsProviderValue: CommentsProviderValue = useMemo(
    () => {
      return {
        comments,
        setComments,
        loading,
        setLoading,
        fetchError,
        setFetchError
      }
    },
    [comments, loading, fetchError, setComments]);

  return (
    <CommentsContext.Provider value={commentsProviderValue}>
      {children}
    </CommentsContext.Provider>
  );
}

export default CommentsProvider;