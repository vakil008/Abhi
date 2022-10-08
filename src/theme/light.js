import { createTheme } from "@material-ui/core/styles";
import { makeStyles, fade } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";

export const theme = createTheme({
  palette: {
    common: {
      black: "#303030",
    },
    type: "light",
    background: {
      paper: "#FFFFFF",
      default: "#FFFFFF",
    },
    text: {
      primary: "#195C4B",
      secondary: "#1A1952",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "#A8AABD",
      lightColor: "#E0E0E0",
      ultraLight: "rgba(255, 255, 255, 0.55)",
      textGrey: "#A9ABBE",
      textPrimary: "#299277",
      textSecondary: "#5F64FE",
      textError: "#E31B0C",
      textBlue: "#1A1952",
      textFieldLabelColor: "#474874",
      textFieldPlaceholderColor: "#BDBDBD",
      textInputColor: "#000000",
      textBlack: "#000000",
      textWhite: "#FFFFFF"
    },
    primary: {
      main: "#299277",
      dark: "#258267",
      light: "#616161",
      background:
        "linear-gradient(135deg, rgba(135,224,253,1) 0%,rgba(83,203,241,1) 52%,rgba(5,171,224,1) 100%);",
      border: "rgba(153, 66, 134, 0.5);",
      contrastText: "#FFFFFF",
      logoPrimaryColor: "#FFFFFF",
      slideMenuButton: "rgba(153, 66, 134, 0.08)",
      closeNavMenuSidebar: "#299277",
      mobileMenuBgColor: "FFFFFF",
      closeIconBg: "#35346C",
      headerBlue: "#1A1952",
      rentalAgrementHeaderBg: "#FFFFFF",
      lightBgContainer: "#F4F6F9",
      accordionPrimaryBg: "#299277",
      accordionPrimaryBgLight: "#D765BE",
      datePickerBg: "#E0E0E0",
      editPrimayBgLight: "#EEEEEE",
      linkColor: "#1A1952",
      bodyBgColor: "#F1F5FD",
      headerIconBg: "#F1F5FD",
      relationShipBg: "rgba(153, 66, 134, 0.08)",
      primaryAvatarBg: "rgba(153, 66, 134, 0.08)",
      lightBorderColor: "#EDEEEE",
      homePageBg: "#F1F5FD",
      headerSearchBg: "#F3F6F9",
      primaryButtonBg: "rgba(153, 66, 134, 0.08)",
      avtarGreyBg: "#F3F6F9",
      drawerBg: "#ffffff",
      textareaBg: "rgba(243, 246, 249, 0.92)",
      postTag: "#F5F5F5",
      cloeIconBg: "rgba(0,0,0,0.38)",
      tableHeaderBg: "#F3F6F9",
      playButtonBg: "rgba(0,0,0,0.54)",
      linkContainerBorder: "#E1E1E1",
      linkContainerBg: "#F4F7F9",
      companyLogoBorder: "E7E7E7",
      fileUploadBg: "#F3F6F9",
      borderGreyColor: "#EEEEEE",
      textfieldBg: "#F3F6F9",
      whiteBg: "#FFFFFF",
      chipListBg: "#F3F6F9",
      orBgColor: "#FFFFFF",
      borderColor: "#ECECEC",
      bgWhite: "#FFFFFF",
      dialogBgColor: "#F3F6F9",
      successLighBg: "rgba(76, 175, 80, 0.08)",
      lightGreyBg: "#F3F6F9",
      paymentBg: "#F4F7F9",
      cardDocBg: "#EBF0F9",
      menuCloseBg:"rgba(25,92,75,0.2)",
      primaryIconBg:"rgba(95, 100, 254, 0.08)"
    },
    secondary: {
      main: "#299277",
      dark: "#242AEF",
      light: "#8F93FF",
      background: "rgba(93, 98, 254, 0.08)",
      border: "rgba(95, 100, 254, 0.5)",
      contrastText: "#FFFFFF",
      serachMobileContentBg: "#F5F5F5",
      meetIconBg: "rgba(95,100,254,0.08)",
    },
    success: {
      main: "#19E3B1",
      dark: "#00C896",
      light: "#7BC67E",
      textDark:
        "#4CAF50",
      lightBg:
        "linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), #4CAF50",
      border: "rgba(76, 175, 80, 0.5)",
      contrastText: "#FFFFFF",
      mobileSearchBg: "rgba(0, 0, 0, 0.08)",
      scheduleIconBg: "rgba(0, 200, 150, 0.08)",
      successAvatarBg: "rgba(0, 200, 150, 0.09)",
    },
    info: {
      main: "#009FFD",
      dark: "#0B79D0",
      light: "#64B6F7",
      textDark: "#0D3C61",
      lightBg:
        "linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), #2196F3",
      border: "rgba(33, 150, 243, 0.5)",
      contrastText: "#FFFFFF",
      duplateButtonBg: "#0D3C61",
      infoAvatarBg: "rgba(95, 100, 254, 0.08)",
      suggestlabelBg: "rgba(33, 150, 243, 0.08)"
    },
    warning: {
      main: "#FFA401",
      dark: "#C77700",
      light: "#FFB633",
      textDark: "#663D00",
      border: "rgba(255, 152, 0, 0.5)",
      contrastText: "rgba(0, 0, 0, 0.87)",
      accordionWarningBgLight: "#FFB400",
      completedHeadingColor: "#FFB400",
      warningAvatar: "rgba(255, 152, 0, 0.09)",
      warningAvatarIcon: "#FFB400",
      warningButtonBg: "#FFB400"
    },
    error: {
      main: "#E31B0C",
      dark: "#E44E44",
      light: "#F88078",
      textDark:
        "linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), #F44336",
      lightBg: "#F44336",
      border: "rgba(244, 67, 54, 0.5)",
      contrastText: "#FFFFFF",
      deleteButtonBg: "#FEECEB",
      errorAvatarBg: "rgba(244, 67, 54, 0.09)",
      lightIcon:"#FEECEB"
    },
    grey: {
      50: "#A9ABBE",
      100: "#A9ABBE",
      600: "#616161",
      800: "#424242",
      900: "#F4F6F9",
      1000: "#000000",
      1100: "#212121",
      1200: "rgba(0,0,0,0.38)",
      1300: "#F3F6F9",
      1400: "#777777",
      1500: "#333333",
      1600: "#212121"
    },

    action: {
      active: "#299277",
      hover: "rgba(41, 146, 119, 0.08)",
      hoverOpacity: 0.08,
      selected: "rgba(153, 66, 134, 0.08)",
      selectedOpacity: 0.08,
      focus: "rgba(153, 66, 134, 0.08)",
      "&:hover": {
        color: "#000",
      },
    },
  },

  overrides: {
    MuiPaper: {
      root: {
        // backgroundColor: "#F1F5FD",
      }
    },
    MuiTabs: {
      indicator: {
        backgroundColor: "#299277",
      }
    },
    MuiAvatar: {
      colorDefault: {
        backgroundColor: "rgb(236 232 240)",
        color: "#299277"
      }
    },
    MuiListItem: {
      root: {
        color: "#424242",
        "&$selected": {
          backgroundColor: "rgba(25, 92, 75, 0.05) !important",
          color: "#299277",
          borderColor: "#299277",
          "&:hover": {
            backgroundColor: "rgba(25, 92, 75, 0.05) !important",
          },
        },
        MuiIconButton: {
          backgroundColor: "rgba(25, 92, 75, 0.05) !important",
        },
        MuiBox: {
          color: "#299277",
        },
        "&:hover": {
          color: "#299277",
          backgroundColor: "rgba(25, 92, 75, 0.05) !important",
          MuiBox: {
            color: "rgba(113, 44, 99, 1)",
          },
        },
        
      },
    },
    MuiIconButton: {
      root: {
        "&:hover": {
          color: "#299277",
          backgroundColor: "rgba(25, 92, 75, 0.05) !important",
        },
      },
    },
    MuiToolbar: {
      root: {
        background: "#FFFFFF",
        color: "#000",
      },
    },
    MuiInputLabel: {
      root: {
        fontSize: "0.875rem"
      }
    },
    MuiInputBase: {
      root: {
        borderRadius: "4px",
        background: "#f4f6f9",
        fontSize: "1rem"
      },
    },
    MuiFormLabel: {
      root: {
        color: "rgba(97, 97, 97, 1)",
      },
    },
    MuiButton: {
      root: {
        lineHeight: '1.75'
      },
      outlined: {
        color: "#757575"
      }
    },
    MuiDrawer: {
      root: {
        boxShadow:
          "0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px rgba(0, 0, 0, 0.14), 0px 1px 10px rgba(0, 0, 0, 0.12)",
      },
      paper: {
        boxShadow:
          "0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px rgba(0, 0, 0, 0.14), 0px 1px 10px rgba(0, 0, 0, 0.12)",
        border: "none",
      },
    },
    MuiOutlinedInput: {
      notchedOutline: {
        borderColor: "#E0E0E0",
      },
    },
    MuiAccordionSummary: {
      root: {
        border: "1px solid #e0e0e0",
      },
    },
    MuiFormHelperText: {
      root: {
        fontSize: "0.75rem",
        lineHeight: "1.25rem",
      },
      contained: {
        marginLeft: "0",
      },
    },
    // MuiInput: {
    //   underline: {
    //     "&:before": {
    //       borderBottom: "2px solid #E0E0E0",
    //     },
    //   }
    // }
    MuiStepIcon: {
      active: {
        color: "#5F64FE !important",
      },
      completed: {
        color: "#00C896 !important",
      },
    },
    MuiLinearProgress: {
      barColorSecondary: {
        backgroundColor: "#FFB400"
      },
      colorSecondary: {
        backgroundColor: "rgba(255, 152, 0, 0.09)"
      },
      colorPrimary: {
        backgroundColor: "#FFFFFF",
        height: "7px"
      },
      barColorPrimary: {
        backgroundColor: "#00C896"
      },
    },
    MuiAlert: {
      filledSuccess: {
        backgroundColor: "#00C896",
      },
      icon: {
        opacity: 1
      }
    },
    MuiChip: {
      root: {
        backgroundColor: "#FFFFFF",
        border: "1px solid rgba(224, 224, 224, 1)"
      }
    },
    MuiAvatarGroup: {
      avatar: {
        fontSize: "0.938rem",
        fontWeight: 500
      }
    },
    MuiDivider: {
      root: {
        backgroundColor: "#EEEEEE",
      }
    },
    MuiTooltip: {
      tooltip: {
        fontSize: "0.656em",
        color: "#FFFFFF",
        backgroundColor: "rgba(0, 0, 0, 0.87)",
        lineHeight: "0.984rem",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
      }
    },
    MuiSelect: {
      root: {
        fontSize: "1rem",
      }
    },
    MuiCheckbox: {
      root: {
        color: '#A9ABBE'
      }
    }
  },

  typography: {
    fontFamily: "'Roboto', sans-serif",

    h1: {
      fontWeight: 300,
      fontSize: "6rem",
      letterSpacing: "-0.009rem",
      lineHeight: "6rem",
    },
    h2: {
      fontWeight: 300,
      fontSize: "3.75rem",
      letterSpacing: "-0.031rem",
      lineHeight: "3.75rem",
    },
    h3: {
      fontWeight: 400,
      fontSize: "3rem",
      letterSpacing: "0",
      lineHeight: "3rem",
    },
    h4: {
      fontWeight: 400,
      fontSize: "2.125rem",
      letterSpacing: "0.016rem",
      lineHeight: "2.125rem",
    },
    h5: {
      fontWeight: 400,
      fontSize: "1.5rem",
      letterSpacing: "0",
      lineHeight: "1.5rem",
    },
    h6: {
      fontWeight: 500,
      fontSize: "1.25rem",
      letterSpacing: "0.009rem",
      lineHeight: "1.25rem",
    },

    subtitle1: {
      fontWeight: 400,
      fontSize: "1rem",
      letterSpacing: "0.009rem",
      lineHeight: "1.438rem",
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: "0.875rem",
      letterSpacing: "0.006rem",
      lineHeight: "1.438rem",
    },
    body1: {
      fontWeight: 400,
      fontSize: "1rem",
      letterSpacing: "0.009rem",
      lineHeight: "1rem",
    },
    body2: {
      fontWeight: 400,
      fontSize: "0.875rem",
      letterSpacing: "0.009rem",
      lineHeight: "1.438rem",
    },
    caption: {
      fontWeight: 400,
      fontSize: "0.875rem",
      letterSpacing: "0.025rem",
      lineHeight: "0.75rem",
    },
    overline: {
      fontWeight: 400,
      fontSize: "0.875rem",
      letterSpacing: "0.063rem",
      lineHeight: "0.75rem",
    },
    button: {
      fontWeight: 500,
      fontSize: "0.938rem",
      letterSpacing: "0.029rem",
      lineHeight: "0.938rem",
    },
  },
});

