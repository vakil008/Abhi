import "date-fns";
import React from "react";
import {
  Paper,
  Box,
  Typography,
  Divider,
  Grid,
  TextField,
  FormControlLabel,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  RadioGroup,
  Radio,
  Button,
  Snackbar,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "../../theme/light";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import moment from "moment";
import UserService from "../../services/user.service";

class AddLead extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: new Date(),
      age: "",
      branch: "",
      gender: "female",
      overAllScore: "9",
      speakingScore: "9",
      writingScore: "9",
      readingScore: "9",
      listeningScore: "9",
      dateOfBirth: "",
      date: new Date(),

      workExpId: "yes",
      isSelected: false,
      firstName: "abhijeet",
      lastName: "singh",
      email: "abhi@gmail.com",
      phone: "9999999999",
      address: "qweqweq",
      remarks: "qweqweqwe",
      workDuration: "9 years",
      passportNo: "qweqweq",
      maritalStatus: "yes",
      allCountries: [],
      countryId: "1",
      allLeads: [],
      allLeadsStatus: [],
      leadStatusId: "1",
      leadId: "1",
      allVisaTypes: [],
      allBranch: [],
      branchId: "1",
      allQualifications: [],
      allUniversities: [],
      qualificationInputs: [
        {
          date: new Date(),
          qualificationId: "1",
          passingYear: "2022",
          percentage: "60",
          universityId: "1",
          description: "sadasd",
        },
      ],
      visaInfos: [
        {
          visaCountry: "1",
          visaUniversity: "",
          visaCity: "no",
          visaReason: "asdas",
          visaRemarks: "asdasd",
          visaId: "1",
        },
      ],
      visaRefusaleses: [
        {
          refVisaID: 1,
          refCountry: "1",
          refReason: "sadas",
          refRemarks: "asdasd",
        },
      ],
      spouseQualifications: [
        {
          date: new Date(),
          qualificationId: "1",
          passingYear: "2022",
          percentage: "60",
          description: "dasdas",
          universityId: "1",
        },
      ],

      spouseEmail: "asjkdaj@gmail.com",
      spouseFirstName: "aasd",
      spouseLastName: "asdas",
      spouseDob: "",
      spouseMobileNumber: "1111111111",
      spouseAddress: "asdasd",
      spouseRemarks: "asdasda",
      spouseWorkexperience: "yes",
      spouseWorkduration: "2 year",
      spousePassportnumber: "asdasdasd",
      errorSnack: false,
      alertMessage: "",
      errorMessage: "",
    };
  }

  componentDidMount() {
    this.getAllBranch();
    this.getAllQualifications();
    this.getAllLeadSource();
    this.getAllVisaTypes();
    this.getAllCountries();
    this.getAllLeadStatus();
    this.getAllUniversities();
  }

  handleClose = (event, reason) => {
    this.setState({
      errorSnack: false,
    });
  };

  addQuifications = () => {
    let qualificationInputs = [...this.state.qualificationInputs];
    const obj = {
      date: new Date(),
      qualificationId: "",
      passingYear: "",
      percentage: "",
      universityId: "",
      description: "",
    };
    if (qualificationInputs.length === 5) {
      console.log("you could not add more than 5 qualifications");
    } else {
      qualificationInputs.push(obj);
    }
    this.setState({
      qualificationInputs,
    });
  };

  removeQualifications = (index) => {
    let qualificationInputs = [...this.state.qualificationInputs];
    qualificationInputs.splice(index, 1);
    this.setState({
      qualificationInputs,
    });
  };

  addMoreVisaInfos = () => {
    let visaInfos = [...this.state.visaInfos];
    const obj = {
      visaType: "",
      visaCountry: "",
      visaUniversity: "",
      visaCity: "",
      visaReason: "",
      visaRemarks: "",
      visaId: "",
    };
    if (visaInfos.length === 5) {
      console.log("you could not add more than 5 qualifications");
    } else {
      visaInfos.push(obj);
    }
    this.setState({
      visaInfos,
    });
  };

  removeVisaInfos = (index) => {
    let visaInfos = [...this.state.visaInfos];
    visaInfos.splice(index, 1);
    this.setState({
      visaInfos,
    });
  };

  addRefUsaleses = () => {
    let visaRefusaleses = [...this.state.visaRefusaleses];
    const obj = {
      refVisaID: "",
      refCountry: "",
      refReason: "",
      refRemarks: "",
    };
    if (visaRefusaleses.length == 5) {
      console.log("you could not add more than 5 qualifications");
    } else {
      visaRefusaleses.push(obj);
    }
    this.setState({
      visaRefusaleses,
    });
  };

  removeRefUsaleses = (index) => {
    let visaRefusaleses = [...this.state.visaRefusaleses];
    visaRefusaleses.splice(index, 1);
    this.setState({
      visaRefusaleses,
    });
  };

  addSpouseQualifications = () => {
    let spouseQualifications = [...this.state.spouseQualifications];
    const obj = {
      date: new Date(),
      qualificationId: "",
      passingYear: "",
      percentage: "",
      description: "",
      universityId: "",
    };
    if (spouseQualifications.length === 5) {
      console.log("you could not add more than 5 qualifications");
    } else {
      spouseQualifications.push(obj);
    }
    this.setState({
      spouseQualifications,
    });
  };

  removeSpouseQualifications = (index) => {
    let spouseQualifications = [...this.state.spouseQualifications];
    spouseQualifications.splice(index, 1);
    this.setState({
      spouseQualifications,
    });
  };

  handleSelectChange = (event) => {
    this.setState({
      age: event.target.value,
    });
  };
  handleBranchChange = (event) => {
    this.setState({
      branch: event.target.value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    let {
      visaInfos,
      dateOfBirth,
      workExpId,
      visaRefusaleses,
      firstName,
      lastName,
      email,
      phone,
      address,
      remarks,
      workDuration,
      passportNo,
      maritalStatus,
      countryId,
      readingScore,
      listeningScore,
      leadId,
      writingScore,
      speakingScore,
      overAllScore,
      spouseFirstName,
      spouseLastName,
      spouseDob,
      spouseMobileNumber,
      spouseAddress,
      spouseRemarks,
      spouseWorkexperience,
      spouseWorkduration,
      spousePassportnumber,
      leadStatusId,
    } = this.state;
    console.log("state", this.state);

    let spouseQualifications = [...this.state.spouseQualifications];
    let userQualifications = [...this.state.qualificationInputs];

    let createUserVisa = [];
    let spouseQualifi = [];

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "<API Key>");

    for (let i = 0; i < userQualifications.length; i++) {
      console.log("object", userQualifications[i]);

      let obj = {};
      obj = userQualifications[i];
      obj["passingYear"] = moment(obj["date"]).format("YYYY");
      delete obj["date"];
    }

    for (let i = 0; i < spouseQualifications.length; i++) {
      console.log("object", spouseQualifications[i]);

      let obj = {};
      obj = spouseQualifications[i];
      obj["passingYear"] = moment(obj["date"]).format("YYYY");
      delete obj["date"];
    }

    for (let i = 0; i < visaInfos.length; i++) {
      const {
        visaCountry,
        visaUniversity,
        visaCity,
        visaReason,
        visaRemarks,
        visaId,
      } = visaInfos[i];

      let obj = {};
      obj["visaTypeId"] = visaId;
      obj["countryId"] = visaCountry;
      obj["city"] = visaCity;
      obj["reason"] = visaReason;
      obj["remarks"] = visaRemarks;
      //obj[''] = visaUniversity;
      createUserVisa.push(obj);
    }
    console.log("cheeekkk", spouseQualifications);
    for (let i = 0; i < spouseQualifications.length; i++) {
      let obj = {};
      obj = spouseQualifications[i];
      delete obj.date;

      spouseQualifi.push(obj);
    }

    var raw = JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      DateOfBirth: dateOfBirth,
      emailAddress: email,
      mobileNumber: phone,
      address: address,
      remarks: remarks,
      workexperience: workExpId === "yes" ? true : false,
      workduration: workDuration,
      passportnumber: passportNo,
      branchId: 1,
      ismaritalstatus: maritalStatus === "yes" ? true : false,
      listeningScore: listeningScore,
      readingScore: readingScore,
      writingScore: writingScore,
      speakingScore: speakingScore,
      overAllScore: overAllScore,
      countryId: countryId,
      leadSourceId: leadId,
      leadsStatusId: leadStatusId,
      spouse: {
        firstName: spouseFirstName,
        lastName: spouseLastName,
        DateOfBirth: spouseDob,
        mobileNumber: spouseMobileNumber,
        address: spouseAddress,
        remarks: spouseRemarks,
        workexperience: spouseWorkexperience === "yes" ? true : false,
        workduration: spouseWorkduration,
        passportnumber: spousePassportnumber,
        spouseQualifications: spouseQualifi,
      },
      userQualifications: userQualifications,
      createUserVisa: createUserVisa,
      visaRefusaleses: visaRefusaleses,
    });
    console.log("rawraw", raw);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://crmleadedu.herokuapp.com/api/v1/Leads", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        const { Succeeded, Message } = JSON.parse(result);
        console.log("object", JSON.parse(result));
        if (Succeeded) {
          console.log("object", "done");

          this.setState({
            errorSnack: true,
            overAllScore: "",
            speakingScore: "",
            writingScore: "",
            readingScore: "",
            listeningScore: "",
            dateOfBirth: "",
            workExpId: "",
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            address: "",
            remarks: "",
            workDuration: "",
            passportNo: "",
            maritalStatus: "",
            countryId: "",
            leadStatusId: "",
            leadId: "",
            qualificationInputs: [
              {
                date: new Date(),
                qualificationId: "",
                passingYear: "",
                percentage: "",
                universityId: "",
                description: "",
              },
            ],
            visaInfos: [
              {
                visaCountry: "",
                visaUniversity: "",
                visaCity: "",
                visaReason: "",
                visaRemarks: "",
                visaId: "",
              },
            ],
            visaRefusaleses: [
              {
                refVisaID: "",
                refCountry: "",
                refReason: "",
                refRemarks: "",
              },
            ],
            spouseQualifications: [
              {
                date: new Date(),
                qualificationId: "",
                passingYear: "",
                percentage: "",
                description: "",
              },
            ],
            spouseEmail: "",
            spouseFirstName: "",
            spouseLastName: "",
            spouseDob: "",
            spouseMobileNumber: "",
            spouseAddress: "",
            spouseRemarks: "",
            spouseWorkexperience: "",
            spouseWorkduration: "",
            spousePassportnumber: "",
          });
        } else {
          this.setState({
            errorMessage: Message,
            errorSnack: true,
          });
        }
      })
      .catch((error) => console.log("error", error));
  };

  getAllQualifications = async () => {
    try {
      const response = await UserService.GetAllQualification();
      console.log("response of qualifications", response);

      const { data } = response;
      const { data: list, succeeded } = data;
      if (succeeded) {
        if (list && list.length) {
          this.setState({
            allQualifications: list,
          });
        }
      }
    } catch (error) {
      console.log("status error", error);
    }
  };

  getAllCountries = async () => {
    try {
      const response = await UserService.GetAllCountry();
      console.log("response of getAllCountries", response);

      const { data } = response;
      const { data: list, succeeded } = data;
      if (succeeded) {
        if (list && list.length) {
          this.setState({
            allCountries: list,
          });
        }
      }
    } catch (error) {
      console.log("status error", error);
    }
  };

  getAllLeadStatus = async () => {
    try {
      const response = await UserService.GetAllLeadsStatus();
      console.log("response of getAllLeadStatus", response);

      const { data } = response;
      if (data) {
        const { data: list, succeeded } = data;
        if (succeeded) {
          if (list && list.length) {
            this.setState({
              allLeadsStatus: list,
            });
          }
        }
      }
    } catch (error) {
      console.log("status error", error);
    }
  };

  getAllUniversities = async () => {
    try {
      const response = await UserService.GetAllUniversity();
      console.log("response of getAllUniversities", response);

      const { data } = response;
      if (data) {
        const { data: list, succeeded } = data;
        if (succeeded) {
          if (list && list.length) {
            this.setState({
              allUniversities: list,
            });
          }
        }
      }
    } catch (error) {
      console.log("status error", error);
    }
  };

  getAllVisaTypes = async () => {
    try {
      const response = await UserService.GetAllVisaTypes();
      console.log("response of getAllVisaTypes", response);

      const { data } = response;
      const { data: list, succeeded } = data;
      if (succeeded) {
        if (list && list.length) {
          this.setState({
            allVisaTypes: list,
          });
        }
      }
    } catch (error) {
      console.log("status error", error);
    }
  };

  getAllLeadSource = async () => {
    try {
      const response = await UserService.GetAllLeadSource();
      console.log("response of getAllLeadSource", response);

      const { data } = response;
      const { data: list, succeeded } = data;
      if (succeeded) {
        if (list && list.length) {
          this.setState({
            allLeads: list,
          });
        }
      }
    } catch (error) {
      console.log("status error", error);
    }
  };

  getAllBranch = async () => {
    try {
      const response = await UserService.GetAllBranch();
      console.log("response of getAllBranch", response);

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

  render() {
    const {
      selectedDate,
      age,
      qualificationInputs,
      allQualifications,
      spouseQualifications,
      allCountries,
      allLeads,
      allVisaTypes,
      countryId,
      leadId,
      visaInfos,
      email,
      firstName,
      lastName,
      address,
      phone,
      dateOfBirth,
      remarks,
      spouseDob,
      passportNo,
      allBranch,
      branchId,
      listeningScore,
      readingScore,
      writingScore,
      speakingScore,
      spouseFirstName,
      spouseRemarks,
      spouseEmail,
      spouseLastName,
      spouseMobileNumber,
      spouseAddress,
      spouseWorkexperience,
      spouseWorkduration,
      spousePassportnumber,
      workExpId,
      maritalStatus,
      visaRefusaleses,
      allLeadsStatus,
      leadStatusId,
      workDuration,
      errorSnack,
      alertMessage,
      errorMessage,
      allUniversities,
    } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <Box className="container" p={2.5} bgcolor="primary.lightBgContainer">
          <Paper className="content lead-page">
            <Box className="page-heading" mb={3}>
              <Box color="text.secondary" pt={3} pr={2.7} pb={1.8} pl={3}>
                <Typography variant="h6" gutterBottom color="inherit">
                  Lead Form
                </Typography>
              </Box>
              <Divider />
            </Box>

            <Box className="lead-form" px={3} pb={3}>
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <TextField
                    type="text"
                    label="First Name"
                    value={firstName}
                    variant="outlined"
                    className="custom-textfield"
                    onChange={(event) => {
                      this.setState({
                        firstName: event.target.value,
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    type="text"
                    label="Last Name"
                    value={lastName}
                    variant="outlined"
                    className="custom-textfield"
                    onChange={(event) => {
                      this.setState({
                        lastName: event.target.value,
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="dd-MM-yyyy"
                      autoOk
                      margin="normal"
                      id="date-picker-inline"
                      label="Date Of Birth"
                      value={dateOfBirth ? dateOfBirth : selectedDate}
                      onChange={(date) => {
                        this.setState({
                          dateOfBirth: date,
                        });
                      }}
                      className="custom-datepicker"
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    type="text"
                    label="Email Address"
                    value={email}
                    variant="outlined"
                    className="custom-textfield"
                    onChange={(event) => {
                      this.setState({
                        email: event.target.value,
                      });
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <TextField
                    type="number"
                    label="Mobile Number"
                    value={phone}
                    variant="outlined"
                    className="custom-textfield"
                    onChange={(event) => {
                      this.setState({
                        phone: event.target.value,
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    type="text"
                    label="Address"
                    value={address}
                    variant="outlined"
                    className="custom-textfield"
                    onChange={(event) => {
                      this.setState({
                        address: event.target.value,
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    type="text"
                    label="Remarks"
                    value={remarks}
                    variant="outlined"
                    className="custom-textfield"
                    onChange={(event) => {
                      this.setState({
                        remarks: event.target.value,
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={3} className="work-experience">
                  <Box color="text.secondary">
                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      color="inherit"
                    >
                      Work Experience
                    </Typography>
                  </Box>

                  <Box display="flex">
                    <RadioGroup
                      aria-label="gender"
                      name="gender1"
                      value={workExpId}
                      onChange={(event) => {
                        this.setState({
                          workExpId: event.target.value,
                        });
                      }}
                    >
                      <FormControlLabel
                        value="yes"
                        control={<Radio color="primary" />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio color="primary" />}
                        label="No"
                      />
                    </RadioGroup>
                  </Box>
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <TextField
                    type="text"
                    label="Work Duration"
                    variant="outlined"
                    value={workDuration}
                    className="custom-textfield"
                    onChange={(event) => {
                      this.setState({
                        workDuration: event.target.value,
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    type="text"
                    label="Passport Number"
                    variant="outlined"
                    value={passportNo}
                    className="custom-textfield"
                    onChange={(event) => {
                      this.setState({
                        passportNo: event.target.value,
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <FormControl variant="outlined" className="custom-textfield">
                    <InputLabel id="demo-simple-select-outlined-label">
                      Branch
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={branchId}
                      onChange={(event) => {
                        this.setState({
                          branchId: event.target.value,
                        });
                      }}
                      label="Branch"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {allBranch.map((data, index) => {
                        return (
                          <MenuItem key={index.toString()} value={data.id}>
                            {data.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={3} className="work-experience">
                  <Box color="text.secondary">
                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      color="inherit"
                    >
                      Marital Status
                    </Typography>
                  </Box>
                  <Box display="flex">
                    <RadioGroup
                      aria-label="gender"
                      name="gender1"
                      value={maritalStatus}
                      onChange={(event) => {
                        this.setState({
                          maritalStatus: event.target.value,
                        });
                      }}
                    >
                      <FormControlLabel
                        value="yes"
                        control={<Radio color="primary" />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio color="primary" />}
                        label="No"
                      />
                    </RadioGroup>
                  </Box>
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <TextField
                    type="text"
                    label="Listening Score"
                    variant="outlined"
                    value={listeningScore}
                    className="custom-textfield"
                    onChange={(event) => {
                      this.setState({
                        listeningScore: event.target.value,
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    type="text"
                    label="Reading Score"
                    variant="outlined"
                    value={readingScore}
                    className="custom-textfield"
                    onChange={(event) => {
                      this.setState({
                        readingScore: event.target.value,
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    type="text"
                    label="Writing Score"
                    variant="outlined"
                    value={writingScore}
                    className="custom-textfield"
                    onChange={(event) => {
                      this.setState({
                        writingScore: event.target.value,
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    type="text"
                    label="Speaking Score"
                    variant="outlined"
                    value={speakingScore}
                    className="custom-textfield"
                    onChange={(event) => {
                      this.setState({
                        speakingScore: event.target.value,
                      });
                    }}
                  />
                </Grid>
              </Grid>

              <Box mt={1}></Box>
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <FormControl variant="outlined" className="custom-textfield">
                    <InputLabel id="demo-simple-select-outlined-label">
                      Country
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={countryId}
                      onChange={(event) => {
                        if (event.target.value) {
                          this.setState({
                            countryId: event.target.value,
                          });
                        } else {
                          this.setState({
                            countryId: "",
                          });
                        }
                      }}
                      label="Country"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {allCountries.map((data, index) => {
                        return (
                          <MenuItem key={index.toString()} value={data.id}>
                            {data.countryDescription}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <FormControl variant="outlined" className="custom-textfield">
                    <InputLabel id="demo-simple-select-outlined-label">
                      Lead Source
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={leadId}
                      onChange={(event) => {
                        if (event.target.value) {
                          this.setState({
                            leadId: event.target.value,
                          });
                        } else {
                          this.setState({
                            leadId: "",
                          });
                        }
                      }}
                      label="Lead Source"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {allLeads.map((data, index) => {
                        return (
                          <MenuItem key={index.toString()} value={data.id}>
                            {data.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <FormControl variant="outlined" className="custom-textfield">
                    <InputLabel id="demo-simple-select-outlined-label">
                      Lead Status
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={leadStatusId}
                      onChange={(event) => {
                        this.setState({
                          leadStatusId: event.target.value,
                        });
                      }}
                      label="Lead Status"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {allLeadsStatus.map((data, index) => {
                        return (
                          <MenuItem key={index.toString()} value={data.id}>
                            {data.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Box
                color="text.secondary"
                mt={3}
                mb={2}
                className="spouse-heading"
                display="flex"
                alignItems="center"
              >
                <Typography variant="subtitle1" gutterBottom color="inherit">
                  Spouse
                </Typography>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <TextField
                    type="text"
                    label="First Name"
                    variant="outlined"
                    value={spouseFirstName}
                    className="custom-textfield"
                    onChange={(event) => {
                      this.setState({
                        spouseFirstName: event.target.value,
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    type="text"
                    label="Last Name"
                    variant="outlined"
                    value={spouseLastName}
                    className="custom-textfield"
                    onChange={(event) => {
                      this.setState({
                        spouseLastName: event.target.value,
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="dd-MM-yyyy"
                      autoOk
                      margin="normal"
                      id="date-picker-inline"
                      label="Date Of Birth"
                      value={spouseDob ? spouseDob : selectedDate}
                      onChange={(date) => {
                        this.setState({
                          spouseDob: date,
                        });
                      }}
                      className="custom-datepicker"
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    type="text"
                    label="Email Address"
                    variant="outlined"
                    value={spouseEmail}
                    className="custom-textfield"
                    onChange={(event) => {
                      this.setState({
                        spouseEmail: event.target.value,
                      });
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <TextField
                    type="number"
                    label="Mobile Number"
                    variant="outlined"
                    value={spouseMobileNumber}
                    className="custom-textfield"
                    onChange={(event) => {
                      this.setState({
                        spouseMobileNumber: event.target.value,
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    type="text"
                    label="Address"
                    variant="outlined"
                    value={spouseAddress}
                    className="custom-textfield"
                    onChange={(event) => {
                      this.setState({
                        spouseAddress: event.target.value,
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    type="text"
                    label="Remarks"
                    variant="outlined"
                    value={spouseRemarks}
                    className="custom-textfield"
                    onChange={(event) => {
                      this.setState({
                        spouseRemarks: event.target.value,
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={3} className="work-experience">
                  <Box color="text.secondary">
                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      color="inherit"
                    >
                      Work Experience
                    </Typography>
                  </Box>

                  <Box display="flex">
                    <RadioGroup
                      aria-label="gender"
                      name="gender1"
                      value={spouseWorkexperience}
                      onChange={(event) => {
                        this.setState({
                          spouseWorkexperience: event.target.value,
                        });
                      }}
                    >
                      <FormControlLabel
                        value="yes"
                        control={<Radio color="primary" />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="no"
                        control={<Radio color="primary" />}
                        label="No"
                      />
                    </RadioGroup>
                  </Box>
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <TextField
                    type="text"
                    label="Work Duration"
                    variant="outlined"
                    value={spouseWorkduration}
                    className="custom-textfield"
                    onChange={(event) => {
                      this.setState({
                        spouseWorkduration: event.target.value,
                      });
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    type="text"
                    label="Passport Number"
                    variant="outlined"
                    value={spousePassportnumber}
                    className="custom-textfield"
                    onChange={(event) => {
                      this.setState({
                        spousePassportnumber: event.target.value,
                      });
                    }}
                  />
                </Grid>
              </Grid>

              <Box
                color="text.secondary"
                mt={3}
                mb={2}
                className="spouse-heading"
                display="flex"
                alignItems="center"
              >
                <Typography variant="subtitle1" gutterBottom color="inherit">
                  Spouse Qualifications
                </Typography>
                <Box
                  ml="auto"
                  onClick={this.addSpouseQualifications}
                  className="cursor-pointer"
                >
                  <AddCircleIcon color="primary" style={{ fontSize: 25 }} />
                </Box>
              </Box>
              {spouseQualifications.map((data, index) => {
                return (
                  <>
                    {spouseQualifications.length > 1 && index !== 0 ? (
                      <Box
                        color="text.secondary"
                        mt={3}
                        mb={2}
                        className="spouse-heading"
                        display="flex"
                        alignItems="center"
                      >
                        <Box
                          ml="auto"
                          onClick={() => this.removeSpouseQualifications(index)}
                          className="cursor-pointer"
                        >
                          <AddCircleIcon
                            color="primary"
                            style={{ fontSize: 25 }}
                          />
                        </Box>
                      </Box>
                    ) : (
                      ""
                    )}

                    <Grid key={index.toString()} container spacing={3}>
                      <Grid item xs={3}>
                        <FormControl
                          variant="outlined"
                          className="custom-textfield"
                        >
                          <InputLabel id="demo-simple-select-outlined-label">
                            Qualification
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={
                              spouseQualifications[index]["qualificationId"]
                            }
                            onChange={(event) => {
                              console.log(event.target.value);
                              if (event.target.value) {
                                let spouseQualifications = [];
                                spouseQualifications = [
                                  ...this.state.spouseQualifications,
                                ];
                                spouseQualifications[index]["qualificationId"] =
                                  event.target.value;
                                this.setState({
                                  spouseQualifications,
                                });
                              }
                            }}
                            label="Qualification"
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            {allQualifications.map((data, index) => {
                              return (
                                <MenuItem
                                  key={index.toString()}
                                  value={data.id}
                                >
                                  {data.name}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={3}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="dd-MM-yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Passing Year"
                            autoOk
                            value={spouseQualifications[index]["date"]}
                            onChange={(date) => {
                              let spouseQualifications = [];
                              spouseQualifications = [
                                ...this.state.spouseQualifications,
                              ];
                              spouseQualifications[index]["date"] = date;
                              this.setState({
                                spouseQualifications,
                              });
                            }}
                            className="custom-datepicker"
                            KeyboardButtonProps={{
                              "aria-label": "change date",
                            }}
                          />
                        </MuiPickersUtilsProvider>
                      </Grid>

                      <Grid item xs={3}>
                        <TextField
                          type="text"
                          label="Percentage"
                          variant="outlined"
                          className="custom-textfield"
                          value={spouseQualifications[index]["percentage"]}
                          onChange={(event) => {
                            let spouseQualifications = [];
                            spouseQualifications = [
                              ...this.state.spouseQualifications,
                            ];
                            spouseQualifications[index]["percentage"] =
                              event.target.value;
                            this.setState({
                              spouseQualifications,
                            });
                          }}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <TextField
                          type="text"
                          label="Description"
                          variant="outlined"
                          value={spouseQualifications[index]["description"]}
                          className="custom-textfield"
                          onChange={(event) => {
                            let spouseQualifications = [];
                            spouseQualifications = [
                              ...this.state.spouseQualifications,
                            ];
                            spouseQualifications[index]["description"] =
                              event.target.value;
                            this.setState({
                              spouseQualifications,
                            });
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                      <Grid item xs={3}>
                        <FormControl
                          variant="outlined"
                          className="custom-textfield"
                        >
                          <InputLabel id="demo-simple-select-outlined-label">
                            University
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={spouseQualifications[index]["universityId"]}
                            onChange={(event) => {
                              let spouseQualifications = [];
                              spouseQualifications = [
                                ...this.state.spouseQualifications,
                              ];
                              spouseQualifications[index]["universityId"] =
                                event.target.value;
                              this.setState({
                                spouseQualifications,
                              });
                            }}
                            label="University"
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            {allUniversities.map((data, index) => {
                              return (
                                <MenuItem
                                  key={index.toString()}
                                  value={data.id}
                                >
                                  {data.name}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </>
                );
              })}

              <Box
                color="text.secondary"
                mt={3}
                mb={2}
                className="spouse-heading"
                display="flex"
                alignItems="center"
              >
                <Typography variant="subtitle1" gutterBottom color="inherit">
                  User Qualifications
                </Typography>
                <Box
                  ml="auto"
                  onClick={this.addQuifications}
                  className="cursor-pointer"
                >
                  <AddCircleIcon color="primary" style={{ fontSize: 25 }} />
                </Box>
              </Box>

              {qualificationInputs.map((data, index) => {
                return (
                  <>
                    {qualificationInputs.length > 1 && index !== 0 ? (
                      <Box
                        color="text.secondary"
                        mt={3}
                        mb={2}
                        className="spouse-heading"
                        display="flex"
                        alignItems="center"
                      >
                        <Box
                          ml="auto"
                          onClick={() => this.removeQualifications(index)}
                          className="cursor-pointer"
                        >
                          <AddCircleIcon
                            color="primary"
                            style={{ fontSize: 25 }}
                          />
                        </Box>
                      </Box>
                    ) : (
                      ""
                    )}
                    <Grid key={index.toString()} container spacing={3}>
                      <Grid item xs={3}>
                        <FormControl
                          variant="outlined"
                          className="custom-textfield"
                        >
                          <InputLabel id="demo-simple-select-outlined-label">
                            Qualification
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={
                              qualificationInputs[index]["qualificationId"]
                            }
                            onChange={(event) => {
                              if (event.target.value) {
                                let qualificationInputs = [];
                                qualificationInputs = [
                                  ...this.state.qualificationInputs,
                                ];
                                qualificationInputs[index]["qualificationId"] =
                                  event.target.value;
                                this.setState({
                                  qualificationInputs,
                                });
                              }
                            }}
                            label="Qualification"
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            {allQualifications.map((data, index) => {
                              return (
                                <MenuItem
                                  key={index.toString()}
                                  value={data.id}
                                >
                                  {data.name}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={3}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="dd-MM-yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Passing Year"
                            autoOk
                            value={qualificationInputs[index]["date"]}
                            onChange={(date) => {
                              let qualificationInputs = [];
                              qualificationInputs = [
                                ...this.state.qualificationInputs,
                              ];
                              qualificationInputs[index]["date"] = date;
                              this.setState({
                                qualificationInputs,
                              });
                            }}
                            className="custom-datepicker"
                            KeyboardButtonProps={{
                              "aria-label": "change date",
                            }}
                          />
                        </MuiPickersUtilsProvider>
                      </Grid>

                      <Grid item xs={3}>
                        <TextField
                          type="text"
                          label="Percentage"
                          variant="outlined"
                          className="custom-textfield"
                          value={qualificationInputs[index]["percentage"]}
                          onChange={(event) => {
                            let qualificationInputs = [];
                            qualificationInputs = [
                              ...this.state.qualificationInputs,
                            ];
                            qualificationInputs[index]["percentage"] =
                              event.target.value;
                            this.setState({
                              qualificationInputs,
                            });
                          }}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <TextField
                          type="text"
                          label="Description"
                          variant="outlined"
                          className="custom-textfield"
                          value={qualificationInputs[index]["description"]}
                          onChange={(event) => {
                            let qualificationInputs = [];
                            qualificationInputs = [
                              ...this.state.qualificationInputs,
                            ];
                            qualificationInputs[index]["description"] =
                              event.target.value;
                            this.setState({
                              qualificationInputs,
                            });
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                      <Grid item xs={3}>
                        <FormControl
                          variant="outlined"
                          className="custom-textfield"
                        >
                          <InputLabel id="demo-simple-select-outlined-label">
                            University
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={qualificationInputs[index]["universityId"]}
                            onChange={(event) => {
                              let qualificationInputs = [];
                              qualificationInputs = [
                                ...this.state.qualificationInputs,
                              ];
                              qualificationInputs[index]["universityId"] =
                                event.target.value;
                              this.setState({
                                qualificationInputs,
                              });
                            }}
                            label="University"
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            {allUniversities.map((data, index) => {
                              return (
                                <MenuItem
                                  key={index.toString()}
                                  value={data.id}
                                >
                                  {data.name}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </>
                );
              })}
              <Box
                color="text.secondary"
                mt={3}
                mb={2}
                className="spouse-heading"
                display="flex"
                alignItems="center"
              >
                <Typography variant="subtitle1" gutterBottom color="inherit">
                  Create User Visa
                </Typography>
                <Box
                  ml="auto"
                  onClick={this.addMoreVisaInfos}
                  className="cursor-pointer"
                >
                  <AddCircleIcon color="primary" style={{ fontSize: 25 }} />
                </Box>
              </Box>
              {visaInfos.map((data, index) => {
                return (
                  <>
                    {visaInfos.length > 1 && index !== 0 ? (
                      <Box
                        color="text.secondary"
                        mt={3}
                        mb={2}
                        className="spouse-heading"
                        display="flex"
                        alignItems="center"
                      >
                        <Box
                          ml="auto"
                          onClick={() => this.removeVisaInfos(index)}
                          className="cursor-pointer"
                        >
                          <AddCircleIcon
                            color="primary"
                            style={{ fontSize: 25 }}
                          />
                        </Box>
                      </Box>
                    ) : (
                      ""
                    )}
                    <Grid key={index.toString()} container spacing={3}>
                      <Grid item xs={3}>
                        <FormControl
                          variant="outlined"
                          className="custom-textfield"
                        >
                          <InputLabel id="demo-simple-select-outlined-label">
                            Visa Type
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={visaInfos[index]["visaId"]}
                            onChange={(event) => {
                              if (event.target.value) {
                                let visaInfos = [];
                                visaInfos = [...this.state.visaInfos];
                                visaInfos[index]["visaId"] = event.target.value;
                                this.setState({
                                  visaInfos,
                                });
                              }
                            }}
                            label="Visa Type"
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            {allVisaTypes.map((data, index) => {
                              return (
                                <MenuItem
                                  key={index.toString()}
                                  value={data.id}
                                >
                                  {data.name}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={3}>
                        <FormControl
                          variant="outlined"
                          className="custom-textfield"
                        >
                          <InputLabel id="demo-simple-select-outlined-label">
                            Country
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={visaInfos[index]["visaCountry"]}
                            onChange={(event) => {
                              if (event.target.value) {
                                let visaInfos = [];
                                visaInfos = [...this.state.visaInfos];
                                visaInfos[index]["visaCountry"] =
                                  event.target.value;
                                this.setState({
                                  visaInfos,
                                });
                              }
                            }}
                            label="Country"
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            {allCountries.map((data, index) => {
                              return (
                                <MenuItem
                                  key={index.toString()}
                                  value={data.id}
                                >
                                  {data.countryDescription}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={3}>
                        <TextField
                          type="text"
                          label="City"
                          variant="outlined"
                          className="custom-textfield"
                          value={visaInfos[index]["visaCity"]}
                          onChange={(event) => {
                            let visaInfos = [];
                            visaInfos = [...this.state.visaInfos];
                            visaInfos[index]["visaCity"] = event.target.value;
                            this.setState({
                              visaInfos,
                            });
                          }}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <TextField
                          type="text"
                          label="Reason"
                          variant="outlined"
                          className="custom-textfield"
                          value={visaInfos[index]["visaReason"]}
                          onChange={(event) => {
                            let visaInfos = [];
                            visaInfos = [...this.state.visaInfos];
                            visaInfos[index]["visaReason"] = event.target.value;
                            this.setState({
                              visaInfos,
                            });
                          }}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <TextField
                          type="text"
                          label="remarks"
                          variant="outlined"
                          className="custom-textfield"
                          value={visaInfos[index]["visaRemarks"]}
                          onChange={(event) => {
                            let visaInfos = [];
                            visaInfos = [...this.state.visaInfos];
                            visaInfos[index]["visaRemarks"] =
                              event.target.value;
                            this.setState({
                              visaInfos,
                            });
                          }}
                        />
                      </Grid>
                    </Grid>
                  </>
                );
              })}

              <Box
                color="text.secondary"
                mt={3}
                mb={2}
                className="spouse-heading"
                display="flex"
                alignItems="center"
              >
                <Typography variant="subtitle1" gutterBottom color="inherit">
                  User Refusales Visa
                </Typography>
                <Box
                  ml="auto"
                  onClick={this.addRefUsaleses}
                  className="cursor-pointer"
                >
                  <AddCircleIcon color="primary" style={{ fontSize: 25 }} />
                </Box>
              </Box>
              {visaRefusaleses.map((data, index) => {
                return (
                  <>
                    {visaRefusaleses.length > 1 && index !== 0 ? (
                      <Box
                        color="text.secondary"
                        mt={3}
                        mb={2}
                        className="spouse-heading"
                        display="flex"
                        alignItems="center"
                      >
                        <Box
                          ml="auto"
                          onClick={() => this.removeRefUsaleses(index)}
                          className="cursor-pointer"
                        >
                          <AddCircleIcon
                            color="primary"
                            style={{ fontSize: 25 }}
                          />
                        </Box>
                      </Box>
                    ) : (
                      ""
                    )}
                    <Grid key={index.toString()} container spacing={3}>
                      <Grid item xs={3}>
                        <FormControl
                          variant="outlined"
                          className="custom-textfield"
                        >
                          <InputLabel id="demo-simple-select-outlined-label">
                            Visa Type
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={visaRefusaleses[index]["refVisaID"]}
                            onChange={(event) => {
                              let visaRefusaleses = [];
                              visaRefusaleses = [...this.state.visaRefusaleses];
                              visaRefusaleses[index]["refVisaID"] =
                                event.target.value;
                              this.setState({
                                visaRefusaleses,
                              });
                            }}
                            label="Visa Type"
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            {allVisaTypes.map((data, index) => {
                              return (
                                <MenuItem
                                  key={index.toString()}
                                  value={data.id}
                                >
                                  {data.name}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={3}>
                        <FormControl
                          variant="outlined"
                          className="custom-textfield"
                        >
                          <InputLabel id="demo-simple-select-outlined-label">
                            Country
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={visaRefusaleses[index]["refCountry"]}
                            onChange={(event) => {
                              if (event.target.value) {
                                let visaRefusaleses = [];
                                visaRefusaleses = [
                                  ...this.state.visaRefusaleses,
                                ];
                                visaRefusaleses[index]["refCountry"] =
                                  event.target.value;
                                this.setState({
                                  visaRefusaleses,
                                });
                              }
                            }}
                            label="Country"
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            {allCountries.map((data, index) => {
                              return (
                                <MenuItem
                                  key={index.toString()}
                                  value={data.id}
                                >
                                  {data.countryDescription}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={3}>
                        <TextField
                          type="text"
                          label="Reason"
                          variant="outlined"
                          value={visaRefusaleses[index]["refReason"]}
                          className="custom-textfield"
                          onChange={(event) => {
                            let visaRefusaleses = [];
                            visaRefusaleses = [...this.state.visaRefusaleses];
                            visaRefusaleses[index]["refReason"] =
                              event.target.value;
                            this.setState({
                              visaRefusaleses,
                            });
                          }}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <TextField
                          type="text"
                          label="remarks"
                          variant="outlined"
                          className="custom-textfield"
                          value={visaRefusaleses[index]["refRemarks"]}
                          onChange={(event) => {
                            let visaRefusaleses = [];
                            visaRefusaleses = [...this.state.visaRefusaleses];
                            visaRefusaleses[index]["refRemarks"] =
                              event.target.value;
                            this.setState({
                              visaRefusaleses,
                            });
                          }}
                        />
                      </Grid>
                    </Grid>
                  </>
                );
              })}

              <Box mt={3}>
                <Button
                  variant="contained"
                  color="primary"
                  disableElevation
                  size="large"
                  onClick={this.onSubmit}
                  className="custom-button"
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </Paper>
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
              <Alert onClose={this.handleClose} severity="success">
                {"Data Successfully Submitted"}
              </Alert>
            )}
          </Snackbar>
        </Box>
      </ThemeProvider>
    );
  }
}

export default AddLead;
