* Api Endpoint :https://fakestoreapi.com/products (i am sorry,  i could not found any free api endpoint for transaction history).
* This is an api endpoint that returned list of products with columns (ID,Title,Description,Category,Img,price,rating[].)
* First Of. i loop through the list to  group the item by their category.  using "Reduce and Map" 
* For the search. i filter through the raw response. (i mean the product list before grouped.) by the (tilte, description,  and category) in this case. the method returned only items with matched value for any of these fields.
* For the filter. i sort the item by "Price" to ascending order when clicked on "Lowest price"  while sort by Rating  to descending when clicked on "Highest Ratings" and this returned items by the orders.
* While you can also clear all the filters and search.
* And we have a whole simple product page. 


RUN ON LOCAL MACHINE

git clone  https://github.com/sheriffjimoh/hellicarrier-test-app.git
cd hellicarrier-test-app
npm install
npm start


LIVE PROJECT

https://jimoh-sherifdeen-hellicarrier-test-app.netlify.app/
