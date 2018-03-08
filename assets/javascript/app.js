	
	  
  		var book;

		function yesFunction(){
  			console.log("You would read " + book + "?");
  			//add a yes to the firebase
  			$("#topRight").empty();
  			$("#topRight").html("Enjoy reading " + book + "!");
  		}
  		function noFunction(){
  			console.log("Hell No!");
  			//add a no to the firebase
  			$("#topRight").empty();
  			$("#topRight").html("Maybe you would like the movie instead");
  		}
  		function maybeFunction(){
  			console.log("You might read this book");
  			//add a maybe to the firebase
  			$("#topRight").empty();
  			$("#topRight").html("Would you like to search for a different book?");
  		}

window.onload = function loaded(){

	

	var config = {
    apiKey: "AIzaSyA6K1EB3z6KS0KuIUaJ_na2IOthkFfq6yw",
    authDomain: "juliagoolia-764e1.firebaseapp.com",
    databaseURL: "https://juliagoolia-764e1.firebaseio.com",
    projectId: "juliagoolia-764e1",
    storageBucket: "juliagoolia-764e1.appspot.com",
    messagingSenderId: "45376190688"
  	}; //end config

  	firebase.initializeApp(config);

  	//create variable dataRef to refer to database
  	var dataRef = firebase.database();

  	

  	

  		$('#search').click(function () {
  			
			book = $("#bookSearch").val();
			console.log("Book title: " + book);
			run(book);
			$("#topRight").append(topRight);

			}); // end click function

  			


  	var author;

  	


  	function run(){
  		console.log("run worked");

  		var authKey = "AIzaSyD3t9FZQ_rFOQdwV_b3PVvH6FEWSNJjRck";
  		var queryURL = "https://www.googleapis.com/books/v1/volumes?q=" + book + "+inauthor:" + "&key=" + authKey;

      var movieQueryURL = "https://api.themoviedb.org/3/search/movie?api_key=1ebfe01505e78aebefb2f6d3e54a2dd0&query=" + book;

  	 $.ajax({
    url: queryURL,
    method: "GET"
  	}).then(function(googleBook) {
  		console.log(googleBook);

  		var title = googleBook.items[1].volumeInfo.title;
  		console.log("Title: " + title);

  		var description = googleBook.items[1].volumeInfo.description;
  		console.log("Description: " + description);

  		var pages = googleBook.items[1].volumeInfo.pageCount;
  		console.log("Pages: " + pages);

  		var category = googleBook.items[1].volumeInfo.categories[0];
  		console.log("Category: " + category);

  		var author = googleBook.items[1].volumeInfo.authors[0];
  		console.log("Author: " + author);

  		var date = googleBook.items[1].volumeInfo.publishedDate;
  		console.log("Publishing Date: " + date);

  		var price = googleBook.items[1].saleInfo.listPrice.amount;
  		console.log("Price: " + price);

  		var image = googleBook.items[1].volumeInfo.imageLinks.smallThumbnail;
  		// console.log(category);

  		$("#topLeft").html("<img src='" + image +"'>");


  	}); //end ajax book function

    $.ajax({
    url: movieQueryURL,
    method: "GET"
    }).then(function(movieAPI) {
      console.log("movie api works");
      console.log(movieAPI);

      }); //end ajax movie function

  } //end run function

  		
  	

} //end window.onload