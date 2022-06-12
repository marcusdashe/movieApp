require('dotenv').config()
const app = require("./app")
const http = require("http")
const path = require("path")
const debug = require("debug")


const normalizePort = (val) => {
    let port = parseInt(val, 10)
    if(isNaN(port))
        return val
    
    if(port >= 0)
        return port
    
    return false
}

const onError = (error)=> {
    if(error.syscall !== "listen")
        throw error
         

const bind = typeof port === "string" ? "Pipe " + port : "Port " + port

    switch(error.code){
        case "EACCES": 
            console.error(bind + "requires elevated privileges")
            process.exit(1)
            break
        case "EADDRINUSE": 
            console.error(bind + "is already in use")
            process.exit(1)
            break
        default:
            throw error
    }
}

const onListening = () => {
    let addr = server.address()
    let bind = typeof addr === "string" ? "pipe" + addr : "port " + addr.port
    debug("Listening on" + bind)
}

const port = normalizePort(process.env.PORT || "5000")
app.set("port", port)

const server = http.createServer(app)

server.listen(port, ()=>{
    console.log(`Server connected at port ${port}`)
})
server.on("error", onError)
server.on("listening", onListening)




