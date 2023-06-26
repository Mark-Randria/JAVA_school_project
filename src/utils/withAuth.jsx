import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../services/auth-service";

const withAuth = (WrappedComponent) => {
  const Auth = (props) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
      const isLoggedIn = AuthService.isLogged();

      if (!isLoggedIn) {
          navigate("/Login");
      } else {
        setIsLoading(false);
      }
    }, []);

    return isLoading ? <></> : <WrappedComponent {...props} />;
  };

  return Auth;
};

export default withAuth;
