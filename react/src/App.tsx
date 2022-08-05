import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Header";
import Me from "./Me";

import { PostsContext, postsContextDefaultValue } from "./Context";
import { Card, CardContent } from "@material-ui/core/";
import RouteApp from "./route/RouteApp";
import { User } from "./pages/user/User.type"

const App: React.FC = () => {
  const [user, setUser] = React.useState(postsContextDefaultValue.user);

  const updateUser = React.useCallback(
    (user: User) => {
      console.log("updateUser");
      setUser(user);
    },
    [setUser, user]
  );

  return (
    <PostsContext.Provider value={{ user, updateUser }}>
      <Router>
        <Header />
        <Me />
        <Card elevation={3}>
          <CardContent>
            <RouteApp />
          </CardContent>
        </Card>
      </Router>
    </PostsContext.Provider>
  );
}

export default App;
