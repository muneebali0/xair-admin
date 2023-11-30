import React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { Toolbar, OutlinedInput, InputAdornment } from "@mui/material";

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1, 0, 3),
}));

MUITableToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function MUITableToolbar({
  filterName,
  onFilterName,
  handleSubmit,
}) {
  return (
    <RootStyle>
      <div></div>
      <div className="mui-table-search-input-box d-flex">
        <OutlinedInput
          className="ms-auto mui-table-search-input"
          value={filterName}
          onChange={onFilterName}
          placeholder="Search"
          startAdornment={<InputAdornment position="start"></InputAdornment>}
        />
        {handleSubmit && (
          <div className="add--button mt-1">
            <button className="add--button ms-3" onClick={handleSubmit}>
              Search
            </button>
          </div>
        )}
      </div>
    </RootStyle>
  );
}
