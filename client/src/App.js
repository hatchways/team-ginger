import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter, Route } from "react-router-dom";

import { theme } from "./themes/theme";
import LandingPage from "./pages/Landing";
import SignUpPage from "./pages/SignUp";
import LoginPage from "./pages/Login";
import DashboardPage from "./pages/Dashboard";
import SettingsPage from "./pages/Settings";
import Dialog from "./components/Dialog";

function App() {
    return (
        <MuiThemeProvider theme={theme}>
            <BrowserRouter>
                <Route exact path="/" component={LandingPage} />
                <Route path="/signup" component={SignUpPage} />
                <Route path="/login" component={LoginPage} />
                <Route exact path="/dashboard" component={DashboardPage} />
                <Route path="/dashboard/mention/:id" children={<Dialog />} />
                <Route path="/settings" component={SettingsPage} />
            </BrowserRouter>
        </MuiThemeProvider>
    );
}

export default App;
