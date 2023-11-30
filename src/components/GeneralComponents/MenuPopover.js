import { Menu } from "@mui/material";
import React from "react";

export default function MenuPopover({ handleClose, menu, data }) {
  return (
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
      {menu.length > 0 &&
        menu.map((item, index) => {
          return (
            <MenuItem
              onClick={() => {
                handleClose();
                item.handleClickMenu(data);
              }}
              key={index}
            >
              {item.icon}
              {item.title}
            </MenuItem>
          );
        })}
    </Menu>
  );
}
