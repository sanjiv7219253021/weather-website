const path= require('path')
const express= require('express')
const app= express()
const hbs= require('hbs')
const forecast= require('./utils/forecast')
const geocode= require('./utils/geocode')
const port= process.env.PORT || 3000

//path directories
app.set('view engine', 'hbs')
const publicDirectoryPath= path.join(__dirname, '../public')
const viewsDirectory=path.join(__dirname,'../templates/views')
const partialsDirectory=path.join(__dirname,'../templates/partials')

//hbs configuration settings
app.set('views',viewsDirectory)
app.use(express.static(publicDirectoryPath))
app.use(express.static(partialsDirectory))
hbs.registerPartials(partialsDirectory)

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name:"SANJIV GIRI"
    })
})

//routers
app.get('/help',(req,res)=>{
    res.render('help',{
        helpText: "This is a sample help text",
        title:"help",
        name:"SANJIV GIRI"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: "About Page",
        name:"SANJIV GIRI"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        error:"Help data not found",
        title:"Error",
        name:"SANJIV GIRI"
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        error:"Page not found",
        title:"Error",
        name:"SANJIV GIRI"
    })
})


app.listen(port, ()=>{
    console.log("express server is up and running at port "+ port)
})