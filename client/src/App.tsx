import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { FrontPage } from './Views/FrontPage';
import { PackageDetails } from './Views/PackageDetails';

const App: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/'>
                    <FrontPage />
                </Route>
                <Route path='/packages/:packageName'>
                    <PackageDetails/>
                </Route>
                <Route>404</Route>
            </Switch>
        </Router>
    );
};

export default App;
