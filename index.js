const bodyClass = document.body.classList;

let isDarkMode = JSON.parse(localStorage.getItem("darkMode"));
const darkModeBtn = document.querySelector(".darkmode");

if (isDarkMode) {
  bodyClass.add("dark");
  darkModeBtn.textContent = bodyClass.contains("dark") ? "🌑" : "🌘";
} else {
  bodyClass.remove("dark");
}

darkModeBtn.addEventListener("click", () => {
  isDarkMode = isDarkMode === true ? false : true;
  localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  bodyClass.toggle("dark");
  darkModeBtn.textContent = bodyClass.contains("dark") ? "🌑" : "🌘";
});

const modal = document.querySelector(".modal");
const sideOpenBtn = document.querySelector(".sidebar-btn");
const sidebar = document.querySelector("aside.side-bar");
sideOpenBtn.addEventListener("click", () => {
  bodyClass.add("show");
  sidebar.classList.toggle("open");
});

let currentModal = null;

modal.addEventListener("click", () => {
  bodyClass.remove("show");
  sidebar.classList.remove("open");
  loginBox.classList.remove("open");
  signupBox.classList.remove("open");
  findIdBox.classList.remove("open");
  findPsBox.classList.remove("open");
  noticeAddBox.classList.remove("open");
});

const loginBox = document.querySelector(".loginbox");
const signupBox = document.querySelector(".signupbox");
const findIdBox = document.querySelector(".findIdBox");
const findPsBox = document.querySelector(".findPsBox");
const noticeAddBox = document.querySelector(".noticeAddBox");

const loginBtn = document.querySelector(".loginOpen");
const signupBtn = document.querySelector(".signupOpen");
const findIdBtn = document.querySelector(".findIDOpen");
const findPsBtn = document.querySelector(".findPSOpen");
const noticeAddBoxOpenBtn = document.querySelector(".noticeAddBoxOpen.btn");

function showBox(box) {
  box.classList.add("open");
  bodyClass.add("show");
}

loginBtn.addEventListener("click", () => {
  showBox(loginBox);
});

signupBtn.addEventListener("click", () => {
  showBox(signupBox);
});

findIdBtn.addEventListener("click", () => {
  showBox(findIdBox);
});

findPsBtn.addEventListener("click", () => {
  showBox(findPsBox);
});

noticeAddBoxOpenBtn.addEventListener("click", () => {
  showBox(noticeAddBox);
});

const signupName = document.querySelector(".signup.name");
const signupNumber = document.querySelector(".signup.number");
const signupId = document.querySelector(".signup.id");
const signupPs = document.querySelector(".signup.password");
const signupRPs = document.querySelector(".signup.password.check");
const signupButton = document.querySelector(".signup.btn");

let namebool = false;
signupName.addEventListener("input", () => {
  if (signupName.value.trim() === "") {
    signupName.classList.remove("inputError");
    signupName.classList.remove("inputSuccess");
    namebool = false;
  } else if (signupName.value.length < 3) {
    signupName.classList.add("inputError");
    signupName.classList.remove("inputSuccess");
    namebool = false;
  } else {
    signupName.classList.remove("inputError");
    signupName.classList.add("inputSuccess");
    namebool = true;
    return signupName.value;
  }
});

let numberbool = false;
signupNumber.addEventListener("input", () => {
  const regExp = /^\d{3}\d{3,4}\d{4}$/;
  if (signupNumber.value.trim() === "") {
    signupNumber.classList.remove("inputError");
    signupNumber.classList.remove("inputSuccess");
    numberbool = false;
  } else if (regExp.test(signupNumber.value)) {
    signupNumber.classList.add("inputSuccess");
    signupNumber.classList.remove("inputError");
    numberbool = true;
    return signupNumber.value;
  } else {
    signupNumber.classList.add("inputError");
    signupNumber.classList.remove("inputSuccess");
    numberbool = false;
  }
});

let idbool = false;
signupId.addEventListener("input", () => {
  const regExp = /^[a-z0-9]{5,19}$/g;
  if (signupId.value.trim() === "") {
    signupId.classList.remove("inputError");
    signupId.classList.remove("inputSuccess");
    idbool = false;
  } else if (regExp.test(signupId.value)) {
    signupId.classList.remove("inputError");
    signupId.classList.add("inputSuccess");
    idbool = true;
    return signupId.value;
  } else {
    signupId.classList.add("inputError");
    signupId.classList.remove("inputSuccess");
    idbool = false;
  }
});

