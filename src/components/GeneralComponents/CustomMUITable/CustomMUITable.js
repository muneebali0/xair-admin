import { filter } from "lodash";
import { useState } from "react";

import {
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  Avatar,
  Checkbox,
  Chip,
} from "@mui/material";
import TableFooter from "@mui/material/TableFooter";
import MuiTableHeadList from "./MuiTableHeadList";
import MUITableToolbar from "./MUITableToolbar";
import CustomPopover from "../CustomPopover";
import SearchNotFound from "./SearchNotFound";
// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export default function CustomMUITable({
  TABLE_HEAD,
  data,
  MENU_OPTIONS,
  checkbox_selection,
  selected,
  setSelected,
  selected_by,
  className,
  custom_pagination,
  sortBy,
  hide_pagination,
  custom_search,
  hide_search,
}) {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState(sortBy ? sortBy : "number");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const handleRequestSort = (event, property) => {
    // const isAsc = orderBy === property && order === "asc";
    // setOrder(isAsc ? "desc" : "asc");
    // setOrderBy(property);
  };

  if (checkbox_selection && !selected) {
    console.log(
      "Error : selected paramter is required as select array AND setSelected paramter is required as setter function for select array"
    );
    selected = [];
  }

  const handleClick = (name) => {
    const selectedIndex = selected?.some((obj) => {
      if (selected_by && selected_by !== "") {
        return obj[selected_by] === name[selected_by];
      } else {
        return obj._id === name._id;
      }
    });

    if (selectedIndex === true) {
      let new_array = selected.filter((item) => {
        if (selected_by && selected_by !== "") {
          return item[selected_by] !== name[selected_by];
        } else {
          return item._id !== name._id;
        }
      });
      setSelected(new_array);
    } else {
      setSelected((selected) => [...selected, name]);
    }
  };

  const handleSearchText = (event) => {
    custom_search.setSearchText(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleClickTD = (head, row, index) => {
    if (head.handleClick) {
      head.handleClick(row, index);
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    if (query) {
      return filter(array, (_user) => {
        let searched_object = TABLE_HEAD.some((item) => {
          if (
            item.type !== "link" &&
            item.type !== "row_status" &&
            item.type !== "checkbox" &&
            item.type !== "row_calendar" &&
            item.type !== "thumbnail" &&
            item.type !== "action" &&
            item.type !== "category" &&
            !item.renderData &&
            item.type !== "number"
          ) {
            return (
              _user[item.id]
                .toString()
                .toLowerCase()
                .indexOf(query.toLowerCase()) !== -1
            );
          }
        });
        return searched_object;
      });
    }
    return stabilizedThis.map((el) => el[0]);
  }

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const filteredUsers = applySortFilter(
    data,
    getComparator(order, orderBy),
    filterName
  );

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelected(data);
      return;
    }
    setSelected([]);
  };

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Card
      style={{ overflowX: "auto" }}
      className={`mui-bg-custom-table ${className}`}
    >
      {!hide_search && (
        <MUITableToolbar
          filterName={custom_search ? custom_search.searchText : filterName}
          onFilterName={custom_search ? handleSearchText : handleFilterByName}
          handleSubmit={custom_search?.handleSubmit}
        />
      )}

      <TableContainer sx={{ minWidth: 800 }} className="mui-table-container">
        <Table>
          <MuiTableHeadList
            order={order}
            orderBy={orderBy}
            headLabel={TABLE_HEAD}
            rowCount={data.length}
            numSelected={checkbox_selection && selected.length}
            onRequestSort={handleRequestSort}
            checkbox_selection={checkbox_selection}
            handleSelectAllClick={handleSelectAllClick}
          />

          <TableBody>
            {filteredUsers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected =
                  selected?.length < 1
                    ? false
                    : selected?.some((obj) => {
                        if (selected_by && selected_by !== "") {
                          return obj[selected_by] === row[selected_by];
                        } else {
                          return obj._id === row._id;
                        }
                      });

                return (
                  <TableRow
                    hover
                    key={index}
                    tabIndex={-1}
                    role="checkbox"
                    selected={isItemSelected}
                    aria-checked={isItemSelected}
                  >
                    {checkbox_selection && (
                      <TableCell align="left" width={50}>
                        <Checkbox
                          checked={isItemSelected}
                          onChange={() => handleClick(row)}
                        />
                      </TableCell>
                    )}
                    {TABLE_HEAD.map((head, head_index) => {
                      if (head.type === "number") {
                        return (
                          <TableCell
                            className={head.className}
                            align="left"
                            key={head_index}
                          >
                            <span
                              className={row.className}
                              // onClick={() => {
                              //   head.handleClick
                              //     ? head.handleClick(row, index)
                              //     : undefined;
                              // }}
                            >
                              {index +
                                1 +
                                (custom_pagination
                                  ? custom_pagination.rows_per_page *
                                    custom_pagination.page
                                  : rowsPerPage * page)}
                            </span>
                          </TableCell>
                        );
                      } else if (head.type === "row_status") {
                        return (
                          <TableCell
                            className={head.className}
                            align="left"
                            key={head_index}
                          >
                            <Chip
                              width="140px"
                              label={
                                row[head.id] === true ? "Active" : "Inactive"
                              }
                              variant="contained"
                              className={
                                row[head.id] === true
                                  ? `manage-program-chip-success ${row.className}`
                                  : ""
                              }
                              color={
                                row[head.id] === true ? "success" : "error"
                              }
                              size="small"
                              // onClick={() => {
                              //   head.handleClick
                              //     ? head.handleClick(row, index)
                              //     : undefined;
                              // }}
                            />
                          </TableCell>
                        );
                      } else if (head.type === "thumbnail") {
                        return (
                          <TableCell
                            className={head.className}
                            align="left"
                            key={head_index}
                            onClick={() => {
                              handleClickTD(head, row, index);
                            }}
                          >
                            <Avatar
                              alt={row[head.id].alt}
                              src={row[head.id].src}
                            />
                          </TableCell>
                        );
                      } else if (head.type === "link") {
                        return (
                          <TableCell
                            className={head.className}
                            key={head_index}
                          >
                            {row[head.id].show_text ? (
                              <a
                                href={row[head.id].to}
                                className={row[head.id].className}
                                target={row[head.id].target}
                              >
                                {row[head.id].show_text}
                              </a>
                            ) : row[head.id].show_alternate_text ? (
                              row[head.id].show_alternate_text
                            ) : (
                              ""
                            )}
                          </TableCell>
                        );
                      } else if (head.type === "action") {
                        return (
                          <TableCell
                            align="left"
                            className={head.className}
                            key={head_index}
                          >
                            {(row[head.MENU_OPTIONS] || MENU_OPTIONS) && (
                              <CustomPopover
                                menu={
                                  row[head.MENU_OPTIONS]
                                    ? row[head.MENU_OPTIONS]
                                    : MENU_OPTIONS
                                }
                                data={row}
                              />
                            )}
                          </TableCell>
                        );
                      } else if (head.type === "html") {
                        return (
                          <TableCell
                            align="left"
                            className={head.className}
                            key={head_index}
                          >
                            <div
                              className={row.className}
                              dangerouslySetInnerHTML={{
                                __html: row[head.id],
                              }}
                            ></div>
                          </TableCell>
                        );
                      } else {
                        return (
                          <TableCell
                            align="left"
                            className={head.className}
                            key={head_index}
                          >
                            {head.renderData ? (
                              head.renderData(row, index)
                            ) : (
                              <span className={row.className}>
                                {row[head.id]}
                              </span>
                            )}
                          </TableCell>
                        );
                      }
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
          {isUserNotFound && (
            <TableBody>
              <TableRow>
                <TableCell
                  className="data-not-found-box"
                  align="center"
                  colSpan={
                    checkbox_selection
                      ? TABLE_HEAD.length + 1
                      : TABLE_HEAD.length
                  }
                  sx={{ py: 3 }}
                >
                  <SearchNotFound searchQuery={filterName} />
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <TableFooter className="mui-table-footer">
        <TableRow className="rows_selected_text">
          {checkbox_selection && selected.length > 0
            ? `${selected.length} ${
                selected.length > 1 ? "rows" : "row"
              } selected`
            : ""}
        </TableRow>
        {!hide_pagination && (
          <TablePagination
            rowsPerPageOptions={[10, 50, 100, 200, 500]}
            component="div"
            count={
              custom_pagination ? custom_pagination.total_count : data.length
            }
            rowsPerPage={
              custom_pagination ? custom_pagination.rows_per_page : rowsPerPage
            }
            page={custom_pagination ? custom_pagination.page : page}
            onPageChange={
              custom_pagination
                ? custom_pagination.handleChangePage
                : handleChangePage
            }
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </TableFooter>
    </Card>
  );
}
