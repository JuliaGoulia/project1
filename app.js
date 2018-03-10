

function yesFunction(){
    
    $("#radioPoll").html("Thanks!");

  }

  function noFunction(){
    
    $("#radioPoll").html("Thanks!");

  }

  function maybeFunction(){
    
    $("#radioPoll").html("Thanks!");
     
  }

$(document).ready(function() {


	// for tmdb
	$("#gotMovie").hide();
	$("#book").hide();
	$("#yourBook").hide();
  $("#myBook").hide();
  $("#movieButton").hide();
  $("#myMovie").hide();
  $("#poll").hide();

  var config = {
    apiKey: "AIzaSyA6K1EB3z6KS0KuIUaJ_na2IOthkFfq6yw",
    authDomain: "juliagoolia-764e1.firebaseapp.com",
    databaseURL: "https://juliagoolia-764e1.firebaseio.com",
    projectId: "juliagoolia-764e1",
    storageBucket: "juliagoolia-764e1.appspot.com",
    messagingSenderId: "45376190688"
  }; //end config

  firebase.initializeApp(config);

  // create variable dataRef to refer to database
  var dataRef = firebase.database();

  var countRef  = dataRef.ref().child('Count');

  var count = 0;

  countRef.set({
    count: count
  })

  var memes = ["./assets/images/baby.jpg", "./assets/images/charlotte.jpg", "./assets/images/shakespeare1.jpg", 
              "./assets/images/mockingbird.jpg", "./assets/images/mobydick.jpg", "./assets/images/sideways.jpg", 
              "./assets/images/snowwhite.jpg", "./assets/images/twain.jpg", "./assets/images/bookclub.jpg", 
              "./assets/images/cat.jpg", "./assets/images/lisa.jpg", 
              "./assets/images/man.jpg", "./assets/images/red.jpg"];
  var count = 0;

  nextImage();

  function displayImage(){
    $("#img-holder").html("<img src=" + memes[count] + " width='200px' height='200px'>");

    //insert a random generator for count
    count = Math.floor(Math.random() * memes.length);
    console.log(memes[count]);
    //count++;
    // nextImage();
  }

  function nextImage() {
 
       
    console.log(count);

    setInterval(displayImage, 6000);

    if (count >= memes.length) {
      count = 0;
           
    }
  }

	var yotubeURL = '';

	$(document).on('click','#search', function(event){

		event.preventDefault();

		var book = $("#bookSearch").val().trim();

		var author = $("#authorSearch").val().trim();

		book = book.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});

		console.log(book);

		$("#bookSearch").val('');
		$("#authorSearch").val('');


		// console.log(book);

		bookSearch(book, author);
		
	})
	
	function bookSearch(book, author){

		var authKey = "AIzaSyD3t9FZQ_rFOQdwV_b3PVvH6FEWSNJjRck";

  		var queryURL = "https://www.googleapis.com/books/v1/volumes?q=" + book + "+inauthor:" + author + "&key=" + authKey;

  	 	$.ajax({
    		url: queryURL,
    		method: "GET"
  		}).then(function(googleBook) {
  			console.log(googleBook);

  			// book = tost

  			for(var i = 0; i < googleBook.items.length; i++){


  				if(googleBook.items[i].volumeInfo.imageLinks != null){

  					var image = googleBook.items[i].volumeInfo.imageLinks.thumbnail;

            var title = googleBook.items[i].volumeInfo.title;
            var titleText = title;

            var card = $("<div class='card' style='width: 18rem'>");

            card.append($("<img id='0' class='card-img-top bookImage' src='" + image + "'>"));

            var cardBody = $("<div class='card-body'>");

            var cardText = $("<p class='card-text'>");

            cardText.append(titleText);

            cardBody.append(cardText);

            console.log(titleText);

            card.append(cardBody);

  					$("#bookPoster").append(card);

  					$("#0" ).attr('id', i);

  				}
 				

  				$("#book").show();

  			}

  				$("img").on('click', function(event){
  					event.preventDefault();

            count++;

            $("#poll").show();  					

  					console.log($("img").attr('id'));

  					var id = $(this).attr('id') - 1;

  					var myImg = googleBook.items[id].volumeInfo.imageLinks.thumbnail;

  					console.log(myImg);

  					$("#bookPoster").empty();
  					$("#bookTitle").hide();

  					// $("#bookInfo").empty();
  					$("#iframe").empty();
					  $("#gotMovie").hide(); 

            $("#book").hide();
            $("#myBook").show();

					  $("#myPoster").append("<img id=myImg src='" + myImg +"'>");
 
  					var title = googleBook.items[id].volumeInfo.title;
  					var titleText = title;

  					var description = googleBook.items[id].volumeInfo.description;
  					var descriptionText = "DESCRIPTION: " + description;

  					var pages = googleBook.items[id].volumeInfo.pageCount;
  					var pagesText = "PAGES: " + pages;

  					var category = googleBook.items[id].volumeInfo.categories[0];
  					var categoryText = "CATEGORY: " + category;

  					var author = googleBook.items[id].volumeInfo.authors[0];
  					var authorText = "AUTHOR: " + author;

  					var date = googleBook.items[id].volumeInfo.publishedDate;
  					var publishText = "PUBLISHING DATE: " + date;

            $("#bookInfo").show();

            $("#myTitle").append(titleText);
            $("#author").append(authorText);
            $("#description").append(descriptionText);
            $("#category").append(categoryText);
            $("#publish").append(publishText);
            $("#pages").append(pagesText);

            // $("#bookInfo").append($("#title"));

  					tmbdSearch(title);

            countRef.update({
              count: count
            })

            var titleCount = 0;
            var title_ref;

            dataRef.ref().on("value", function(snapshot) {

              if(snapshot.child(title).exists()){
                
                console.log(titleCount);
                title_ref = dataRef.ref(title);
                console.log(title_ref);
                titleCount = snapshot.child(title).val().yes;
                console.log('titleCount', titleCount);

              }else{

                title_ref = title;
                title_ref = dataRef.ref().child(title);

                title_ref.set({
                  yes: 0,
                  no: 0
                })

              }
            

  				  });

            $(document).on('click', '.yes', function(){
              titleCount++;
              title_ref.update({
                yes: titleCount
              })
            })

   				});
   			
  			
  		});

  	}

    function imbdSearch(title){

      var queryURL = "https://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy";

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        // $("#movie-view").text(JSON.stringify(response));
        console.log('imbdSearch');
        console.log(response);

        var release = response.Released;
        var releaseText = "RELEASE: " + release;

        var title = response.Title;
        var titleText = title;

        var description = response.Plot;
        var descriptionText = "DESCRIPTION: " + description;

        var director = response.Director;
        var directorText = "DIRECTOR: " + director;

        var rating = response.Rated;
        var ratingText = "RATING: " + rating;

        var runtime = response.Runtime;
        var runtimeText = "RUNTIME: " + runtime;

        var actors = response.Actors;
        var actorsText = "ACTORS: " + actors;

        var awards = response.Awards;
        var awardsText = "AWARDS: " + awards;

        var image = response.Poster;

        $("#moviePoster").append("<img id=myImg src='" + image +"'>");

        $("#movieTitle").append(titleText);
        $("#director").append(directorText);
        $("#release").append(releaseText);
        $("#runtime").append(runtimeText);
        $("#rating").append(ratingText);
        $("#actors").append(actorsText);
        $("#awards").append(awardsText);
        $("#descriptionMovie").append(descriptionText);

      });
      
    }

  	function tmbdSearch(title){

  		console.log('called');
  		console.log(title);
  		queryURL = "https://api.themoviedb.org/3/search/movie?api_key=1ebfe01505e78aebefb2f6d3e54a2dd0&query=" + title;

		$.ajax({
    		url: queryURL,
   			method: 'GET'
		}).then(function(response) {
   			console.log(response);

   			if(response.results.length != 0){

   				var key = response.results[0].id;

   				console.log(key);

          var movieButton = $("<button class='btn btn-default' id='movieButton'>");
          movieButton.append('We found a movie!');
          // $("#movieButton").show();
          $("#myPoster").append(movieButton);
          $("#iframe").hide();

          imbdSearch(title);
   				findTrailer(key);

   			}else{
   				// sorry we couldnt find a movie
          $("#myPoster").append('Sorry we couldnt find a movie.')
   			}
   			
		});
	}

	function findTrailer(key) {

		var queryURL2 = "https://api.themoviedb.org/3/movie/" + key + "/videos?api_key=1ebfe01505e78aebefb2f6d3e54a2dd0"

		$.ajax({
    		url: queryURL2,
   			method: 'GET'

		}).then(function(response) {
   			console.log(response);

   			var youtubeId = '';

   			for(var i = 0; i < response.results.length; i++){
   				var name = response.results[i].type;

   				if (name == 'Trailer'){
   					youtubeId = response.results[i].key;
   				}
   			}

   			$.ajax({
    			url: 'https://www.googleapis.com/youtube/v3/videos?part=player&id=' + youtubeId + '&key=AIzaSyAJoilv7hg1Nala1yMWZEHwZxgBYcXtE5Y',
   				method: 'GET'

			}).then(function(response) {

				console.log(response);

				var link = response.items[0].player.embedHtml;

				link = link.replace(/\/\//g, "https://");

				$("#iframe").append(link);

        $(document).on('click', '#movieButton', function() {
          // body...
          $("#myBook").hide();
          $("#myMovie").show();
          $("#iframe").show();
        })

			});

		});


	}

});
