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
        const result = await deleteBook(jsonReq.id);
        return { result: true, results: result };

    } catch (error) {
        console.error(error);
        return API_CONSTANTS.API_RESPONSE_SERVER_ERROR;
    }
}

const deleteBook = async (id) => {
    try {
        let query = `DELETE FROM book WHERE id = ${id}`;
        let result = await require(`${CONSTANTS.APPROOTDIR}/sample/db/db.js`).simpleUpdate(query);
        return result;
    } catch (error) {
        throw error;
    }
}

const validateRequest = jsonReq => (!isNaN(jsonReq.id));