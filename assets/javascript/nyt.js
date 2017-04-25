$(document).ready(function() {

	console.log('ready');

	var arr = [];

	var getAjax = function() { 

		var retrieveNum = 10;


		var hits;

		var numberRecords = $("#numberRecords").val();

		var param = $.param(
			{
				q: $("#searchTerm").val(),
				'api-key': '44c44dc78c634b63b56fcceefdbc86ef',
				begin_date: $('#startYear').val().trim() + '0101',
				end_date: $('#endYear').val().trim() + '1231'
			});

		var queryUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?" + param;


		$.ajax({

			method: 'GET',
			url: queryUrl

		}).done(function(res) {

			for(var i = 0; i < numberRecords; i++) {

				var article = {

					headline: res.response.docs[i].headline.main,
					url: res.response.doc[i].web_url,
					paragraph: res.response.docs[i].lead_paragraph,
					author: res.response.docs[i].byline.original,
					pub_date: res.response.docs[i].pub_date,
					section: res.response.docs[i].section_name

				}

				arr.push(article);

			}

		});
	}

})