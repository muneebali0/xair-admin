import { CircularProgress } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import ConfirmationPopup from "../../components/GeneralComponents/ConfirmationPopup";
import CustomMUITable from "../../components/GeneralComponents/CustomMUITable/CustomMUITable";
import { useNavigate } from "react-router-dom";
import {
  delete_airport_api,
  get_airport_list_api,
} from "../../DAL/AirPorts/AirPorts";

export default function AirportsList() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [airportsList, setAirportsList] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedObject, setSelectedObject] = useState({});

  const get_airports_list = async () => {
    const result = await get_airport_list_api();
    if (result.code === 200) {
      const data = result.airports.map((airport) => {
        let address = airport.address_1 + " " + airport.city_name;
        return {
          ...airport,
          address: address,
        };
      });
      setAirportsList(data);
      setIsLoading(false);
    } else {
      enqueueSnackbar(result.message, { variant: "error" });
      setIsLoading(false);
    }
  };

  const TABLE_HEAD = [
    { id: "number", label: "#", alignRight: false, type: "number" },
    { id: "title", label: "Title", alignRight: false },
    { id: "country_name", label: "Country", alignRight: false },
    { id: "state_name", label: "State / Region", alignRight: false },
    { id: "address", label: "Address", alignRight: false },
    { id: "postal_code", label: "Postal Code", alignRight: false },
    { id: "status", label: "Status", type: "row_status" },
    { id: "action", label: "Action", alignRight: false, type: "action" },
  ];

  const handleAddAirport = () => {
    navigate(`/airports-list/add-airport`);
  };

  const handleEdit = (value) => {
    navigate(`/airports-list/edit-airport/${value._id}`, {
      state: value,
    });
  };

  const handleAgreeDelete = (data) => {
    setSelectedObject(data);
    setOpenDelete(true);
  };

  const MENU_OPTIONS = [
    {
      label: "Edit",
      icon: "akar-icons:edit",
      handleClick: handleEdit,
    },
    {
      label: "Delete",
      icon: "ant-design:delete-twotone",
      handleClick: handleAgreeDelete,
    },
  ];

  const handleDelete = async () => {
    setOpenDelete(false);
    const result = await delete_airport_api(selectedObject._id);
    if (result.code === 200) {
      const data = airportsList.filter(
        (report) => report._id !== selectedObject._id
      );
      setAirportsList(data);
      enqueueSnackbar(result.message, { variant: "success" });
    } else {
      enqueueSnackbar(result.message, { variant: "error" });
    }
  };

  useEffect(() => {
    get_airports_list();
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
                  <h2>Airports List</h2>
                </div>
                <div className="add--button mb-3">
                  <button onClick={handleAddAirport}>Add Airport</button>
                </div>
              </div>

              <CustomMUITable
                TABLE_HEAD={TABLE_HEAD}
                data={airportsList}
                MENU_OPTIONS={MENU_OPTIONS}
              />
            </div>
          </div>
        </div>
      </div>

      <ConfirmationPopup
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
        title={"Are you sure you want to delete this report?"}
        handleAgree={handleDelete}
      />
    </>
  );
}
