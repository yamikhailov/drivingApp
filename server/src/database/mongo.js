const {MongoClient} = require("mongodb");




async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
    
    console.log("DataBases: ");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}


async function start_database(){
    const link = "mongodb://192.168.56.101:27017/?readPreference=primary&ssl=false";
    const client = new MongoClient(link);
    try{
        await client.connect();
        return client;
    } catch(e){
        console.error(e);
    }
}

async function get_database(){
    let client = await start_database();
    return client.db();
    
}

module.exports = {
    start_database,
    listDatabases,
    get_database
}