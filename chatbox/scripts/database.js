const { CosmosClient } = require("@azure/cosmos");
const config = require('./config');
import { getDbIdFromUrl } from "./utils";

// Initialize the Cosmos client
const endpoint = config.AZURE_COSMODB_ENDPOINT;
const key = config.AZURE_COSMODB_KEY;
const client = new CosmosClient({ endpoint, key });

// Get a reference to the database and container
const database = client.database("ClassInsight");
const container = database.container("Transcripts");

export async function saveTranscript(url, transcript) {
    try {
        const newItem = {
            id: getDbIdFromUrl(url),
            transcript: transcript
        };

        // Call the create method with the item and options
        const { resource: createdItem } = await container.items.create(newItem, {
            partitionKey: newItem._partitionKey
        });

        // Log the result
        console.log(`Created item with id: ${createdItem.id}`);
    } catch (e) {
        console.log("Save Transcript Error: ", e);
    }
}

// export async function getTranscript(url) {
//     try {
//         const item = container.item(url, url);

//         // Call the read method with the options
//         const { resource: readItem } = await item.read({
//             partitionKey: item.partitionKey
//         });

//         // Log the result
//         console.log(`Read item with id: ${readItem.id}`);

//         return readItem;
//     } catch (e) {
//         console.log("Get Transcript Error: ", e);
//         return false; // item does not exist
//     }
// }

export async function getTranscript(url) {
    try {
        const { resources: items } = await container.items.readAll().fetchAll();
        const readItem = items.find((i) => i.id === getDbIdFromUrl(url));

        // Log the result
        console.log(`Read item with id: ${readItem.id}`);
        return readItem;
    } catch (e) {
        console.log("Get Transcript Error: ", e);
        return false; // item does not exist
    }
}

// HOW TO USE
// STEP 1: call getTranscript(url), transcript will be returned if already stored
// STEP 2: If false is returned, it means that a transcript has not already been created for the video
// STEP 3: Therefore run the code to convert the video -> audio -> transcript
// STEP 4: Only then call saveTranscript by passing in the `url` as a string and the `transcript` as a JSON array


// ---- SAMPLE TEST CODE (can delete if not needed) ----
// ====  run `node.exe chatbox/scripts/database.js`  ====
//
//
// const sampleUrl = "www.azure.com"
// const sampleTranscript = [
//         {
//             "text": "He anyone have a issue for last week attendance? Can I get your name please?",
//             "timestamp": "00:00:07"
//         },
//         {
//             "text": "Uh, you just write your name to the.",
//             "timestamp": "00:00:14"
//         }
//     ]
//
// async function test(){
//     await saveTranscript(sampleUrl, sampleTranscript);
//     console.log(await getTranscript(sampleUrl));
// }
//
// test();