let psbool = false;
signupPs.addEventListener("input", () => {
  const regExp = /^[A-Za-z0-9]{6,12}$/;
  if (signupPs.value.trim() === "") {
    signupPs.classList.remove("inputError");
    signupPs.classList.remove("inputSuccess");
    psbool = false;
  } else if (regExp.test(signupPs.value)) {
    signupPs.classList.remove("inputError");
    signupPs.classList.add("inputSuccess");
    psbool = true;
    return signupPs.value;
  } else {
    signupPs.classList.add("inputError");
    signupPs.classList.remove("inputSuccess");
    psbool = false;
  }
});

let Rpsbool = false;
signupRPs.addEventListener("input", () => {
  const regExp = /^[A-Za-z0-9]{6,12}$/;
  if (signupRPs.value.trim() === "") {
    signupRPs.classList.remove("inputError");
    signupRPs.classList.remove("inputSuccess");
    Rpsbool = false;
  } else if (
    regExp.test(signupRPs.value) &&
    signupRPs.value === signupPs.value
  ) {
    signupRPs.classList.remove("inputError");
    signupRPs.classList.add("inputSuccess");
    Rpsbool = true;
  } else {
    signupRPs.classList.add("inputError");
    signupRPs.classList.remove("inputSuccess");
    Rpsbool = false;
  }
});

let userList = JSON.parse(localStorage.getItem("userList")) || [];
const signupform = document.querySelector(".signupform");
signupform.addEventListener("submit", () => {
  const userId = signupId.value;
  const isExist = userList.some((user) => user.userId === userId);
  if (
    namebool === true &&
    numberbool === true &&
    idbool === true &&
    psbool === true &&
    Rpsbool === true &&
    !isExist
  ) {
    alert(`${signupName.value}님의 회원가입이 완료되었습니다.`);
    userList.push({
      userId: signupId.value,
      userName: signupName.value,
      userNumber: signupNumber.value,
      userPs: signupPs.value,
    });
    localStorage.setItem("userList", JSON.stringify(userList));
    signupName.value = null;
    signupNumber.value = null;
    signupId.value = null;
    signupPs.value = null;
    signupBox.classList.remove("open");
  } else if (isExist) {
    alert("이미 존재하는 아이디입니다. 다른 아이디를 입력해주세요.");
  } else {
    alert("정확히 입력해주세요.");
  }
});

const loginId = document.querySelector(".login.id");
const loginPs = document.querySelector(".login.password");

loginId.addEventListener("input", () => {
  const regExp = /^[a-z0-9]{5,19}$/g;
  if (loginId.value.trim() === "") {
    loginId.classList.remove("inputError");
    loginId.classList.remove("inputSuccess");
  } else if (regExp.test(loginId.value)) {
    loginId.classList.remove("inputError");
    loginId.classList.add("inputSuccess");
    return loginId.value;
  } else {
    loginId.classList.add("inputError");
    loginId.classList.remove("inputSuccess");
  }
});

loginPs.addEventListener("input", () => {
  const regExp = /^[A-Za-z0-9]{6,12}$/;
  if (loginPs.value.trim() === "") {
    loginPs.classList.remove("inputError");
    loginPs.classList.remove("inputSuccess");
  } else if (regExp.test(loginPs.value)) {
    loginPs.classList.remove("inputError");
    loginPs.classList.add("inputSuccess");
    return loginPs.value;
  } else {
    loginPs.classList.add("inputError");
    loginPs.classList.remove("inputSuccess");
  }
});

const loginform = document.querySelector(".loginform");
loginform.addEventListener("submit", () => {
  const loginUser = userList.find(
    (user) => user.userId === loginId.value && user.userPs === loginPs.value
  );
  if (loginUser) {
    alert(`${loginUser.userName}님, 로그인에 성공했습니다!`);
    localStorage.setItem("loginUser", JSON.stringify(loginUser));
  } else {
    alert("아이디 또는 비밀번호가 일치하지 않습니다.");
  }
});

const logoutBtn = document.querySelector(".logout");
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("loginUser");
  alert("로그아웃 되었습니다.");
  location.reload();
});

const loginUser = JSON.parse(localStorage.getItem("loginUser")) || [];
const UserId = loginUser.userId;
const UserName = loginUser.userName;
const UserNumber = loginUser.userNumber;
const UserPs = loginUser.userPs;

const modalbtnsBox = document.querySelector(".modalbtnsBox");
const pageName = document.querySelector(".mypage-name");
const pageNumber = document.querySelector(".mypage-number");
const pageId = document.querySelector(".mypage-id");

