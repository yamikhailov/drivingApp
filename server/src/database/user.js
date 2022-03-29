const {get_database } = require("./mongo");


const collection_name = 'users';

async function get_users(){
        let db = await get_database();
        return await db.collection(collection_name).find({}).toArray().catch(err => console.error(err));  
}

module.exports = {
    get_users
}