import axios from "axios";
// import getJWT from "./getJWT";

const api = {
  request: async (method, url, data, headers = {}) => {
    // const jwt = getJWT();
    // let authHeader = {};

    // if (jwt) {
    //     authHeader = {
    //         Authorization: `Bearer ${jwt}`,
    //     };
    // }

    return await axios({
        url: url,
        method: method,
        baseURL: 'http://localhost:5000',
        headers: {
          ...headers,
        //   ...authHeader,
        },
        data: data,
    }).then((res) => {
        if (res.status != 200 && res.status != 201) {
            console.log(`Exception: ${res.statusText}`)
            return res
        }
        if (method === "get") {
            return res.data;
        }
        return res;
    });
  },
};

export default api;