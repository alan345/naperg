import React from "react";
import { TextField, Button } from "@material-ui/core/";
import { gql, useMutation, ApolloError } from "@apollo/client";
import { GraphQLError } from "graphql";
import { Typography } from "@material-ui/core";
import { PostsContext } from "../../Context";
import { useNavigate } from "react-router-dom";

const MUTATION = gql`
  mutation SignupUser($name: String!, $email: String!, $password: String!) {
    signupUser(name: $name, email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const context = React.useContext(PostsContext);
  const [message, setMessage] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [signupUser] = useMutation(MUTATION);

  React.useEffect(() => {
    if (context.user.id) {
      navigate("/");
    }
  }, [context]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      signupF();
    }
  };

  const signupF = async () => {
    let dataUser;
    try {
      dataUser = await signupUser({
        variables: {
          name,
          email,
          password,
        },
      });
    } catch (e) {
      (e as ApolloError).graphQLErrors.some((graphQLError: GraphQLError) =>
        setMessage(graphQLError.message)
      );
    }

    if (dataUser?.data?.signupUser) {
      setMessage("");
      localStorage.setItem("AUTH_TOKEN", dataUser.data.signupUser.token);
      context.updateUser(dataUser.data.signupUser.user);
      navigate("/");
    }
  };

  return (
    <>
      <h3>signup</h3>
      <div>
        <TextField
          id="name"
          label="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
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
        <Button variant={"outlined"} color={"primary"} onClick={signupF}>
          Sign up
        </Button>
      </div>
      <Typography color={"secondary"}>{message}</Typography>
    </>
  );
}

export default Signup;
