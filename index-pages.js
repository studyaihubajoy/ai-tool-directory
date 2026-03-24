const { google } = require('googleapis');
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

const keyPath = path.join('C:', 'ai', 'vivid-env-444812-b2-aac6c7c5e182.json');
// কত নম্বর লিঙ্ক থেকে শুরু হবে তা এই ফাইলে সেভ থাকবে
const progressFile = path.join('C:', 'ai', 'progress.txt');

async function startIndexing() {
  let client;
  try {
    if (!fs.existsSync(keyPath)) {
      console.error("Error: JSON ফাইলটি পাওয়া যায়নি!");
      return;
    }
    const key = JSON.parse(fs.readFileSync(keyPath, 'utf8'));

    // কতগুলো স্কিপ করতে হবে তা ফাইল থেকে পড়া
    let skipCount = 0;
    if (fs.existsSync(progressFile)) {
      skipCount = parseInt(fs.readFileSync(progressFile, 'utf8')) || 0;
    }

    const jwtClient = new google.auth.JWT({
      email: key.client_email,
      key: key.private_key,
      scopes: ['https://www.googleapis.com/auth/indexing']
    });

    const uri = "mongodb+srv://admin:Ajoy%402019@cluster0.haukpr7.mongodb.net/study_ai_hub?retryWrites=true&w=majority";
    client = await MongoClient.connect(uri);
    const db = client.db('study_ai_hub');
    
    // আগের দিনের ২০০টির পর থেকে পরবর্তী ২০০টি তুলবে
    const tools = await db.collection('tools').find({}).skip(skipCount).limit(200).toArray(); 

    if (tools.length === 0) {
      console.log("নতুন কোনো লিঙ্ক আর বাকি নেই!");
      return;
    }

    console.log(`Starting from index: ${skipCount}. Authorizing...`);
    await jwtClient.authorize();
    const indexing = google.indexing('v3');

    let processedThisTime = 0;
    for (const tool of tools) {
      const url = `https://ai.shopgb.online/details/${tool.slug || tool._id}`; 
      try {
        await indexing.urlNotifications.publish({
          auth: jwtClient,
          requestBody: { url: url, type: 'URL_UPDATED' }
        });
        console.log(`Success: ${url}`);
        processedThisTime++;
      } catch (err) {
        if (err.message.includes('Quota exceeded')) {
          console.log("আজকের কোটা শেষ!");
          break;
        }
        console.error(`Error for ${url}: ${err.message}`);
      }
    }

    // পরবর্তী দিনের জন্য নতুন পজিশন সেভ করে রাখা
    fs.writeFileSync(progressFile, (skipCount + processedThisTime).toString());
    console.log(`\nNext time will start from index: ${skipCount + processedThisTime}`);

  } catch (error) {
    console.error("Main Error:", error.message);
  } finally {
    if (client) await client.close();
  }
}

startIndexing();