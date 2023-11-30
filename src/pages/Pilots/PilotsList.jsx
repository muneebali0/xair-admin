import { CircularProgress } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import CustomMUITable from "../../components/GeneralComponents/CustomMUITable/CustomMUITable";
import { baseUrl } from "../../config/config";
import moment from "moment/moment";
import { get_pilot_list_api } from "../../DAL/Pilots/Pilots";

export default function PassengersList() {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(true);
  const [pilotsList, setPilotsList] = useState([]);

  const get_pilots_list = async () => {
    const result = await get_pilot_list_api();
    if (result.code === 200) {
      const data = result.pilot_list.map((pilot) => {
        console.log(
          baseUrl + pilot.certificate_image,
          "baseUrl + pilot.certificate_image"
        );
        return {
          ...pilot,
          name: pilot.first_name + " " + pilot.last_name,
          certificate_image_avatar: {
            src: baseUrl + pilot.certificate_image,
            alt: pilot.name,
          },
          night_rating_file_avatar: {
            src: baseUrl + pilot.night_rating_file,
            alt: pilot.name,
          },
          birth_date: moment(pilot.date_of_birth).format("DD-MM-YYYY"),
        };
      });
      setPilotsList(data);
      setIsLoading(false);
    } else {
      enqueueSnackbar(result.message, { variant: "error" });
      setIsLoading(false);
    }
  };

  const TABLE_HEAD = [
    { id: "number", label: "#", type: "number" },
    { id: "name", label: "Name" },
    { id: "email", label: "Email" },
    { id: "phone_number", label: "Phone" },
    { id: "birth_date", label: "Birth Date" },
    {
      id: "certificate_image_avatar",
      label: "view license",
      type: "thumbnail",
    },
    {
      id: "night_rating_file_avatar",
      label: "Night Rating",
      type: "thumbnail",
    },
    { id: "status", label: "Status", type: "row_status" },
  ];

  useEffect(() => {
    get_pilots_list();
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
      <div className="container mt-3">
        <div className="row">
          <div className="col-12">
            <div className="theme-card p-3">
              <div className="d-flex justify-content-between light-border-bottom">
                <div className="mb-2 mui-table-heading">
                  <h2>Pilots List</h2>
                </div>
              </div>
              <CustomMUITable TABLE_HEAD={TABLE_HEAD} data={pilotsList} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
