import { createContext, useContext } from "react";
import CommentsProviderValue from "../interfaces/commentsProviderValue";

const CommentsContext = createContext<CommentsProviderValue>({} as CommentsProviderValue);

export default CommentsContext;

export const useCommentsContext = () => {
  return useContext(CommentsContext);
}