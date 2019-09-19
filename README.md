# Mobile Assignment

This repository includes a mobile application that displays a list of movies. The project is implemented using React Native with Expo and TypeScript.

The data was fetched from The Movie Database API: https://www.themoviedb.org/documentation/api.

Before you can start using this api you must get the **API_KEY**. Copy the **.env.dist** file into **.env** and put the **API_KEY** there.

## Goals

1. Display movies in a list. Each row should display a thumbnail image for the movie with a title and the release date. The program should be able to load many items.
2. When tapping on each row, the user should be navigated to a details page that contains the movie cover art, title, release date and description.

Bonus: Build functionality to switch to Dark Mode.

## Getting started

To run the application just install the necessary Node.js packages using **yarn**.

```
yarn install 
```

## Starting the client

```
yarn start
```

## Result

Try it at https://expo.io/@svitlanaiefremova/MovieProject

![](git-image-ios.gif)