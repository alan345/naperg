import React from "react";
import { Button, TextField } from "@material-ui/core/";
import { gql, useMutation, ApolloError } from "@apollo/client";
import { GraphQLError } from "graphql";
import { User, UserRole } from "./User.type";
import { FormControl } from "@material-ui/core";
import { Select } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";

const MUTATION = gql`
  mutation UpdateUser($data: UserUpdateInput!, $userId: String!) {
    updateUser(data: $data, userId: $userId) {
      id
      name
      role
    }
  }
`;

interface Props {
  user: User;
  onCancel: () => void;
  onUpdate: () => void;
}

const EditUser: React.FC<Props> = (props: Props) => {
  // const client = useApolloClient();
  const [message, setMessage] = React.useState("");
  const [user, setUser] = React.useState(props.user);

  const [updateUser] = useMutation(MUTATION);

  const editUserF = async () => {
    let dataUser;
    try {
      dataUser = await updateUser({
        variables: {
          data: {
            name: user.name,
            role: user.role,
          },
          userId: props.user.id,
        },
      });
    } catch (e) {
      (e as ApolloError).graphQLErrors.some((graphQLError: GraphQLError) =>
        setMessage(graphQLError.message)
      );
    }

    if (dataUser?.data?.updateUser) {
      setMessage("");
      props.onUpdate();
    }
  };

  return (
    <>
      <div>
        <TextField
          id="name"
          label="name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
      </div>
      <div>
        <FormControl>
          <InputLabel>Role</InputLabel>
          <Select
            labelId="role"
            id="role"
            value={user.role}
            onChange={(e: React.ChangeEvent<{ value: unknown }>) =>
              setUser({ ...user, role: e.target.value as UserRole })
            }
          >
            <MenuItem value={"USER"}>USER</MenuItem>
            <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div style={{ height: "10px" }} />
      <div>
        <Button variant={"outlined"} color={"default"} onClick={props.onCancel}>
          Cancel
        </Button>{" "}
        <Button variant={"outlined"} color={"primary"} onClick={editUserF}>
          Save
        </Button>
        <div className="secondary">{message}</div>
      </div>
    </>
  );
};

export default EditUser;
