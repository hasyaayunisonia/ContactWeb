import axios from "axios";

export const GET_CONTACTS_LIST = "GET_CONTACTS_LIST";

export const GET_CONTACT_DETAIL = "GET_CONTACT_DETAIL";

export const POST_CREATE_CONTACT = "POST_CREATE_CONTACT";

export const PUT_UPDATE_CONTACT = "PUT_UPDATE_CONTACT";

const CORS_PROXY = "https://contact.herokuapp.com/";

export const getContactsList = () => {
  return (dispatch) => {
    console.log("API Path:", process.env.REACT_APP_API_PATH);

    axios
      // .get(`${process.env.REACT_APP_API_PATH}/contact`)
      .get(`${process.env.REACT_APP_API_PATH}/contact`)
      .then(function (response) {
        // console.log(response.data.data);
        dispatch({
          type: GET_CONTACTS_LIST,
          payload: {
            data: response.data.data,
            //   errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        // console.log(error);
        dispatch({
          type: GET_CONTACTS_LIST,
          payload: {
            data: false,
            //   errorMessage: error.message,
          },
        });
      });
  };
};

export const getContactDetail = (id) => {
  return (dispatch) => {
    axios
      .get(`https://contact.herokuapp.com/contact/${id}`)
      .then(function (response) {
        // console.log(response.data.data);
        dispatch({
          type: GET_CONTACT_DETAIL,
          payload: {
            data: response.data.data,
            //   errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        // console.log(error);
        dispatch({
          type: GET_CONTACT_DETAIL,
          payload: {
            data: false,
            //   errorMessage: error.message,
          },
        });
      });
  };
};

export const postCreateContact = (data) => {
  return (dispatch) => {
    console.log("ini data", data);
    const postData = {
      firstName: data.firstName,
      lastName: data.lastName,
      age: parseInt(data.age),
      photo: data.photo,
    };

    axios
      .post(`${process.env.REACT_APP_API_PATH}/contact`, postData, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Origin: "https://contact.herokuapp.com",
          // "Content-Type": "application/json",
          // "Access-Control-Allow-Origin": "https://contact.herokuapp.com",
          // tambahkan header lain jika diperlukan
        },
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response.data);
        dispatch({
          type: POST_CREATE_CONTACT,
          payload: {
            data: response,
            //   errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        // console.log(error);
        dispatch({
          type: POST_CREATE_CONTACT,
          payload: {
            data: false,
            //   errorMessage: error.message,
          },
        });
      });
  };
};

export const putUpdateContact = (id, data) => {
  return (dispatch) => {
    console.log("ini data", data);
    const postData = {
      firstName: data.firstName,
      lastName: data.lastName,
      age: parseInt(data.age),
      photo: data.photo,
    };

    axios
      .put(`https://contact.herokuapp.com/contact/${id}`, postData, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          // Origin: "https://contact.herokuapp.com",
          // "Content-Type": "application/json",
          // "Access-Control-Allow-Origin": "https://contact.herokuapp.com",
          // tambahkan header lain jika diperlukan
        },
      })
      .then(function (response) {
        // console.log(response.data.data);
        dispatch({
          type: PUT_UPDATE_CONTACT,
          payload: {
            data: response,
            //   errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        // console.log(error);
        dispatch({
          type: PUT_UPDATE_CONTACT,
          payload: {
            data: false,
            //   errorMessage: error.message,
          },
        });
      });
  };
};

export const deleteContact = (id) => {
  return (dispatch) => {
    axios
      .delete(`https://contact.herokuapp.com/contact/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          // Origin: "https://contact.herokuapp.com",
          // "Content-Type": "application/json",
          // "Access-Control-Allow-Origin": "https://contact.herokuapp.com",
          "Access-Control-Allow-Origin": "http://localhost:3000",

          // tambahkan header lain jika diperlukan
        },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};
