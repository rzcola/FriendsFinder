// Dependencies -----------------------------------
const path = require("path");
var userArray = require("../app/data/friends.js");

// Friends Routes  ------------------------------------------


module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        res.json(userArray);
    });

    app.post("/api/friends", function(req, res) {

        var newFriend = {
            name: req.body.name,
            photo: req.body.photo,
            scores: JSON.parse(req.body.scores)
        }

        var differenceArr = [];

        userArray.forEach(function(item, index) {
            var difference = 0;
            for (var i = 0; i < item.scores.length; i++) {
                difference += Math.abs(item.scores[i] - newFriend.scores[i]);
            }
            differenceArr.push({ "difference": difference, "index": index });
        });

        differenceArr.sort(function(a, b) {
            return a.difference - b.difference;
        });

        userArray.push(newFriend);
        res.json(userArray[differenceArr[0].index]);

    });

}