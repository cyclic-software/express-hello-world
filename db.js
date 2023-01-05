const sync_fetch = require('sync-fetch');


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

// let folders = get_csv_db('https://docs.google.com/spreadsheets/d/1OQgjhnRggv4SPQ0GsRtjHlk8Z0H4k5JLEyVQ10R35kk/gviz/tq?tqx=out:csv');
// console.log(folders);