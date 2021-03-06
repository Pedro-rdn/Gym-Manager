const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')
const server = express()
const methodOverride = require('method-override')

server.use(express.urlencoded({extend: true}))
server.use(express.static('public'))
server.use(methodOverride('_method'))
server.use(routes)

server.set("view engine", "njk")

nunjucks.configure("src/app/views", {
    express: server,
    autoescape:false,
    noCache: true
})

server.listen(5000, function () {
    console.log("server is running")
})

/* server.use(function(req, res) {
    res.status(404).render("not-found");
  }); */
