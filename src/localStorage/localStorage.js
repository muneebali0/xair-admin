const _get_user_from_localStorage = () => {
    const user_profile = localStorage.getItem("user_data");
    if (
        user_profile &&
        user_profile !== undefined &&
        user_profile !== "undefined" &&
        user_profile !== null
    ) {
        return JSON.parse(localStorage.getItem("user_data"));
    } else {
        return {};
    }
};

module.exports = {
    _get_user_from_localStorage,
};