import { invokeApi } from "../../bl_libs/invokeApi";

export const get_airport_list_api = async () => {
  const requestObj = {
    path: `api/airport/get_airport_list`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};

export const add_airport_api = async (data) => {
  const requestObj = {
    path: `api/airport/add`,
    method: "POST",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};

export const update_airport_api = async (data, airport_id) => {
  const requestObj = {
    path: `api/airport/update/${airport_id}`,
    method: "PUT",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};

export const airport_detail_api = async (airport_id) => {
  const requestObj = {
    path: `api/airport/get_airport/${airport_id}`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};

export const students_all_reports_list_api = async (page, limit, data) => {
  const requestObj = {
    path: `api/teachers/students_all_reports_list?page=${page}&limit=${limit}`,
    method: "POST",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};

export const update_student_report_api = async (data, airport_id) => {
  const requestObj = {
    path: `api/student_reports/${airport_id}`,
    method: "PUT",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};

export const delete_airport_api = async (airport_id) => {
  const requestObj = {
    path: `api/airport/delete/${airport_id}`,
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
