$(document).ready(function () {
    var topics = ["zebras", "lions", "koalas", "penguins", "elephants", "gorillas", "chickens", "cheetahs", "dogs", "cats", "eagles", "sharks"];
    
    
    
    for(var i = 0; i < topics.length; i++){
        //create buttons for topics array
        $("#button-container").append("<button data-animals=" + topics[i] + ">"  + topics[i] + "</buttons>");
        $("#button-container").append(" ");
    
    
    }
    
    
    
    $("button").on("click", function() {
        var person = $(this).attr("data-animals");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          person + "&api_key=1viBFeiW20s1k3US55DWfQVWwuwkX1Du&limit=10";
    
          console.log(queryURL);
    
    
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          .then(function(response) {
            $("#gifs-appear-here").empty();
            var results = response.data;
            console.log(response.data);
    
            for (var i = 0; i < results.length; i++) {
              var gifDiv = $("<div>");
    
              var rating = results[i].rating;
    
              var p = $("<p>").text("Rating: " + rating);
    
              var personImage = $("<img>");
              personImage.attr("src", results[i].images.fixed_height.url);
    
              gifDiv.prepend(p);
              gifDiv.prepend(personImage);
    
              $("#gifs-appear-here").prepend(gifDiv);
            }
          });
      });
    
    });