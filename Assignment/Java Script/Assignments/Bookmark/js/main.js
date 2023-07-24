let bookmarkName = document.getElementById("bookmarkName");
let bookmarkUrl = document.getElementById("bookmarkUrl");
let bookmarks = [];
if (localStorage.getItem("bookmarks")) {
  bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  showBookmarks();
}
function showBookmarks() {
  let str = ``;
  for (let i = 0; i < bookmarks.length; i++) {
    str += `
    <tr>
    <td>${i + 1}</td>
    <td>${bookmarks[i].name}</td>
    <td>   
        <a class="btn btn-info" href="${
          bookmarks[i].url
        }" target="_blank"><i class="fa-solid fa-eye"></i> Visit</a>
    
    </td>
    <td>
      <button onclick="deleteBookmarks(${i})" class="btn btn-danger">
        <i  class="fa-solid fa-trash"></i> Delete
      </button>
    </td>
  </tr>
    `;
  }
  document.getElementById("add").innerHTML = str;
}
function addBookmark() {
  if (validateBookmarkName()) {
    let flag = true;
    for (let i = 0; i < bookmarks.length; i++) {
      if (bookmarkName.value == bookmarks[i].name) {
        flag = false;
      }
    }
    if (flag) {
      if (validateBookmarkUrl()) {
        let bookmark = {
          name: bookmarkName.value,
          url: bookmarkUrl.value,
        };
        bookmarks.push(bookmark);
        showBookmarks();
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
        clear();
      } else {
        window.alert(
          `Url must Follow
          1-The string should start with either http or https followed by ://.
          2-The combined length of the sub-domain and root domain must be 
          between 2and 256. It should only contain alphanumeric characters 
          and/or special characters.
          3-The TLD (Top-Level Domain) should only contain alphabetic characters 
          and it should be between two and six characters long.
          4-The end of the URL string could contain alphanumeric characters and/or 
          special characters. And it could repeat zero or more times.`
        );
      }
    } else {
      window.alert("This Bookmark Name Is Reserved");
    }
  } else {
    window.alert(
      "the name must start with a letter (or an underscore, which makes it a hidden bookmark), is limited to 40 characters, and cannot contain any spaces."
    );
  }
}
function clear() {
  bookmarkName.value = "";
  bookmarkUrl.value = "";
}
function deleteBookmarks(index) {
  bookmarks.splice(index, 1);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  showBookmarks();
}
function visitBookmarks(index) {
  document.getElementById(
    "visit"
  ).innerHTML = `<a href="${bookmarks[index].url}"></a>`;
}
function validateBookmarkName() {
  let regex = /^[_a-zA-Z][_a-zA-Z0-9]{0,39}$/;
  return regex.test(bookmarkName.value);
}
function validateBookmarkUrl() {
  let regex =
    /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
  return regex.test(bookmarkUrl.value);
}
