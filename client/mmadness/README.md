# Media Madness



### Getting Started

Clone the git repository that holds the front and back end files.

Backend steps:

1) Go into the media madness server folder and run

```
npm install
```

To install the node module files

2) Be sure you have mongod installed on your system (install it using the following command in your terminal `brew install mongodb ` ) then run the next three following commands in three seprate terminal windows and let them continue to run until you want to close development

```
mongod
mongo
npx nodemon
```

Now your back end is set up! Now for the front end...

1) Go into the media madness client folder -> mmadness folder and run 

````
npm install
````

2) Then to host the files locally run

```
npm start
```

(It may ask you "Would you like to run the app on another port instead?" if your backend is running on the same port, just type `y` to continue)

Now you will see a blank page at `http://localhost:[port]`, to see the user page go to `http://localhost:3001/user` and to see the central screen page go to `http://localhost:3001/central`