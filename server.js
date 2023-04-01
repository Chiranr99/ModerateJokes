const express = require("express")
const cors = require("cors")
const mongooseMorgan = require("mongoose-morgan")
const app = express()
app.use(cors())
app.use(express.json())
const db = require("./models")
app.use(mongooseMorgan({
    connectionString: db.url,
}))



db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected")
    })
    .catch((err) => {
        console.log("err", err)
        process.exit()
    })

require("./routes/moderate.route")(app)

app.get("/", (req, res) => {
    res.json("mod")
})
const PORT = process.env.PORT || 8098
app.listen(PORT, () => {
    console.log(`running on port ${PORT}.`)
})