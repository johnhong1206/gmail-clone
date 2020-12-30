import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//componet
import Header from "./component/Header/Header";
import Sidebar from "./component/Sidebar/Sidebar";
import EmailLsit from "./component/Email/EmailLsit";
import Mail from "./component/Email/Mail";
import Sendmail from "./component/Sendmail/Sendmail";
import Login from "./component/Auth/Login";

//redux

import { useDispatch, useSelector } from "react-redux";
import { selectsendMessageIsOpen } from "./features/mailSlice";
import { selectUser } from "./features/userSlice";
import { auth } from "./firebase";
import { login, logout } from "./features/userSlice";

function App() {
  const sendMessageIsOpen = useSelector(selectsendMessageIsOpen);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          login({
            displayName: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
          })
        );
      }
    });
  }, []);
  return (
    <Router>
      {!user ? (
        <Login />
      ) : (
        <div className="app">
          <Header />
          <div className="app__body">
            <Sidebar />
            <Switch>
              <Route path="/mail">
                <Mail />
              </Route>
              <Route path="/">
                <EmailLsit />
              </Route>
            </Switch>
          </div>
          {sendMessageIsOpen && <Sendmail />}
        </div>
      )}
    </Router>
  );
}

export default App;
