const fetch = require('sync-fetch')

let url = 'https://docs.google.com/spreadsheets/d/1OQgjhnRggv4SPQ0GsRtjHlk8Z0H4k5JLEyVQ10R35kk/gviz/tq?tqx=out:csv'

// const metadata = fetch(url).text()
// const split_metadata = metadata.split('\n')


// let data = {};
// for (let i in split_metadata) {
//     row = split_metadata[i].replace(/['"]+/g, '').split(',')
//     data[row[0]] = {
//         display_name: row[1],
//         description: row[2],
//         imgur_album_id: row[3]
//     };
//     console.log(data)
// }
// console.log(data)


// function get_csv_db(url) {
//     const metadata = fetch(url).text()
//     const split_metadata = metadata.split('\n')


//     let data = {};
//     for (let i in split_metadata) {
//         row = split_metadata[i].replace(/['"]+/g, '').split(',')
//         data[row[0]] = {
//             display_name: row[1],
//             description: row[2],
//             imgur_album_id: row[3]
//         };
//     }
//     return data;
// }

// console.log(get_csv_db(url))
function sync_get_images(albumId) {
    let image_list = [];
    const metadata = fetch(`https://api.imgur.com/3/album/${albumId}`, {
        headers: {
            'Authorization': `Client-ID dae5026e52c8ce4`
        }
    }).text();

    const data = JSON.parse(metadata);
    for (const image of data.data.images) {
        image_list.push(image.link);
    };
    return image_list;
}

console.log(sync_get_images('5Z5QY'))