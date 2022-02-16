import "./App.css";
import "./bootstrap.css";
import React, { Component } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import ToDo from "./todo/ToDo";
import WelcomeCompo from "./todo/welcome";
import withNavigation from "./withNavigation";
import withParams from "./withParams";
import ToDoList from "./todo/ToDoList";
import AuthenticationService from "./service/AuthenticationService.js";
import authenticationService from "./service/AuthenticationService.js";
import AuthenticatedRoute from "./AuthenticatedRoute";
import ToDoComponent from "./todo/ToDoComponent";

function App() {
  const WelcomeComponentWithNavigation = withParams(WelcomeCompo);
  const LoginComponentWithNavigation = withNavigation(ToDo);
  const TodoListNavigation = withNavigation(ToDoList);
  const HeaderComponentWithNavigation = withNavigation(HeaderComponent);
  const TodoWithParams = withParams(withNavigation(ToDoComponent));
  return (
    <div className="App">
      <BrowserRouter>
        <HeaderComponentWithNavigation></HeaderComponentWithNavigation>
        <Routes>
          <Route path={"/"} exact element={<LoginComponentWithNavigation />} />
          <Route path={"/login"} element={<LoginComponentWithNavigation />} />
          <Route
            path={"/welcome/:name"}
            element={
              <AuthenticatedRoute>
                <WelcomeComponentWithNavigation></WelcomeComponentWithNavigation>
              </AuthenticatedRoute>
            }
          />
          <Route path={"*"} element={<ErrorComponent />}></Route>
          <Route
            path={"/todo/:id"}
            element={
              <AuthenticatedRoute>
                <TodoWithParams />
              </AuthenticatedRoute>
            }
          ></Route>
          <Route
            path={"/todo"}
            element={
              <AuthenticatedRoute>
                <TodoListNavigation />
              </AuthenticatedRoute>
            }
          ></Route>
          <Route
            path={"/logout"}
            element={
              <AuthenticatedRoute>
                <LogoutComponent />
              </AuthenticatedRoute>
            }
          ></Route>
        </Routes>
        <FooterComponent></FooterComponent>
      </BrowserRouter>
    </div>
  );
}

function ErrorComponent() {
  return (
    <>
      The page you trying to access, does not exist please type correct URL or
      contact support @ Abc.corp.
    </>
  );
}

class HeaderComponent extends Component {
  render() {
    const isLoggedIn = authenticationService.isUserLoggedIn();
    console.log(isLoggedIn);
    return (
      <header>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <div>
            <a href="#" className="navbar-brand">
              Avkash
            </a>
          </div>
          <ul className="navbar-nav">
            {isLoggedIn && (
              <li>
                <Link className="nav-link" to="/welcome/in28minutes">
                  Home
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <Link className="nav-link" to="/todo">
                  Todos
                </Link>
              </li>
            )}
          </ul>
          <ul className="navbar-nav navbar-collapse justify-content-end">
            <li>
              {!isLoggedIn && (
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              )}
            </li>
            <li>
              {isLoggedIn && (
                <Link
                  className="nav-link"
                  to="/logout"
                  onClick={AuthenticationService.logout}
                >
                  Logout
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

class FooterComponent extends Component {
  render() {
    return (
      <footer className="footer">
        <span className="text-muted">
          All Rights Reserved 2022 @Avkash Hirpara
        </span>
      </footer>
    );
  }
}

class LogoutComponent extends Component {
  render() {
    return (
      <>
        <h1>You are logged out</h1>
        <div className="container">Thank You for Using Our Application.</div>
      </>
    );
  }
}
export default App;

{
  /*<Counter/>*/
  /*<ToDo></ToDo>*/
}
