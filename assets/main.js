
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
        var search = $('#artist').val() + " movie trailer " + response.Director

        var URL = 'https://www.googleapis.com/youtube/v3/search';


        var options = {
            part: 'snippet',
            key: 'AIzaSyC7PXhSNVVsm-fxia2x6uiluvBZe0p9Y2M',
            maxResults: 1,
            q: search,
            order: 'viewCount'
        }

        $.getJSON(URL, options, function (data) {
            console.log(data)
            addVideosToScreen(data)
        });


    }

    function getMovieInfo() {
        var title = $("#artist").val()
        $.ajax({
            url: "https://floating-brushlands-91043.herokuapp.com/cors",
            data: {
                url: "https://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=6e5f33c2",
                key: "6C365355271AF5033FE78FCCE1DA65A85E4193B7A5C95E92F3904ED0407F9D79"
            },
            method: "POST"
        }).then(function (response) {
            console.log(response)
            director1 = response.Director


            console.log(director1)
            searchYoutube(response)
        });
    }

    $('#submit').click(function (e) {

        e.preventDefault();
        $('#video').empty();
        getMovieInfo()
    }
    )

})