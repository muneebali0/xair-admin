import React from "react";
import { Icon } from "@iconify/react";
import closeFill from "@iconify/icons-eva/close-fill";
import { Stack, Drawer, Divider, IconButton, Typography } from "@mui/material";

export const SORT_BY_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "priceDesc", label: "Price: High-Low" },
  { value: "priceAsc", label: "Price: Low-High" },
];

export default function CustomDrawer({
  isOpenDrawer,
  onCloseDrawer,
  componentToPassDown,
  pageTitle,
}) {
  return (
    <>
      <Drawer
        className="forms-drawer"
        anchor="right"
        open={isOpenDrawer}
        onClose={onCloseDrawer}
        PaperProps={{
          sx: { border: "none", overflow: "hidden" },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 1, py: 2 }}
        >
          <Typography className="drawer-title" variant="h6" sx={{ ml: 1 }}>
            {pageTitle}
          </Typography>
          <IconButton className="drawer-cross-icon" onClick={onCloseDrawer}>
            <Icon icon={closeFill} width={20} height={20} />
          </IconButton>
        </Stack>
        <Divider className='sidebar-divider' />
        <div className="forms-drawer-height">{componentToPassDown}</div>
      </Drawer>
    </>
  );
}
