import React, { useEffect, useState } from "react";
import { Collapse, List, ListItemButton, ListItemText } from "@mui/material";
import {
  matchPath,
  NavLink as RouterLink,
  useLocation,
} from "react-router-dom";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

export default function NavSectionItem({ data, index }) {
  const { pathname } = useLocation();
  const [openDropdown, setOpenDropdown] = useState(false);

  const handleClickDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const match = ({ path, matches }) => {
    if (matches) {
      let is_active = false;
      matches.forEach((match_path) => {
        const match = match_path
          ? !!matchPath({ path: match_path, end: false }, pathname)
          : false;

        if (match) {
          is_active = true;
        }
      });
      return is_active;
    }
    return path ? !!matchPath({ path, end: false }, pathname) : false;
  };

  useEffect(() => {
    //On reload dropdown should not close
    data.child_options?.map((child_option) => {
      if (child_option.matches) {
        child_option.matches.map((match) => {
          const is_match_path = window.location.pathname.includes(match);
          if (is_match_path) {
            setOpenDropdown(true);
          }
        });
      }
      const is_path = window.location.pathname.includes(child_option.path);
      if (is_path) {
        setOpenDropdown(true);
      }
    });
  }, []);

  return (
    <>
      <ListItemButton
        component={data.path ? RouterLink : ""}
        to={data.path ? data.path : ""}
        onClick={data.on_click ? data.on_click : handleClickDropdown}
        className={
          match({ path: data.path, matches: data.matches })
            ? "menuActive menus-list"
            : "menus-list"
        }
      >
        <div className="sidebar-icons">{data.icon}</div>
        <ListItemText primary={data.title} />
        {data.child_options && (openDropdown ? <ExpandLess /> : <ExpandMore />)}
      </ListItemButton>

      {data.child_options && (
        <Collapse in={openDropdown} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {data.child_options.map((child_option, index) => {
              return (
                <ListItemButton
                  component={child_option.path ? RouterLink : ""}
                  to={child_option.path ? child_option.path : ""}
                  // sx={{
                  //     pl: 8,
                  // }}
                  className={
                    match({
                      path: child_option.path,
                      matches: child_option.matches,
                    })
                      ? "menuActive menus-list child-menus-list"
                      : "menus-list child-menus-list"
                  }
                >
                  <div className="sidebar-icons">{child_option.icon}</div>
                  <ListItemText primary={child_option.title} />
                </ListItemButton>
              );
            })}
          </List>
        </Collapse>
      )}
    </>
  );
}
