<div align="center"><img width="300px" src="./client/src/img/MM-logo.png"/></div>

### Getting Started

Clone the git repository that holds the front and back end files.

#### Back-end steps:

1) Go into the media madness server folder and run `npm install` to install the node modules

2) Then run `docker-compose up`

3) (Optional) If you wish to have a database locally, Install mongodb and run MongoDB - https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/

3b) (Optional) If you want to run the server without docker run `npx nodemon`

Now your back end is set up! 

#### Front-end steps

1) Go into the media madness client folder and run `npm install` to install the node modules

2) Then run `docker-compose up`

port number can be changed in the package.json "start"

Now you will see a blank page at `http://localhost:[port]`, to see the user page go to `http://localhost:3000/user` and to see the central screen page go to `http://localhost:3000/central`

3) (Optional) If you wish to run the front end locally without docker simply run `yarn start`

#### Deployment steps: 

When uploading to production REMOVE PORT=3000 from client/package.json
&&
Change App.js commented out line


#### Testing steps
1. To run tests cd into the client folder and run `yarn test` this will run end to end Selenium tests that are located in the test folder
