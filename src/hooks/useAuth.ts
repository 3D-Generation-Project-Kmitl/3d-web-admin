import { useContext, useState } from "react";
import httpClient from "../utils/httpClient";
import UserContext from "../contexts/UserContext";

const useAuth = () => {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const { setUser } = useContext(UserContext);

    function errorHandler(error: any) {
        let resMessage = "";
        if (error.response && error.response.data) {
            resMessage = error.response.data.message;
            setMessage(resMessage);
            setLoading(false);
        } else {
            setMessage(
                "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง"
            );
            setLoading(false);
        }
    }

    function onAdminLogin(email: String, password: String) {
        setLoading(true);
        setMessage("");
        return httpClient.post("/auth/adminLogin", { email, password }).then((res) => {
            if (res.data.data) {
                setUser(res.data.data);
            }
            setLoading(false);
            return res.data;
        }).catch((error) => {
            errorHandler(error);
        });

    }

    function onLogout() {
        return httpClient.post("/auth/logout").then((res) => {
            setUser(null);
            return res.data;
        }).catch((error) => {
            errorHandler(error);
        });
    }

    return { onAdminLogin, onLogout, message, loading };
};

export default useAuth;