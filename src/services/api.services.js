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
    return res;
  } catch (error) {
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
