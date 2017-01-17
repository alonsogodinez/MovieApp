
const ls = localStorage.getItem('MovieApp');
const INITIAL_STATE = ls && ls.actors ? JSON.parse(ls).actors : {
    actors: [
      {
        firstName: "Jhon",
        lastName: "Doe",
        gender: "male",
        birthDate : new Date(),
        movies: [0,1,2],
        imageURL: "/img/godfather1.png",
      },

      {
        firstName: "Alexander",
        lastName: "Hamilton",
        gender: "male",
        birthDate : new Date(),
        movies: [0,1,2],
        imageURL: "/img/godfather1.png",
      },

      {
        firstName: "Jhon",
        lastName: "Doe",
        gender: "male",
        birthDate : new Date(),
        movies: [0,1,2],
        imageURL: "/img/godfather1.png",
      },

      {
        firstName: "Jhon",
        lastName: "Doe",
        gender: "male",
        birthDate : new Date(),
        movies: [0,1,2],
        imageURL: "/img/godfather1.png",
      },

      {
        firstName: "Jhon",
        lastName: "Doe",
        gender: "male",
        birthDate : new Date(),
        movies: [0,1,2],
        imageURL: "/img/godfather1.png",
      },

      {
        firstName: "Jhon",
        lastName: "Doe",
        gender: "male",
        birthDate : new Date(),
        movies: [0,1,2],
        imageURL: "/img/godfather1.png",
      },
    ]

  };




export default function reducer(state=INITIAL_STATE, action) {

  switch (action.type) {


    case "ADD_ACTOR": {
      return {
        ...state,
        actors: [...state.actors, action.payload],
      }
    }
    case "UPDATE_ACTOR": {
      const {
        id
      } = action.payload;
      const newActors = [...state.actors];

      newActors[id] = {
        ...state.actors[id],
        ...action.payload
      };

      return {
        ...state,
        actors: newActors,
      }
    }
    case "DELETE_ACTOR": {
      return {
        ...state,
        actors: state.actors.filter((actor,index) => index !== Number(action.payload)),
      }
    }
    default:
      return state
  }

}