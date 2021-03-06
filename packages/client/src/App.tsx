import React, { useState, useEffect } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { FrontPage } from "./Views/FrontPage/FrontPage";
import { PackageDetails } from "./Views/PackageDetails/PackageDetails";
import { API_URL } from "./config";
import { NotFound } from "./Views/NotFound/NotFound";

const App: React.FC = () => {
  const [packageNames, setPackageNames] = useState<string[]>([]);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const packageNames = await (
          await fetch(`${API_URL}/api/packages`)
        ).json();
        setPackageNames(packageNames.data);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <FrontPage error={error} packageNames={packageNames} />
        </Route>
        <Route path="/packages/:packageName">
          <PackageDetails packageNames={packageNames} />
        </Route>
        <Route>
          <NotFound/>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
