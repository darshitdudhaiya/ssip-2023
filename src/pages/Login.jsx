import { React, useState, useEffect } from "react";
import axios from "axios";

const Login = ({ isLoggedIn, setIsLoggedIn }) => {
  if (isLoggedIn) window.location.href = "/dashboard";

  const [isSelectUserRole, setIsSelectUserRole] = useState(false);
  const [isSelectDistrict, setIsSelectDistrict] = useState(false);
  const [isSelectCourt, setIsSelectCourt] = useState(false);

  const [userRoles, setUserRoles] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [courts, setCourts] = useState([]);

  const [userRoleId, setUserRoleId] = useState(null);
  const [districtId, setDistrictId] = useState(null);
  const [courtId, setCourtId] = useState(null);
  const [password, setPassword] = useState(null);

  useEffect(() => {
    getAllUserRoles();
    getAllDistricts();
  }, []);

  const getAllUserRoles = async () => {
    const response = await axios
      .get("http://172.24.0.1:5000/roles")
      .then((res) => {
        return res.data;
      });

    setUserRoles(response);
  };

  const getAllDistricts = async () => {
    const response = await axios
      .get("http://172.24.0.1:5000/districts")
      .then((res) => {
        return res.data;
      });
    setDistricts(response);
  };

  useEffect(() => {
    getCourts();
  }, [districtId]);

  const getCourts = async () => {
    const response = await axios
      .get(
        `http://172.24.0.1:5000/FetchCourtAccRoleAndDis/${userRoleId}/${districtId}`
      )
      .then((res) => {
        return res.data;
      });

    setCourts(response);
  };

  const handleLogin = async () => {
    try {
      const response = await axios
        .get(
          `http://172.24.0.1:5000/CheckUser/${userRoleId}/${districtId}/${courtId}/${password}`
        )
        .then((res) => {
          return res.status;
        });
      // toggleLoginStatus()
      setIsLoggedIn(true);
      window.location.href = "/dashboard";
      alert("Hello");
      return;
    } catch (error) {
      console.log(error);
    }
    alert("Wrong Username or Password");
  };

  return (
    <>
      {/* component */}
      <div className="h-screen">
        <div className="flex w-full h-screen justify-center py-10 items-center bg-white">
          <div className="bg-white">
            <h1 className="text-gray-800 font-bold text-2xl mb-1">
              Hello Again!
            </h1>
            <p className="text-sm font-normal text-gray-600 mb-7">
              Welcome Back
            </p>

            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              <select
                onChange={(e) => {
                  setIsSelectUserRole(true);
                  setUserRoleId(e.target.value);
                  setDistricts([]);
                  setCourts([]);
                  getAllDistricts();
                }}
                id="courts-select"
                className="pl-2 outline-none border-none text-gray-900 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
              >
                <option selected>Choose an User</option>
                {userRoles.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            {isSelectUserRole && (
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                <select
                  onChange={(e) => {
                    setIsSelectDistrict(true);
                    setDistrictId(e.target.value);
                  }}
                  id="district-select"
                  className="pl-2 outline-none border-none text-gray-900 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                >
                  <option selected>Choose District</option>
                  {districts.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {isSelectDistrict && (
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                <select
                  onChange={(e) => {
                    setIsSelectCourt(true);
                    setCourtId(e.target.value);
                  }}
                  id="district-court-select"
                  className="pl-2 outline-none border-none text-gray-900 text-sm rounded-lg block w-full focus:outline-none focus:border-none"
                >
                  <option selected>Choose Court</option>
                  {courts
                    ? courts.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.name}
                        </option>
                      ))
                    : null}
                </select>
              </div>
            )}

            {isSelectCourt && (
              <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="pl-2 outline-none border-none"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                />
              </div>
            )}
            <button
              onClick={handleLogin}
              className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
