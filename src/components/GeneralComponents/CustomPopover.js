import { Icon } from "@iconify/react";
import { useRef, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Menu, MenuItem } from "@mui/material";

export default function CustomPopover(props) {
  const anchorRef = useRef(null);
  const { menu, data } = props;

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div
      style={{ cursor: "pointer" }}
      className="align-items-center d-flex justify-content-center"
    >
      <MoreVertIcon
        style={{ cursor: "pointer", fontSize: 20, color: "#637381" }}
        className="pointer custom-popover-icon"
        ref={anchorRef}
        onClick={handleOpen}
      />
      <Menu
        className="custom-menu-popover"
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ marginLeft: 1.8 }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {menu.map((option) => (
          <MenuItem
            key={option.label}
            onClick={() => {
              setOpen(false);
              option.handleClick(data);
            }}
          >
            {option.icon && (
              <Icon
                fontSize="18"
                style={{ color: "var(--portal-theme-color)" }}
                className="me-2"
                icon={option.icon}
              />
            )}
            <span>{option.label}</span>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
