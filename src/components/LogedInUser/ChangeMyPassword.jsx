import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { useSnackbar } from 'notistack';
import React, { useState } from 'react'
import { change_password_api } from '../../DAL/Users/Users';

export default function ChangeMyPassword({ handleClose }) {
    const [isLoading, setIsLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar()
    const [state, setState] = useState({
        new_password: "",
        confirm_password: "",
        passwordType: "password",
    });

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
            passwordType: state.passwordType == 'text' ? 'password' : 'text',
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData();
        formData.append("new_password", state.new_password);
        formData.append("confirm_password", state.confirm_password);

        const result = await change_password_api(formData);
        if (result.code === 200) {
            enqueueSnackbar(result.message, { variant: "success" });
            handleClose();
        } else {
            enqueueSnackbar(result.message, { variant: "error" });
            setIsLoading(false);
        }
    };


    return (
        <div className='change-my-password'>
            <form className='input-form' onSubmit={handleSubmit}>
                <TextField
                    type={state.passwordType}
                    className="mt-3 form-control"
                    id="new_password"
                    label="New Password"
                    size='small'
                    variant="outlined"
                    name="new_password"
                    value={state.new_password}
                    required={true}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                className="visibility-password"
                            >
                                {state.passwordType === 'text' ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }}
                    onChange={(e) => handleChange(e)}
                />
                <TextField
                    type={state.passwordType}
                    className="mt-3 form-control"
                    id="confirm_password"
                    label="Confirm Password"
                    size='small'
                    variant="outlined"
                    name="confirm_password"
                    value={state.confirm_password}
                    required={true}
                    onChange={(e) => handleChange(e)}
                />
                <div className="add--button text-end mt-3">
                    <button disabled={isLoading}>
                        {isLoading
                            ? "Saving..."
                            : "Save"
                        }
                    </button>
                </div>
            </form>
        </div>
    )
}
