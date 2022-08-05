import React from "react";
import { Link } from "@material-ui/core";
import { PostsContext } from "../../Context";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { userClass } from "../user/User.type";

const Logout: React.FC = () => {
  const context = React.useContext(PostsContext);
  const navigate = useNavigate();

  const logout = async () => {
    navigate("/");
    localStorage.setItem("AUTH_TOKEN", "");
    context.updateUser(userClass);
  };

  return (
    <>
      <Link onClick={logout}>
        <Button variant="contained" color="primary">
          Logout
        </Button>
      </Link>
    </>
  );
}

export default Logout