const MainLoginBox = document.querySelector(".MainLoginBox");

if (loginUser && loginUser.userId) {
  sideOpenBtn.classList.add("hide");
  modalbtnsBox.classList.add("hide");
  MainLoginBox.classList.remove("hide");
  pageName.textContent = UserName;
  pageNumber.textContent = UserNumber;
  pageId.textContent = UserId;
} else {
  sideOpenBtn.classList.remove("hide");
  modalbtnsBox.classList.remove("hide");
  MainLoginBox.classList.add("hide");
}

const ChangeBtn = document.querySelector(".changepassword.btn");
ChangeBtn.addEventListener("click", () => {
  const regExp = /^[A-Za-z0-9]{6,12}$/;
  const currentPassword = prompt("현재 비밀번호를 입력해주세요.");
  if (currentPassword === loginUser.userPs) {
    const newPassword = prompt("새로운 비밀번호를 입력해주세요.");
    if (newPassword) {
      if (regExp.test(newPassword)) {
        userList = userList.map((user) => {
          if (user.userId === UserId) {
            return {
              ...user,
              userPs: newPassword,
            };
          } else {
            return user;
          }
        });
        localStorage.setItem("userList", JSON.stringify(userList));
        loginUser.userPs = newPassword;
        localStorage.setItem("loginUser", JSON.stringify(loginUser));
        location.reload();
        alert("비밀번호가 변경되었습니다.");
      } else {
        alert("비밀번호는 6~12자리의 영문 대소문자, 숫자만 입력 가능합니다.");
      }
    } else {
      alert("비밀번호 변경이 취소되었습니다.");
    }
  } else {
    alert("현재 비밀번호가 일치하지 않습니다.");
  }
});

const withdrawal = document.querySelector(".withdrawal.btn");
withdrawal.addEventListener("click", () => {
  const confirmUser = confirm(
    "정말로 탈퇴하시겠습니까? 탈퇴정보는 복구되지 않습니다."
  );
  if (confirmUser) {
    localStorage.removeItem("loginUser");
    userList = userList.filter((user) => user.userId !== UserId);
    localStorage.setItem("userList", JSON.stringify(userList));
    alert("탈퇴가 완료되었습니다. 이용해주셔서 감사합니다.");
    location.reload();
  }
});

const findIdName = document.querySelector(".findId.name");
findIdName.addEventListener("input", () => {
  if (findIdName.value.trim() === "") {
    findIdName.classList.remove("inputError");
    findIdName.classList.remove("inputSuccess");
  } else if (findIdName.value.length < 3) {
    findIdName.classList.add("inputError");
    findIdName.classList.remove("inputSuccess");
  } else {
    findIdName.classList.remove("inputError");
    findIdName.classList.add("inputSuccess");
  }
});

const findIdNumber = document.querySelector(".findId.number");
findIdNumber.addEventListener("input", () => {
  const regExp = /^\d{3}\d{3,4}\d{4}$/;
  if (findIdNumber.value.trim() === "") {
    findIdNumber.classList.remove("inputError");
    findIdNumber.classList.remove("inputSuccess");
  } else if (regExp.test(findIdNumber.value)) {
    findIdNumber.classList.add("inputSuccess");
    findIdNumber.classList.remove("inputError");
  } else {
    findIdNumber.classList.remove("inputSuccess");
    findIdNumber.classList.add("inputError");
  }
});

const findIdform = document.querySelector(".findIdform");
findIdform.addEventListener("submit", () => {
  event.preventDefault();
  const name = findIdName.value.trim();
  const number = findIdNumber.value.trim();
  const foundUser = userList.find(
    (user) => user.userName === name && user.userNumber === number
  );
  if (foundUser) {
    alert(`사용자의 ID는 ${foundUser.userId} 입니다.`);
  } else {
    alert("일치하는 사용자가 없습니다");
  }
});

const findPwName = document.querySelector(".findPs.name");
findPwName.addEventListener("input", () => {
  if (findPwName.value.trim() === "") {
    findPwName.classList.remove("inputError");
    findPwName.classList.remove("inputSuccess");
  } else if (findPwName.value.length < 3) {
    findPwName.classList.add("inputError");
    findPwName.classList.remove("inputSuccess");
  } else {
    findPwName.classList.remove("inputError");
    findPwName.classList.add("inputSuccess");
  }
});

