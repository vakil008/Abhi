import React from "react";
import "date-fns";
import {
  Paper,
  Box,
  Typography,
  Divider,
  Container,
  InputLabel,
  Select,
  FormControl,
  FormHelperText,
  MenuItem,
  Grid,
  Button,
} from "@material-ui/core";
import { Table, TextField, CircularProgress } from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import { connect } from "react-redux";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "../../theme/light";
import { withStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import ReactHTMLTableToExcel from "../ReactHTMLTableToExcel";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import UserService from "../../services/user.service";
import moment from "moment";

const useStyles = (theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(4),
    },
  },
  roots: {
    width: "100%",
  },
  paper: {
    width: "100%",
  },
  papers: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },

  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 300,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
});

const headCells = [
  {
    id: "facilityName",
    numeric: false,
    disablePadding: false,
    label: "Facility Name",
  },
  // {
  //   id: "vehicleType",
  //   numeric: false,
  //   disablePadding: false,
  //   label: "Vehicle Type",
  // },
  {
    id: "checkin",
    numeric: false,
    disablePadding: false,
    label: "Total Check In",
  },
  {
    id: "checkout",
    numeric: false,
    disablePadding: false,
    label: "Total Check Out",
  },
  {
    id: "total",
    numeric: false,
    disablePadding: false,
    label: "Total",
  },
];

const paymentHeadCells = [
  {
    id: "online",
    numeric: false,
    disablePadding: false,
    label: "Online",
  },
  {
    id: "cash",
    numeric: false,
    disablePadding: false,
    label: "Cash",
  },
  {
    id: "exempt",
    numeric: false,
    disablePadding: false,
    label: "Exempt",
  },
  {
    id: "total",
    numeric: false,
    disablePadding: false,
    label: "Total",
  },
];
let rows = [];
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

