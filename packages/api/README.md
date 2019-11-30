# API Documentation

This API serves information about the packages contained inside a debian status file.

To start the API
```bash
yarn start
```

## Endpoints

| Route                       | Allowed methods | Description                                                         |
|-----------------------------|-----------------|---------------------------------------------------------------------|
| /api/packages               | GET             | Returns an array of all the package names                           |
| /api/packages/<packagename> | GET             | Returns an object containing detailed information about the package |


---

**Request**
```
GET /api/packages
```

**Response**
```json
{"data": ["foopkg", "barpkg", "bazpkg"]}
```
----

**Request**
```
GET /api/packages/ant
```
**Response**
```json
{
  "packageName":"ant",
  "dependsOn": [
  {"name":"default-jre-headless","type":"alternate"},{"name":"java2-runtime-headless","type":"alternate"},{"name":"java5-runtime-headless","type":"alternate"},{"name":"java6-runtime-headless","type":"alternate"},{"name":"libxerces2-java","type":"normal"}
  ],
  "shortDescription":" Java based build tool like make",
  "longDescription":"\n  A system independent (i.e. not shell based) build tool that uses XML \n  files as \"Makefiles\". This package contains the scripts and the core \n  tasks libraries.",
  "dependedOnBy":["velocity","ant-optional"]
}
```