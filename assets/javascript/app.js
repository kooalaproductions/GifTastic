$(document).ready(function () {
  var topics = ["zebras", "lions", "koalas", "penguins", "elephants", "gorillas", "chickens", "cheetahs", "dogs", "cats", "eagles", "sharks"];

  var originalLength = topics.length;



  for (var i = 0; i < originalLength; i++) { //prints out the buttons of array
    //create buttons for topics array
    $("#button-container").append("<button data-animals=" + topics[i] + ">" + topics[i] + "</buttons>");
    $("#button-container").append(" ");
  }
  $("#addButton").on("click", function (e) { //adds a button that the user entered
    e.preventDefault();
    var inputAdd = $("#add-Animal").val();
    var newlength = topics.length + 1;
    console.log("THIS will be the control length " + newlength);
    console.log(inputAdd);
    $("#add-Animal").val(" ");



    if (originalLength < newlength) {
      addtoArray(inputAdd);
    }
  });

  function addtoArray(addThis) {
    topics.push(addThis);


    $("#button-container").append("<button data-animals=" + topics[topics.length - 1] + ">" + topics[topics.length - 1] + "</buttons>");
    $("#button-container").append(" ");
    $("button").on("click", function (e) { //is triggered when any button is clicked on
      e.preventDefault();
      $("#gifs-appear-here").empty();
      var animals = $(this).attr("data-animals");

      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animals + "&api_key=1viBFeiW20s1k3US55DWfQVWwuwkX1Du&limit=10";
      if (animals != null) {
        $.ajax({
            url: queryURL,
            method: "GET"
          })
          .then(function (response) {
            $("#gifs-appear-here").empty();
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
              var gifDiv = $("<div>");

              var rating = results[i].rating;

              var p = $("<p>").text("Rating: " + rating);

              var animalsImage = $("<img>" + "<br>");
              animalsImage.attr("src", results[i].images.fixed_height.url);
              animalsImage.attr("data-still", results[i].images.fixed_height_still.url);
              animalsImage.attr("data-animate", results[i].images.fixed_height.url);


              gifDiv.prepend(p);
              gifDiv.prepend(animalsImage);

              $("#gifs-appear-here").prepend(gifDiv);
              animals = " ";
            }
          });

      } else {
        console.log("NOT TODAY");
      }

    });

  }


  $("button").on("click", function (e) { //is triggered when any button is clicked on
    e.preventDefault();
    $("#gifs-appear-here").empty();
    var animals = $(this).attr("data-animals");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      animals + "&api_key=1viBFeiW20s1k3US55DWfQVWwuwkX1Du&limit=10";

    if (animals != null) {
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        .then(function (response) {
          $("#gifs-appear-here").empty();
          var results = response.data;
          console.log(response.data);

          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");

            var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var animalsImage = $("<img>");
            animalsImage.attr("src", results[i].images.fixed_height.url);
            animalsImage.attr("data-still", results[i].images.fixed_height_still.url);
            animalsImage.attr("data-animate", results[i].images.fixed_height.url);

            gifDiv.prepend(p);
            gifDiv.prepend(animalsImage);

            $("#gifs-appear-here").prepend(gifDiv);
            animals = " ";
          }
        });



    } else {
      console.log("NOT TODAY");
    }

  });

  $(document).on("click", "img", playGifs);

  function playGifs() {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  }

});