# Infinite-scroll App.

## Introduction

#### Infinite-scroll App is built using React, typescript and Vite. This simple App is based on the provided screenshots that allows for the user to browse items and favourite them. The App uses the [Flickr API](https://www.flickr.com/services/api/) to fetch Flickr members uploaded photos to help people make their photos available to people who matter to them.

## Installation

#### · step 1: Clone the repository or use attached project folder

#### · step 2: Navigate to the project directory:

##### cd your_project_app

#### · step 3: Install dependencies:

##### npm install

## Configuration

#### · step 1: Sign up at [Flickr](https://www.flickr.com/services/developer/api/) to get an API key.

#### · step 2: Create API KEY variable:

##### Create .env file in main folder.

##### In the '.env' file, declare a variable: 'VITE_API_KEY=your_api'.

## Start the development server:

#### npm run dev

## Bonus(optional) section

#### · Clicking on the rendered photo opens a modal window.

#### · In the modal window, clicking on the photo opens a new tab with the photo displayed at full width.

#### · Navbar component has been created.

#### · 'My Favourite List' button to retrieve and display the user's favourite list.

#### · 'Home' button loads the main page.

#### · 'Search' input fetches data based on the query entered in the input field.

## Ideas for Expansion

#### · In the modal window, display comments for the photo below the photo and user details using the [flickr.photos.comments.getList method](https://www.flickr.com/services/api/flickr.photos.comments.getList.html)

#### · Clicking on the user details element fetches the current author's photo sets using the [flickr.photosets.getList method](https://www.flickr.com/services/api/flickr.photosets.getList.html)

#### · The sort functionality for the search method includes an optional argument to sort the data. [flickr.photos.search method, argument - sort](https://www.flickr.com/services/api/flickr.photos.search.html)

#### · Remove photo immediately from the Favourites list without refreshing the page.
