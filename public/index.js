function loadFolders(folderList) {
    const folderLists = folderList.split(',');
    const folderContainer = document.getElementById("folderNavi");
    for (const folder of folderLists) {
        const divBox = document.createElement("div");
        divBox.className = "link";
        const a = document.createElement("a");
        const linkText = document.createTextNode(folder);
        a.appendChild(linkText);
        a.title = folder;
        a.href = folder;
        divBox.appendChild(a);
        folderContainer.appendChild(divBox);
    }
}