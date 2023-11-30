import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { update_user_profile } from "../../DAL/Users/Users";
import { useSnackbar } from "notistack";
import { baseUrl } from "../../config/config";

export default function UpdateUserProfile({
  onCloseDrawer,
  userInfo,
  setUserInfo,
}) {
  const { enqueueSnackbar } = useSnackbar();
  const [previews, setPreviews] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState("");
  const [state, setState] = useState({
    name: "",
    phone: 0,
  });

  const handleRemove = () => {
    setPreviews("");
    setImage("");
  };

  const handleUpload = (event) => {
    setImage(event.target.files[0]);
    const preview = URL.createObjectURL(event.target.files[0]);
    setPreviews(preview);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("name", state.name);
    formData.append("phone", state.phone);
    if (image) {
      formData.append("profile_image", image);
    }
    const result = await update_user_profile(formData);

    if (result.code === 200) {
      setUserInfo(result.teacher_user);
      localStorage.setItem(`teacher_user`, JSON.stringify(result.teacher_user));
      onCloseDrawer();
      enqueueSnackbar(result.message, { variant: "success" });
    } else {
      enqueueSnackbar(result.message, { variant: "error" });
      setIsLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    setState(userInfo);
    if (userInfo.profile_image) {
      setPreviews(baseUrl + userInfo.profile_image);
    }
  }, []);

  return (
    <>
      <div className="container new-memories">
        <form onSubmit={handleSubmit}>
          <div className="row input-form">
            <div className="col-12 col-md-6">
              <TextField
                className="mt-4 form-control"
                id="outlined-basic"
                label="Name"
                variant="outlined"
                name="name"
                value={state.name}
                required={true}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="col-12 col-md-6">
              <TextField
                type="number"
                className="mt-4 form-control"
                id="outlined-basic"
                label="Name"
                variant="outlined"
                name="name"
                value={state.phone}
                required={true}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="col-md-12 mt-3 d-flex">
              {previews && (
                <span className="upload-file-preview mt-3">
                  <span onClick={handleRemove}>x</span>
                  <img src={previews} />
                </span>
              )}
              {previews == "" && (
                <span className="upload-button mt-2">
                  <input
                    color="primary"
                    accept="image/*"
                    type="file"
                    id="icon-button-file"
                    style={{ display: "none" }}
                    name="affirmationImage"
                    onChange={handleUpload}
                  />
                  <label htmlFor="icon-button-file">
                    <CloudUploadIcon />
                  </label>
                </span>
              )}
            </div>
          </div>
          <div className="add--button text-end mt-3">
            <button disabled={isLoading}>
              {isLoading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
