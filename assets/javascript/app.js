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

  	var authKey = "AIzaSyD3t9FZQ_rFOQdwV_b3PVvH6FEWSNJjRck";
  	var book = "Atlas Shrugged";
  	var author;

  	var queryURL = "https://www.googleapis.com/books/v1/volumes?q=" + book + "+inauthor:" + "&key=" + authKey;

  	 $.ajax({
    url: queryURL,
    method: "GET"
  	}).then(function(googleBook) {
  		console.log(googleBook);

  		var title = googleBook.items[0].volumeInfo.title;
  		console.log("Title: " + title);

  		var description = googleBook.items[0].volumeInfo.description;
  		console.log("Description: " + description);

  		var pages = googleBook.items[0].volumeInfo.pageCount;
  		console.log("Pages: " + pages);

  		var category = googleBook.items[0].volumeInfo.categories[0];
  		console.log("Category: " + category);

  		var author = googleBook.items[0].volumeInfo.authors[0];
  		console.log("Author: " + author);

  		var date = googleBook.items[0].volumeInfo.publishedDate;
  		console.log("Publishing Date: " + date);

  		var price = googleBook.items[0].saleInfo.listPrice.amount;
  		console.log("Price: " + price);

  		var image = googleBook.items[0].volumeInfo.imageLinks.smallThumbnail;
  		// console.log(category);

  		$("#topLeft").html("<img src='" + image +"'>");


  	});

} //end window.onload