import React from "react";
import { Navigate } from "react-router-dom";
import { PostsContext } from "../Context";

type Props = {
  component: React.FC;
};

const PublicRoute: React.FC<Props> = (props: Props) => {
  const context = React.useContext(PostsContext);

  const { component: Component } = props;

  return context.user?.id ? (
    <Navigate to="/" replace />
  ) : (
    <Component />
  );
};

export default PublicRoute;
