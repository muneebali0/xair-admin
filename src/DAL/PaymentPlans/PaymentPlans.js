import { invokeApi } from "../../bl_libs/invokeApi";

export const get_plans_list_api = async () => {
  const requestObj = {
    path: `api/payment_plan/list`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};

export const add_payment_plan_api = async (data) => {
  const requestObj = {
    path: `api/payment_plan/add`,
    method: "POST",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};

export const update_payment_plan_api = async (data, plan_id) => {
  const requestObj = {
    path: `api/payment_plan/update/${plan_id}`,
    method: "PUT",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
    postData: data,
  };
  return invokeApi(requestObj);
};

export const payment_plan_detail_api = async (plan_id) => {
  const requestObj = {
    path: `api/payment_plan/get/${plan_id}`,
    method: "GET",
    headers: {
      "x-sh-auth": localStorage.getItem("token"),
    },
  };
  return invokeApi(requestObj);
};

export const delete_plan_api = async (plan_id) => {
  const requestObj = {
    path: `api/payment_plan/delete/${plan_id}`,
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
