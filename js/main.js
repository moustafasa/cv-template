//template function
function temp(rate, picture, name, date, content, reply = false) {
  let tem = `
            <div class="rate">
              <i class="up fa-solid fa-angle-up"></i>
              <span>${rate}</span>
              <i class="down fa-solid fa-angle-down"></i>
            </div>
            <div class="comment-content">
              <div class="user">
                <div class="avatar">
                  <img src="${picture}" alt="" />
                  <h2 class="name">${name}</h2>
                  <span class="you">you</span>
                  <span class="date">${date}</span>
                </div>
                <div class="me-buttons">
                  <button class="delete-button">
                    <i class="fa-solid fa-trash"></i>
                    delete
                  </button>
                  <button class="edit-button">
                    <i class="fa-solid fa-pen"></i>
                    edit
                  </button>
                </div>
                <button class="reply-button">
                  <i class="fa-solid fa-reply"></i>
                  reply
                </button>
              </div>
              <p>
                ${reply ? '<a href="#">@' + reply + "</a>" : ""}
                ${content}
              </p>
`;
  return tem;
}

let json;
let commentOpject = {
  picture: "",
  name: "",
  date: "",
  rate: "",
  content: "",
  // replys: [{ content: "",createdAt:'', score: "", user: { imagepng: "", username } }],
  replys: "",
  userName: "",
  userImage: "",
  createComment: function () {
    let containerLastChild = document.querySelector(".add-comment");
    let commentCont = document.createElement("div");
    commentCont.classList.add("comment-cont");
    containerLastChild.before(commentCont);
    // set comments
    let comment = document.createElement("div");
    comment.classList.add("parent-comment");
    commentCont.append(comment);
    comment.innerHTML = temp(
      this.rate,
      this.picture,
      this.name,
      this.date,
      this.content
    );
    if (this.name === this.userName) {
      comment.classList.add("me");
    }
    // set replys
    if (this.replys.length > 0) {
      let replyCont = document.createElement("div");
      replyCont.classList.add("reply-cont");
      commentCont.append(replyCont);
      this.replys.forEach((ele) => {
        let reply = document.createElement("div");
        reply.classList.add("reply-comment");
        replyCont.append(reply);
        reply.innerHTML = temp(
          ele.score,
          ele.user.image.png,
          ele.user.username,
          ele.createdAt,
          ele.content,
          ele.replyingTo
        );
        if (ele.user.username === this.userName) {
          reply.classList.add("me");
        }
      });
    }

    // set add comment image
    containerLastChild.children[0].src = this.userImage;
  },
};

const jsonFile = fetch("../data.json")
  .then((response) => {
    return response.json();
  })
  .then((JsonData) => {
    json = JsonData;
    commentOpject.userName = json.currentUser.username;
    commentOpject.userImage = json.currentUser.image.png;
    json.comments.forEach((ele) => {
      commentOpject.picture = ele.user.image.png;
      commentOpject.name = ele.user.username;
      commentOpject.date = ele.createdAt;
      commentOpject.rate = ele.score;
      commentOpject.content = ele.content;
      commentOpject.replys = ele.replies;
      commentOpject.createComment();
    });
  });

// reply
let replyBtn = document.querySelectorAll("button.reply-button");
let addComment = document.querySelector(".container .add-comment");
console.log(replyBtn, addComment);
