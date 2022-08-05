import React from "react";
import { TextField, Button } from "@material-ui/core/";
import { gql, useMutation, ApolloError } from "@apollo/client";
import { GraphQLError } from "graphql";
import { Typography } from "@material-ui/core";
import { PostsContext } from "../../Context";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const MUTATION = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const context = React.useContext(PostsContext);
  const [message, setMessage] = React.useState("");
  const [email, setEmail] = React.useState("");

  const [password, setPassword] = React.useState("");
  const [loginUser] = useMutation(MUTATION);

  const loginF = async () => {
    let dataUser;

    try {
      dataUser = await loginUser({
        variables: {
          email,
          password,
        },
      });
    } catch (e) {
      (e as ApolloError).graphQLErrors.some((graphQLError: GraphQLError) =>
        setMessage(graphQLError.message)
      );
    }

    if (dataUser?.data?.loginUser) {
      setMessage("");
      localStorage.setItem("AUTH_TOKEN", dataUser.data.loginUser.token);
      context.updateUser(dataUser.data.loginUser.user);
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
      <h3>Login</h3>

      <div>
        <TextField
          id="email"
          label="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <TextField
          id="password"
          label="password"
          type={"password"}
          onKeyPress={handleKeyPress}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div style={{ height: "15px" }} />
      <div>
        <Button variant={"outlined"} color={"primary"} onClick={loginF}>
          Login
        </Button>
      </div>

      <div>
        <Link to={"/forgetPassword"}>Forget Password?</Link>
      </div>
      <Typography color={"secondary"}>{message}</Typography>
    </>
  );
};

export default Login;
