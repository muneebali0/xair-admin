import { invokeApi } from "../../bl_libs/invokeApi";

export const get_member_list_api = async () => {
  const requestObj = {
    path: `api/member/get_member_list`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};

export const add_student_api = async (data) => {
  const requestObj = {
    path: `api/students`,
    method: "POST",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
      "Content-Type": "multipart/form-data",
    },
    postData: data,
  };
  return invokeApi(requestObj);
};

export const change_student_password_api = async (student_id, data) => {
  const requestObj = {
    path: `api/students/change_password/${student_id}`,
    method: "POST",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};

export const update_student_api = async (data, student_id) => {
  const requestObj = {
    path: `api/students/${student_id}`,
    method: "PUT",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
      "Content-Type": "multipart/form-data",
    },
    postData: data,
  };
  return invokeApi(requestObj);
};

export const delete_student_api = async (student_id) => {
  const requestObj = {
    path: `api/students/${student_id}`,
    method: "DELETE",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};
