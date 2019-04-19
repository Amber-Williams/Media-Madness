<div align="center"><img width="300px" src="./client/src/img/MM-logo.png"/></div>

### Getting Started

Clone the git repository that holds the front and back end files.

#### Back-end steps:

1) Go into the media madness server folder and run

```
docker-compose up
```

2) (Optional) If you wish to have a database locally, be sure you have mongod installed on your system (install it using the following command in your terminal `brew install mongodb ` ) then run the next three following commands in three seprate terminal windows and let them continue to run until you want to close development

```
mongod
mongo
```

3. (Optional) If you want to run the server without docker run the following compand:

4. ```
   npx nodemon
   ```

Now your back end is set up! 

#### Front-end steps

1) Go into the media madness client folder and run 

````
docker-compose up
````

port number can be changed in the package.json "start"

Now you will see a blank page at `http://localhost:[port]`, to see the user page go to `http://localhost:3001/user` and to see the central screen page go to `http://localhost:3001/central`



#### Deployment steps: 

When uploading to production REMOVE PORT=3001 from client/package.json
&&
Change App.js commented out line