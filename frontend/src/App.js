import "./App.css";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import React, { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Users from "./components/Users";
import Blog from "./components/subcomponents/Blog";
import Blogs from "./components/Blogs";
import getJWT from "./utils/getJWT";
import Header from "./components/subcomponents/Header";
import CreateBlog from "./components/CreateBlog";
import UserMenu from "./components/UserMenu";
import EditBlog from "./components/EditBlog";
import EditComment from "./components/EditComment";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isAuthorized, setIfAuthorized] = useState(getJWT());
  const [isAdmin, setIfAdmin] = useState(false);
  const [userId, setUserId] = useState("");

  return (
    <div className="App">
      <Router>
        <Header isAuthorized={isAuthorized} setIfAuthorized={setIfAuthorized} isAdmin={isAdmin} setIfAdmin={setIfAdmin}/>
        <Switch>
        <React.Fragment>
          {isAuthorized ? (
              isAdmin ? (
                <div>
                  <Route path="/blog/:blogId">
                    <Blog userId={userId} isAdmin={isAdmin} />
                  </Route>
                  <Route path="/edit-blog/:blogId">
                    <EditBlog userId={userId} />
                  </Route>
                  <Route path="/edit-comment/:blogId/:commentId">
                    <EditComment userId={userId} />
                  </Route>
                  <Route path="/blogs">
                    <Blogs userId={userId} />
                  </Route>
                  <Route path="/users">
                    <Users />
                  </Route>
                  <Route path="/create">
                    <CreateBlog />
                  </Route>
                  <Route exact path={"/"}>
                    <UserMenu isAuthorized={isAuthorized} isAdmin={isAdmin}/>
                  </Route>
                  <Redirect push to={"/"} />
                </div>
              ) : (
                <div>
                  <Route path="/blog/:blogId">
                    <Blog userId={userId} isAdmin={isAdmin} />
                  </Route>
                  <Route path="/edit-blog/:blogId">
                    <EditBlog userId={userId} />
                  </Route>
                  <Route path="/edit-comment/:blogId/:commentId">
                    <EditComment userId={userId} />
                  </Route>
                  <Route path="/blogs">
                    <Blogs userId={userId} />
                  </Route>
                  <Route path="/create">
                    <CreateBlog />
                  </Route>
                  <Route exact path={"/"}>
                    <UserMenu isAuthorized={isAuthorized} isAdmin={isAdmin}/>
                  </Route>
                  <Redirect push to={"/"} />
                </div>
              )
            ) : (
              <div>
                <Route path="/login">
                    <Login setIfAuthorized={setIfAuthorized} setIfAdmin={setIfAdmin} setUserId={setUserId} />
                </Route>
                <Route path="/signup">
                    <Signup setIfAuthorized={setIfAuthorized} setUserId={setUserId} />
                </Route>
                <Route exact path={"/"}>
                  <UserMenu isAuthorized={isAuthorized} isAdmin={isAdmin}/>
                </Route>
                <Redirect push to={"/"} />
              </div>
          )}
          </React.Fragment>
        </Switch>
      </Router>
    </div>
  );
}

export default App;