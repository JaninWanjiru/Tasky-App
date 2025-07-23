import { useNavigate } from "react-router-dom";
import useUser from "../store/userStore";
import React, { useEffect } from "react";

function Protected({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return <>{children}</>;
}

export default Protected;
