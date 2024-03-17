require('dotenv').config();
const path = require('path');


function getIndex(req, res){
    const clientIP = '163.23.43.56';
    console.log(`🌠 ${clientIP} entered`);
    const IPINFO_TOKEN = process.env.IPINFO_TOKEN;
    const ipinfo = `https://ipinfo.io/${clientIP}?token=${IPINFO_TOKEN}`;

  request(ipinfo, { json: true }, (error, res, body) => {
    if (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
      return;
    }

    const userInfo={
        'IP Address':body.ip,
        'Country':body.country,
        'Region':body.region,
        'City':body.city,
        'Zip Code':body.postal,
        'Latitude':body.loc.split(',')[0],
        'Longitude':body.loc.split(',')[1]
    }

    console.log(`Region: ${userInfo.Region}`);
    console.log(`City: ${userInfo.City}`);
    console.log(`(Lat,Long):(${userInfo.Latitude},${userInfo.Longitude})`)
  });
    res.sendFile(path.join(__dirname,'public','index.html'));
    
}

module.exports = getIndex;