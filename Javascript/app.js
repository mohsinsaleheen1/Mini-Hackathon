// ======================= SIGNUP / LOGIN =======================

const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

let userArray = JSON.parse(localStorage.getItem("users")) || [];

function sinupbtn(e) {
  e.preventDefault();
  let signName = document.getElementById("sname").value;
  let signEmail = document.getElementById("semail").value;
  let signPass = document.getElementById("spass").value;

  if (!signName || !signEmail || !signPass) {
    alert("Please fill input details");
    return;
  }

  for (let i = 0; i < userArray.length; i++) {
    if (userArray[i].useremail === signEmail) {
      alert("User Email Is Already Exist");
      return;
    }
  }

  let signupDetail = {
    userName: signName,
    useremail: signEmail,
    userpass: signPass,
  };

  userArray.push(signupDetail);
  localStorage.setItem("users", JSON.stringify(userArray));
  alert("Signup Successfully");
}

function signInbtn(e) {
  e.preventDefault();

  let loginEmail = document.getElementById("loname").value;
  let loginPass = document.getElementById("lopass").value;

  if (!loginEmail || !loginPass) {
    alert("Please fill input details");
    return;
  }

  let userFound = userArray.find(
    (u) => u.useremail === loginEmail && u.userpass === loginPass
  );

  if (userFound) {
    localStorage.setItem("loggedInUser", userFound.userName);
    window.location.href = "../Html/socialmedia.html";
  } else {
    alert("Login Failed");
  }
}

// ======================= BLOG SYSTEM =======================

// Modal Close/Open
function closebtn() {
  let modal = document.getElementById("blog");
  modal.classList.remove("model");
  modal.classList.add("hide");
}

function createBlog() {
  let modal = document.getElementById("blog");
  modal.classList.add("model");
  modal.classList.remove("hide");

  // new blog hoga to updateIndex empty
  document.getElementById("updateIndex").value = "";
}

// ======================= CREATE + UPDATE BLOG =======================

function submitBlog(e) {
  e.preventDefault();

  let blogTitle = document.getElementById("title").value;
  let blogContent = document.getElementById("content").value;
  let authorName = document.getElementById("author").value;
  let blogImage = document.getElementById("image").value; // simple URL
  let updateIndex = document.getElementById("updateIndex").value;

  if (!blogTitle || !blogContent || !authorName || !blogImage) {
    alert("Please fill input details");
    return;
  }

  let BlogArray = JSON.parse(localStorage.getItem("blog")) || [];

  let blogData = {
    title: blogTitle,
    Content: blogContent,
    author: authorName,
    file: blogImage,
    likes: 0,
  };

  let modal = document.getElementById("blog");
  modal.classList.add("hide");
  modal.classList.remove("model");

  if (updateIndex) {
    BlogArray[updateIndex] = blogData;
    alert("Blog Updated Successfully");
  } else {
    BlogArray.push(blogData);
    alert("Blog Created Successfully");
  }

  localStorage.setItem("blog", JSON.stringify(BlogArray));
  viewBlogs();
}

// ======================= EDIT BLOG =======================

function editBlog(index) {
  let blogs = JSON.parse(localStorage.getItem("blog")) || [];
  let blog = blogs[index];

  let modal = document.getElementById("blog");
  modal.classList.add("model");
  modal.classList.remove("hide");

  document.getElementById("title").value = blog.title;
  document.getElementById("content").value = blog.Content;
  document.getElementById("author").value = blog.author;
  document.getElementById("image").value = blog.file;

  document.getElementById("updateIndex").value = index;
}

// ======================= DELETE BLOG =======================

function deleteBlog(index) {
  let blogs = JSON.parse(localStorage.getItem("blog")) || [];

  if (confirm("Are you sure you want to delete this blog?")) {
    blogs.splice(index, 1);
    localStorage.setItem("blog", JSON.stringify(blogs));
    viewBlogs();
  }
}

// ======================= RENDER BLOGS =======================

function renderBlogs(blogsArray) {
  let card = document.getElementById("Cards");
  card.innerHTML = "";

  blogsArray.forEach((b, i) => {
    card.innerHTML += `
      <div class="card">
        <div class="iamge">
          <img src='${b.file}' alt="">
        </div>
        <div class="title">
          <h1>${b.title.slice(0, 30)}</h1>
        </div>
        <div class="content">
          <p>${b.Content.slice(0, 200)}</p>
        </div>
        <div class="author">
          <div class="thumb">
            <i class="fa-regular fa-thumbs-up" onclick="increment(${i})"></i>
            <span class="count">${b.likes}</span>
          </div>
          <div class="pbtn">
            <button onclick="editBlog(${i})">Edit</button>
            <button onclick="deleteBlog(${i})">Delete</button>
          </div>
        </div>
      </div>
    `;
  });
}

// ======================= SEARCH BLOG =======================

function searchBlogs() {
  let query = document.getElementById("blogSearch").value.toLowerCase();
  let blogs = JSON.parse(localStorage.getItem("blog")) || [];

  if (!query) {
    renderBlogs(blogs);
    return;
  }

  let filtered = blogs.filter((blog) => {
    return (
      blog.title.toLowerCase().includes(query) ||
      blog.Content.toLowerCase().includes(query)
    );
  });

  renderBlogs(filtered);
}

// ======================= LOAD BLOGS ON PAGE OPEN =======================

function viewBlogs() {
  let blogs = JSON.parse(localStorage.getItem("blog")) || [];
  renderBlogs(blogs);
}
function increment(index) {
  let blogs = JSON.parse(localStorage.getItem("blog")) || [];
  blogs[index].likes++;
  localStorage.setItem("blog", JSON.stringify(blogs));
  viewBlogs();
}

const nameaaa = window.addEventListener("load", viewBlogs());
function logOut() {
  window.location.href = "../Html/signup.html";
}
