#ASSUMPTIONS

* Marketing pages to showcase the product are not in the current scope. The work done here is solely towards the app.
* A quick logo was created as a place holder. Assuming one would either be provided.
* Form elements are created using HTML5 to make use of date, email, etc.
* Skipping validation plugins like knockout.validation. Using custom validation for now.
* In account.js it is assumed that credit cards expire on the first of the month.
* To avoid polluting the code with loops the data is not always saved to the 'database' in main.js but only saved to the session.account variable. It does not make a difference since the app data is only persisted in memory until the page is refreshed.
* Some of the data in the 'database' object is denormalized on purpose for use with NoSQL databases like MongoDB.