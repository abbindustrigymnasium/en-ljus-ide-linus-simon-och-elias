const express = require("express"); //express är en nodejs module som vi "importerar"
const router = express.Router(); // routar 

var mysql = require("mysql"); //detta är en driver för mysql som funkar med nodejs alltså javascript 
var connection = mysql.createConnection({ //skapar connectionen
    host : "iot.abbindustrigymnasium.se", //där host är x
    user : "ljuside1", // usern är x
    password : "ytterplagg", //password är x
    database : "ljuside1", //och databasen är x
});

connection.connect(function(error) {
    if (error){ //fångar error 
        throw error; //skriver error
    }
    else
    console.log("Thats all there is to it"); //skriver x i console logen
});

var Values_fromDB; //variabeln som är värden från databasen
var CronJob = require("cron").CronJob; //vi använder cronjob för att utföra detta varje sekund
new CronJob("* * * * * *", function() { // detta körs varje sekund
    var GetLight = function () { 
        return new Promise(function (resolve, reject) {
            connection.query("SELECT * FROM ddosmonster", function (error, result) { //tar allt ifrån databasen
                if (error) { //fångar erro
                    return reject(error); // skriver error
                } else { 
                    return resolve(result); //avslutar funktionen
                }
            });
        });
    }
    GetLight().then(response => { 
        Values_fromDB = response; //sätter variablen till response
        console.log(Values_fromDB); //skriver i consolen
    })
}, null, true, "America/Los_Angeles"); //gammal cronjob behöver detta för att sätta tidszonen

router.get("/:lampName", (req, res) => { //get funktion som tar ifrån /:lampName
    var found=false; 
    var Outputvalue; //variabel som är outputvalue
    Values_fromDB.forEach(element => { //
        if (element.Name == req.params.lampName) { //
            found=true;
            Outputvalue = element; //ändar ouytputvalue till element 
        }
    });
    if (found != true) { //om den inte hittar
        res.status(200).json({name: "none",
        message: "No such lamp exists"}) //skriver att det inte finns
    } else {
        res.status(200).json(Outputvalue);
        console.log(Outputvalue); //skriver ut variabeln
    }
});

router.get("/", (req, res, next) => { //get funktion som jag inte vet varför vi har men ok
    res.status(200).json(Values_fromDB);
});

router.post("/", (req, res, next) => { //post funktion
    Lights = [req.body.name, req.body.hard, req.body.strength];
    console.log(req.body);
    var createProduct = function() {
        return new Promise(function (resolve, reject){
            connection.query("INSERT INTO ddosmonster (Name, Strength) VALUES ?", [[Lights]], function (error, result) { //lägger in i databas där name strength är ?
                if (error){
                    return reject(error); 
                } else {
                    return resolve(Lights);
                }
            });
        });
    }

createProduct().then(Theproduct => { //why we have
    res.status(200).json({
        message: "Successfully added light",
    });
}).catch(error => {
        res.status(500).json({
        error: error
        });
    });
});

router.patch("/", (req, res) => { //patch funktion 
    Lights = [req.body.Name, req.body.Cold, req.body.Hot, req.body.Power, req.body.SensorSetting];
    console.log(req.body);
    console.log("lool");
    var createProduct = function () {
        return new Promise(function (resolve, reject) {
            connection.query("UPDATE ddosmonster SET `Cold` = ?, `Hot` = ?, `Power` = ?, `SensorSetting` = ? WHERE `Name` = ?", [Lights[1], Lights[2], Lights[3], Lights[4], Lights[0]], function (error, result) { //ändrar cold hot power till x där namn =
                if (error) {
                    return reject(error);
                } else {
                    return resolve(result);
                }
            });
        });
    }

    createProduct().then(Theproduct => { 
        console.log(Theproduct);
        res.status(200).json({
            message: "Success, light updated"
        });
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            error: error
        });
    });
});

module.exports = router;