import React from "react";
import { TextField, Button } from "@material-ui/core/";
import { gql, useMutation, ApolloError } from "@apollo/client";
import { GraphQLError } from "graphql";
import { Typography } from "@material-ui/core";
import { PostsContext } from "../../Context";
import { useNavigate, useParams } from "react-router-dom";

const MUTATION = gql`
  mutation ResetPassword($password: String!, $resetPasswordToken: String!) {
    resetPassword(
      password: $password
      resetPasswordToken: $resetPasswordToken
    ) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

const ResetPassword: React.FC = () => {
  const { resetPasswordToken } = useParams();

  const navigate = useNavigate();
  const context = React.useContext(PostsContext);
  const [message, setMessage] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [resetPassword] = useMutation(MUTATION);

  React.useEffect(() => {
    if (context.user.id) {
      navigate("/");
    }
  }, [context]);

  const loginF = async () => {
    let dataUser;
    try {
      dataUser = await resetPassword({
        variables: {
          password,
          resetPasswordToken,
        },
      });
    } catch (e) {
      (e as ApolloError).graphQLErrors.some((graphQLError: GraphQLError) =>
        setMessage(graphQLError.message)
      );
    }

    if (dataUser?.data?.resetPassword) {
      setMessage("");
      localStorage.setItem("AUTH_TOKEN", dataUser.data.resetPassword.token);
      context.updateUser(dataUser.data.resetPassword.user);
      navigate("/");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      loginF();
    }
  };

  return (
    <>
      <h3>Reset Password</h3>

      <div>
        <TextField
          id="password"
          label="password"
          type="password"
          value={password}
          onKeyPress={handleKeyPress}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div style={{ height: "15px" }} />
      <div>
        <Button variant={"outlined"} color={"primary"} onClick={loginF}>
          ResetPassword
        </Button>
      </div>
      <Typography color={"secondary"}>{message}</Typography>
    </>
  );
};

export default ResetPassword;
