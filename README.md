The BookLook web application will enable a user to enter a title, author, or ISBN into the main search field, 
and then receive a list of book cover images on the results page, which they can click on to get more information about that book. 
The API that I am using to run this application is the Google Books API: https://developers.google.com/books/docs/overview

The BookLook application accesses the Volume IDs: 

Volume IDs - Unique strings given to each volume that Google Books knows about. An example of a volume ID is _LettPDhwR0C. 
You can use the API to get the volume ID by making a request that returns a Volume resource; you can find the volume ID in its id field.

I perform a volumes search by sending an HTTP GET request to the following URI:
https://www.googleapis.com/books/v1/volumes?q=search+terms

MVP CORE FEATURES LIST:
-	Text field to search
-	A menu for the user to pick a search identifier: author, title or ISBN.
-	A button to render results.
-	A list of book cover image results that are connected to the user’s search identifier. 
-	The ability to interact with results: click on books to get more information. 

MVP “nice-to-have” FEATURES LIST:
-	Access more information about the book in the application – instead of just getting forwarded to Google Books via a hyperlink. 
-	Access a digital copy of the book in the application – instead of just getting forwarded to Google Books via a hyperlink.
