import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import userService from "../services/userService";

export default function RedirectToAppropriate() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await userService.checkAuthentication();
        if (response.status === 200) {
          navigate("/calendar");
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching status:", error);
        navigate("/login");
      }
    };

    checkStatus();
  }, [navigate]);

  return null;
}