import { existsSync as exists, mkdir } from 'fs'
import express from 'express'
import spa from 'express-spa'
import { resolve } from 'path'
import { webpackHot, webpackDev } from './middleware/webpack'
import IPFS from 'ipfs'

process.env.IPFS_REPO = process.env.IPFS_REPO || '.ipfs'
process.env.IPFS_STORE = process.env.IPFS_STORE || `${process.env.IPFS_REPO}/files`

const app = express()
const ipfs = new IPFS(process.env.IPFS_REPO)
app.disable('x-powered-by')
// app.enable('trust proxy') // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)

app.use(webpackDev)
app.use(webpackHot)

app.use(express.static(resolve(__dirname, '../pub')))
app.use(spa(resolve(__dirname, '../pub/index.html')))

const server = app.listen(process.env.PORT || 8000, () => {
  console.log(`server running at http://localhost:${server.address().port}`)
})

function startIpfsServer () {
  ipfs.load(err => {
    if (err) throw err
    ipfs.goOnline(err => {
      if (err) throw err
      console.log('IPFS server online.')
    })
  })
}

if (exists(process.env.IPFS_REPO)) {
  startIpfsServer()
} else {
  ipfs.init({ emptyRepo: true, bits: 2048 }, err => {
    if (err) throw err
    startIpfsServer()
    if (!exists(process.env.IPFS_STORE)) {
      mkdir(process.env.IPFS_STORE, err => {
        if (err) throw err
      })
    }
  })
}
