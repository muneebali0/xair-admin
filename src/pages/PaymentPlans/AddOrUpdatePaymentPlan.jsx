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
import GeneralCkeditor from "../../components/GeneralComponents/GeneralCkeditor";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  add_payment_plan_api,
  payment_plan_detail_api,
  update_payment_plan_api,
} from "../../DAL/PaymentPlans/PaymentPlans";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function AddOrUpdatePaymentPlan({}) {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { plan_id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [formType, setFormType] = useState("ADD");

  const [inputs, setInputs] = useState({
    title: "",
    button_title: "",
    plan_price: "",
    short_description: "",
    detailed_description: "",
    recursion_type: "weekly",
    type: "free",
    status: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let formData = {
      title: inputs.title,
      button_title: inputs.button_title,
      status: inputs.status,
      type: inputs.type,
      short_description: inputs.short_description,
      detailed_description: inputs.detailed_description,
    };

    if (inputs.type == "paid") {
      formData.plan_price = inputs.plan_price;
      formData.recursion_type = inputs.recursion_type;
    }

    const result =
      formType === "ADD"
        ? await add_payment_plan_api(formData)
        : await update_payment_plan_api(formData, inputs._id);
    if (result.code === 200) {
      navigate("/payment-plans");
      enqueueSnackbar(result.message, { variant: "success" });
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

  const getPlanDeatil = async () => {
    setIsLoading(true);
    const result = await payment_plan_detail_api(plan_id);
    if (result.code === 200) {
      formatData(result.payment_plan);
    } else {
      enqueueSnackbar(result.message, { variant: "error" });
      setIsLoading(false);
    }
  };

  const formatData = (data) => {
    setFormType("EDIT");
    setInputs(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (plan_id) {
      if (state) {
        formatData(state);
      } else {
        getPlanDeatil();
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
              onClick={() => navigate("/payment-plans")}
            >
              <ArrowBackIcon />
            </IconButton>
          </div>
          <h3>{`${formType == "ADD" ? "Add" : "Edit"} Payment Plans`}</h3>
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
            <div className="col-12 col-md-6">
              <FormControl variant="outlined" className="mt-4 form-control">
                <InputLabel id="demo-simple-select-outlined-label">
                  Plan Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  label="Plan Type"
                  name="type"
                  className="mui-select"
                  value={inputs.type}
                  onChange={handleChange}
                >
                  <MenuItem value="free">Free</MenuItem>
                  <MenuItem value="paid">Paid</MenuItem>
                </Select>
              </FormControl>
            </div>
            {inputs.type == "paid" && (
              <>
                <div className="col-12 col-md-6">
                  <TextField
                    className="mt-4 form-control"
                    type="number"
                    id="plan_price"
                    label="Amount"
                    variant="outlined"
                    name="plan_price"
                    value={inputs.plan_price}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <FormControl variant="outlined" className="mt-4 form-control">
                    <InputLabel id="demo-simple-select-outlined-label">
                      Recurring Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      label="Recurring Type"
                      name="recursion_type"
                      className="mui-select"
                      value={inputs.recursion_type}
                      onChange={handleChange}
                    >
                      <MenuItem value="weekly">Weekly</MenuItem>
                      <MenuItem value="monthly">Monthly</MenuItem>
                      <MenuItem value="yearly">Yearly</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </>
            )}
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
            <div className="col-12 col-md-6">
              <TextField
                className="mt-4 form-control"
                id="button_title"
                label="Button Title"
                variant="outlined"
                name="button_title"
                value={inputs.button_title}
                required={true}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 mt-4">
              <h6>Short Description </h6>
              <GeneralCkeditor
                setInputs={setInputs}
                inputs={inputs}
                name="short_description"
                editorHeight={320}
              />
            </div>
            <div className="col-12 mt-4">
              <h6>Detail Description </h6>
              <GeneralCkeditor
                setInputs={setInputs}
                inputs={inputs}
                name="detailed_description"
                editorHeight={320}
              />
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
