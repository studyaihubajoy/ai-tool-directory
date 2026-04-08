const { google } = require('googleapis');
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

const keyPath = path.join('C:', 'ai', 'vivid-env-444812-b2-474ae4debff9.json');
const progressFile = path.join('C:', 'ai', 'progress.txt');

async function startIndexing() {
  let client;
  try {
    const key = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
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
    
    // ডাটাবেজ থেকে ২০০টি করে টুল নেওয়া হচ্ছে
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
      // SEO ফ্রেন্ডলি ইউআরএল তৈরি (যেমন: details/chatgpt)
      const slug = tool.slug || (tool.name ? tool.name.toLowerCase().replace(/ /g, '-') : tool._id);
      const url = `https://ai.shopgb.online/details/${slug}`; 

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

    fs.writeFileSync(progressFile, (skipCount + processedThisTime).toString());
    console.log(`\nNext time will start from index: ${skipCount + processedThisTime}`);

  } catch (error) {
    console.error("Main Error:", error.message);
  } finally {
    if (client) await client.close();
  }
}

startIndexing();