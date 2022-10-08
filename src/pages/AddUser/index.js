
import React from "react";
import {
  Paper, Box, Typography,FormControl,InputLabel ,OutlinedInput,InputAdornment,Select,MenuItem,Snackbar,CircularProgress
} from "@material-ui/core";



import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from '../../theme/light';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {Table, Grid, TextField} from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import CloseIcon from '@material-ui/icons/Close';
import UserService from "../../services/user.service";
import { withStyles } from '@material-ui/core/styles';
import Alert from "@material-ui/lab/Alert";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


const useStyles = theme=> ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
});
let rows= [];

class AddUser extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      order:"asc",
      orderBy:"calories",
      selected:[],
      page:0,
      rowsPerPage:5,
      top: false,
      left: false,
      bottom: false,
      right: false,
      allBranch:[],
      AllUsers:[],
      BranchId:"None",
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      roles: "",
      showPassword:false, 
      showconfirmPassword:false,
      errorSnack: "",
      errorMessage: "",
      isSnack: false,
      Message: "",
      isload: false,
    };
  }

  componentDidMount() {
    this.getAlllead();
    this.getAllUsers();
  }

   handleRequestSort = (event, property) => {
    const {
      orderBy,order
    } = this.state;
    const isAsc = orderBy === property && order === 'asc'; 
    this.setState({
      order:isAsc ? 'desc' : 'asc'
    });
    this.setState({
      orderBy:property
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
        
        }
  
      }
    } catch (error) {
      console.log("status error", error);
    }
  };

  getAllUsers =  async () => {
    try {
      const response = await UserService.GetAllUser();
      console.log("response of ssssss", response);

      const { data } = response;
      const { data: list, succeeded } = data;
      if (succeeded) {
        if (list && list.length) {
          this.setState({
            AllUsers: list,
          });
          rows=list;
        }
  
      }
    } catch (error) {
      console.log("status error", error);
    }
  };



   handleSelectAllClick = (event) => {
     const {AllUsers}= this.state;
    if (event.target.checked) {
      const newSelecteds = AllUsers.map((n) => n.id);


      this.setState({
        selected:newSelecteds
      });
      return;
    }
    this.setState({ selected: []});
  };


   handleClick = (event, name) => {
  
    const {
      selected
    } = this.state;
    console.log(selected)
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
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({
      selected:newSelected
    });  
  };


   handleChangePage = (event, newPage) => {
    this.setState({ page: newPage});
  };



   handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: parseInt(event.target.value, 10)});
   
    this.setState({ page: 0});
  };

  

    toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    this.setState({ [anchor]: open });
  
  };


  submitBranch = async () => {
    const { BranchId  , firstName,lastName, email, password, confirmPassword,roles} = this.state;
      this.setState({isload: true});
    try {
       let rolesuser= [roles];
      let  branch_id=BranchId=="None"? 0 : BranchId;
      let userName=email;
      const response = await UserService.SaveUser( firstName,lastName, userName, email, password, confirmPassword,rolesuser,branch_id);

      console.log("response of ssssss", response);


      const {status } = response;

      if(status==400){
       const {data}=response;
       const {FirstName,ConfirmPassword,Email,LastName,Password,UserName}=data.errors
       let errorMessage=FirstName?FirstName:(LastName?LastName:(Email?Email:(Password?Password:(ConfirmPassword?ConfirmPassword:""))))
        
        this.setState({
          errorSnack: true,
          errorMessage: errorMessage,
          isload: false
         
        });
      }else{
        this.setState({
          isSnack: true,
          Message: "Successfully Submitted",
          BranchId:"None",
          firstName: "",
          lastName: "",
          userName: "",
          email: "",
          password: "",
          confirmPassword: "",
          roles: "",
          isload: false
        });
        
      }
   
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
        errorMessage: error,
        isload: false
       
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

    const { rowsPerPage,page,selected,orderBy,order,allBranch ,BranchId,AllUsers,  errorSnack,
      errorMessage,
      isSnack,
      Message,
      isload} = this.state;
     const rows= AllUsers;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, AllUsers.length - page * rowsPerPage);

   const isSelected = (id) => selected.indexOf(id) !== -1;
    const list = (anchor) => (
      <Box className="share-steps" height="100%">
      <Box   display="flex"
          width="100%"
          height="100%"
          flexDirection="column"
          bgcolor="primary.drawerBg"
        className={clsx(classes.list, {
          [classes.fullList]: anchor === 'top' || anchor === 'bottom',
        })}
        role="presentation"
      
      >
        <Box className="common-content" position="relative" height="100%">
            <Box className="sidebar-header" display="flex" alignItems="center" px={3} py={2.4}>
              <Box color="text.textBlue">
                <Typography variant="h6" gutterBottom color="inherit">
                  Add and Update
                </Typography>
              </Box>
              <Box
                className="close-drawer cursor-pointer"
                display="flex"
                alignItems="center"
                color="grey.500"
                onClick={this.toggleDrawer(anchor, false)}>
                <CloseIcon color="inherit" />
              </Box>
            </Box>
            <Divider />
  
            <Box className="share-sidebar-content share-mamber-content register-container" p={3}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField label="First Name" 
                   onChange={(event) => {
                    this.setState({
                      firstName: event.target.value,
                    });
                  }}
                variant="outlined" className="custom-textfield" />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Last Name" variant="outlined"
                   onChange={(event) => {
                    this.setState({
                      lastName: event.target.value,
                    });
                  }}
                className="custom-textfield" />
              </Grid>

             

              <Grid item xs={12}>
                <TextField type="email" label="Email Address" variant="outlined" 
                   onChange={(event) => {
                    this.setState({
                      email: event.target.value,
                    });
                  }}
                className="custom-textfield" />
              </Grid>

              <Grid item xs={12}>
                  <FormControl variant="outlined" className="custom-textfield">
                    <InputLabel id="demo-simple-select-outlined-label">
                    Branch
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      
                      onChange={(event) => {
                        if (event.target.value) {
                          this.setState({
                            BranchId: event.target.value,
                          });
                        }
                      }}
                      label="Branch"
                    >
                      <MenuItem value="None">
                        <em>None</em>
                      </MenuItem>
                      {this.state.allBranch.map((data, index) => {
                        return (
                          <MenuItem key={index.toString()} value={data.id}>
                            {data.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>

                
              <Grid item xs={12}>
                  <FormControl variant="outlined" className="custom-textfield">
                    <InputLabel id="demo-simple-select-outlined-label">
                      Role
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      onChange={(event) => {
                        if (event.target.value) {
                          this.setState({
                            roles: event.target.value,
                          });
                        } else {
                          this.setState({
                            roles: "",
                          });
                        }
                      }}
                    
                      label="Role"
                    >
                      <MenuItem value="None">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="SuperAdmin">
                        <em>SuperAdmin</em>
                      </MenuItem>
                      <MenuItem value="Admin">
                        <em>Admin</em>
                      </MenuItem>
                      <MenuItem value="Basic">
                        <em>Basic</em>
                      </MenuItem>
                     
                     
                      
                    </Select>
                  </FormControl>
                </Grid>

              <Grid item xs={12}>
                <FormControl variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={this.state.showPassword ? 'text' : 'password'}
                    value={this.state.password}
                    onChange={(event) => {
                      if (event.target.value) {
                        this.setState({
                          password: event.target.value,
                        });
                      } else {
                        this.setState({
                          password: "",
                        });
                      }
                    }}
                    className="custom-textfield"
                    autoComplete="off"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => {
                            this.setState({
                              showPassword: !this.state.showPassword
                            });
                          }}
                          edge="end">
                        {this.state.showPassword ? <Visibility fontSize="small" /> : <VisibilityOff fontSize="small" />}
                        </IconButton>
                      </InputAdornment>
                    }
                    labelWidth={70}
                  />
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <FormControl variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={this.state.showconfirmPassword ? 'text' : 'password'}
                    value={this.state.confirmPassword}
                    onChange={(event) => {
                      if (event.target.value) {
                        this.setState({
                          confirmPassword: event.target.value,
                        });
                      } 
                    }}
                    className="custom-textfield"
                    autoComplete="off"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => {
                            this.setState({
                              showconfirmPassword: !this.state.showconfirmPassword
                            });
                          }}
                          edge="end">
                        {this.state.showconfirmPassword ? <Visibility fontSize="small" /> : <VisibilityOff fontSize="small" />}
                        </IconButton>
                      </InputAdornment>
                    }
                    labelWidth={70}
                  />
                </FormControl>
              </Grid>
            </Grid>
  
              <Box>
              
              </Box>
            </Box>
  
            <Box
            className="sidebar-footer"
            position="absolute"
            bottom="0"
            left="0"
            width="100%"
            minHeight="82px"
            px={3}
            py={1.5}
            display="flex"
            alignItems="center"
            boxSizing="border-box"
            bgcolor="primary.drawerBg">
            <Box  pr={1} width="150px" boxSizing="border-box">
              <Button variant="outlined" className="cancel-button" disableElevation size="large" onClick={this.toggleDrawer(anchor, false)}>
                Cancel
              </Button>
            </Box>
            <Box width="150px" boxSizing="border-box">
              <Button variant="contained" color="primary"
                onClick={() =>  this.submitBranch()}
              disabled={isload}
              className="next-button" disableElevation size="large">
              {isload && <CircularProgress size={16} />}
                Save
              </Button>
            </Box>
          </Box>
          </Box>
      </Box>
      <Snackbar
          autoHideDuration={3000}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={errorSnack}
          onClose={this.handleClose}
        >
          {errorMessage ? (
            <Alert onClose={this.handleClose} severity="error">
              {errorMessage}
            </Alert>
          ) : (
            ""
          )}
        </Snackbar>
        <Snackbar
          autoHideDuration={3000}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={isSnack}
          onClose={this.handleClose}
        >
          {Message ? (
            <Alert onClose={this.handleClose} severity="success">
              {Message}
            </Alert>
          ) : (
            ""
          )}
        </Snackbar>
      </Box>
  
      // Drawer End here
      )
    return (
      <ThemeProvider theme={theme}>
      <Box className="container" p={2.5}  bgcolor="primary.lightBgContainer">
        <Paper className="content lead-page" >
          <Box className="page-heading" mb={3}>
            <Box color="text.secondary" pt={3} pr={2.7} pb={1.8} pl={3}>
              
              <Typography variant="h6" gutterBottom color="inherit">
              Users
              </Typography>
              {['right'].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button onClick={this.toggleDrawer(anchor, true)}>Add New User</Button>
            <Drawer className="common-sidebar " anchor={anchor} open={this.state[anchor]} onClose={this.toggleDrawer(anchor, false)}>
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
            </Box>
            <Divider />
          </Box>
  
  
  <div className="data-table">

  
  <div className={classes.root}>
        <Paper className={classes.paper} elevation={0}>
          <EnhancedTableToolbar numSelected={selected.length} />
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
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((Lead, index) => {
                    const isItemSelected = isSelected(Lead.id);
                    const labelId = `enhanced-table-checkbox-${index}`;
  
                    return (
                      <TableRow
                        hover
                        onClick={(event) => this.handleClick(event, Lead.id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={index}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </TableCell>
                        <TableCell component="th" id={labelId} scope="row" padding="none">
                          {Lead.firstName}
                        </TableCell>
                        <TableCell align="left">{Lead.lastName}</TableCell>
                        <TableCell align="left">{Lead.email}</TableCell>
                     
                        
                        <TableCell align="left">
  <Box display="inline-flex" alignItems="center" ml="auto">
    <Box className="edit-icon cursor-pointer" mr={1} bgcolor="primary.primaryIconBg" color="text.textSecondary"  width="27px" height="27px" borderRadius="5px" display="flex" alignItems="center" justifyContent="center">
      <EditIcon style={{ fontSize: 18 }} color="inherit" />
      </Box>
      <Box className="edit-icon cursor-pointer" bgcolor="error.lightIcon" color="error.dark"  width="27px" height="27px" borderRadius="5px" display="flex" alignItems="center" justifyContent="center">
      <DeleteIcon style={{ fontSize: 18 }} color="inherit" />
      </Box>
  </Box>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={AllUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={this.handleChangePage}
            onRowsPerPageChange={this.handleChangeRowsPerPage}
          />
        </Paper>
       
      </div>
  </div>
  
  {/* Drawer Map here */}
  {/* <div>
        {['right'].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button onClick={this.toggleDrawer(anchor, true)}>{anchor}</Button>
            <Drawer className="common-sidebar " anchor={anchor} open={this.state[anchor]} onClose={this.toggleDrawer(anchor, false)}>
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </div> */}
  
      {/* Drawer Map here */}
        </Paper>
      </Box>
    </ThemeProvider>
    );
  }
}

export default withStyles(useStyles)(AddUser)


// export default Leads;


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
  console.log("getComparator",order)
  return order === 'desc'
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
  { id: 'firstName', numeric: false, disablePadding: false, label: 'firstName' },
  { id: 'lastName', numeric: false, disablePadding: false, label: 'lastName' },
  { id: 'email', numeric: false, disablePadding: false, label: 'email' }
];




function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
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
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};


const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.primary.light,
          // backgroundColor: lighten(theme.palette.primary.light, 0.85),
        }
      : {
          color: theme.palette.primary.light,
          // backgroundColor: theme.palette.primary.dark,
        },
  title: {
    flex: '1 1 100%',
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
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          
        </Typography>
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

