
import express from 'express'
import config from './config'
import cors from cors

const app = express()
app.use(cors())



// Without middleware
// GET method route
app.get('/', (req, res) => {
  res.send('GET request to the homepage')
})

// Without middleware
// POST method route
app.post('/', (req, res) => {
  res.send({ title: 'POST request to the homepage' })
})

app.listen(config.constants.PORT, () => {
  // console.log('__basedir', __basedir)
  console.log(`Server is running on port ${config.constants.PORT}`)
})
