$(document).ready(function () {

    function addVideosToScreen(data) {
        $.each(data.items, function (i, item) {
            var id = item.id.videoId
            placeVidInHtml(id)
        })
    }

    function placeVidInHtml(id) {
        $('#youtube').append(`<iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" 
allow="autoplay; encrypted-media" allowfullscreen></iframe>`)
    }

    function searchYoutube(response) {
       
        var search = $('#artist').val() + " movie trailer " + response.Director + " " + response.Year

        var URL = 'https://www.googleapis.com/youtube/v3/search';

        var options = {
            part: 'snippet',
            key: 'AIzaSyC7PXhSNVVsm-fxia2x6uiluvBZe0p9Y2M',
            maxResults: 3,
            q: search,
            order: 'viewCount'
        }

        $.getJSON(URL, options, function (data) {
            console.log(data)
            addVideosToScreen(data)
        });


    }

    function getMovieInfo() {
        var title = $("#artist").val();
        

        if(title === ""){
            var empty = $("<h1>").html("Input a movie title before searching");
            $("#error").append(empty);
           
            return;
        }

        $.ajax({
            url: "https://floating-brushlands-91043.herokuapp.com/cors",
            data: {
                url: "https://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=6e5f33c2",
                key: "6C365355271AF5033FE78FCCE1DA65A85E4193B7A5C95E92F3904ED0407F9D79"
            },
            method: "POST"
        }).then(function (response) {
            if(response.Response === "False"){
             var error = $("<h1>").html("We are having problems finding this movie title. Make sure to check spelling.")
                $("#error").append(error);
                return;
              
            }

            $("#details").html("");
            $("#plot").empty();

            var T = response.Title;
            var year = response.Year;
            var rated = response.Rated;
            var released = response.Released;
            var runTime = response.Runtime;
            var actors = response.Actors;
            var writer = response.Writer;
            var  genre = response.Genre;
            var plot = response.Plot;
            var rating = response.imdbRating;
            var mImg = response.Poster;

            var pOne = $("<p>").text("Tittle:"+ T);
            var pTwo = $("<p>").text("Year:"+ year);
            var pThree = $("<p>").text("Rated:"+ rated);
            var pFour = $("<p>").text("Released:"+ released);
            var pFive = $("<p>").text("Runtime:"+ runTime);
            var pSix = $("<p>").text("Actors:"+ actors);
            var pSeven = $("<p>").text("Writer:"+ writer);
            var pEight = $("<p>").text("Genre:"+ genre);
            var pNine = $("<p>").text("Plot:"+ plot);
            var pTen = $("<p>").text("Rating:"+ rating );
            var pEleven = $("<img>").attr('src', mImg);

            $("#details").append(pOne,pTwo,pThree,pFour,pFive,pSix,pSeven,pEight,pTen);
            $("#plot").append(pEleven,pNine);
          
            console.log(response)
          
            searchYoutube(response)
        });
    }

    $('#submit').click(function (e) {
        $("#details").html("");
        $("#plot").html("");
        $("#error").html("");
        e.preventDefault();
        $('#youtube').html("");
        getMovieInfo()
    }
    )

})