class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      age: "",
      startDate: new Date(),
      endDate: new Date() + 1,
      deviceuniqueid: "Web",
      token: "339CFB64EDC6E94C5577CD68319E72AB6732C711AE661427AC83931B33F05CC4",
      mappingList: [],
      consolidates: "",
      type: "Daily",
      facilityid: "0",
      dailyReport: [],
      selected: [],
      order: "asc",
      orderBy: "calories",
      selected: [],
      page: 0,
      rowsPerPage: 10,
      names: [],
      instanceId: "0",
      facilityName: "Consolidate",
      totalCheckIn: 0,
      totalCheckOut: 0,
      totalCash: 0,
      totalOnline: 0,
      totalNoCash: 0,
      totalAmount: 0,
      mISReport: [],
      overallCheckin: 0,
      overallCheckout: 0,
      overallPayment: 0,
    };
  }

  componentDidMount() {
    const { userDetails } = this.props;
    const { loginToken, facilityid } = userDetails;

    this.setState(
      {
        token: loginToken,
        // facilityid: facilityid,
      },
      () => {
        this.getRefreshMapping();

        // this.getDailyAdminParkingStatusReport();
      }
    );
  }

  getRefreshMapping = async () => {
    const { deviceuniqueid, token } = this.state;

    try {
      const response = await UserService.mapping(deviceuniqueid, token);
      const { status, data } = response;
      const { groupmapping } = data;
      const { data: list } = groupmapping;
      console.log("response after getRefreshMapping --> ", response);
      if (data && list.length > 0) {
        let id = [];
        let names = [];
        list.map((item, index) => {
          id.push(item.facilityid);
          names.push(item.name);
        });
        id = id.join(",");
        this.setState(
          {
            mappingList: list,
            consolidates: id,
            names,
          },
          () => {
            this.getDailyMISAdminReport();
          }
        );
      }
    } catch (error) {
      console.log("error getRefreshMapping", error);
    }
  };

  getDailyMISAdminReport = async () => {
    const { token, facilityid, startDate, instanceId, consolidates } =
      this.state;
    console.log("datattatatatatatata", facilityid, "   ", consolidates);
    let facilityidTosend = "";
    if (facilityid === "0") {
      facilityidTosend = consolidates;
    } else {
      facilityidTosend = facilityid;
    }
    let inputdate = moment(startDate).format("DD-MMM-YYYY"); // 01-Oct-2022

    try {
      const response = await UserService.AdminMISStatusReport(
        facilityidTosend,
        token,
        inputdate
      );

      console.log("response after getDailyMISAdminReport ", response);
      const { data: res } = response;
      const { data } = res;
      if (res.respCode === 1 && data.length > 0) {
        let totalcheckin = 0;
        let totalcheckout = 0;
        let totalPayment = 0;
        let totalVehicle = 0;
        let carIn = 0;
        let carOut = 0;
        let bikeIn = 0;
        let bikeOut = 0;
        let bicycleIn = 0;
        let bicycleOut = 0;
        let cashCount = 0;
        let onlineCount = 0;
        let noCashCount = 0;

        let overallCheckin = 0;
        let overallCheckout = 0;
        let overallPayment = 0;

        let vehicleArray = [];

        const paymentValue = {
          2: "Cash",
          3: "Online",
          5: "Exempt",
        };
        let paymentArray = [];

        let amountArray = [];

        const vechicles = {
          1: "Bike",
          2: "Car",
          4: "Bicycle",
        };

        let finalArray = [];
        for (let a = 0; a < data.length; a++) {
          totalcheckin = 0;
          totalcheckout = 0;
          totalPayment = 0;
          totalVehicle = 0;
          carIn = 0;
          carOut = 0;
          bikeIn = 0;
          bikeOut = 0;
          bicycleIn = 0;
          bicycleOut = 0;
          cashCount = 0;
          onlineCount = 0;
          noCashCount = 0;

          const { checkin, checkout, payment, facilityname } = data[a];
          if (checkin) {
            for (let i = 0; i < checkin.length; i++) {
              const { vehicletype, vehiclecount } = checkin[i];
              const vehicleName = vechicles[vehicletype];
              const ifExist = vehicleArray.findIndex(
                (value, index) => value === vehicleName
              );
              if (ifExist == -1) {
                vehicleArray.push(vehicleName);
              }

              carIn = vehicleName == "Car" ? vehiclecount : carIn;
              bikeIn = vehicleName == "Bike" ? vehiclecount : bikeIn;
              bicycleIn = vehicleName == "Bicycle" ? vehiclecount : bicycleIn;

              totalcheckin = totalcheckin + vehiclecount;
            }
            console.log("checkin data", carIn);
          }
          if (checkout) {
            for (let i = 0; i < checkout.length; i++) {
              const { vehicletype, vehiclecount } = checkout[i];
              const vehicleName = vechicles[vehicletype];
              const ifExist = vehicleArray.findIndex(
                (value, index) => value === vehicleName
              );
              if (ifExist == -1) {
                vehicleArray.push(vehicleName);
              }

              carOut = vehicleName == "Car" ? vehiclecount : carOut;
              bikeOut = vehicleName == "Bike" ? vehiclecount : bikeOut;
              bicycleOut = vehicleName == "Bicycle" ? vehiclecount : bicycleOut;

              totalcheckout = totalcheckout + vehiclecount;
            }
          }

          if (payment) {
            for (let i = 0; i < payment.length; i++) {
              const { paymentmode, amountcollected } = payment[i];
              const paymentName = paymentValue[paymentmode];
              const ifExist = paymentArray.findIndex(
                (value, index) => value === paymentName
              );
              if (ifExist == -1) {
                paymentArray.push(paymentName);
              }

              cashCount =
                paymentName == "Cash" ? amountcollected / 100 : cashCount;
              onlineCount =
                paymentName == "Online" ? amountcollected / 100 : onlineCount;
              noCashCount =
                paymentName == "Exempt" ? amountcollected / 100 : noCashCount;

              if (cashCount !== 0) {
                amountArray.push(cashCount);
              } else if (onlineCount !== 0) {
                amountArray.push(onlineCount);
              } else if (noCashCount !== 0) {
                amountArray.push(noCashCount);
              }

              if (paymentmode !== 5) {
                totalPayment = totalPayment + amountcollected / 100;
              }
            }
          }

          overallCheckin = overallCheckin + totalcheckin;
          overallCheckout = overallCheckout + totalcheckout;
          overallPayment = overallPayment + totalPayment;
          let objectToShow = {
            facilityNameToShow: facilityname,
            totalCarin: carIn,
            totalCarout: carOut,
            totalBikein: bikeIn,
            totalBikeout: bikeOut,
            totalBicyclein: bicycleIn,
            totalBicycleout: bicycleOut,
            totalPayment,
            totalcheckin,
            totalcheckout,
          };

          finalArray.push(objectToShow);
        }

        this.setState({
          dailyReport: finalArray,
          overallCheckin,
          overallCheckout,
          overallPayment,
          totalCheckIn: totalcheckin,
          totalCheckOut: totalcheckout,
          totalCash: cashCount,
          totalOnline: onlineCount,
          totalNoCash: noCashCount,
          totalAmount: totalPayment,
        });
      }
    } catch (error) {
      console.log("error getDailyMISAdminReport", error);
    }
  };

  getMonthlyMISAdminReport = async () => {
    const { token, facilityid, startDate, instanceId, consolidates } =
      this.state;

    let facilityidTosend = "";
    if (facilityid === "0") {
      facilityidTosend = consolidates;
    } else {
      facilityidTosend = facilityid;
    }
    let inputdate = moment(startDate).format("MMM-YYYY"); // 01-Oct-2022

    try {
      const response = await UserService.AdminMonthlyMISStatusReport(
        facilityidTosend,
        token,
        inputdate
      );

      console.log("response after getMonthlyMISAdminReport ", response);

      const { data: res } = response;
      const { data } = res;
      if (res.respCode === 1 && data.length > 0) {
        let totalcheckin = 0;
        let totalcheckout = 0;
        let totalPayment = 0;
        let totalVehicle = 0;
        let carIn = 0;
        let carOut = 0;
        let bikeIn = 0;
        let bikeOut = 0;
        let bicycleIn = 0;
        let bicycleOut = 0;
        let cashCount = 0;
        let onlineCount = 0;
        let noCashCount = 0;

        let overallCheckin = 0;
        let overallCheckout = 0;
        let overallPayment = 0;

        let vehicleArray = [];

        const paymentValue = {
          2: "Cash",
          3: "Online",
          5: "Exempt",
        };
        let paymentArray = [];

        let amountArray = [];

        const vechicles = {
          1: "Bike",
          2: "Car",
          4: "Bicycle",
        };

        let finalArray = [];
        for (let a = 0; a < data.length; a++) {
          totalcheckin = 0;
          totalcheckout = 0;
          totalPayment = 0;
          totalVehicle = 0;
          carIn = 0;
          carOut = 0;
          bikeIn = 0;
          bikeOut = 0;
          bicycleIn = 0;
          bicycleOut = 0;
          cashCount = 0;
          onlineCount = 0;
          noCashCount = 0;

          const { checkin, checkout, payment, facilityname } = data[a];
          if (checkin) {
            for (let i = 0; i < checkin.length; i++) {
              const { vehicletype, vehiclecount } = checkin[i];
              const vehicleName = vechicles[vehicletype];
              const ifExist = vehicleArray.findIndex(
                (value, index) => value === vehicleName
              );
              if (ifExist == -1) {
                vehicleArray.push(vehicleName);
              }

              carIn = vehicleName == "Car" ? vehiclecount : carIn;
              bikeIn = vehicleName == "Bike" ? vehiclecount : bikeIn;
              bicycleIn = vehicleName == "Bicycle" ? vehiclecount : bicycleIn;

              totalcheckin = totalcheckin + vehiclecount;
            }
            console.log("checkin data", carIn);
          }
          if (checkout) {
            for (let i = 0; i < checkout.length; i++) {
              const { vehicletype, vehiclecount } = checkout[i];
              const vehicleName = vechicles[vehicletype];
              const ifExist = vehicleArray.findIndex(
                (value, index) => value === vehicleName
              );
              if (ifExist == -1) {
                vehicleArray.push(vehicleName);
              }

              carOut = vehicleName == "Car" ? vehiclecount : carOut;
              bikeOut = vehicleName == "Bike" ? vehiclecount : bikeOut;
              bicycleOut = vehicleName == "Bicycle" ? vehiclecount : bicycleOut;

              totalcheckout = totalcheckout + vehiclecount;
            }
          }

          if (payment) {
            for (let i = 0; i < payment.length; i++) {
              const { paymentmode, amountcollected } = payment[i];
              const paymentName = paymentValue[paymentmode];
              const ifExist = paymentArray.findIndex(
                (value, index) => value === paymentName
              );
              if (ifExist == -1) {
                paymentArray.push(paymentName);
              }

              cashCount =
                paymentName == "Cash" ? amountcollected / 100 : cashCount;
              onlineCount =
                paymentName == "Online" ? amountcollected / 100 : onlineCount;
              noCashCount =
                paymentName == "Exempt" ? amountcollected / 100 : noCashCount;

              if (cashCount !== 0) {
                amountArray.push(cashCount);
              } else if (onlineCount !== 0) {
                amountArray.push(onlineCount);
              } else if (noCashCount !== 0) {
                amountArray.push(noCashCount);
              }

              if (paymentmode !== 5) {
                totalPayment = totalPayment + amountcollected / 100;
              }
            }
          }

          overallCheckin = overallCheckin + totalcheckin;
          overallCheckout = overallCheckout + totalcheckout;
          overallPayment = overallPayment + totalPayment;
          let objectToShow = {
            facilityNameToShow: facilityname,
            totalCarin: carIn,
            totalCarout: carOut,
            totalBikein: bikeIn,
            totalBikeout: bikeOut,
            totalBicyclein: bicycleIn,
            totalBicycleout: bicycleOut,
            totalPayment,
            totalcheckin,
            totalcheckout,
          };

          finalArray.push(objectToShow);
        }

        this.setState({
          dailyReport: finalArray,
          overallCheckin,
          overallCheckout,
          overallPayment,
          totalCheckIn: totalcheckin,
          totalCheckOut: totalcheckout,
          totalCash: cashCount,
          totalOnline: onlineCount,
          totalNoCash: noCashCount,
          totalAmount: totalPayment,
        });
      }
    } catch (error) {
      console.log("error getMonthlyMISAdminReport", error);
    }
  };

  // getDailyAdminParkingStatusReport = async () => {
  //   const { token, facilityid, startDate } = this.state;

  //   let inputdatetime = moment(startDate).format("DD-MMM-YYYY"); // 01-Oct-2022

  //   try {
  //     const response = await UserService.AdminParkingStatusReport(
  //       facilityid,
  //       token,
  //       inputdatetime
  //     );

  //     console.log("response after getDailyAdminParkingStatusReport ", response);
  //     const { data: res } = response;
  //     if (res.respCode === 1 && res) {
  //       const { checkin, checkout, payment } = res;

  //       let totalcheckin = 0;
  //       let totalcheckout = 0;
  //       let totalPayment = 0;
  //       let totalVehicle = 0;
  //       let carIn = 0;
  //       let carOut = 0;
  //       let bikeIn = 0;
  //       let bikeOut = 0;
  //       let bicycleIn = 0;
  //       let bicycleOut = 0;
  //       let autoIn = 0;
  //       let autoOut = 0;

  //       let vehicleArray = [];
  //       const vechicles = {
  //         1: "Bike",
  //         2: "Car",
  //         3: "Auto",
  //         4: "Bicycle",
  //       };
  //       if (checkin) {
  //         for (let i = 0; i < checkin.length; i++) {
  //           const { vehicletype, vehiclecount } = checkin[i];
  //           const vehicleName = vechicles[vehicletype];
  //           const ifExist = vehicleArray.findIndex(
  //             (value, index) => value === vehicleName
  //           );
  //           if (ifExist == -1) {
  //             vehicleArray.push(vehicleName);
  //           }

  //           carIn = vehicleName == "Car" ? vehiclecount : carIn;
  //           bikeIn = vehicleName == "Bike" ? vehiclecount : bikeIn;
  //           bicycleIn = vehicleName == "Bicycle" ? vehiclecount : bicycleIn;
  //           autoIn = vehicleName == "Auto" ? vehiclecount : autoIn;

  //           totalcheckin = totalcheckin + vehiclecount;
  //         }
  //         console.log("checkin data", carIn);
  //       }
  //       if (checkout) {
  //         for (let i = 0; i < checkout.length; i++) {
  //           const { vehicletype, vehiclecount } = checkout[i];
  //           const vehicleName = vechicles[vehicletype];
  //           const ifExist = vehicleArray.findIndex(
  //             (value, index) => value === vehicleName
  //           );
  //           if (ifExist == -1) {
  //             vehicleArray.push(vehicleName);
  //           }

  //           carOut = vehicleName == "Car" ? vehiclecount : carOut;
  //           bikeOut = vehicleName == "Bike" ? vehiclecount : bikeOut;
  //           bicycleOut = vehicleName == "Bicycle" ? vehiclecount : bicycleOut;
  //           autoOut = vehicleName == "Auto" ? vehiclecount : autoOut;

  //           totalcheckout = totalcheckout + vehiclecount;
  //         }
  //       }

  //       const paymentValue = {
  //         2: "Cash",
  //         3: "Online",
  //         5: "Exempt",
  //       };
  //       let paymentArray = [];
  //       // let colorArray = [(opacity = 1) => `#2E7D32`,(opacity = 1) => `#FD0002`,(opacity = 1) => `#00266B`];
  //       let colorArray = [];

  //       let amountArray = [];
  //       let cashCount = 0;
  //       let onlineCount = 0;
  //       let noCashCount = 0;

  //       if (payment) {
  //         for (let i = 0; i < payment.length; i++) {
  //           const { paymentmode, amountcollected } = payment[i];
  //           const paymentName = paymentValue[paymentmode];
  //           const ifExist = paymentArray.findIndex(
  //             (value, index) => value === paymentName
  //           );
  //           if (ifExist == -1) {
  //             paymentArray.push(paymentName);
  //           }

  //           cashCount =
  //             paymentName == "Cash" ? amountcollected / 100 : cashCount;
  //           onlineCount =
  //             paymentName == "Online" ? amountcollected / 100 : onlineCount;
  //           noCashCount =
  //             paymentName == "Exempt" ? amountcollected / 100 : noCashCount;

  //           if (cashCount !== 0) {
  //             amountArray.push(cashCount);
  //           } else if (onlineCount !== 0) {
  //             amountArray.push(onlineCount);
  //           } else if (noCashCount !== 0) {
  //             amountArray.push(noCashCount);
  //           }
  //           if (paymentmode === 2) {
  //             colorArray.push((opacity = 1) => `#2E7D32`);
  //           } else if (paymentmode === 3) {
  //             colorArray.push((opacity = 1) => `#FD0002`);
  //           } else if (paymentmode === 5) {
  //             colorArray.push((opacity = 1) => `#00266B`);
  //           }
  //           if (paymentmode !== 5) {
  //             totalPayment = totalPayment + amountcollected / 100;
  //           }
  //         }
  //       }

  //       let finalArray = [];

  //       let objCar = {
  //         name: "Car",
  //         totalin: carIn,
  //         totalout: carOut,
  //       };
  //       finalArray.push(objCar);
  //       let objBike = {
  //         name: "Bike",
  //         totalin: bikeIn,
  //         totalout: bikeOut,
  //       };
  //       finalArray.push(objBike);
  //       let objBicycle = {
  //         name: "Bicycle",
  //         totalin: bicycleIn,
  //         totalout: bicycleOut,
  //       };
  //       finalArray.push(objBicycle);

  //       this.setState({
  //         dailyReport: finalArray,
  //         totalCheckIn: totalcheckin,
  //         totalCheckOut: totalcheckout,
  //         totalCash: cashCount,
  //         totalOnline: onlineCount,
  //         totalNoCash: noCashCount,
  //         totalAmount: totalPayment,
  //       });
  //     }
  //   } catch (error) {
  //     console.log("error getDailyAdminParkingStatusReport", error);
  //   }
  // };

  // getMonthlyAdminParkingStatusReport = async (inputdate) => {
  //   const { token, facilityid, startDate } = this.state;
  //   let inputdatetime = moment(inputdate).format("MMM-YYYY"); // 01-Oct-2022

  //   try {
  //     const response = await UserService.AdminMonthlyParkingStatusReport(
  //       facilityid,
  //       token,
  //       inputdatetime
  //     );

  //     console.log(
  //       "response after getMonthlyAdminParkingStatusReport ",
  //       response
  //     );
  //     const { data: res } = response;
  //     if (res.respCode === 1 && res) {
  //       const { checkin, checkout, payment } = res;

  //       let totalcheckin = 0;
  //       let totalcheckout = 0;
  //       let totalPayment = 0;
  //       let totalVehicle = 0;
  //       let carIn = 0;
  //       let carOut = 0;
  //       let bikeIn = 0;
  //       let bikeOut = 0;
  //       let bicycleIn = 0;
  //       let bicycleOut = 0;
  //       let autoIn = 0;
  //       let autoOut = 0;

  //       let vehicleArray = [];
  //       const vechicles = {
  //         1: "Bike",
  //         2: "Car",
  //         3: "Auto",
  //         4: "Bicycle",
  //       };
  //       if (checkin) {
  //         for (let i = 0; i < checkin.length; i++) {
  //           const { vehicletype, vehiclecount } = checkin[i];
  //           const vehicleName = vechicles[vehicletype];
  //           const ifExist = vehicleArray.findIndex(
  //             (value, index) => value === vehicleName
  //           );
  //           if (ifExist == -1) {
  //             vehicleArray.push(vehicleName);
  //           }

  //           carIn = vehicleName == "Car" ? vehiclecount : carIn;
  //           bikeIn = vehicleName == "Bike" ? vehiclecount : bikeIn;
  //           bicycleIn = vehicleName == "Bicycle" ? vehiclecount : bicycleIn;
  //           autoIn = vehicleName == "Auto" ? vehiclecount : autoIn;

  //           totalcheckin = totalcheckin + vehiclecount;
  //         }
  //         console.log("checkin data", carIn);
  //       }
  //       if (checkout) {
  //         for (let i = 0; i < checkout.length; i++) {
  //           const { vehicletype, vehiclecount } = checkout[i];
  //           const vehicleName = vechicles[vehicletype];
  //           const ifExist = vehicleArray.findIndex(
  //             (value, index) => value === vehicleName
  //           );
  //           if (ifExist == -1) {
  //             vehicleArray.push(vehicleName);
  //           }

  //           carOut = vehicleName == "Car" ? vehiclecount : carOut;
  //           bikeOut = vehicleName == "Bike" ? vehiclecount : bikeOut;
  //           bicycleOut = vehicleName == "Bicycle" ? vehiclecount : bicycleOut;
  //           autoOut = vehicleName == "Auto" ? vehiclecount : autoOut;

  //           totalcheckout = totalcheckout + vehiclecount;
  //         }
  //       }

  //       const paymentValue = {
  //         2: "Cash",
  //         3: "Online",
  //         5: "Exempt",
  //       };
  //       let paymentArray = [];
  //       // let colorArray = [(opacity = 1) => `#2E7D32`,(opacity = 1) => `#FD0002`,(opacity = 1) => `#00266B`];
  //       let colorArray = [];

  //       let amountArray = [];
  //       let cashCount = 0;
  //       let onlineCount = 0;
  //       let noCashCount = 0;

  //       if (payment) {
  //         for (let i = 0; i < payment.length; i++) {
  //           const { paymentmode, amountcollected } = payment[i];
  //           const paymentName = paymentValue[paymentmode];
  //           const ifExist = paymentArray.findIndex(
  //             (value, index) => value === paymentName
  //           );
  //           if (ifExist == -1) {
  //             paymentArray.push(paymentName);
  //           }

  //           cashCount =
  //             paymentName == "Cash" ? amountcollected / 100 : cashCount;
  //           onlineCount =
  //             paymentName == "Online" ? amountcollected / 100 : onlineCount;
  //           noCashCount =
  //             paymentName == "Exempt" ? amountcollected / 100 : noCashCount;

  //           if (cashCount !== 0) {
  //             amountArray.push(cashCount);
  //           } else if (onlineCount !== 0) {
  //             amountArray.push(onlineCount);
  //           } else if (noCashCount !== 0) {
  //             amountArray.push(noCashCount);
  //           }
  //           if (paymentmode === 2) {
  //             colorArray.push((opacity = 1) => `#2E7D32`);
  //           } else if (paymentmode === 3) {
  //             colorArray.push((opacity = 1) => `#FD0002`);
  //           } else if (paymentmode === 5) {
  //             colorArray.push((opacity = 1) => `#00266B`);
  //           }
  //           if (paymentmode !== 5) {
  //             totalPayment = totalPayment + amountcollected / 100;
  //           }
  //         }
  //       }

  //       let finalArray = [];

  //       let objCar = {
  //         name: "Car",
  //         totalin: carIn,
  //         totalout: carOut,
  //       };
  //       finalArray.push(objCar);
  //       let objBike = {
  //         name: "Bike",
  //         totalin: bikeIn,
  //         totalout: bikeOut,
  //       };
  //       finalArray.push(objBike);
  //       let objBicycle = {
  //         name: "Bicycle",
  //         totalin: bicycleIn,
  //         totalout: bicycleOut,
  //       };
  //       finalArray.push(objBicycle);

  //       this.setState({
  //         dailyReport: finalArray,
  //         totalCheckIn: totalcheckin,
  //         totalCheckOut: totalcheckout,
  //         totalCash: cashCount,
  //         totalOnline: onlineCount,
  //         totalNoCash: noCashCount,
  //         totalAmount: totalPayment,
  //       });
  //     }
  //   } catch (error) {
  //     console.log("error getMonthlyAdminParkingStatusReport", error);
  //   }
  // };

  handleChange = (event) => {
    const { mappingList, type } = this.state;

    console.log("first", event.target.value);
    let name = "";
    for (let i = 0; i < mappingList.length; i++) {
      console.log("first", mappingList[i]["facilityid"]);
      if (event.target.value === mappingList[i]["facilityid"]) {
        name = mappingList[i]["name"];
      }
    }
    if (!name) {
      name = "Consolidate";
    }
    console.log("name", name);
    this.setState(
      {
        facilityid: event.target.value,
        facilityName: name,
        dailyReport: [],
        totalCheckIn: 0,
        totalCheckOut: 0,
        totalCash: 0,
        totalOnline: 0,
        totalNoCash: 0,
        totalAmount: 0,
        overallCheckin: 0,
        overallCheckout: 0,
        overallPayment: 0,
      },
      () => {
        if (type === "Daily") {
          this.getDailyMISAdminReport();
          // this.getDailyAdminParkingStatusReport();
        } else {
          // this.getMonthlyAdminParkingStatusReport();
          this.getMonthlyMISAdminReport();
        }
      }
    );
  };

  handleTypeChange = (event) => {
    this.setState(
      {
        type: event.target.value,
        dailyReport: [],
        totalCheckIn: 0,
        totalCheckOut: 0,
        totalCash: 0,
        totalOnline: 0,
        totalNoCash: 0,
        totalAmount: 0,
        overallCheckin: 0,
        overallCheckout: 0,
        overallPayment: 0,
      },
      () => {
        if (event.target.value === "Daily") {
          //this.getDailyAdminParkingStatusReport();
          this.getDailyMISAdminReport();
        } else {
          // this.getMonthlyAdminParkingStatusReport();
          this.getMonthlyMISAdminReport();
        }
      }
    );
  };

  handleDateChange = (date) => {
    const { type } = this.state;
    console.log(date);
    this.setState(
      {
        startDate: date,
        dailyReport: [],
        totalCheckIn: 0,
        totalCheckOut: 0,
        totalCash: 0,
        totalOnline: 0,
        totalNoCash: 0,
        totalAmount: 0,
        overallCheckin: 0,
        overallCheckout: 0,
        overallPayment: 0,
        //endDate: date + 1,
      },
      () => {
        if (type === "Daily") {
          //this.getDailyAdminParkingStatusReport();
          this.getDailyMISAdminReport();
        } else {
          // this.getMonthlyAdminParkingStatusReport();
          this.getMonthlyMISAdminReport();
        }
      }
    );
  };
  handleEndDateChange = (date) => {
    this.setState({
      endDate: date,
    });
  };

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

  render() {
    const { classes } = this.props;
    const {
      instanceId,
      startDate,
      endDate,
      mappingList,
      type,
      rowsPerPage,
      page,
      selected,
      orderBy,
      order,
      dailyReport,
      facilityName,
      totalCheckIn,
      totalCheckOut,
      totalCash,
      totalOnline,
      totalNoCash,
      totalAmount,
      overallCheckin,
      overallCheckout,
      overallPayment,
      facilityid,
    } = this.state;

    console.log("dailyReportdailyReportdailyReport", dailyReport);
    const rows = dailyReport;
    const emptyRows =
      rowsPerPage -
      Math.min(rowsPerPage, dailyReport.length - page * rowsPerPage);

    const isSelected = (id) => selected.indexOf(id) !== -1;

    console.log("mappingList", mappingList, " type", type);
    return (
      <ThemeProvider theme={theme}>
        <Box className="container" p={2.5} bgcolor="primary.lightBgContainer">
          <Paper className="content lead-page">
            <Box className="page-heading" mb={3}>
              <Box color="text.secondary" pt={3} pr={2.7} pb={1.8} pl={3}>
                <Typography variant="h6" gutterBottom color="inherit">
                  Dashboard
                </Typography>
              </Box>
              <Divider />
            </Box>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justifyContent="space-evenly">
                <FormControl variant="standard" className={classes.formControl}>
                  <InputLabel htmlFor="age-native-simple">
                    Select Facility
                  </InputLabel>
                  <Select
                    native
                    value={facilityid}
                    placeholder={"Facility Name"}
                    onChange={(e, index) => {
                      this.handleChange(e);
                    }}
                  >
                    <option value="0">Consolidated</option>

                    {mappingList.map((data, index) => {
                      return (
                        <option key={index.toString()} value={data.facilityid}>
                          {data.name}
                        </option>
                      );
                    })}
                  </Select>
                </FormControl>
                <FormControl variant="standard" className={classes.formControl}>
                  <InputLabel htmlFor="age-native-simple">
                    Select Type
                  </InputLabel>
                  <Select
                    native
                    value={type}
                    placeholder={"Age"}
                    onChange={(e) => this.handleTypeChange(e)}
                  >
                    {/* <option aria-label="None" value="NA" /> */}
                    <option value={"Daily"}>Daily</option>
                    <option value={"Monthly"}>Monthly</option>
                  </Select>
                </FormControl>

                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Date"
                  value={startDate}
                  onChange={(date) => this.handleDateChange(date)}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
                {/* <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="End Date"
                  minDate={startDate}
                  value={endDate}
                  onChange={(date) => this.handleEndDateChange(date)}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                /> */}
                {/* <div className={classes.root}>
                  <Button variant="contained" size="small" color="primary">
                    Submit
                  </Button>
                </div> */}
              </Grid>
            </MuiPickersUtilsProvider>

            {/* <div className="data-table">
              <div className={classes.roots}>
                <Paper className={classes.papers} elevation={0}>
                  <TableContainer>
                    <Table
                      className={classes.table}
                      aria-labelledby="tableTitle"
                      aria-label="enhanced table"
                    >
                      <TableHead>
                        <TableRow>
                          {headCells.map((headCell) => (
                            <TableCell
                              key={headCell.id}
                              align={"left"}
                              padding={"none"}
                            >
                              <TableSortLabel>{headCell.label}</TableSortLabel>
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((Lead, index) => {
                          console.log("first", Lead);
                          const isItemSelected = isSelected(Lead.id);
                          const labelId = `enhanced-table-checkbox-${index}`;

                          return (
                            <TableRow
                              hover
                              tabIndex={-1}
                              key={index}
                              selected={isItemSelected}
                            >
                              <TableCell
                                component="th"
                                id={labelId}
                                scope="row"
                                padding="none"
                                align="left"
                                color="green"
                              >
                                {facilityName}
                              </TableCell>
                              <TableCell
                                component="th"
                                id={labelId}
                                scope="row"
                                padding="none"
                                align="left"
                                color="green"
                              >
                                {Lead.name}
                              </TableCell>
                              <TableCell align="left">{Lead.totalin}</TableCell>
                              <TableCell align="left">
                                {Lead.totalout}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                        {instanceId ? null : (
                          <TableRow>
                            <TableCell colSpan={1}>Total</TableCell>
                            <TableCell align="left">{totalCheckIn}</TableCell>
                            <TableCell align="left">{totalCheckOut}</TableCell>
                            <TableCell align="left">{totalAmount}</TableCell>
                          </TableRow>
                        )}

                        <TableRow>
                          <TableCell>Tax</TableCell>
                          <TableCell align="right">rate</TableCell>
                          <TableCell align="right">ohh</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={2}>Total</TableCell>
                          <TableCell align="right">ok</TableCell>
                        </TableRow>
                        {emptyRows > 0 && (
                          <TableRow>
                            <TableCell colSpan={6} />
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </div>
            </div> */}
            <div>
              <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="download-table-xls-button"
                table="emp"
                filename="tablexls"
                sheet="tablexls"
                buttonText="Download as XLS"
              />

              <table id="emp" className="table all_domain_table">
                <thead className="text-white bg-gray-700">
                  <tr>
                    <th className="above-column">Facility Name</th>

                    <th colspan="3" className="above-column">
                      Total Check In
                    </th>

                    <th colspan="3" className="above-column">
                      Total Check Out
                    </th>

                    <th className="above-column">Payment (Rs)</th>
                  </tr>
                </thead>
                {rows.map((data, index) => {
                  console.log("dataToLoad", data);
                  const {
                    facilityNameToShow,
                    totalBicyclein,
                    totalBicycleout,
                    totalBikein,
                    totalBikeout,
                    totalCarin,
                    totalCarout,
                    totalPayment,
                    totalcheckin,
                    totalcheckout,
                  } = data;
                  return (
                    <>
                      <tr>
                        <td rowspan="2">{facilityNameToShow}</td>
                        <td colspan="3">{totalcheckin}</td>
                        <td colspan="3">{totalcheckout}</td>
                        <td rowspan="2">{totalPayment}</td>
                      </tr>
                      <tr>
                        <td>Car: {totalCarin}</td>
                        <td>Bike: {totalBikein}</td>
                        <td>Bicycle: {totalBicyclein}</td>
                        <td>Car: {totalCarout}</td>
                        <td>Bike: {totalBikeout}</td>
                        <td>Bicycle: {totalBicycleout}</td>
                      </tr>
                    </>
                  );
                })}
                {rows && rows.length > 1 ? (
                  <tfoot>
                    <tr>
                      <td className="align-middle " colSpan={1}>
                        Total:
                      </td>

                      <td colspan="3" className="align-middle">
                        {overallCheckin}
                      </td>

                      <td colspan="3" className="align-middle">
                        {overallCheckout}
                      </td>

                      <td className="align-middle">{overallPayment}</td>
                    </tr>
                  </tfoot>
                ) : null}
              </table>
            </div>
          </Paper>
        </Box>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = (state) => ({
  userDetails: state.user,
});

export default connect(mapStateToProps)(withStyles(useStyles)(Home));
