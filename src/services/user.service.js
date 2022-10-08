import Api from "../utils/APICaller";
import { endPoints, appConfig } from "../config";
const singin = async (userid, password) => {
  try {
    const { LogInWeb } = endPoints;
    const method = "POST";
    let body = {
      userid,
      password,
    };
    const res = await Api(LogInWeb, false, method, body);
    return res;
  } catch (error) {
    return error;
  }
};

const mapping = async (deviceuniqueid, token) => {
  try {
    const { RefreshMappingWeb } = endPoints;
    const method = "POST";
    let body = {
      deviceuniqueid,
      token,
    };
    const res = await Api(RefreshMappingWeb, false, method, body);
    return res;
  } catch (error) {
    return error;
  }
};

const AdminParkingStatusReport = async (facilityid, token, inputdatetime) => {
  try {
    const { GetAdminParkingStatusReportWeb } = endPoints;
    const method = "POST";
    let body = {
      facilityid,
      token,
      inputdatetime,
    };
    const res = await Api(GetAdminParkingStatusReportWeb, false, method, body);
    return res;
  } catch (error) {
    return error;
  }
};

const AdminMonthlyParkingStatusReport = async (
  facilityid,
  token,
  inputdatetime
) => {
  try {
    const { GetAdminMonthlyParkingStatusReportWeb } = endPoints;
    const method = "POST";
    let body = {
      facilityid,
      token,
      inputdatetime,
    };
    const res = await Api(
      GetAdminMonthlyParkingStatusReportWeb,
      false,
      method,
      body
    );
    return res;
  } catch (error) {
    return error;
  }
};

const AdminMISStatusReport = async (facilityid, token, inputdatetime) => {
  try {
    const { GetAdminMISReport } = endPoints;
    const method = "POST";
    let body = {
      facilityid,
      token,
      inputdatetime,
    };
    const res = await Api(GetAdminMISReport, false, method, body);
    return res;
  } catch (error) {
    return error;
  }
};

const AdminMonthlyMISStatusReport = async (
  facilityid,
  token,
  inputmonthyear
) => {
  try {
    const { GetAdminMonthlyMISReport } = endPoints;
    const method = "POST";
    let body = {
      facilityid,
      token,
      inputmonthyear,
    };
    const res = await Api(GetAdminMonthlyMISReport, false, method, body);
    return res;
  } catch (error) {
    return error;
  }
};

const GetAllQualification = async () => {
  try {
    const { all_qualifications } = endPoints;

    const res = await Api(all_qualifications, false);
    return res;
  } catch (error) {
    return error;
  }
};

const GetAllCountry = async () => {
  try {
    const { all_countries } = endPoints;

    const res = await Api(all_countries, false);
    return res;
  } catch (error) {
    return error;
  }
};

const GetAllVisaTypes = async () => {
  try {
    const { all_visa_type } = endPoints;

    const res = await Api(all_visa_type, false);
    return res;
  } catch (error) {
    return error;
  }
};

const GetAllLeadSource = async () => {
  try {
    const { all_lead_source } = endPoints;

    const res = await Api(all_lead_source, false);
    return res;
  } catch (error) {
    return error;
  }
};

const GetAllBranch = async () => {
  try {
    const { all_branches } = endPoints;

    const res = await Api(all_branches, false);
    return res;
  } catch (error) {
    return error;
  }
};

const GetAllLeadsStatus = async () => {
  try {
    const { all_leads_status } = endPoints;

    const res = await Api(all_leads_status, false);
    return res;
  } catch (error) {
    return error;
  }
};

const GetAllLead = async () => {
  try {
    const { all_leads } = endPoints;

    const res = await Api(all_leads, true);
    return res;
  } catch (error) {
    return error;
  }
};

const GetAllUniversity = async () => {
  try {
    const { all_universities } = endPoints;

    const res = await Api(all_universities, true);
    return res;
  } catch (error) {
    return error;
  }
};

const SaveBranch = async (
  name,
  emailAddress,
  mobileNumber,
  city,
  address,
  description
) => {
  const method = "POST";
  let body = {
    name,
    emailAddress,
    mobileNumber,
    city,
    address,
    description,
  };
  try {
    const { save_branch } = endPoints;

    const res = await Api(save_branch, true, method, body);
    return res;
  } catch (error) {
    return error;
  }
};

const SaveUser = async (
  firstName,
  lastName,
  userName,
  email,
  password,
  confirmPassword,
  roles,
  branchId
) => {
  const method = "POST";
  let body = {
    branchId,
    firstName,
    lastName,
    userName,
    email,
    password,
    confirmPassword,
    roles,
  };
  try {
    const { register } = endPoints;

    const res = await Api(register, true, method, body);
    return res;
  } catch (error) {
    return error;
  }
};

const GetAllUser = async () => {
  try {
    const { all_user } = endPoints;

    const res = await Api(all_user, true);
    return res;
  } catch (error) {
    return error;
  }
};

const UserService = {
  singin,
  GetAllQualification,
  GetAllCountry,
  GetAllVisaTypes,
  GetAllLeadSource,
  GetAllBranch,
  GetAllLeadsStatus,
  GetAllLead,
  SaveBranch,
  GetAllUniversity,
  SaveUser,
  GetAllUser,
  mapping,
  AdminParkingStatusReport,
  AdminMonthlyParkingStatusReport,
  AdminMISStatusReport,
  AdminMonthlyMISStatusReport,
};
export default UserService;
