# User Management App

- `docker network create --driver bridge isolated-user` for creating a bridge network between the containers so they can communicate to each other - this command should be run just once not everytime when you run the application
- `docker volume create --name=mongodata` for creating a volume called `mongodata` so that the data will be persisted after container restart
- `docker run -it -p 27017:27017 --network=isolated-user -v mongodata:/data/db --name mongo user:mongo` for starting the MongoDB database on localhost on port 27017
- `docker run -it -p 3000:3000 --network=isolated-user --link=mongo --name server user:server` for starting the server on localhost on port 3000

Contributors: Mario Iliasi
