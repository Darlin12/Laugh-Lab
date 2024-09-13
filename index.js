import express from 'express'
import bodyParser from 'body-parser'
import axios from 'axios'

const port = 3002;

const app = express();
//API ENDPOINTS
const main_endpoint = 'https://v2.jokeapi.dev/joke'

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', async (req, res) => {
    res.render('index.ejs', {
        data: "It's Time For a Joke. :D"
    })
})

app.post('/get-joke', async (req, res) => {
    const request = await axios.get(`${main_endpoint}/${req.body.type}`)
    console.log(request.data)
    let joke = ""
    if(request.data['type'] === 'single'){
        joke = `<strong>Type: </strong>${request.data['category']}<br>`+request.data['joke']
    }else{
        joke = `<strong>Type: </strong>${request.data['category']}<br>`+
                `<strong>Setup: </strong>${request.data['setup']} <br>`+
                `<strong>Delivery: </strong> ${request.data['delivery']}`
    }
    res.render('index.ejs', {
        data: joke
     
    })
})



app.listen(port, (error) => {
    if (error) throw error;
    console.log(`Server is running on port ${port}`)
})
