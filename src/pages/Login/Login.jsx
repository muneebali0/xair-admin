import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logo } from "../../assets";
import { login_api } from "../../DAL/Login/Login";
import { useContentSetting } from "../../Hooks/ContentSetting";

export default function Login() {
  const { setUserInfo } = useContentSetting();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({
    email: "",
    password: "",
    passwordType: "password",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      email: state.email,
      password: state.password,
    };
    const result = await login_api(data);
    if (result.code === 200) {
      setUserInfo(result.adminUser);
      localStorage.setItem(`user_data`, JSON.stringify(result.adminUser));
      localStorage.setItem("token", result.token);
      navigate(`/dashboard`);
    } else {
      enqueueSnackbar("Invalid Credentials", { variant: "error" });
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

  const handleClickShowPassword = () => {
    setState({
      ...state,
      passwordType: state.passwordType == "text" ? "password" : "text",
    });
  };

  return (
    <div className="login-card">
      <div className="theme-card p-4">
        <div className="login-logo light-border-bottom p-3">
          <img src={logo} alt="" className="app-logo" />
        </div>
        <div className="login-form">
          <p className="mt-3">Sign in to start your session</p>
          <form onSubmit={handleSubmit}>
            <div className="row input-form">
              <div className="col-12">
                <TextField
                  className="form-control"
                  type="email"
                  id="email"
                  label="Email"
                  variant="outlined"
                  name="email"
                  value={state.email}
                  required
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="col-12">
                <TextField
                  className="mt-4 form-control"
                  id="password"
                  type={state.passwordType}
                  label="Password"
                  variant="outlined"
                  name="password"
                  value={state.password}
                  required={true}
                  onChange={(e) => handleChange(e)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          className="visibility-password"
                        >
                          {state.passwordType === "text" ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>
            <div className="add--button login-button-box text-end mt-3">
              <button disabled={isLoading}>
                {isLoading ? <CircularProgress /> : "Sign In"}
              </button>
            </div>
          </form>
        </div>
        <div className="developed-by">
          <p>Developed By X Air</p>
        </div>
      </div>
    </div>
  );
}
