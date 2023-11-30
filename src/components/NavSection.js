import { List } from "@mui/material";
import React from "react";
import NavSectionItem from "./NavSectionItem";

export default function NavSection({ navConfig }) {
  return (
    <List className="py-0">
      {navConfig.map((item, index) => {
        return <NavSectionItem data={item} index={index} key={index} />;
      })}
    </List>
  );
}
