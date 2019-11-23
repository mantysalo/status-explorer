import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

export const PackageDetails = () => {
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