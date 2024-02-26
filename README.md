# Netflix Clone

Netflix Clone is a web application inspired by the design and functionality of the Netflix website. It fetches movie data using the TMDB API and renders movie information on the website. [Live Demo](https://netflixclone-dutta.netlify.app/)

![Netflix Clone User Interface](/src/assets/homepage.png 'Netflix Clone Interface')

## Tech Stack

The project is built using the following technologies:

- HTML
- SASS
- JavaScript
- Parcel

The API used belongs to TMDB. You can visit their website [here](https://www.themoviedb.org/).

## Features

- **Homepage (index.html)**: The homepage of the website.
- **Details Page (details.html)**: Shows details about a movie, including trailers/clips and a list of similar movies.
- **Results Page (results-list.html)**: Displays a list of movies based on keyword search or genre selection.
- **Genre List**: Allows users to search for movies by genre.
- **MVC Architecture**: Utilizes Model-View-Controller architecture for organizing JavaScript files.
- **Class-based Views**: View files are structured with classes, with private variables and functions.

## Architecture

![Netflix clone Architecture](/src/assets/netflixclone-architecture.drawio.png 'Netflix clone Architecture')

## Improvements

1. **Language Filter**: Add a list of languages to the website below the genre list. When clicked, display a list of movies available in that language.
2. **Watch Later Feature**: Implement a "watch later" button for movies, allowing users to bookmark movies for later viewing. Create a "watch later" section on the page to display bookmarked movies. Movie IDs can be stored in local storage for future reference.
3. **Load More Button**: Add a "load more" button to the movie list on the results page and details page. This button should load more movies related to the search or selected movie.
