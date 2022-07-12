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
        const books = await getBooks();
        console.log("books", books);
        return { result: true, results: { books } };

    } catch (error) {
        console.error(error);
        return API_CONSTANTS.API_RESPONSE_SERVER_ERROR;
    }
}

const getBooks = async (jsonReq) => {
    try { 
        let query = "SELECT * FROM book";
        const result = await require(`${CONSTANTS.APPROOTDIR}/sample/db/db.js`).simpleSelect(query);
        return result? result : "No records found";
    } catch (error) {
        throw error;
    }
}

const validateRequest = jsonReq => (jsonReq);