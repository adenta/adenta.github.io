if (!String.prototype.includes) {
    String.prototype.includes = function(search, start) {
        'use strict';
        if (typeof start !== 'number') {
            start = 0;
        }

        if (start + search.length > this.length) {
            return false;
        } else {
            return this.indexOf(search, start) !== -1;
        }
    };
}

function renderHTML() {
    document.write("<h2>Dashboard<\/h2>");
    document.write("<p> Time: <span id=\"time\"> <\/span>");
    document.write("<\/p>");
    document.write("<p>");
    document.write("  Current Lap: <span id=\"lap\"><\/span>");
    document.write("<\/p>");
    document.write("<p>");
    document.write("  Top Five: <span id=\"five\"><\/span>");
    document.write("<\/p>");
    document.write("<div class=\" switch\">");
    document.write("<b>");
    document.write("<table class=\"responsive-table \">");
    document.write("  <thead>");
    document.write("  <td>Name<\/td>");
    document.write("  <td>score<\/td>");
    document.write("  <td>1st<\/td>");
    document.write("  <td>2nd<\/td>");
    document.write("  <td>3rd<\/td>");
    document.write("  <\/thead>");
    document.write("<tbody id=\"out\" >");
    document.write("");
    document.write("<\/tbody>");
    document.write("<\/table>");
}
renderHTML();

var family = [{
"1": "Alonso",
"3": "Castroneves",
"6": "Power",
"Name": "Tuttle"
}, {
"1": "Alonso",
"3": "Power",
"6": "Hildebrand",
"Name": "Andrew"
}, {
"1": "Andretti",
"3": "Dixon",
"6": "Kanaan",
"Name": "Katie"
}, {
"1": "Dixon",
"3": "Carpenter",
"6": "Alonso",
"Name": "DeeDee"
}, {
"1": "Hunter-Reay",
"3": "Castroneves",
"6": "Power",
"Name": "TeddyAnn"
}, {
"1": "Montoya",
"3": "Sato",
"6": "Kanaan",
"Name": "Brian"
}, {
"1": "Andretti",
"3": "Dixon",
"6": "Castroneves",
"Name": "Theo Bell"
}, {
"1": "Sato",
"3": "Servia",
"6": "Rossi",
"Name": "Ed Jr"
}];

buisnessLogic = {
original: function scoreParticipant(e, orderedRacers) {
    var score = 0;
    var topThree = orderedRacers.slice(0, 3);
    if (topThree.includes(e["1"])) {
        score += 1;
    }

    if (orderedRacers[1] == e["3"] || orderedRacers[0] == e["3"]) {
        score += 3;
    }

    if (orderedRacers[0] == e["6"]) {
        score += 6;
    }

    return score;
},
modified: function scoreParticipant(e, orderedRacers) {
    var score = 0;
    score += orderedRacers.indexOf(e["6"]);
    score += orderedRacers.indexOf(e["3"]);
    score += orderedRacers.indexOf(e["1"]);

    return orderedRacers.length * 3 - score;
  }
}

//live data at http://racecontrol.indycar.com/xml/timingscoring.json
//test data at https://enigmatic-shore-70217.herokuapp.com/
var url = 'https://enigmatic-shore-70217.herokuapp.com/';
function callApi() {
    $.ajax({
        type: 'GET',
        url: url,
        async: false,
        jsonpCallback: 'jsonCallback',
        contentType: "application/json",
        dataType: 'jsonp',
        success: processResults
    });

}

function renderParticipant(e,out) {
  Object.keys(e).forEach(function(key){
    if(out.indexOf(e[key]) > -1){
      e[key] = "<span style='color:red'>" + e[key] + "</span>";
    }
  });
    return "<tr class='collection-item'>" +
        "<td>" + e.name + "</td>" +
        "<td><b>" + e.score + "</b></td>" +

        "<td>" + e.first + "</td>" +
        "<td>" + e.second + "</td>" +
        "<td>" + e.third + "</td>" +

        "</tr>";
}

function processResults(d) {
    var orderedRacers = [];
    var scores = [];

    var drivers = d.timing_results.Item; //define drivers from api request

    for (var i = 0; i < drivers.length; i++) { //set the  racers order for this frame.
        orderedRacers.push(drivers[i].lastName);
    }

    var time = d.timing_results.heartbeat.dateTime;
    document.getElementById('time').innerHTML = time;

    document.getElementById('lap').innerHTML = drivers[0].laps;

    var out = document.getElementById('out');
    out.innerHTML = "";

    var topFive = orderedRacers.slice(0, 5);
    document.getElementById('five').innerHTML = topFive.join(", ");

    family.forEach(function(e) {

      var scoringSystem = buisnessLogic.original;
        var score = scoringSystem(e, orderedRacers);

        scores.push({
            "name": e.Name,
            "score": score,
            "first": e["6"],
            "second": e["3"],
            "third": e["1"]
        });
    });

    scores.sort(function(a, b) {
        return b.score - a.score;
    });
    var crashed = drivers.filter(function(e){ return e.status != "Active"}).map(function(e){return e.lastName;}).join();
    scores.forEach(function(e) {
        out.innerHTML += renderParticipant(e,crashed);
    });

};
$(document).ready(function() {
    setInterval(callApi, 500);
    callApi();

    $('#scoringSystem').change(function(){
    callApi();
    });

});
