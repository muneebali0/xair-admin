import { invokeApi } from "../../bl_libs/invokeApi";

export const get_pilot_list_api = async () => {
  const requestObj = {
    path: `api/pilot/get_pilot_list`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};
