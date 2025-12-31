import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import API from "../../services/api";

const AuthCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get("token");
        if (token) {
            localStorage.setItem("token", token);
            fetchVendor(token);
        } else {
            navigate("/");
        }
    }, []);

    const fetchVendor = async (token) => {
        try {
            const res = await API.get("/vendor/me", {
                headers: { Authorization: `Bearer ${token}` }
            });

            localStorage.setItem("vendor", JSON.stringify(res.data));

            if (res.data.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/dashboard");
            }
        } catch (error) {
            console.error("Failed to fetch vendor", error);
            navigate("/");
        }
    }

    return <div className="min-h-screen flex items-center justify-center">Logging you in...</div>;
};

export default AuthCallback;
