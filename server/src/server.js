import express from 'express'
import setupMiddware from './middleware'
import { restRouter } from './api/index'
import { connect } from './db'
import {signin, protect, verifyUser} from './api/modules/auth'
// Declare an app from express
const app = express()

setupMiddware(app)
connect()
// setup basic routing for index route
app.use('/signin', verifyUser(),signin)
app.use('/', restRouter)
// catch all
app.all('*', (req, res) => {
  res.json({ok: true})
})

export default app
