import { Box, Divider, Drawer } from "@mui/material";
import React from "react";
import NavSection from "../../components/NavSection";
import sidebarConfig from "./SidebarConfig";
import { useContentSetting } from "../../Hooks/ContentSetting";
import { logo } from "../../assets";

export default function AppSidebar({
  drawerWidth,
  handleDrawerToggle,
  mobileOpen,
}) {
  const { userInfo } = useContentSetting();

  const drawer = (
    <div>
      <div className="text-center p-2">
        <img src={logo} alt="" className="app-logo" />
      </div>
      <Divider className="sidebar-divider" />
      <NavSection navConfig={sidebarConfig(userInfo)} />
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
      className="app-sidebar-box"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            backgroundColor: "var(--portal-theme-light)",
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            backgroundColor: "var(--portal-theme-light)",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
