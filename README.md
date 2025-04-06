# Movie Dashboard App

A simple React application for tracking and managing your movie collection with features for adding, editing, and searching movies. Data persists between sessions using browser local storage.

## Setup Instructions

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository to your local machine
```
git clone https://github.com/lloydgapton/MovieDashboard.git
cd movie-dashboard
```

2. Install dependencies
```
npm install
```
or if you use yarn:
```
yarn install
```

3. Start the development server
```
npm start
```
or with yarn:
```
yarn start
```

4. Open your browser and navigate to http://localhost:3000

## Features

- Add new movies with title, year, genre, and rating
- Edit existing movie entries
- Delete unwanted movies
- Search through your movie collection
- View statistics about your collection
- Data persists in browser storage


## Usage

1. Adding a movie: Fill out the form at the top of the dashboard and click "Add Movie"
2. Editing a movie: Click the edit button on any movie card and update the information in the form
3. Deleting a movie: Click the delete button on any movie card
4. Searching: Type in the search bar to filter movies by title

## Browser Support

This application works on all modern browsers that support localStorage:
- Chrome
- Firefox
- Safari
- Edge