import PropTypes from "prop-types";
import { Paper, Typography } from "@mui/material";

SearchNotFound.propTypes = {
  searchQuery: PropTypes.string,
};

export default function SearchNotFound({ searchQuery = "", ...other }) {
  return (
    <Typography variant="h5" align="center">
      No Data Exist
    </Typography>
  );
}
