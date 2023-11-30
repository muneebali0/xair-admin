import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useSnackbar } from "notistack";
import MUIAutocomplete from "../GeneralComponents/MUIAutocomplete";
import { students_list_api } from "../../DAL/Students/Students";
import {
  add_student_report_api,
  students_prayer_lessons_api,
  update_student_report_api,
} from "../../DAL/StudentReports/StudentReports";
import moment from "moment";
import { countries_list } from "../../utils/constant";
import { baseUrl } from "../../config/config";
import { useContentSetting } from "../../Hooks/ContentSetting";

export default function AddOrUpdateAirport({
  onCloseDrawer,
  setReportsList,
  formType,
  selectedObject,
  reportsList,
}) {
  let countries = countries_list.map((country) => country.label);
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentsList, setStudentsList] = useState([]);
  const [prayerLessonsList, setPrayerLessonsList] = useState([]);
  const [studentPrayerLesson, setStudentPrayerLesson] = useState([]);
  const { userInfo } = useContentSetting();
  const [state, setState] = useState({
    title: "",
    country: null,
    state: "",
    city: "",
    address: "",
    zipcode: "",
    status: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let formData = {
      title: state.title,
      country: state.country,
      state: state.state,
      city: state.city,
      address: state.address,
      zipcode: state.zipcode,
      status: state.status,
    };

    const result =
      formType === "ADD"
        ? await add_student_report_api(formData)
        : await update_student_report_api(formData, state._id);
    if (result.code === 200) {
      let new_report = result.student_report;
      new_report.student_name = new_report.student?.name;
      new_report.quran_title = new_report.title ? new_report.title : "";
      new_report.quran_address = new_report.address ? new_report.address : "";
      new_report.action_info_name = new_report.action_info?.name;
      new_report.report_date = moment(new_report.createdAt).format(
        "DD-MM-YYYY"
      );
      new_report.reference = `${
        new_report.status == "quran"
          ? "Part (" + new_report.title + ") Verse (" + new_report.address + ")"
          : ""
      }`;
      new_report.status_name = `${
        new_report.status == "quran" ? "Holy Quran" : "Noorani Quadia"
      } `;

      if (formType === "ADD") {
        setReportsList((reportsList) => [new_report, ...reportsList]);
      } else {
        const newState = reportsList.map((obj) => {
          if (obj._id === state._id) {
            return result.student_report;
          }
          return obj;
        });
        setReportsList(newState);
      }
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
      setSelectedStudent(selectedObject.student);
    }
  }, [formType]);

  return (
    <>
      <div className="container new-memories">
        <form onSubmit={handleSubmit}>
          <div className="row input-form">
            <div className="col-12 col-md-6">
              <TextField
                className="mt-4 form-control"
                id="title"
                label="Title"
                variant="outlined"
                name="title"
                value={state.title}
                required={true}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="col-12 col-md-6 mt-4">
              <MUIAutocomplete
                inputLabel="Country"
                selectedOption={state.country}
                setSelectedOption={(value) => {
                  handleChangeOther("country", value);
                }}
                optionsList={countries}
                autoComplete="off"
              />
            </div>
            <div className="col-12 col-md-6">
              <TextField
                className="mt-4 form-control"
                id="state"
                label="State"
                variant="outlined"
                name="state"
                value={state.state}
                required
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="col-12 col-md-6">
              <TextField
                className="mt-4 form-control"
                type="number"
                id="city"
                label="City"
                variant="outlined"
                name="city"
                value={state.city}
                required={true}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="col-12 col-md-6">
              <TextField
                className="mt-4 form-control"
                id="address"
                label="Address"
                variant="outlined"
                name="address"
                value={state.address}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="col-12 col-md-6">
              <TextField
                className="mt-4 form-control"
                type="number"
                id="zipcode"
                label="zipcode"
                variant="outlined"
                name="zipcode"
                value={state.zipcode}
                onChange={(e) => handleChange(e)}
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
                  value={state.status}
                  onChange={(e) => handleChange(e)}
                >
                  <MenuItem value={true}>Active</MenuItem>
                  <MenuItem value={false}>Inactive</MenuItem>
                </Select>
              </FormControl>
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
