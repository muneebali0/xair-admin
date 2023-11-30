import { CircularProgress } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import ConfirmationPopup from "../../components/GeneralComponents/ConfirmationPopup";
import CustomMUITable from "../../components/GeneralComponents/CustomMUITable/CustomMUITable";
import { useNavigate } from "react-router-dom";
import {
  delete_plan_api,
  get_plans_list_api,
} from "../../DAL/PaymentPlans/PaymentPlans";

export default function PaymentPlans() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [plansList, setPlansList] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedObject, setSelectedObject] = useState({});

  const get_plans_list = async () => {
    const result = await get_plans_list_api();
    if (result.code === 200) {
      setPlansList(result.payment_plans);
      setIsLoading(false);
    } else {
      enqueueSnackbar(result.message, { variant: "error" });
      setIsLoading(false);
    }
  };

  const TABLE_HEAD = [
    { id: "number", label: "#", type: "number" },
    { id: "title", label: "Title" },
    { id: "type", label: "Plan Type", className: "text-capitalize" },
    { id: "plan_price", label: "Amount" },
    {
      id: "recursion_type",
      label: "Recurring Type",
      className: "text-capitalize",
    },
    { id: "status", label: "Status", type: "row_status" },
    { id: "action", label: "Action", type: "action" },
  ];

  const handleEdit = (value) => {
    navigate(`/payment-plans/edit-plan/${value._id}`, {
      state: value,
    });
  };

  const handleAgreeDelete = (data) => {
    setSelectedObject(data);
    setOpenDelete(true);
  };

  const handleAddPlan = () => {
    navigate(`/payment-plans/add-plan`);
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
    const result = await delete_plan_api(selectedObject._id);
    if (result.code === 200) {
      const data = plansList.filter((plan) => plan._id !== selectedObject._id);
      setPlansList(data);
      enqueueSnackbar(result.message, { variant: "success" });
    } else {
      enqueueSnackbar(result.message, { variant: "error" });
    }
  };

  useEffect(() => {
    get_plans_list();
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
                  <h2>Payment Plans List</h2>
                </div>
                <div className="add--button mb-3">
                  <button onClick={handleAddPlan}>Add Payment Plan</button>
                </div>
              </div>
              <CustomMUITable
                TABLE_HEAD={TABLE_HEAD}
                data={plansList}
                MENU_OPTIONS={MENU_OPTIONS}
              />
            </div>
          </div>
        </div>
      </div>

      <ConfirmationPopup
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
        title={"Are you sure you want to delete this plan?"}
        handleAgree={handleDelete}
      />
    </>
  );
}
