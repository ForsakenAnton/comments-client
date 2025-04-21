import { createContext, useContext } from "react";
import CommentsProviderValue from "../interfaces/commentsProviderValue";

const CommentsContext = createContext<CommentsProviderValue | undefined>(undefined);

export default CommentsContext;

export const useCommentsContext = () => {
  const context = useContext(CommentsContext);
  if (!context) {
    throw new Error("useCommentsContext must be used within a CommentsProvider");
  }
  return context;
};