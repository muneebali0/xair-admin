import React, { useState, useEffect } from "react";
import {
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useSnackbar } from "notistack";
import {
  add_airport_api,
  airport_detail_api,
  update_airport_api,
} from "../../DAL/AirPorts/AirPorts";
import { countries_list } from "../../utils/constant";
import MUIAutocomplete from "../../components/GeneralComponents/MUIAutocomplete";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function AddOrUpdateAirport() {
  let countries = countries_list.map((country) => country.label);
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();
  const { state } = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [formType, setFormType] = useState("ADD");
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    title: "",
    country_name: null,
    state_name: "",
    city_name: "",
    address_1: "",
    postal_code: "",
    status: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let formData = {
      title: inputs.title,
      country_name: inputs.country_name,
      state_name: inputs.state_name,
      city_name: inputs.city_name,
      address_1: inputs.address_1,
      postal_code: inputs.postal_code,
      status: inputs.status,
    };

    const result =
      formType === "ADD"
        ? await add_airport_api(formData)
        : await update_airport_api(formData, inputs._id);
    if (result.code === 200) {
      enqueueSnackbar(result.message, { variant: "success" });
      navigate(`/airports-list`);
    } else {
      enqueueSnackbar(result.message, { variant: "error" });
      setIsLoading(false);
    }
  };

  const getAirportDeatil = async () => {
    setIsLoading(true);
    const result = await airport_detail_api(params.airport_id);
    if (result.code === 200) {
      formatData(result.airport);
    } else {
      enqueueSnackbar(result.message, { variant: "error" });
      setIsLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleChangeOther = (name, value) => {
    setInputs((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const formatData = (data) => {
    setFormType("EDIT");
    setInputs(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (params.airport_id) {
      if (state) {
        formatData(state);
      } else {
        getAirportDeatil();
      }
    }
  }, []);

  if (isLoading) {
    return (
      <div className="circular-progress">
        <CircularProgress color="primary" />
      </div>
    );
  }

  return (
    <>
      <div className="container new-memories mt-5">
        <form onSubmit={handleSubmit}>
          <div className="col-12">
            <IconButton
              className="back-button-box mb-4"
              onClick={() => navigate(`/airports-list`)}
            >
              <ArrowBackIcon />
            </IconButton>
          </div>
          <h3>{`${formType == "ADD" ? "Add" : "Edit"} Airport`}</h3>
          <div className="row input-form">
            <div className="col-12 col-md-6">
              <TextField
                className="mt-4 form-control"
                id="title"
                label="Title"
                variant="outlined"
                name="title"
                value={inputs.title}
                required={true}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 col-md-6 mt-4">
              <MUIAutocomplete
                inputLabel="Country"
                selectedOption={inputs.country_name}
                setSelectedOption={(value) => {
                  handleChangeOther("country_name", value);
                }}
                optionsList={countries}
                autoComplete="new-password"
              />
            </div>
            <div className="col-12 col-md-6">
              <TextField
                className="mt-4 form-control"
                id="state_name"
                label="State"
                variant="outlined"
                name="state_name"
                value={inputs.state_name}
                required
                onChange={handleChange}
              />
            </div>
            <div className="col-12 col-md-6">
              <TextField
                className="mt-4 form-control"
                id="city_name"
                label="City"
                variant="outlined"
                name="city_name"
                value={inputs.city_name}
                required={true}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 col-md-6">
              <TextField
                className="mt-4 form-control"
                id="address_1"
                label="Address"
                variant="outlined"
                name="address_1"
                value={inputs.address_1}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 col-md-6">
              <TextField
                className="mt-4 form-control"
                type="number"
                id="postal_code"
                label="Postal Code"
                variant="outlined"
                name="postal_code"
                value={inputs.postal_code}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 col-md-6">
              <FormControl variant="outlined" className="mt-4 form-control">
                <InputLabel id="demo-simple-select-outlined-label">
                  Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  label="Status"
                  name="status"
                  className="mui-select"
                  value={inputs.status}
                  onChange={handleChange}
                >
                  <MenuItem value={true}>Active</MenuItem>
                  <MenuItem value={false}>Inactive</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="col-12 add--button text-end mt-3">
            <button disabled={isLoading}>
              {formType === "ADD" ? "Save" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
