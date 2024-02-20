import { useNavigate } from "react-router-dom";
import AxiosPrivateInstance from "../API/AxiosPrivateInstance";

const useLoginRefresh = () => {
  const navigate = useNavigate();
  const axiosInstance = AxiosPrivateInstance();

  // refresh and update the logic
  const refresh = async () => {
    try {
      console.log("refreshing request sent.")
      const response = await axiosInstance.post("/login/refresh");
      if (response.status === 200) {
        const authData = {
          userId: response.data.data.userId,
          username: response.data.data.username,
          role: response.data.data.role,
          isAuthenticated: response.data.data.authenticated,
        }
        localStorage.setItem("user", JSON.stringify(authData));
        localStorage.setItem("access_expiry",response.data.data.accessExpiration)
        localStorage.setItem("refresh_expiry", response.data.data.refreshExpiration)

        const toBeReturned = {...authData, accessExpiry: response.data.data.accessExpiration};

        return toBeReturned;
      } else {
        console.log(response.data);
        throw new Error(`Refresh failed with status: ${response.status}`);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        console.log("Server responded with unauthorized");
      } else if (error.response.status === 429) {
        console.log("Resolved Too Many Requests");
      } else {
        console.error("Error refreshing login:", error);
      }
    }
  }

  // core logic to validate agaist localStorage then decide whether to hit the server or not,
  const handleRefresh = async () => {
    // access refersh token expiry
    const accessExpiry = localStorage.getItem("access_expiry");
    const refreshExpiry = localStorage.getItem("refresh_expiry");

    if(refreshExpiry !== null){
      if (new Date(refreshExpiry) > new Date()) {
        if(accessExpiry !== null){
          if(new Date(accessExpiry) > new Date()){
            const userInLocalStorage = localStorage.getItem("user");
              if(userInLocalStorage !== null && userInLocalStorage !== '{}'){
                const user = JSON.parse(userInLocalStorage);
                const toBeReturned = {...user, accessExpiry: accessExpiry}
                return toBeReturned;
              }else return await refresh()
          }else return await refresh()
        }else return await refresh()
      }else navigate("/")
    }else navigate("/")
  }

  return { handleRefresh };
};

export default useLoginRefresh;
