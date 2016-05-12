// C3 init

var my_data = [
  ["Overall Crime", 151, 741, 785, 714, 640, 303, 397, 328, 456, 102],
];

var crime_by_type = [
  ["Traffic", 11, 86, 69, 65, 77, 40, 42, 33, 49, 7],
  ["Burglary", 33, 74, 71, 65, 54, 14, 24, 23, 76, 10],
  ["Petty Theft", 7, 69, 79, 54, 61, 17, 29, 22, 30, 7],
  ["Accidental Property Damage", 3, 59, 42, 56, 52, 15, 30, 23, 26, 10]
]



var my_chart_parameters = {
  "data": {
    "columns": my_data,
    "selection": {
      "enabled": true
    }
  },
  "axis": {
    x: {
      "type": 'category',
      categories: ["5/15", "06/15", "07/15", "08/15", "09/15", "10/15", "11/15", "12/15", "01/16", "02/16"]
    }

  },
  "point": {
    "r": 5,
    "focus": {
      "expand": {
        "r": 7,
        "enabled": true
      }
    }
  },
  "grid": {
    "x": {
      "show": false
    },
    "y": {
      "show": true
    }
  },
  "tooltip": {
    "show": false,
    "grouped": false
  }
};

var my_chart_object = c3.generate(my_chart_parameters);

// slides

var slide_0 = function() {
  my_chart_object = c3.generate(my_chart_parameters);
  document.getElementById("message").innerHTML = "Think Palo Alto is same?\n Let's find out.";
};

var slide_1 = function() {
  document.getElementById("message").innerHTML = "The graph shows the trend of crime in the City of Palo Alto.";
};

var slide_2 = function() {
  my_chart_object.regions([{
    start: 1,
    end: 4
  }]);
  document.getElementById("message").innerHTML = "It looks like crime peaks during the summer months";
};

var slide_3 = function() {
  my_chart_object.load({
    columns: crime_by_type,
    type: 'bar'
  });
  my_chart_object.transform("line", "data1");
  my_chart_object.groups([
    ["Traffic", "Burglary", "Accidental Property Damage", "Petty Theft"]
  ]);
  document.getElementById("message").innerHTML = "The pattern of the four most frequent crimes also mirrors the general trend of crime"
};

var slide_4 = function() {
  my_chart_object.unload({
    ids: "Overall Crime"
  });
  my_chart_object.regions([]);
  my_chart_object.groups([]);
  document.getElementById("message").innerHTML = "The trend looks pretty similar between crimes";

};

var slide_5 = function() {
  my_chart_object.focus("Burglary");
  document.getElementById("message").innerHTML = "Let's look at Burglaries";
};

var slide_6 = function() {
  my_chart_object.unload({
    ids: ["Traffic", "Petty Theft","Accidental Property Damage"]
    });
    my_chart_object.transform("line");

  document.getElementById("message").innerHTML = "Burglaries are highest during the summer months";
};

var slide_7 = function() {
  my_chart_object.select(["Burglary"], [1]);
  document.getElementById("message").innerHTML = "Looks like it peaks at June, but decreases.";
};

var slide_8 = function() {
my_chart_object = c3.generate({
    "data" : {
      "columns":  [["byTime",24,161,191,69]],
       "selection": {"enabled": true},
       "type" : "bar"
    },
    "axis": {
      x: {
        "type": 'category',
        categories: ["0-6","6-12","12-18","18-24"]
      }
    }
   })  
     document.getElementById("message").innerHTML = "This are the burglaries committed by time of day";
};

var slide_9 = function() {
  my_chart_object.select(["byTime"], [1, 2]);
  my_chart_object.ygrids.add([{
    value: 161,
    text: "6AM-12PM"
  },{
    value: 191,
    text: "12PM-6PM"
  }]);
  document.getElementById("message").innerHTML = "Burglaries tend to occur in the middle of the day!";

};


var slide_10 = function() {
  my_chart_object.transform("line");
  my_chart_object.select(["byTime"], [1, 2]);
  document.getElementById("message").innerHTML = "Moral : Keep your doors locked and invest in good home security!";
};

var slides = [slide_0, slide_1, slide_2, slide_3, slide_4, slide_5, slide_6, slide_7, slide_8, slide_9, slide_10];

// cycle through slides

var current_slide = 0;

var run = function() {
  slides[current_slide]();
  document.getElementById("pg_no").innerHTML = current_slide;
  current_slide += 1;

  if (current_slide === 1) {
    document.getElementById("start_btn").innerHTML = "Start";
  } else if (current_slide === slides.length) {
    current_slide = 0;
    document.getElementById("start_btn").innerHTML = "Replay";
  } else {
    document.getElementById("start_btn").innerHTML = "Continue";
  }
};

// button event handler

document.getElementById('start_btn').addEventListener("click", run);

// init

run();