export const useStylesItems = makeStyles((theme) => ({
  NavigationIcon: {
    backgroundColor: "rgba(113, 44, 99, 1)",
    color: "#fff",
  },
}));

export const useStyles = makeStyles((theme) => ({
  AvatarPrimary: {
    backgroundColor: "#994286 !important",
  },
  AvatarBlue: {
    backgroundColor: "#5F64FE !important",
  },
  AvatarPink: {
    backgroundColor: "#D765BE !important",
  },
  AvatarYellow: {
    backgroundColor: "#FFB400 !important",
  },
  AvatarGreen: {
    backgroundColor: "#00C896 !important",
  },
  AvatarWhite: {
    backgroundColor: "#FFFFFF !important",
  },
  AvatarRoundBlue: {
    backgroundColor: "#5F64FE !important",
  },
  AvatarRoundDarkPink: {
    backgroundColor: "#299277 !important",
  },
  AvatarRoundLightkPink: {
    backgroundColor: "#D765BE !important",
  },
  AvatarRoundGreen: {
    backgroundColor: "#00C896 !important",
  },
  AvatarRoundDarkRed: {
    backgroundColor: "#E31B0C !important",
  },
  AvatarRoundYellow: {
    backgroundColor: "#FFB400 !important",
  },
  AvatarRoundInfo: {
    backgroundColor: "#009FFD !important",
  },
  AvatarRoundLightInfo: {
    backgroundColor: "rgba(33,150,243,0.08) !important",
  },

  navSlideButton: {
    display: "flex",
    borderRadius: "5px 0px 0px 5px",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",

    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.05),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.08),
    },
    marginRight: theme.spacing(1.5),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(0.8),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: "1",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    background: "#F5F5F5",
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "273px",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
      alignItems: "center",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
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
}));

export const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

export const light = {
  theme,
  useStylesItems,
  useStyles,
  StyledBadge,
};
