import { ReactNode, useEffect, useMemo, useState } from "react";
import CommentsContext from "./commentsContext";
import { apiPaths } from "../config/apiPaths";
import CommentsProviderValue from "../interfaces/commentsProviderValue";
import CommentGetDto from "../interfaces/commentGet";

interface CommentsProviderProps {
  children: ReactNode;
}

function CommentsProvider({ children }: Readonly<CommentsProviderProps>) {
  const [comments, setComments] = useState([] as CommentGetDto[]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  const fetchComments = async () => {
    setLoading(true);
    setFetchError(false);

    try {
      const response = await fetch(apiPaths.getAllComments);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setComments(data);
      } else {
        console.log(response.status);
      }
    } catch (error) {
      console.log(error);
      setFetchError(true);
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchComments();
  }, []);


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
    [comments, loading, fetchError]);

  return (
    <CommentsContext.Provider value={commentsProviderValue}>
      {children}
    </CommentsContext.Provider>
  );
}

export default CommentsProvider;