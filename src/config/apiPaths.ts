// const API_BASE_URL = "https://localhost:7092";
const API_BASE_URL = "http://localhost:5000";
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