// export const appConfig = {
//   mainDomain: "https://crmleadedu.herokuapp.com",
// };

export const appConfig = {
  mainDomain: "http://184.168.126.119",
};
export const middlePoints = "api";

export const baseUrl = "http://184.168.126.119/";
export const apiVersion = "1.0";
export const apiType = "UAT";

export const endPoints = {
  LogInWeb: "FacilityAdmin/Admin/LogInWeb",
  RefreshMappingWeb: "FacilityAdmin/Admin/RefreshMappingWeb",
  GetAdminParkingStatusReportWeb:
    "ReportAPI/Report/GetAdminParkingStatusReportWeb",
  GetAdminMonthlyParkingStatusReportWeb:
    "ReportAPI/Report/GetAdminMonthlyParkingStatusReportWeb",
  GetAdminMISReport: "ReportAPI/Report/GetAdminMISReportWeb",
  GetAdminMonthlyMISReport: "ReportAPI/Report/GetAdminMonthlyMISReportWeb",

  login: `${middlePoints}/identity/token`,
  register: `${middlePoints}/identity/register`,
  all_branches: `${middlePoints}/v1/Settings/GetAllBranch`,
  all_countries: `${middlePoints}/v1/Settings/GetAllCountry`,
  all_visa_type: `${middlePoints}/v1/Settings/GetAllVisaTypes`,
  all_lead_source: `${middlePoints}/v1/Settings/GetAllLeadSource`,
  all_qualifications: `${middlePoints}/v1/Settings/GetAllQualification`,
  all_universities: `${middlePoints}/v1/Settings/GetAllUniversity`,
  all_leads_status: `${middlePoints}/v1/Settings/GetAllLeadsStatus`,
  all_leads: `${middlePoints}/v1/Leads`,
  all_user: `${middlePoints}/identity/getalluser`,

  save_branch: `${middlePoints}/v1/Settings/SaveBranch`,
};
