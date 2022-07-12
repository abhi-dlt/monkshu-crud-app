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
        const result = await updateBook(jsonReq);
        return { result: result, results: result };

    } catch (error) {
        console.error(error);
        return API_CONSTANTS.API_RESPONSE_SERVER_ERROR;
    }
}

const updateBook = async (jsonReq) => {
    try { 
        let query = `UPDATE book SET name = ? WHERE id = ?`;
        let result = await require(`${CONSTANTS.APPROOTDIR}/sample/db/db.js`).simpleUpdate(query, [jsonReq.newName, jsonReq.id]);
        return result;
    } catch (error) {
        throw error;
    }
}

const validateRequest = jsonReq => (!isNaN(jsonReq.id) && jsonReq.newName?.length != 0);