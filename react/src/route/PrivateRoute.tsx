import React from "react";
import { PostsContext } from "../Context";
import Login from "../pages/auth/Login";

type Props = {
  component: React.FC;
};

const PrivateRoute: React.FC<Props> = (props: Props) => {
  const context = React.useContext(PostsContext);

  const { component: Component } = props;

  return context.user?.id ? <Component /> : <Login />;
};

export default PrivateRoute;
