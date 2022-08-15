const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const cors = require('cors')

const customerRoutes = require('./routes/customerRoutes')

const app = express()

dotenv.config({ path : './config/config.env' })

app.use(express.json())
app.use(cors({ origin : true }))

app.use('/api/customer', customerRoutes)

const PORT = 3000 || process.env.PORT

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`.yellow.underline.bold)
})