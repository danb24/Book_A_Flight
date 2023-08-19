# Book_A_Flight

project for web development course 

our web site will help you to find flights to your desire destinations, see reviews of other customers and see the best discaount that we offer.

we have in the web site 2 kindes of users - customers and manager.

The customers sees the web site from his side and can search flights, see the different discaounts, add and see reviews and send an E-mail to contact the company.

The manager can add and delete users from the system, add and delete flights and add and delete new discount coupons.

We have 5 main procecess -- the first one is adding a flight to the flights list (the manager does this process and the customer can see the available flights list), and the second is the manager being able to add (and also delete) special benefits (each benefit has a coupon) so the client could see the available benefits/coupons. 

The third one is the client being able to navigate through the flights list (each client can filter it with either destination or departing country), the fourth one is the client being able to add a review based on a specific destination. The fifth one is the client being able to send a mail to the system's manager regarding several issues. 

The managed database is built on four collections, the first one is flights which includes all of the relevant flights (which has fields such as price, flight's date, destination, and more), the second collection is users, which has 2 kind of users, manager utilize the processes from the manager's side, and the client that utilize the processes from the client's side. The third collection is reviews, which is built from the reviews the different clients are adding to the website. The fourth one is coupons, which means to represent the benefits and special deals the client can see. 

The architecture we are using is based on 3 tiers, a client side, a application-server side, and a server-database side. The client's side is everything related to the public folder, whether it is the html pages, the css designs or the script.js (which includes javascript functionality). The application-server (our app.js file) handles post/get/delete requests from the user, connects to the database, and then retrives the relevent data to the user (from the database). It is run by the express library. The server-database side is on the model folder, and it handles all the functions that retrive data from the database, and also the connection to the database. In addition, the server side is run on the NodeJS, which is a server environment that helps Javacsript be used as a backend language (not just a front).


The code is also built as a MVC, meaning it's divided to three parts with diffrent roles, the Model (which includes the mongoDB.js file) handles the connection to the database, having functions regarding the database and retrieving the relevant data, the Controller is on the app.js file, routing between the different paths and helping the connection between the Model and the Views. Lastly, the Views is everything regarding the public folder, as explained before (which are things that client should be exposed to).

--> manager
!(main page)[<img width="960" alt="image" src="https://github.com/danb24/Book_A_Flight/assets/135611106/812879a3-d859-43e6-9284-be7001c06d1e">

!()[<img width="960" alt="image" src="https://github.com/danb24/Book_A_Flight/assets/135611106/103b6210-2836-4185-8830-cc59b1d364ff">]

!(insert flight)

-->user
!(main page-find.html)[<img width="960" alt="image" src="https://github.com/danb24/Book_A_Flight/assets/135611106/97b06396-09ca-4882-887f-4cfb4b566e74">]

!(coupons)[<img width="960" alt="image" src="https://github.com/danb24/Book_A_Flight/assets/135611106/7eb21286-e125-4d67-bd88-68f80c37f889">]

!(contact)[<img width="960" alt="image" src="https://github.com/danb24/Book_A_Flight/assets/135611106/a78b0795-f37e-4bca-a1b2-d204d80272c5">]

!(reviews)[<img width="960" alt="image" src="https://github.com/danb24/Book_A_Flight/assets/135611106/e14e004c-c6f7-44bb-aabb-16966ac3377d">]


