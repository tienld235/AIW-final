const commentApi = "http://localhost:8080/api/comments";

export const getComment = id => {
  return commentApi + "?article=" + id;
};

export const postComment =()=>{
    return commentApi;
}

export default {getComment, postComment};