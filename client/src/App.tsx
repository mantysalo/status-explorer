import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { FrontPage } from './Views/FrontPage';
import { PackageDetails } from './Views/PackageDetails';

const App: React.FC = () => {
  const [packageNames, setPackageNames] = useState<string[]>([])

  useEffect(() => {
        const fetchData = async () => {
            const packageNames = await (await fetch('/api/packages/names')).json();
            setPackageNames(packageNames.data);
        };
        fetchData();
    }, []);
    return (
        <Router>
            <Switch>
                <Route exact path='/'>
                    <FrontPage packageNames={packageNames} />
                </Route>
                <Route path='/packages/:packageName'>
                    <PackageDetails packageNames={packageNames}/>
                </Route>
                <Route>404</Route>
            </Switch>
        </Router>
    );
};

export default App;
