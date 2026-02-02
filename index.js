import express from "express"
import authRoute from "./routes/auth.route.js"
import userRoute from "./routes/user.route.js"
import menuRoute from "./routes/menu.route.js"
import stanRoute from "./routes/stan.route.js"


const app = express()
app.use(express.json())

app.use("/auth", authRoute)
app.use("/users", userRoute)
app.use("/menu", menuRoute)
app.use("/stan", stanRoute)
app.listen(3000, () => {
  console.log("Server running on port 3000")
})
