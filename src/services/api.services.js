import wrapperApi from "./apiWrapper";

export const loginUser = async (values) => {
  try {
    const options = {
      url: "/users/auth",
      data: {
        ...values,
      },
    };
    const res = await wrapperApi("post", options);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    return error?.response;
  }
};

export const registerUser = async (values) => {
  try {
    const options = {
      url: "/users",
      data: {
        ...values,
      },
    };
    const res = await wrapperApi("post", options);
    return res;
  } catch (error) {
    return error?.response;
  }
};

export const addPost = async (values) => {
  try {
    const options = {
      url: "/post",
      data: values,
    };
    const res = await wrapperApi("post", options);
    return res;
  } catch (error) {
    return error?.response;
  }
};

export const getAllPost = async () => {
  try {
    const options = {
      url: "/post",
    };
    const res = await wrapperApi("get", options);
    return res;
  } catch (error) {
    return error?.response;
  }
};

export const addComment = async (values) => {
  try {
    const options = {
      url: "/post/comment",
      data: values,
    };
    const res = await wrapperApi("post", options);
    return res;
  } catch (error) {
    return error?.response;
  }
};

export const getUser = async (id) => {
  try {
    const options = {
      url: "/users/" + id,
    };
    const res = await wrapperApi("get", options);
    return res;
  } catch (error) {
    return error?.response;
  }
};

export const uploadPofile = async (values, id) => {
  try {
    const options = {
      url: "/users/" + id,
      data: values,
    };
    const res = await wrapperApi("put", options);
    return res;
  } catch (error) {
    return error?.response;
  }
};

export const findFriends = async () => {
  try {
    const options = {
      url: "/users/friends/find-friends",
    };
    const res = await wrapperApi("get", options);
    return res;
  } catch (error) {
    return error?.response;
  }
};

export const sendRequest = async (values) => {
  try {
    const options = {
      url: "users/friends/send-request",
      data: { ...values },
    };
    const res = await wrapperApi("post", options);
    return res;
  } catch (error) {
    return error?.response;
  }
};

export const actionRequestByFriendsID = async (values) => {
  try {
    const options = {
      url: "users/friends/request-action",
      data: { ...values },
    };
    const res = await wrapperApi("post", options);
    return res;
  } catch (error) {
    return error?.response;
  }
};