const findPwNumber = document.querySelector(".findPs.number");
findPwNumber.addEventListener("input", () => {
  const regExp = /^\d{3}\d{3,4}\d{4}$/;
  if (findPwNumber.value.trim() === "") {
    findPwNumber.classList.remove("inputError");
    findPwNumber.classList.remove("inputSuccess");
  } else if (regExp.test(findPwNumber.value)) {
    findPwNumber.classList.add("inputSuccess");
    findPwNumber.classList.remove("inputError");
  } else {
    findPwNumber.classList.remove("inputSuccess");
    findPwNumber.classList.add("inputError");
  }
});

const findPwId = document.querySelector(".findPs.id");
findPwId.addEventListener("input", () => {
  const regExp = /^[a-z0-9]{5,19}$/g;
  if (findPwId.value.trim() === "") {
    findPwId.classList.remove("inputError");
    findPwId.classList.remove("inputSuccess");
  } else if (regExp.test(findPwId.value)) {
    findPwId.classList.remove("inputError");
    findPwId.classList.add("inputSuccess");
  } else {
    findPwId.classList.add("inputError");
    findPwId.classList.remove("inputSuccess");
  }
});

const findPwform = document.querySelector(".findPsform");
findPwform.addEventListener("submit", () => {
  event.preventDefault();
  const name = findPwName.value.trim();
  const number = findPwNumber.value.trim();
  const id = findPwId.value.trim();
  const foundUser = userList.find(
    (user) =>
      user.userName === name && user.userNumber === number && user.userId === id
  );
  if (foundUser) {
    alert(`사용자의 패스워드는 ${foundUser.userPs} 입니다.`);
  } else {
    alert("일치하는 사용자가 없습니다");
  }
});

const NoticeAddTitle = document.querySelector(".AddTitle");
let titlebool = false;
NoticeAddTitle.addEventListener("input", () => {
  const regExp =
    /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣\s\[\]\(\)\{\}\*\+\?\^\$\|~!@#%&_-]{5,100}$/;
  if (NoticeAddTitle.value.trim() === "") {
    NoticeAddTitle.classList.remove("inputError");
    NoticeAddTitle.classList.remove("inputSuccess");
    titlebool = false;
  } else if (regExp.test(NoticeAddTitle.value)) {
    NoticeAddTitle.classList.remove("inputError");
    NoticeAddTitle.classList.add("inputSuccess");
    titlebool = true;
  } else {
    NoticeAddTitle.classList.add("inputError");
    NoticeAddTitle.classList.remove("inputSuccess");
    titlebool = false;
  }
});
const NoticeAddStory = document.querySelector(".AddStory");
let storybool = false;
NoticeAddStory.addEventListener("input", () => {
  const regExp =
    /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣\s\[\]\(\)\{\}\*\+\?\^\$\|~!@#%&_-]{10,500}$/;
  if (NoticeAddStory.value.trim() === "") {
    NoticeAddStory.classList.remove("inputError");
    NoticeAddStory.classList.remove("inputSuccess");
    storybool = false;
  } else if (regExp.test(NoticeAddStory.value)) {
    NoticeAddStory.classList.remove("inputError");
    NoticeAddStory.classList.add("inputSuccess");
    storybool = true;
  } else {
    NoticeAddStory.classList.add("inputError");
    NoticeAddStory.classList.remove("inputSuccess");
    storybool = false;
  }
});

const NoticeAddSubmit = document.querySelector(".AddSubmit.btn");
NoticeAddSubmit.addEventListener("click", (event) => {
  event.preventDefault();
  if (titlebool === true && storybool === true) {
    const noticeList = JSON.parse(localStorage.getItem("noticeList")) || [];
    const newNotice = {
      id: UserId,
      name: UserName,
      title: NoticeAddTitle.value,
      story: NoticeAddStory.value,
      date: new Date().toLocaleString(),
    };

    noticeList.push(newNotice);
    localStorage.setItem("noticeList", JSON.stringify(noticeList));

    alert("질문이 등록되었습니다 !");
    noticeAddBox.classList.remove("open");
    bodyClass.remove("show");
    location.reload();
  } else {
    alert("올바르게 입력해주세요");
  }
});

const ulNotice = document.querySelector(".noticeBoard");
const noticeList = JSON.parse(localStorage.getItem("noticeList")) || [];

