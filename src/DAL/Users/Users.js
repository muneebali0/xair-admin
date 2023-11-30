import { invokeApi } from "../../bl_libs/invokeApi";

export const users_list_api = async () => {
    const requestObj = {
        path: `api/admin_users`,
        method: "GET",
        headers: {
            'x-sh-auth': localStorage.getItem("token")
        },
    };
    return invokeApi(requestObj);
};

export const add_user_api = async (data) => {
    const requestObj = {
        path: `api/admin_users`,
        method: "POST",
        headers: {
            'x-sh-auth': localStorage.getItem("token"),
            'Content-Type': 'multipart/form-data'
        },
        postData: data,
    };
    return invokeApi(requestObj);
};

export const update_user_profile = async (data) => {
    const requestObj = {
        path: `api/teachers/update_profile`,
        method: "POST",
        headers: {
            'x-sh-auth': localStorage.getItem("token"),
            'Content-Type': 'multipart/form-data'
        },
        postData: data,
    };
    return invokeApi(requestObj);
};

export const change_password_api = async (data) => {
    const requestObj = {
        path: `api/teachers/change_my_password`,
        method: "POST",
        headers: {
            'x-sh-auth': localStorage.getItem("token"),
        },
        postData: data,
    };
    return invokeApi(requestObj);
};

export const change_admin_password_api = async (admin_id, data) => {
    const requestObj = {
        path: `api/admin_users/change_admin_password/${admin_id}`,
        method: "POST",
        headers: {
            'x-sh-auth': localStorage.getItem("token"),
        },
        postData: data,
    };
    return invokeApi(requestObj);
};

export const update_user_api = async (data, admin_id) => {
    const requestObj = {
        path: `api/admin_users/${admin_id}`,
        method: "PUT",
        headers: {
            'x-sh-auth': localStorage.getItem("token"),
            'Content-Type': 'multipart/form-data'
        },
        postData: data,
    };
    return invokeApi(requestObj);
};

export const delete_user_api = async (admin_id) => {
    const requestObj = {
        path: `api/admin_users/${admin_id}`,
        method: "DELETE",
        headers: {
            'x-sh-auth': localStorage.getItem("token")
        },
    };
    return invokeApi(requestObj);
};