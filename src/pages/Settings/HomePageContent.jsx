import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useSnackbar } from "notistack";
// import {
//   add_student_report_api,
//   update_student_report_api,
// } from "../../DAL/StudentReports/StudentReports";
import moment from "moment";
import { countries_list } from "../../utils/constant";
import { useContentSetting } from "../../Hooks/ContentSetting";
import MUIAutocomplete from "../../components/GeneralComponents/MUIAutocomplete";
import GeneralCkeditor from "../../components/GeneralComponents/GeneralCkeditor";

export default function HomePageContent({
  onCloseDrawer,
  setReportsList,
  formType,
  selectedObject,
  reportsList,
}) {
  let countries = countries_list.map((country) => country.label);
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({
    banner_button_title: "",
    banner_button_link: "",
    fly_4x_more_button_title: "",
    fly_4x_more_button_link: "",
    get_around_fast_button_title: "",
    googe_play_store_link: "",
    get_around_fast_button_link: "",
    apple_store_link: "",
    country: null,
    state: "",
    city: "",
    address: "",
    zipcode: "",
    amount: "",
    short_description: "",
    detail_description: "",
    recurring_type: "weekly",
    type: "free",
    status: true,
    header_logo: {},
    banner_image: {},
    pilots_icon: {},
    passengers_icon: {},
    ride_hailing_app_icon: {},
    fly_4x_more_image: {},
    get_around_fast_image: {},
    google_play_icon: {},
    apple_store_icon: {},
    footer_logo: {},
  });

  const handleChangeFile = (event) => {
    const name = event.target.name;
    const value = event.target.files[0];
    setState((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let formData = {
      banner_button_title: state.banner_button_title,
      banner_button_link: state.banner_button_link,
      fly_4x_more_button_title: state.fly_4x_more_button_title,
      fly_4x_more_button_link: state.fly_4x_more_button_link,
      get_around_fast_button_title: state.get_around_fast_button_title,
      googe_play_store_link: state.googe_play_store_link,
      get_around_fast_button_link: state.get_around_fast_button_link,
      apple_store_link: state.apple_store_link,
      country: state.country,
      state: state.state,
      city: state.city,
      address: state.address,
      zipcode: state.zipcode,
      amount: state.amount,
      recurring_type: state.recurring_type,
      status: state.status,
      type: state.type,
      short_description: state.short_description,
      detail_description: state.detail_description,
      header_logo: state.header_logo,
      banner_image: state.banner_image,
      pilots_icon: state.pilots_icon,
      passengers_icon: state.passengers_icon,
      ride_hailing_app_icon: state.ride_hailing_app_icon,
      fly_4x_more_image: state.fly_4x_more_image,
      get_around_fast_image: state.get_around_fast_image,
      google_play_icon: state.google_play_icon,
      apple_store_icon: state.apple_store_icon,
      footer_logo: state.footer_logo,
    };

    // const result =
    //   formType === "ADD"
    //     ? await add_student_report_api(formData)
    //     : await update_student_report_api(formData, state._id);
    // if (result.code === 200) {
    //   let new_report = result.student_report;
    //   new_report.student_name = new_report.student?.name;
    //   new_report.quran_title = new_report.title ? new_report.title : "";
    //   new_report.quran_address = new_report.address ? new_report.address : "";
    //   new_report.action_info_name = new_report.action_info?.name;
    //   new_report.report_date = moment(new_report.createdAt).format(
    //     "DD-MM-YYYY"
    //   );
    //   new_report.reference = `${
    //     new_report.status == "quran"
    //       ? "Part (" + new_report.title + ") Verse (" + new_report.address + ")"
    //       : ""
    //   }`;
    //   new_report.status_name = `${
    //     new_report.status == "quran" ? "Holy Quran" : "Noorani Quadia"
    //   } `;

    //   if (formType === "ADD") {
    //     setReportsList((reportsList) => [new_report, ...reportsList]);
    //   } else {
    //     const newState = reportsList.map((obj) => {
    //       if (obj._id === state._id) {
    //         return result.student_report;
    //       }
    //       return obj;
    //     });
    //     setReportsList(newState);
    //   }
    //   onCloseDrawer();
    //   enqueueSnackbar(result.message, { variant: "success" });
    // } else {
    //   enqueueSnackbar(result.message, { variant: "error" });
    //   setIsLoading(false);
    // }
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

  const handleChangeOther = (name, value) => {
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    if (formType == "EDIT") {
      setState(selectedObject);
    }
  }, [formType]);

  return (
    <>
      <div className="container new-memories mt-3 theme-card p-4">
        <form onSubmit={handleSubmit}>
          <h3>Home Page Content</h3>
          <div className="row input-form">
            <div className={"col-12 col-md-6 mt-3"}>
              <label htmlFor="header_logo">Header Logo</label>
              <input
                type="file"
                id="header_logo"
                name="header_logo"
                className="mt-1 form-control"
                onChange={handleChangeFile}
              />
            </div>
            <div className={"col-12 col-md-6 mt-3"}>
              <label htmlFor="banner_image">Banner Image</label>
              <input
                type="file"
                id="banner_image"
                name="banner_image"
                className="mt-1 form-control"
                onChange={handleChangeFile}
              />
            </div>
            <div className={"col-12 col-md-6 mt-3"}>
              <label htmlFor="pilots_icon">Pilots Icon</label>
              <input
                type="file"
                id="pilots_icon"
                name="pilots_icon"
                className="mt-1 form-control"
                onChange={handleChangeFile}
              />
            </div>
            <div className={"col-12 col-md-6 mt-3"}>
              <label htmlFor="passengers_icon">Passengers Icon</label>
              <input
                type="file"
                id="passengers_icon"
                name="passengers_icon"
                className="mt-1 form-control"
                onChange={handleChangeFile}
              />
            </div>
            <div className={"col-12 col-md-6 mt-3"}>
              <label htmlFor="ride_hailing_app_icon">
                Ride Hailing App Icon
              </label>
              <input
                type="file"
                id="ride_hailing_app_icon"
                name="ride_hailing_app_icon"
                className="mt-1 form-control"
                onChange={handleChangeFile}
              />
            </div>
            <div className={"col-12 col-md-6 mt-3"}>
              <label htmlFor="fly_4x_more_image">Fly 4x More Image</label>
              <input
                type="file"
                id="fly_4x_more_image"
                name="fly_4x_more_image"
                className="mt-1 form-control"
                onChange={handleChangeFile}
              />
            </div>
            <div className={"col-12 col-md-6 mt-3"}>
              <label htmlFor="get_around_fast_image">
                GET AROUND FAST Image
              </label>
              <input
                type="file"
                id="get_around_fast_image"
                name="get_around_fast_image"
                className="mt-1 form-control"
                onChange={handleChangeFile}
              />
            </div>
            <div className={"col-12 col-md-6 mt-3"}>
              <label htmlFor="google_play_icon">Google Play Store Icon</label>
              <input
                type="file"
                id="google_play_icon"
                name="google_play_icon"
                className="mt-1 form-control"
                onChange={handleChangeFile}
              />
            </div>
            <div className={"col-12 col-md-6 mt-3"}>
              <label htmlFor="apple_store_icon">Apple Store Icon</label>
              <input
                type="file"
                id="apple_store_icon"
                name="apple_store_icon"
                className="mt-1 form-control"
                onChange={handleChangeFile}
              />
            </div>
            <div className={"col-12 col-md-6 mt-3"}>
              <label htmlFor="footer_logo">Footer Logo</label>
              <input
                type="file"
                id="footer_logo"
                name="footer_logo"
                className="mt-1 form-control"
                onChange={handleChangeFile}
              />
            </div>
            <div className="col-12 col-md-6">
              <TextField
                className="mt-4 form-control"
                id="banner_button_title"
                label="Banner Button Title"
                variant="outlined"
                name="banner_button_title"
                value={state.banner_button_title}
                required={true}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 col-md-6">
              <TextField
                className="mt-4 form-control"
                id="banner_button_link"
                label="Banner Button Link"
                variant="outlined"
                name="banner_button_link"
                value={state.banner_button_link}
                required={true}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 col-md-6">
              <TextField
                className="mt-4 form-control"
                id="fly_4x_more_button_title"
                label="Fly 4x More Button Title"
                variant="outlined"
                name="fly_4x_more_button_title"
                value={state.fly_4x_more_button_title}
                required={true}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 col-md-6">
              <TextField
                className="mt-4 form-control"
                id="fly_4x_more_button_link"
                label="Fly 4x More Button Link"
                variant="outlined"
                name="fly_4x_more_button_link"
                value={state.fly_4x_more_button_link}
                required={true}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 col-md-6">
              <TextField
                className="mt-4 form-control"
                id="get_around_fast_button_title"
                label="Get Around Button Title"
                variant="outlined"
                name="get_around_fast_button_title"
                value={state.get_around_fast_button_title}
                required={true}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 col-md-6">
              <TextField
                className="mt-4 form-control"
                id="get_around_fast_button_link"
                label="Get Around Button Link"
                variant="outlined"
                name="get_around_fast_button_link"
                value={state.get_around_fast_button_link}
                required={true}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 col-md-6">
              <TextField
                className="mt-4 form-control"
                id="googe_play_store_link"
                label="Googe Play Store Link"
                variant="outlined"
                name="googe_play_store_link"
                value={state.googe_play_store_link}
                required={true}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 col-md-6">
              <TextField
                className="mt-4 form-control"
                id="apple_store_link"
                label="Apple Store Link"
                variant="outlined"
                name="apple_store_link"
                value={state.apple_store_link}
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
                  value={state.type}
                  onChange={handleChange}
                >
                  <MenuItem value="free">Free</MenuItem>
                  <MenuItem value="paid">Paid</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="col-12 col-md-6">
              <TextField
                className="mt-4 form-control"
                type="number"
                id="amount"
                label="Amount"
                variant="outlined"
                name="amount"
                value={state.amount}
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
                  name="recurring_type"
                  className="mui-select"
                  value={state.recurring_type}
                  onChange={handleChange}
                >
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                  <MenuItem value="yearly">Yearly</MenuItem>
                </Select>
              </FormControl>
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
                  value={state.status}
                  onChange={handleChange}
                >
                  <MenuItem value={true}>Active</MenuItem>
                  <MenuItem value={false}>Inactive</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="col-12 mt-4">
              <h6>Short Description </h6>
              <GeneralCkeditor
                setInputs={setState}
                inputs={state}
                name="short_description"
                editorHeight={320}
              />
            </div>
            <div className="col-12 mt-4">
              <h6>Detail Description </h6>
              <GeneralCkeditor
                setInputs={setState}
                inputs={state}
                name="detail_description"
                editorHeight={320}
              />
            </div>
          </div>

          <div className="col-12 add--button text-end mt-3">
            <button disabled={isLoading}>
              {isLoading
                ? formType === "ADD"
                  ? "Saving..."
                  : "Updating..."
                : formType === "ADD"
                ? "Save"
                : "Update"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
