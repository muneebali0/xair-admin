import { invokeApi } from "../../bl_libs/invokeApi";

export const login_api = async (data) => {
  const requestObj = {
    path: `admin_users`,
    method: "POST",
    headers: {
      // 'x-sh-auth': 1234
    },
    postData: data,
  };
  return invokeApi(requestObj);
};
