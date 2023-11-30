import { invokeApi } from "../../bl_libs/invokeApi";

export const conversations_list_api = async (type) => {
  const requestObj = {
    path: `api/conversations`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};

export const add_conversation_api = async (data) => {
  const requestObj = {
    path: `api/conversations`,
    method: "POST",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};
