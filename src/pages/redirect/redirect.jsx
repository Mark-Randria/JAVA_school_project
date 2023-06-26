import React from "react";
import { useNavigate } from "react-router-dom";

export default function Redirect() {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate("/Books");
  }, []);
  return <>Redirecting....</>;
}
