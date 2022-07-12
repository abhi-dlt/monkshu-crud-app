/*
* (C) 2020 TekMonks. All rights reserved.
* License: MIT - see enclosed LICENSE file.
*/

// Custom modules
const API_CONSTANTS = require(`${CONSTANTS.APPROOTDIR}/sample/apis/lib/constants`);

exports.doService = async jsonReq => {

    // Validate API request and check mandatory payload required
    if (!validateRequest(jsonReq)) return API_CONSTANTS.API_INSUFFICIENT_PARAMS;

    try {
        const insertId = await createBook(jsonReq.name);
        return { result: true, results: { insertId } };

    } catch (error) {
        console.error(error);
        return API_CONSTANTS.API_RESPONSE_SERVER_ERROR;
    }
}

const createBook = async (name) => {
    try { 
        let id = await require(`${CONSTANTS.APPROOTDIR}/sample/db/db.js`).simpleInsert("book", {name});
        return id;
    } catch (error) {
        throw error;
    }
}

const validateRequest = jsonReq => (jsonReq.name?.length != 0);