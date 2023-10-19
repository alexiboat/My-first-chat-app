import cors from 'cors'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import multer from 'multer'
import express  from 'express'
import dotenv from 'dotenv'
import  path  from 'path'
import { fileURLToPath } from 'url'
import helmet from 'helmet'
import authRoute from "./routes/auth.js"
import {register} from './controllers/auth.js'
import {createPosts} from './controllers/posts.js'
import userRoute from './routes/users.js'
import postsRoute from './routes/posts.js'
import { verifyToken } from './middleware/auth.js'


//** configurations */

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname( __filename)
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use (helmet.crossOriginResourcePolicy({policy:"cross-origin"}))
app.use(morgan('common'))
app.use(bodyParser.json({limit: '30mb', extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cors())
app.use('/assets', express.static(path.join(__dirname, "public/assets")))


//** file storage */

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/assets")
    },
    filename: function(req, file, cb){
        cb(null, "file.originalname")
    }
})

const upload = multer({storage})


/**rout with files */

app.post('/auth/register', upload.single('picture'), register)
app.post('/posts', upload.single('picture'), createPosts)

/** routes */
app.use('/auth', authRoute)
app.use('/users', userRoute)
app.use('/posts', postsRoute)

/** mongoose set up */

const port = process.env.PORT || 6001


mongoose.connect(process.env.MONGODB_URL, {

    useNewUrlParser: true,
    useUnifiedTopology :  true,

}).then(()=>{

    app.listen(port, ()=>console.log(` This Server is Running on Port : ${port}`))
}).catch((error)=>console.log(`${error} did not connect`))