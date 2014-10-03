proj2
=====

Twitter Clone

Grading Directions
==================

There are three main pages in this web application: /login, /register, and /home. Users who are not logged in will be redirected to /login. From there, a user can either log in with existing credentials, or click on a link to /register, where they can register an account. After a user is logged in (or registers), they will be taken to /home, where there is a form for submitting new posts and a greeting/logout link the top and posts displayed at the bottom. Below a user's own posts are edit and delete links, which take the user to forms for editing and deleting the respective post. Attempting to visit the edit and delete forms for a non-authenticated user (by stealing the URL) will result in a message displayed indicating lack of permissions. Modifying the URL to point to a nonexistent post will display a message indicating a nonexistent post, and modifying the URL to have an invalid post ID will display a message indicating a malformed URL.

Highlights
----------
/routes/edit.js:9 (and similar)
Here when a request is sent to the edit.js router, I make sure that there is actually a well-formed post ID where I expect; otherwise, when I try to use it in the database, I get a 500 error. This prevents the 500 error from showing.

/routes/register.js:17
Here I check to make sure that when a user attempts to register, that they actually entered non-empty usernames and passwords. This prevents people from registering either without a password or with a blank username.

/views/del.ejs
When the user clicks on a delete link, I ask for confirmation before actually deleting the post, which is very good for usability.

Help Wanted
-----------
/register.js:22
When users register, I manually enforce uniqueness of usernames. Is this a good approach, or would a better approach be to use usernames as the key in the database of users?

/home.ejs:19
I have a long, unescaped sequence of javascript here, intended to display edit and delete links for a post if it was written by the currently authenticated user. Is there a better way to do this? Forced unescaping just seems like it would always be a bad idea (for security reasons).


Design Challenges
=================
Most of the design was fairly straightforward: I gave one page to each separate function (login, registration, homepage (tweet list), edit, delete) and gave a router to each separate page. The most difficult thing was deciding how to implement edit and delete. One way was to put the functionality inside the home page, and do dynamic updating with client-side javascript. Another way was to use URL query parameters. In the end, I decided on having URLs suffixed by the post ID (in the database) lead to pages for editing and deleting these posts, respectively. (The back-end logic is visible in the router.get(":/id") calls.)

The database design was also fairly straightforward. There were two obvious data types: users and posts. I separated these into two separate databases as there was no immediate reason to have direct references from each user to all of his/her posts. The posts contained their texts and authors (user it was written by), and the users contained their usernames and passwords. When subscriptions are implemented, however, it may make more sense for each user to store a list of his/her posts.