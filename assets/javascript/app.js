$(document).ready(function() {
    $("#leftside").hide();
    $("#rightside").hide();
    var arr = [];
    $("#searchbutton").on("click", function() {
        event.preventDefault();
        $("#search").hide();
        $("#leftside").show();
        $("#rightside").show();

        getAjax();
        console.log(arr);

    });

    $(".resetbutton").on('click', function() {
        window.location.reload();
    });



    var getAjax = function() {

        var hits;

        var numberRecords = $("#numberRecords").val();

        var param = $.param({
            q: $("#searchTerm").val(),
            'api-key': '44c44dc78c634b63b56fcceefdbc86ef'
        });
        // this will check if start year and end year are exist.
        if (parseInt($('#startYear').val().trim())) {
            param = param + "&begin_date" + $('#startYear').val().trim() + '0101';
        }
        if (parseInt($('#endYear').val().trim())) {
            param = param + "&end_date" + $('#endYear').val().trim() + '1231';
        }


        var queryUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?" + param;


        $.ajax({

            method: 'GET',
            url: queryUrl

        }).done(function(res) {

            for (var i = 0; i < numberRecords; i++) {

                var article = {

                    headline: res.response.docs[i].headline.main,
                    url: res.response.docs[i].web_url,
                    paragraph: res.response.docs[i].lead_paragraph,
                    // author: res.response.docs[i].byline.original,
                    pub_date: res.response.docs[i].pub_date,
                    section: res.response.docs[i].section_name

                }

                arr.push(article);

            }

            for (var i = 0; i < arr.length; i++) {
                var a = $('<a href="#" class="list-group-item">')
                a.append("<h4 class='list-group-item-heading'>" + arr[i].headline + "</h4>");
                a.append("<p class='list-group-item-text'>" + arr[i].section + "</p>");
                a.append("<p class='list-group-item-text'>" + arr[i].pub_date + "</p>");
                a.attr("paragraph", arr[i].paragraph);
                a.attr("url", arr[i].url);
                $(".list-group").append(a);

                // $(".embed-responsive").append("<h3>"+ arr[i].paragraph+"</h3>")
                // $(".embed-responsive").append("<h4>"+ arr[i].url+"</h4>")


            }
            $('.list-group-item').on('click', function() {
                var c = $(this).attr('paragraph')
                console.log(c)
                $('.panel-body2').empty();
                $('.panel-body2').append("<h3>" + $(this).attr('paragraph') + "</h3>");
                $('.panel-body2').append("<a href="+ $(this).attr('url') + " target='_blank'>Original Article</a>");
            });



        });
    }



});
