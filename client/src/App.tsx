import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from 'react-router-dom';

const FrontPage = () => {
    const [packages, setPackages] = useState<string[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const packageNames = await (await fetch('/api/packages/names')).json();
            setPackages(packageNames.data);
        };
        fetchData();
    }, []);
    return (
        <div>
            <ul>
                {packages.map(pkg => (
                    <li>
                        <Link to={`packages/${pkg}`} key={pkg}>
                            {pkg}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const PackageDetails = () => {
  const { packageName } = useParams();
  const [packageDetails, setPackageDetails] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const packageData = await (await fetch(`/api/packages/${packageName}`)).json();
      setPackageDetails(packageData)
  };
  fetchData()
  }, [packageName])

  return (
    <div>
    {packageDetails.map((pkg: {[key:string]: any}) => (
    <div>
    <p>{pkg.packageName}</p>
    <p>{pkg.shortDescription}</p>
    <p>{pkg.longDescription}</p>
    {pkg.dependsOn.map((dep: {[key:string]: any}) => <p>{dep.name}</p>)}
    {pkg.dependedOnBy.map((dep: string) => <p>{dep}</p>)}
    </div>
    ))}
    </div>
  )

}

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
            </Switch>
        </Router>
    );
};

export default App;
