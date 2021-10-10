# Remote-Code-Executor-Realtime

Remote-Code-Executor-Realtime so called RCE,
as the name suggests Is a Docker-based sandbox
environment to run a code snippet. It will create a new docker based container for every submitted code, run it in the isolated container, and return the output. It will support major languages C, C++, and can be extended to other language support too.

## How does it work ?

The client side app submits the code and language id to the server through the API. The API then spins up a Docker container for each API request and runs the code using the compiler/interpreter of given language. The program runs inside a virtaul machine with limited resources and has a time limit for execution. Once the output is ready, it is sent back to the client as response and docker container is destroyed with all the files from the server.

## Features

- Backend APIs and logic to handle the submitted code, create a docker container, execute it, and return the results.
- Minimal UI for user interaction and code submission
- Real-time Screen sharing implemented using Web-Sockets.
- User can join in Room, and start Coding.

## Tech stack

- Node.js
- Express.js
- Mongodb
- Mongoose
- SocketIO
- React
- Bash
- Docker

## Snapshots

- Homepage
  <p align="center"> 
<a href="https://imgur.com/5rGqGJG"><img src="https://i.imgur.com/5rGqGJG.png" title="source: imgur.com" /></a>

</p>

- Joined Notification when other user joined the coding Room
<p align="center"> 
<a href="https://imgur.com/qkE4lLa"><img src="https://i.imgur.com/qkE4lLa.png" title="source: imgur.com" /></a>
</p>

- Leaved Notification when other user Leave the coding Room

<p align="center"> 
<a href="https://imgur.com/rnJPrBQ"><img src="https://i.imgur.com/rnJPrBQ.png" title="source: imgur.com" /></a>
</p>

- Main Interface

<p align="center"> 
<a href="https://imgur.com/nCY7x6r"><img src="https://i.imgur.com/nCY7x6r.png" title="source: imgur.com" /></a>
</p>

<!-- https://imgur.com/nCY7x6r
https://imgur.com/5rGqGJG
https://imgur.com/qkE4lLa
https://imgur.com/rnJPrBQ -->
