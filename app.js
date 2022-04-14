const express = require("express")
const request = require("request")
const app = express()
app.use(express.static("public"))
app.use(express.urlencoded({extended: true}))

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req, res){
    let fname = req.body.fname;
    let lname = req.body.lname;
    let email = req.body.email;

    let data = { 
           members: [
        {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: fname,
                LNAME: lname
                }
            }
        ] 
    }

    let jsonData = JSON.stringify(data)

    let options = {
        url: "https://us20.api.mailchimp.com/3.0/lists/264198622e",
        method: "POST",
        headers: {
            "Authorization": "Kazeem d184433b62ea04f907cc052fe8fc3c1c-us20"
        },
         body : jsonData 
    }

    request(options, function(error, response, body){
         if(error) {
            res.sendFile(__dirname +"/failure.html")
         } else { 
             if(response.statusCode === 200) {
            res.sendFile(__dirname +"/success.html")
         } else {
            res.sendFile(__dirname +"/failure.html")
         }

        }
    })
})

app.post("/failure", function(req, res){
        res.redirect("/")
    })
    

app.listen(process.env.PORT || 1000, function(){//To works on both deployment & locally
      console.log("server now running on port 1000")    
})
    