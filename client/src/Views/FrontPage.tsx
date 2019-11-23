import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';


export const FrontPage = () => {
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
