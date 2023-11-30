import { CircularProgress } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import CustomMUITable from "../../components/GeneralComponents/CustomMUITable/CustomMUITable";
import { baseUrl } from "../../config/config";
import { get_member_list_api } from "../../DAL/Passenger/Passenger";
import moment from "moment/moment";

export default function PilotsList() {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(true);
  const [passengersList, setPassengersList] = useState([]);

  const get_passenger_list = async () => {
    const result = await get_member_list_api();
    if (result.code === 200) {
      const data = result.member_list.map((member) => {
        return {
          ...member,
          name: member.first_name + " " + member.last_name,
          table_avatar: {
            src: baseUrl + member.profile_image,
            alt: member.name,
          },
          birth_date: moment(member.date_of_birth).format("DD-MM-YYYY"),
        };
      });
      setPassengersList(data);
      setIsLoading(false);
    } else {
      enqueueSnackbar(result.message, { variant: "error" });
      setIsLoading(false);
    }
  };

  const TABLE_HEAD = [
    { id: "number", label: "#", alignRight: false, type: "number" },
    { id: "name", label: "Name", alignRight: false },
    { id: "email", label: "Email", alignRight: false },
    { id: "phone_number", label: "Phone", alignRight: false },
    { id: "birth_date", label: "Birth Date", alignRight: false },
    { id: "status", label: "Status", type: "row_status" },
  ];

  useEffect(() => {
    get_passenger_list();
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
                  <h2>Passengers List</h2>
                </div>
              </div>
              <CustomMUITable TABLE_HEAD={TABLE_HEAD} data={passengersList} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
