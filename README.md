(View Raw will give you the markdown that you can copy to your repos!)


![MIT LICENSE](https://img.shields.io/github/license/scottbromander/the_marketplace.svg?style=flat-square)
![REPO SIZE](https://img.shields.io/github/repo-size/scottbromander/the_marketplace.svg?style=flat-square)
![TOP_LANGUAGE](https://img.shields.io/github/languages/top/scottbromander/the_marketplace.svg?style=flat-square)
![FORKS](https://img.shields.io/github/forks/scottbromander/the_marketplace.svg?style=social)

# Concert Masterlist

## Description

_Duration: 2 Week Sprint_


Welcome to my app called Concert Masterlist. It is designed to help music enthusiasts and casual concert goers keep track of past events and the memories attached. It would be a shame if those moments went forgotten. Imagine never forgetting the name of an incredible opener act. What if you could have all your concert memories neatly organized and easily accessible. Maybe you have seen an opening band that will become famous over time and you can look back and realize you saw them before they made it big. It has happened to me before. That is why the Concert Masterlist saves the date, venue, performers, pictures, and comments about the experience in an easy to read, easy to interact environment. Sort it by date, artist, or venue. You will always have a complete record of your concert adventures, making it easier to relive those unforgettable moments. Make sure you do not forget another concert again!




### Prerequisites


- [Node.js](https://nodejs.org/en/)
- vsCode
- Postico2

## Installation



1. Create a database named `concert_masterlist`,
2. The queries in the `tables.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries, 
3. Open up your editor of choice and run an `npm install`
4. Run `npm run server` in your terminal
5. Run `npm run client` in your terminal
6. The `npm run client` command will open up a new browser tab for you!

## Usage

Login or register and feel free to add concerts to your page. Once a band is added, an input appears where you can put in a url for an image. Add as many photos as you like for each band and click submit. You will be redirected to your main page and can view all of the concerts in a card style view. If you are lookng for a specific concert, you can click on the search button in the navbar and search in real time. It is a sticky search so even if there are slight misspellings, the concert will show up. If you click on the concert in any view, it brings you to the detail view where you can see all of the photos associated with the concert as well as a Spotify player for each band. 


## Built With

1. Node
2. Express
3. React
4. Redux
5. PostgreSQL
6. Passport
7. React-Bootstrap
8. Fuse.js
9. Spotify API

## License
[MIT](https://choosealicense.com/licenses/mit/)



## Acknowledgement
Thanks to [Emerging Digital Academy](https://emergingacademy.org) who equipped and helped me to make this application a reality.

## Support
If you have suggestions or issues, please email me at [dmcampbell2023@gmail.com]