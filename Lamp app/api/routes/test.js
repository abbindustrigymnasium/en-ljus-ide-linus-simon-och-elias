var Values_fromDB;
var CronJob = require("cron").CronJob;
new CronJob("* * * * * *", function() {

    var GetLight = function () {
        return new Promise(function (resolve, reject) {
            con.query("SELECT * FROM light", function (error, result) {
                if (error) {
                    return reject(error);
                } else {
                    return resolve(result);
                }
            });
        });
    }
    GetLight().then(response => {
        Values_fromDB = response;
    })
}, null, true, "America/Los_Angeles");

router.get("/LampName", (req, res) => {
    var found=false;
    var Outputvalue;
    Values_fromDB.forEach(element => {
        if (element.name == req.params.lapName) {
            found=true;
            Outputvalue = element;
        }
    });
    if (found != true) {
        res.status(200).json({name: "none",
        message: "No such lamp exists"})
    } else {
        res.status(200).json(Outputvalue);
        console.log(Outputvalue);
    }
});