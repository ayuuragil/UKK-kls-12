import express from "express"
import userRoute from "./routes/user.route.js"
import diskonRoute from "./routes/diskon.route.js"
import menuRoute from "./routes/menu.route.js"
import orderRoute from "./routes/order.route.js"
import notaRoute from "./routes/nota.route.js"

const app = express()
app.use(express.json())

app.use("/api", userRoute)
app.use("/api", diskonRoute)
app.use("/api", menuRoute)
app.use("/api", orderRoute)
app.use("/api", notaRoute)
app.listen(3000, () => {
  console.log("Server running on port 3000")
})
