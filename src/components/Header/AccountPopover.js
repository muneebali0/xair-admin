import React, { useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import PersonAdd from "@mui/icons-material/PersonAdd";
import KeyIcon from "@mui/icons-material/Key";
import Logout from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../config/config";
import ComponentPopup from "../GeneralComponents/ComponentPopup";
import ChangeMyPassword from "../LogedInUser/ChangeMyPassword";
import CustomDrawer from "../GeneralComponents/CustomDrawer";
import UpdateUserProfile from "../User/UpdateUserProfile";
import { useContentSetting } from "../../Hooks/ContentSetting";

export default function AccountPopover() {
  const [open, setOpen] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useContentSetting();

  const handleOpenDrawer = () => {
    setIsOpenDrawer(true);
  };
  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
  };

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const getMuiIcon = (name) => {
    return <ListItemIcon>{name}</ListItemIcon>;
  };

  const handleLogout = () => {
    localStorage.removeItem("user_data");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleOpenPasswordPopup = () => {
    setOpenPassword(true);
  };

  const handleClosePasswordPopup = () => {
    setOpenPassword(false);
  };

  const MENUES_ARRAY = [
    // {
    //   title: "Update Profile",
    //   icon: getMuiIcon(<PersonAdd fontSize="small" />),
    //   handleClickMenu: handleOpenDrawer,
    // },
    // {
    //   title: "Change Password",
    //   icon: getMuiIcon(<KeyIcon fontSize="small" />),
    //   handleClickMenu: handleOpenPasswordPopup,
    // },
    {
      title: "Logout",
      icon: getMuiIcon(<Logout fontSize="small" />),
      handleClickMenu: handleLogout,
    },
  ];

  return (
    <>
      <Box className="account-popover-box">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Avatar
            className="account-popover-avatar-img"
            sx={{ width: 32, height: 32 }}
            src={baseUrl + userInfo?.profile_image}
          >
            {userInfo?.name[0]}
          </Avatar>
        </IconButton>
      </Box>
      <Menu
        className="account-menu-box"
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <div class="user-profile-name">
          <h5>{userInfo?.name}</h5>
          <h6>{userInfo?.email}</h6>
        </div>
        <Divider />
        {MENUES_ARRAY.length > 0 &&
          MENUES_ARRAY.map((item, index) => {
            return (
              <MenuItem onClick={item.handleClickMenu} key={index}>
                {item.icon}
                {item.title}
              </MenuItem>
            );
          })}
      </Menu>
      <ComponentPopup
        openPopup={openPassword}
        setOpenPopup={setOpenPassword}
        title="Change Password"
        componentToPassDown={
          <ChangeMyPassword handleClose={handleClosePasswordPopup} />
        }
      />
      <CustomDrawer
        isOpenDrawer={isOpenDrawer}
        onOpenDrawer={handleOpenDrawer}
        onCloseDrawer={handleCloseDrawer}
        pageTitle="Update Profile"
        componentToPassDown={
          <UpdateUserProfile
            onCloseDrawer={handleCloseDrawer}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
          />
        }
      />
    </>
  );
}
