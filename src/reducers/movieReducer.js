
const ls = localStorage.getItem('MovieApp');
const INITIAL_STATE = ls ? JSON.parse(ls).movies : {
    movies: [
      {
        name : "THE GODFATHER II",
        imageURL: "/img/godfather1.png",
        description: "James Franco start this new series as an adaptation of the King's " +
        "time travel glorious story",
        votes: 10,
        rating: 8.9,
        genre: "Drama",
        releaseYear: 2006,
        grossIncome: "$10M",
        directorName: "George Lucas",
        actors: [2,3,4]
      },

      {
        name : "SAVING PRIVATE RYAN",
        imageURL: "/img/savingprivateryan.png",
        description: "James Franco start this new series as an adaptation of the King's " +
        "time travel glorious story",
        votes: 10,
        rating: 6.4,
        genre: "Drama",
        releaseYear: 2006,
        grossIncome: "$10M",
        directorName: "George Lucas",
        actors: [1]
      },

      {
        name : "THE BUTTERFLY EFFECT",
        imageURL: "/img/butterflyeffect.png",
        description: "James Franco start this new series as an adaptation of the King's " +
        "time travel glorious story",
        votes: 10,
        rating: 4.3,
        genre: "Drama",
        releaseYear: 2006,
        grossIncome: "$10M",
        directorName: "George Lucas",
        actors: [2,3,4]
      },

      {
        name : "Fight CLUB",
        imageURL: "/img/fightclub.png",
        description: "James Franco start this new series as an adaptation of the King's " +
        "time travel glorious story",
        votes: 10,
        rating: 2.1,
        genre: "Drama",
        releaseYear: 2006,
        grossIncome: "$10M",
        directorName: "George Lucas",
        actors: [2,3,4]
      },

      {
        name : "THE GODFATHER",
        imageURL: "/img/godfather1.png",
        description: "James Franco start this new series as an adaptation of the King's " +
        "time travel glorious story",
        votes: 10,
        rating: 2.1,
        genre: "Drama",
        releaseYear: 2006,
        grossIncome: "$10M",
        directorName: "George Lucas",
        actors: [2,3,4]
      }
    ]
  }


export default function reducer(state=INITIAL_STATE, action) {

  switch (action.type) {


    case "ADD_MOVIE": {
      return {
        ...state,
        movies: [...state.movies, action.payload],
      }
    }
    case "UPDATE_MOVIE": {
      const {
        id
      } = action.payload;
      const newMovies = [...state.movies];

      newMovies[id] = {
        ...state.movies[id],
        ...action.payload
      };

      return {
        ...state,
        movies: newMovies,
      }
    }
    case "DELETE_MOVIE": {

      return {
        ...state,
        movies: state.movies.filter((movie,i) =>
                    i !== Number(action.payload)),
      }
    }
    default:
      return state
  }

}