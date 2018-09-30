import express from 'express'
import setupMiddware from './middleware'
import { restRouter } from './api/index'
import { connect } from './db'
import { signin, protect } from './api/modules/auth'
import cors from 'cors'
// Declare an app from express
const app = express()

setupMiddware(app)
connect()
// setup basic routing for index route
app.use(cors())
app.use('/signin', signin)
app.use('/', restRouter)
// catch all
app.all('*', (req, res) => {
  res.json({ok: true})
})

export default app
