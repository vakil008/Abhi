import { Outlet } from "react-router";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const PublicLayout = () => {
  const loginTokenRes = useSelector((state) => state.user.loginToken);
  //const loginTokenRes = true;
  console.log("loginTokenRes", loginTokenRes);
  console.log("PublicLayout");
  return (
    <>
      {!loginTokenRes ? (
        <div className="public-pages">
          <div className="public-container">
            <Outlet />
          </div>
        </div>
      ) : (
        <Navigate to="/dashboard" />
      )}
    </>
  );
};

export default PublicLayout;
