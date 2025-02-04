import {
  GET_CONTACTS_LIST,
  GET_CONTACT_DETAIL,
  POST_CREATE_CONTACT,
  PUT_UPDATE_CONTACT,
} from "../actions/ContactAction";

let initialState = {
  getContactsList: false,
  getContactDetail: false,
  postCreateContact: false,
  putUpdateContact: false,
};
// for (let i = 0; i < 100; i++) {
//   initialState.push({
//     key: i,
//     firstName: `Bilbo ${i}`,
//     lastName: "Baggins",
//     age: i + 1,
//     photo:
//       "http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550",
//     // name: `Edward King ${i}`,
//     // age: 32,
//     // address: `London, Park Lane no. ${i}`,
//   });
// }
const contacts = (state = initialState, action) => {
  switch (action.type) {
    case GET_CONTACTS_LIST:
      return {
        ...state,
        getContactsList: action.payload.data,
      };

    case GET_CONTACT_DETAIL:
      return {
        ...state,
        getContactDetail: action.payload.data,
      };
    case POST_CREATE_CONTACT:
      return {
        ...state,
        postCreateContact: action.payload.data,
      };
    case PUT_UPDATE_CONTACT:
      return {
        ...state,
        putUpdateContact: action.payload.data,
      };
    default:
      return state;
  }
};

export default contacts;
