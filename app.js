let express = require("express");
let bodyParser = require("body-parser");
let request = require("request");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({entended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname +"/signup.html");
})

app.post("/", function(req, res){
    let firstName = req.body.fName;
    let lastName = req.body.lName;
    let email = req.body.email;

    let data = {
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    let jsonData = JSON.stringify(data);

    

    let options ={
        url: "https://us10.api.mailchimp.com/3.0/lists/de54904494",
        method: "POST",
        headers:{
            "Authorization": "eme1 6f7fae767873d374d1dfb53ed95f64f7-us10",
        },
        body: jsonData
    };

    request(options, function(error, response, body){
        if(error){
            res.sendFile(__dirname + "/failure.html");
        }
        else{
            if(response.statusCode === 200){
                res.sendFile(__dirname + "/success.html");
            }
            else{
                res.sendFile(__dirname + "/failure.html");
            }
            
        }


    })

})
app.post("/failure", function(req, res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
    console.log("server running at port 3000");

});
//6f7fae767873d374d1dfb53ed95f64f7-us10
//de54904494