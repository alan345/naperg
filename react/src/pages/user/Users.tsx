import React from "react";
import queryString from "query-string";
import { gql, useQuery } from "@apollo/client";
import { User } from "./User.type";
import { useLocation } from "react-router-dom";
import { Grid } from "@material-ui/core/";
import Search from "../Search";
import PaginationApp from "../PaginationApp";
import DeleteUser from "./DeleteUser";
import { PostsContext } from "../../Context";

export const QUERY = gql`
  query UsersPagination($page: Float!, $where: UserWhereInput) {
    usersPagination(page: $page, where: $where) {
      users {
        id
        name
        email
        role
        lastLogin
      }
      count
      take
    }
  }
`;

const Users: React.FC = () => {
  const context = React.useContext(PostsContext);
  const location = useLocation();
  const parsed = queryString.parse(location.search);
  const page = parsed.page ? Number(parsed.page) : 1;

  const { data } = useQuery(QUERY, {
    variables: {
      where: {
        search: parsed.search,
      },
      page,
    },
  });

  return (
    <>
      <h3>Users</h3>
      <Search />
      <div style={{ height: "15px" }} />
      {data?.usersPagination?.users && (
        <>
          {data.usersPagination.users.map((user: User) => (
            <Grid container key={user.id} spacing={2}>
              <Grid item xs={12} sm={1}>
                {context.user.id !== user.id && <DeleteUser userId={user.id} />}
              </Grid>
              <Grid item xs={12} sm={6}>
                {user.name} ({user.email})
              </Grid>
              <Grid item xs={12} sm={5}>
                Last Login:{" "}
                {user.lastLogin &&
                  new Date(user.lastLogin).toLocaleDateString("en-US")}
                <div>Role: {user.role}</div>
              </Grid>
            </Grid>
          ))}
          <div style={{ height: "20px" }} />

          <PaginationApp
            count={data.usersPagination.count}
            take={data.usersPagination.take}
          />
        </>
      )}
    </>
  );
};

export default Users;
