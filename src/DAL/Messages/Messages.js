import { invokeApi } from "../../bl_libs/invokeApi";

export const messages_list_api = async (conversation_id) => {
  const requestObj = {
    path: `api/messages/${conversation_id}`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};

export const add_messages_api = async (data) => {
  const requestObj = {
    path: `api/messages`,
    method: "POST",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};

export const update_student_report_api = async (data, student_report_id) => {
  const requestObj = {
    path: `api/student_reports/${student_report_id}`,
    method: "PUT",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};

export const delete_student_report_api = async (student_report_id) => {
  const requestObj = {
    path: `api/student_reports/${student_report_id}`,
    method: "DELETE",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};

export const students_prayer_lessons_api = async (student_id) => {
  const requestObj = {
    path: `api/prayer_lesson/prayer_lesson/${student_id}`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};
