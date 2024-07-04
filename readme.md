<p align="center">
  <img src="https://cdn-icons-png.flaticon.com/512/6295/6295417.png" width="100" />
</p>
<p align="center">
    <h1 align="center">DAFTECH-API</h1>
</p>

<p align="center">
	<img src="https://img.shields.io/github/license/abdi-frost/daftech-api?style=flat&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/abdi-frost/daftech-api?style=flat&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/abdi-frost/daftech-api?style=flat&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/abdi-frost/daftech-api?style=flat&color=0080ff" alt="repo-language-count">
<p>
<p align="center">
		<em>Developed with the software and tools below.</em>
</p>
<p align="center">
	<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" alt="Javascript">
	<img src="https://img.shields.io/badge/Nodemon-76D04B.svg?style=flat&logo=Nodemon&logoColor=white" alt="Nodemon">
	<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" alt="JSON">
	<img src="https://img.shields.io/badge/Express-000000.svg?style=flat&logo=Express&logoColor=white" alt="Express">
</p>
<hr>

##  Repository Structure

```sh
└── daftech-api/
    ├── cars.json
    ├── models
    │   ├── car.model.js
    │   └── user.model.js
    ├── package.json
    ├── routes
    │   ├── auth
    │   │   ├── auth.js
    │   │   └── index.js
    │   ├── car
    │   │   ├── car.js
    │   │   └── index.js
    │   └── users
    │       ├── index.js
    │       └── users.js
    ├── server.js
    ├── users.json
    └── utils
        └── validation.js
```
<hr>
#Api end points

<table>
  <thead>
    <tr>
      <th>Endpoint</th>
      <th>Method</th>
      <th>Description</th>
      <th>Request Body</th>
      <th>Response Body</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <!-- Cars API Endpoints -->
    <tr>
      <td>/api/cars</td>
      <td>GET</td>
      <td>Retrieve all cars</td>
      <td>-</td>
      <td>Array of car objects</td>
      <td>Requires authentication</td>
    </tr>
    <tr>
      <td>/api/cars/:id</td>
      <td>GET</td>
      <td>Retrieve a specific car by ID</td>
      <td>-</td>
      <td>Single car object</td>
      <td>Requires authentication</td>
    </tr>
    <tr>
      <td>/api/cars</td>
      <td>POST</td>
      <td>Create a new car</td>
      <td>JSON object: { model: string, year: number, plateNumber: string, color: string }</td>
      <td>Newly created car object</td>
      <td>Requires authentication</td>
    </tr>
    <tr>
      <td>/api/cars/:id</td>
      <td>PUT</td>
      <td>Update an existing car by ID</td>
      <td>JSON object: { model: string, year: number, plateNumber: string, color: string }</td>
      <td>Updated car object</td>
      <td>Requires authentication</td>
    </tr>
    <tr>
      <td>/api/cars/:id</td>
      <td>DELETE</td>
      <td>Delete a car by ID</td>
      <td>-</td>
      <td>Deleted car object</td>
      <td>Requires authentication</td>
    </tr>

    <!-- Users API Endpoints -->
    <tr>
      <td>/api/users</td>
      <td>GET</td>
      <td>Retrieve all users</td>
      <td>-</td>
      <td>Array of user objects</td>
      <td>Requires authentication</td>
    </tr>
    <tr>
      <td>/api/users/:id</td>
      <td>GET</td>
      <td>Retrieve a specific user by ID</td>
      <td>-</td>
      <td>Single user object</td>
      <td>Requires authentication</td>
    </tr>
    <tr>
      <td>/api/users</td>
      <td>POST</td>
      <td>Create a new user</td>
      <td>JSON object: { username: string, email: string, password: string }</td>
      <td>Newly created user object</td>
      <td>Requires authentication</td>
    </tr>
    <tr>
      <td>/api/users/:id</td>
      <td>PUT</td>
      <td>Update an existing user by ID</td>
      <td>JSON object: { username: string, email: string, password: string }</td>
      <td>Updated user object</td>
      <td>Requires authentication</td>
    </tr>
    <tr>
      <td>/api/users/:id</td>
      <td>DELETE</td>
      <td>Delete a user by ID</td>
      <td>-</td>
      <td>Deleted user object</td>
      <td>Requires authentication</td>
    </tr>
  </tbody>
</table>


