// const API_BASE_URL = "https://localhost:7092"; // local
// const API_BASE_URL = "http://localhost:7092"; // docker
// const API_BASE_URL = "http://azure.qwerty"; // azure

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log("API_BASE_URL: ", API_BASE_URL);
const COMMENTS_SEGMENT = "api/comments";

export const apiPaths = {
  getAllComments: `${API_BASE_URL}/${COMMENTS_SEGMENT}/AllCommentsWithChildren`,
  getParentComments: `${API_BASE_URL}/${COMMENTS_SEGMENT}/ParentComments`,
  getChildrenComments: `${API_BASE_URL}/${COMMENTS_SEGMENT}/GetChildrenComments`, // + /id
  getCaptcha: `${API_BASE_URL}/${COMMENTS_SEGMENT}/captcha`,
  postComment: `${API_BASE_URL}/${COMMENTS_SEGMENT}`,
}

export const rootImageFilesPath = `${API_BASE_URL}/images`;
export const rootTextFilesPath = `${API_BASE_URL}/textFiles`;