const convertToNotice = (obj) => {
  const noticeItem = document.createElement("li");
  noticeItem.className = "noticeBoardItem";

  const ItemInfo = document.createElement("div");
  ItemInfo.className = "ItemInfo";
  const ContentTitle = document.createElement("p");
  ContentTitle.className = "ContentTitle";
  ContentTitle.textContent = obj.title;
  ItemInfo.append(ContentTitle);

  const ItemContent = document.createElement("div");
  ItemContent.className = "ItemContent";
  const ContentStory = document.createElement("p");
  ContentStory.className = "ContentStory";
  ContentStory.textContent = obj.story;
  ItemContent.append(ContentStory);

  const moreInfo = document.createElement("div");
  moreInfo.className = "moreInfo";
  const InfoUser = document.createElement("p");
  InfoUser.className = "InfoUser";
  InfoUser.textContent = `${obj.name} / ${obj.date}`;
  const ContentStoryInfobtn = document.createElement("button");
  ContentStoryInfobtn.className = "ContentStoryInfo btn";
  ContentStoryInfobtn.textContent = `more ?`;
  const ContentDlebtn = document.createElement("button");
  ContentDlebtn.className = "ContentDle btn";
  ContentDlebtn.textContent = "Delete ?";
  moreInfo.append(InfoUser, ContentStoryInfobtn, ContentDlebtn);

  ContentStoryInfobtn.addEventListener("click", () => {
    ContentStory.classList.toggle("more");
    ContentTitle.classList.toggle("more");
    noticeItem.classList.toggle("noticeborder");
    InfoUser.classList.toggle("noticeborder");
    ItemInfo.classList.toggle("noticeborder");
    ContentStoryInfobtn.classList.toggle("noticeborder");
    ContentStoryInfobtn.textContent = ContentStory.classList.contains("more")
      ? "done..."
      : "more ?";
  });

  ContentDlebtn.addEventListener("click", () => {
    if (
      confirm("삭제된 글은 복구할 수 없습니다, 게시글을 삭제 하시겠습니까?")
    ) {
      const index = noticeList.findIndex((item) => item.id === obj.id);
      if (index !== -1) {
        noticeList.splice(index, 1);
        localStorage.setItem("noticeList", JSON.stringify(noticeList));
        location.reload();
      }
    } else {
      alert("게시글 삭제를 취소하셨습니다.");
    }
  });

  if (obj.title.length < 20 && 20 > obj.story.length) {
    ContentStoryInfobtn.remove();
  }
  if (obj.id !== UserId) {
    ContentDlebtn.remove();
  }
  noticeItem.append(ItemInfo, ItemContent, moreInfo);
  return noticeItem;
};

const noticeRender = (element, page) => {
  element.innerHTML = "";
  const startIdx = (page - 1) * 4;
  const endIdx = startIdx + 4;
  for (let i = startIdx; i < endIdx && i < noticeList.length; i += 1) {
    element.append(convertToNotice(noticeList[i]));
  }
};

const pagePrev = document.querySelector(".pagePrev.btn");
const pagePrevPrev = document.querySelector(".pagePrevPrev.btn");
const pageNext = document.querySelector(".pageNext.btn");
const pageNextNext = document.querySelector(".pageNextNext");
const pageState = document.querySelector(".pageState");

let page = 1;
localStorage.getItem("page") == undefined
  ? (page = 1)
  : (page = Number(localStorage.getItem("page")));
let pageMin = 1;
let pageMax = Math.ceil(noticeList.length / 4);
pageMax === undefined
  ? (pageState.textContent = page)
  : (pageState.textContent = `${page} / ${pageMax}`);

pagePrev.addEventListener("click", () => {
  if (pageMin == page) {
    return;
  }
  if (pageMin != page) {
    page -= 1;
    localStorage.setItem("page", page);
    noticeRender(ulNotice, page);
    document.querySelector(".pageState").textContent = `${page} / ${pageMax}`;
  }
});

pagePrevPrev.addEventListener("click", () => {
  if (pageMin == page) {
    return;
  }
  if (pageMin != page) {
    page = 1;
    localStorage.setItem("page", page);
    noticeRender(ulNotice, page);
    document.querySelector(".pageState").textContent = `${page} / ${pageMax}`;
  }
});

pageNext.addEventListener("click", () => {
  if (pageMax == page) {
    return;
  }
  if (pageMax != page) {
    page += 1;
    localStorage.setItem("page", page);
    noticeRender(ulNotice, page);
    document.querySelector(".pageState").textContent = `${page} / ${pageMax}`;
  }
});

pageNextNext.addEventListener("click", () => {
  if (pageMax == page) {
    return;
  }
  if (pageMax != page) {
    page = pageMax;
    localStorage.setItem("page", page);
    noticeRender(ulNotice, page);
    document.querySelector(".pageState").textContent = `${page} / ${pageMax}`;
  }
});

loginUser ? noticeRender(ulNotice, page) : null;
