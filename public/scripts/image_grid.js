function loadImages(image_links) {
    const imageContainer = document.getElementById("imgcontainer");
    let id = 0;

    image_links = image_links.split(',');
    for (const link of image_links) {

        imageContainer.appendChild(createTable(id, link));
        id++;
        if (id > 3) {
            id = 0;
        }

    }

    function createTable(id, link) {
        //Getting link
        const a = document.createElement("a");
        const linkText = document.createTextNode('');
        a.appendChild(linkText);
        a.href = link;
        a.target = "_self";
        let link_ext = getFileExt(link);
        const extensions = ['mp4'];
        const column = document.getElementById(id);

        if (extensions.includes(link_ext)) {
            console.log("Video");
            const videoElement = document.createElement('video');

            videoElement.src = link;
            videoElement.controls = true;
            videoElement.autoplay = true;
            videoElement.loop = true;

            a.appendChild(videoElement); //Adding video to link
        }
        else {
            //Getting img
            const imageElement = document.createElement("img");
            imageElement.src = link;

            a.appendChild(imageElement); //Adding img to link
        }
        column.appendChild(a); //Adding link to column
        return column;
    }

    function getFileExt(link) {
        return link.substring(link.lastIndexOf('.') + 1, link.length) || link;
    }
}
