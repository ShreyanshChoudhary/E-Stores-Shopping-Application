import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { BsBoxArrowInDown, BsBoxes } from "react-icons/bs";
import { PiStorefrontDuotone } from "react-icons/pi";
import PerformanceRecord from "./PerformanceRecord";
import InDisplayNavBtn from "./InDisplayNavBtn";
import AddUpdateProduct from "./AddUpdateProduct";
import Orders from "./Orders";
import AxiosPrivateInstance from "../../API/AxiosPrivateInstance";
import useStore from "../../Hooks/useStore";
import useImage from "../../Hooks/useImage";

const SellerDashboard = () => {
  const [currentViewName, setCurrentViewName] = useState("dashboard");
  const [storeHovered, setStoreHovered] = useState(false);
  const navigate = useNavigate();
  const axiosInstance = AxiosPrivateInstance();
  const { store, prevAddress } = useStore();
  const { imageURL, getImageURL } = useImage();

  let isChecked = false;
  const checkForStore = async () => {
    if (!isChecked) {
      isChecked = true;
      const response = await axiosInstance.get("/stores-exist", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        if (response.data === true) {
          localStorage.setItem("store", "true");
          sessionStorage.setItem("currentView", currentViewName);
        } else navigate("/setup-store");
      } else alert("Something went wrong!!");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("store")) {
      const currentInSessionName = sessionStorage.getItem("currentView");
      if (currentInSessionName) {
        setCurrentViewName(currentInSessionName);
      } else {
        sessionStorage.setItem("currentView", currentViewName);
      }
    } else checkForStore();
  }, [currentViewName]);

  useEffect(() => {
    if (store?.logoLink) {
      const get = async () => {
        const response = await getImageURL(store.logoLink);
      };
      get();
    }
  }, [store]);

  return (
    <div className="w-full border-2 border-transparent h-max flex justify-center items-start bg-gray-200 ">
      {/* MANAGEMENT BLOCK */}
      <div className="w-3/12 flex justify-center items-start rounded-sm">
        <div className="fixed top-19 w-sb h-fit bg-white rounded-sm flex flex-col justify-start items-center font-semibold text-lg">
          <div className="w-full flex flex-col items-center justify-center">
            <div
              className={`w-full px-2 flex items-start justify-center border-b-2 cursor-pointer hover:bg-stone-100 ${
                storeHovered && "w-full h-32"
              }`}
              onClick={() => navigate("/setup-store")}
              onMouseEnter={() => setStoreHovered(true)}
              onMouseLeave={() => setStoreHovered(false)}
            >
              <div
                className={`w-18 h-max m-2 transition-all duration-500 delay-200 ease-in-out ${
                  storeHovered && "w-28 h-32"
                }`}
              >
                <div className="rounded-full border-2">
                  <img src={imageURL} alt="" className="w-full" />
                </div>
              </div>
              <div className="flex flex-col justify-center items-start hover:transition-all duration-500 delay-200 ease-in-out">
                <p
                  className={`text-lg text-slate-700 font-semibold py-1 line-clamp-1  ${
                    storeHovered &&
                    "line-clamp-none"
                  }`}
                >
                  {store?.storeName ? store.storeName : "Your store name"}
                </p>
                <p
                  className={`text-xs font-normal text-slate-500 line-clamp-1 ${
                    storeHovered && "line-clamp-none"
                  }`}
                >
                  {prevAddress.addressLine1 +
                    ", " +
                    prevAddress.addressLine2 +
                    ", " +
                    prevAddress.areaVillage +
                    ", " +
                    prevAddress.cityDistrict +
                    ", " +
                    prevAddress.state +
                    ", India " +
                    prevAddress.pincode}
                </p>
              </div>
            </div>
            {/* GROSS REVENUE */}
            <div className="rounded-sm w-full text-slate-700 text-base rounded-t-none p-2 h-fit">
              <p>Gross Revenue</p>
              <div className="h-36 text-slate-300 flex justify-center items-center">
                no data to show
              </div>
            </div>
          </div>
          {/* NAVIGATION LINKS */}
          <div className="flex flex-wrap justify-center items-center w-full text-xs p-1 border-t-2">
            {/* DASHBOARD */}
            <InDisplayNavBtn
              icon={<RxDashboard />}
              displayName={"View Dashboard"}
              view={"dashboard"}
              setCurrent={setCurrentViewName}
            />
            {/* ADD PRODUCT */}
            <InDisplayNavBtn
              icon={<BsBoxArrowInDown />}
              displayName={"Add Product"}
              view={"addProduct"}
              setCurrent={setCurrentViewName}
            />
            {/* MANAGE ORDERS */}
            <InDisplayNavBtn
              icon={<BsBoxes />}
              displayName={"Manage Orders"}
              view={"manageOrders"}
              setCurrent={setCurrentViewName}
            />
            {/* UPDATE STORE ADDRESS */}
            <InDisplayNavBtn
              icon={<PiStorefrontDuotone />}
              displayName={"Edit Store Info"}
              view={"editStore"}
              setCurrent={setCurrentViewName}
            />
          </div>
        </div>
      </div>

      {/* DASHBOARD ANALYSIS VIEW */}
      <div className="w-content mr-2 h-full bg-gray-200 flex justify-center items-start rounded-sm">
        <div className="w-full h-max bg-gray-200 rounded-sm">
          {currentViewName === "dashboard" ? (
            <PerformanceRecord />
          ) : currentViewName === "addProduct" ? (
            <AddUpdateProduct />
          ) : currentViewName === "manageOrders" ? (
            <Orders />
          ) : (
            currentViewName === "editStore" && navigate("/setup-store")
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
