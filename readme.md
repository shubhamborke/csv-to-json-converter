# csv to json converter

- csv to json converter will convert your unordered data into ordered json format.
- API for uploading and retrieving data from database will be mentioned below
- _*Important*_ to have env file in root directory of project with below mentioned keys are required

1. USER="user name"
2. HOST="host"
3. DATABASE="database"
4. PASS="password"
5. PORT="port"

For inital start or after the pull of code use in terminal

```javascript
npm install
```

To start the server

```javascript
npm start
```

command will work

## upload csv file

### Route : `http://localhost:3001/upload`

Method: POST

Payload :

```javascript
{
  csv: [binary];
}
```

### Responses

Success

```javascript
{status: 200,message:"Data insered"}
```

Wrong file

```javascript
{status: 400,message:"Please send valid csv file"}

```

Database insertion error

```javascript
{status: 500,message:"something went wrong"}

```

### Route : `http://localhost:3001/all_data`

Method: GET

### Responses

Success

```javascript
{status: 200,message:[Object Object]}
```

Error

```javascript
{status: 500,message:"something went wrong"}

```
