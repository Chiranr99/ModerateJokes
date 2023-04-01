const express = require("express")
const cors = require("cors")
const mongooseMorgan = require("mongoose-morgan")
const db = require("./models")
const app = express()
app.use(cors())
app.use(express.json())

app.use(mongooseMorgan({
    connectionString: db.url,
}))


const Role = require("./models/role.model")

db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database Sucessfully!")
        initial()
    })
    .catch((err) => {
        console.log("Cannot connect to the database!", err)
        process.exit()
    })

    function initial() {
        Role.estimatedDocumentCount((err, count) => {
            if (!err && count === 0) {
                new Role({
                    name: "normal"
                }).save((err) => {
                    if (err) {
                        console.log("error", err)
                    }
    
                    console.log("added 'normal user' to roles collection")
                })
    
                new Role({
                    name: "moderator"
                }).save((err) => {
                    if (err) {
                        console.log("error", err)
                    }
    
                    console.log("added 'moderaterz' to roles collection")
                })
    
            }
        })
    }

require("./routes/moderate.route")(app)
require("./routes/auth.route")(app)
require("./routes/user.route")(app)

app.get("/", (req, res) => {
    res.json("Welcome to Distributed systems MODERATE server")
})
const PORT = process.env.PORT || 8098
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})