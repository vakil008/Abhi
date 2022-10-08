import React from "react";
import { Paper, Box, Typography, Snackbar } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "../../theme/light";

import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Table, Grid, TextField, CircularProgress } from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import CloseIcon from "@material-ui/icons/Close";
import UserService from "../../services/user.service";
import { withStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

const useStyles = (theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
});
let rows = [];

class Reports extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      order: "asc",
      orderBy: "calories",
      selected: [],
      page: 0,
      rowsPerPage: 10,
      top: false,
      left: false,
      bottom: false,
      right: false,
      allBranch: [],
      name: "",
      emailAddress: "",
      mobileNumber: "",
      city: "",
      address: "",
      description: "",
      errorSnack: "",
      errorMessage: "",
      isSnack: false,
      Message: "",
      isload: false,
    };
  }

  componentDidMount() {
    this.getAlllead();
  }

  handleRequestSort = (event, property) => {
    const { orderBy, order } = this.state;
    const isAsc = orderBy === property && order === "asc";
    this.setState({
      order: isAsc ? "desc" : "asc",
    });
    this.setState({
      orderBy: property,
    });
  };

  getAlllead = async () => {
    try {
      const response = await UserService.GetAllBranch();
      console.log("response of ssssss", response);

      const { data } = response;
      const { data: list, succeeded } = data;
      if (succeeded) {
        if (list && list.length) {
          this.setState({
            allBranch: list,
          });
          rows = list;
        }
      }
    } catch (error) {
      console.log("status error", error);
    }
  };

  handleSelectAllClick = (event) => {
    const { allBranch } = this.state;
    if (event.target.checked) {
      const newSelecteds = allBranch.map((n) => n.id);

      this.setState({
        selected: newSelecteds,
      });
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, name) => {
    const { selected } = this.state;
    console.log(selected);
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    this.setState({
      selected: newSelected,
    });
  };

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: parseInt(event.target.value, 10) });

    this.setState({ page: 0 });
  };

  toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    this.setState({ [anchor]: open });
  };

  submitBranch = async () => {
    const { name, emailAddress, mobileNumber, city, address, description } =
      this.state;
    this.setState({ isload: true });
    try {
      const response = await UserService.SaveBranch(
        name,
        emailAddress,
        mobileNumber,
        city,
        address,
        description
      );

      console.log("response of ssssss", response);
      this.setState({
        isSnack: true,
        Message: "Successfully Submitted",
        name: "",
        emailAddress: "",
        mobileNumber: "",
        city: "",
        address: "",
        description: "",
        isload: false,
      });

      // const { data } = response;
      // const { data: list, succeeded } = data;
      // if (succeeded) {
      //   if (list && list.length) {
      //     this.setState({
      //       allBranch: list,
      //     });
      //     rows = list;
      //   }
      // }
    } catch (error) {
      console.log("status error", error);
      this.setState({
        errorSnack: true,
        errorMessage: "server error",
        isload: false,
      });
    }
  };

  handleClose = (event, reason) => {
    this.setState({
      errorSnack: false,
      isSnack: false,
    });
  };

  render() {
    const { classes } = this.props;

    const {
      rowsPerPage,
      page,
      selected,
      orderBy,
      order,
      allBranch,
      name,
      emailAddress,
      mobileNumber,
      city,
      address,
      description,
      errorSnack,
      errorMessage,
      isSnack,
      Message,
      isload,
    } = this.state;
    const rows = allBranch;
    const emptyRows =
      rowsPerPage -
      Math.min(rowsPerPage, allBranch.length - page * rowsPerPage);

    const isSelected = (id) => selected.indexOf(id) !== -1;

    return (
      <ThemeProvider theme={theme}>
        <Box className="container" p={2.5} bgcolor="primary.lightBgContainer">
          <Paper className="content lead-page">
            <Box className="page-heading" mb={3}>
              <Box color="text.secondary" pt={3} pr={2.7} pb={1.8} pl={3}>
                <Typography variant="h6" gutterBottom color="inherit">
                  Daily Report
                </Typography>
              </Box>
              <Divider />
            </Box>

            <div className="data-table">
              <div className={classes.root}>
                <Paper className={classes.paper} elevation={0}>
                  <TableContainer>
                    <Table
                      className={classes.table}
                      aria-labelledby="tableTitle"
                      aria-label="enhanced table"
                    >
                      <EnhancedTableHead
                        classes={classes}
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={this.handleSelectAllClick}
                        onRequestSort={this.handleRequestSort}
                        rowCount={rows.length}
                      />
                      <TableBody>
                        {stableSort(rows, getComparator(order, orderBy))
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((Lead, index) => {
                            const isItemSelected = isSelected(Lead.id);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                              <TableRow
                                hover
                                // onClick={(event) =>
                                //   this.handleClick(event, Lead.id)
                                // }
                                //role="checkbox"
                                //aria-checked={isItemSelected}
                                tabIndex={-1}
                                key={index}
                                selected={isItemSelected}
                              >
                                {/* <TableCell padding="checkbox">
                                  <Checkbox
                                    checked={isItemSelected}
                                    inputProps={{ "aria-labelledby": labelId }}
                                  />
                                </TableCell> */}
                                <TableCell
                                  component="th"
                                  id={labelId}
                                  scope="row"
                                  padding="none"
                                >
                                  {Lead.name}
                                </TableCell>
                                <TableCell align="left">
                                  {Lead.emailAddress}
                                </TableCell>
                                <TableCell align="left">
                                  {Lead.mobileNumber}
                                </TableCell>
                                <TableCell align="left">{Lead.city}</TableCell>
                                <TableCell align="left">
                                  {Lead.description}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        {emptyRows > 0 && (
                          <TableRow>
                            <TableCell colSpan={6} />
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[10, 50, 100]}
                    component="div"
                    count={allBranch.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={this.handleChangePage}
                    onRowsPerPageChange={this.handleChangeRowsPerPage}
                  />
                </Paper>
              </div>
            </div>
          </Paper>
        </Box>
      </ThemeProvider>
    );
  }
}

export default withStyles(useStyles)(Reports);

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
  console.log("getComparator", order);
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: "name", numeric: false, disablePadding: false, label: " Name" },
  {
    id: "emailAddress",
    numeric: false,
    disablePadding: false,
    label: "Mobile Number",
  },
  { id: "mobileNumber", numeric: false, disablePadding: false, label: "city" },
  { id: "city", numeric: false, disablePadding: false, label: "Email" },
  {
    id: "description",
    numeric: false,
    disablePadding: false,
    label: "Description",
  },
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell> */}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.primary.light,
          // backgroundColor: lighten(theme.palette.primary.light, 0.85),
        }
      : {
          color: theme.palette.primary.light,
          // backgroundColor: theme.palette.primary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        ></Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            {/* <FilterListIcon /> */}
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};
