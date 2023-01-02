const sync_fetch = require('sync-fetch')
const request = require('request');


let url = 'https://docs.google.com/spreadsheets/d/1OQgjhnRggv4SPQ0GsRtjHlk8Z0H4k5JLEyVQ10R35kk/gviz/tq?tqx=out:csv'

function get_csv_db(url) {
    const metadata = sync_fetch(url).text()
    const split_metadata = metadata.split('\n')

    let data = {};
    for (let i in split_metadata) {
        row = split_metadata[i].replace(/['"]+/g, '').split(',')
        if (row[0] == 'folder_name') {
            continue;
        }
        data[row[0]] = {
            display_name: row[1],
            description: row[2],
            imgur_album_id: row[3]
        };
    }
    return data;
}

// #######################################################################
function getImageAlbum(albumId) {
    const options = {
        url: `https://api.imgur.com/3/album/${albumId}`,
        headers: {
            'Authorization': `Client-ID ${clientId}`
        }
    };
    let image_list = [];
    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            if (error) {
                console.error(error);
            } else {
                try {
                    const data = JSON.parse(body);
                    for (const image of data.data.images) {
                        image_list.push(image.link);
                    }
                    resolve(image_list);
                } catch (e) {
                    // console.error(e);
                    console.error("Data: " + body);
                }
            }
        });

    });
}

// ######################################### Testing #########################################

console.log(get_csv_db('https://docs.google.com/spreadsheets/d/1OQgjhnRggv4SPQ0GsRtjHlk8Z0H4k5JLEyVQ10R35kk/gviz/tq?tqx=out:csv'));


getImageAlbum('c9nRn2t')
    .then((image_list) => {
        console.log(image_list);
    });
