import * as React from "react";
import {
  Link,
  Typography,
  Box,
  Paper,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
} from "@material-ui/core";
import logo from "../../theme/assets/images/logo.png";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "../../theme/light";
import UserService from "../../services/user.service";
import {
  setUserFacility,
  setUserToken,
  userLogout,
} from "../../store/actions/user";
import { connect } from "react-redux";
class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: "", //34_adminvaibhav1
      password: "",
      weight: "",
      weightRange: "",
      showPassword: false,
    };
  }

  componentDidMount() {}

  handleClickShowPassword = () => {
    const { showPassword } = this.state;
    this.setState({
      showPassword: !showPassword,
    });
  };

  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  preventDefaults = (event) => event.preventDefault();

  handleSubmit = async () => {
    const { dispatch } = this.props;
    const { email, password } = this.state;
    console.log("ssss");

    try {
      const response = await UserService.singin(email, password);
      const { status, data } = response;
      const { respCode } = data;
      console.log("response after login call --> ", response);
      if (status && respCode === 1) {
        const {
          access,
          defaultstatecode,
          facilityid,
          facilityname,
          forcepasswordchange,
          gstnumber,
          message,
          role,
          token,
          username,
          relogin,
        } = data;

        // let userData = {
        //   access,
        //   defaultstatecode,
        //   facilityid,
        //   facilityname,
        //   forcepasswordchange,
        //   gstnumber,
        //   message,
        //   role,
        //   token,
        //   username,
        //   relogin,
        //   login: "true",
        // };
        dispatch(setUserFacility(facilityid));
        dispatch(setUserToken(token));
      }
    } catch (error) {
      console.log("status error", error);
    }
  };

  render() {
    const { email, password, showPassword } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <Paper className="register-page" elevation={0}>
          <Box bgcolor="primary.white">
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              className="outer-container"
            >
              <Box
                className="register-container"
                display="flex"
                justifyContent="center"
                flexDirection="column"
              >
                {/* <Box
                  className="logo"
                  mb={2}
                  textAlign="center"
                  maxWidth="250px"
                  mx="auto"
                >
                  <img src={logo} alt="img" className="login-logo" />
                </Box> */}
                <Box color="text.primary" mb={2.7} textAlign="center">
                  <Typography variant="h6" gutterBottom color="inherit">
                    Please fill the fields below
                  </Typography>
                </Box>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      type="text"
                      onChange={(event) => {
                        this.setState({
                          email: event.target.value,
                        });
                      }}
                      label="User Id"
                      value={email}
                      variant="outlined"
                      className="custom-textfield"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(event) => {
                          this.setState({
                            password: event.target.value,
                          });
                        }}
                        className="custom-textfield"
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={this.handleClickShowPassword}
                              onMouseDown={this.handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <Visibility fontSize="small" />
                              ) : (
                                <VisibilityOff fontSize="small" />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        labelWidth={70}
                      />
                    </FormControl>
                  </Grid>
                </Grid>
                <Box mt={3} mb={2.5}>
                  <Button
                    onClick={this.handleSubmit}
                    variant="contained"
                    color="primary"
                    disableElevation
                    size="large"
                    className="custom-button"
                    fullWidth={true}
                  >
                    Login
                  </Button>
                </Box>
                {/* <Box color="text.primary" textAlign="center">
                  <Typography variant="body1" gutterBottom>
                    Create a new account?
                    <Box component="span" ml={1}>
                      <Link
                        href="#"
                        className="font-weight-bold policy-lick"
                        underline="always"
                        onClick={this.preventDefaults}
                        color="inherit"
                      >
                        Register
                      </Link>
                    </Box>
                  </Typography>
                </Box> */}
              </Box>
            </Box>
          </Box>
        </Paper>
      </ThemeProvider>
    );
  }
}
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(Login);
