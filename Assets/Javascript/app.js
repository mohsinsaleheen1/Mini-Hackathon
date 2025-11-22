const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

// sinupForm
let userArray = JSON.parse(localStorage.getItem("users")) || [];
function sinupbtn(e) {
  e.preventDefault();
  let signName = document.getElementById("sname").value;
  let signEmail = document.getElementById("semail").value;
  let signPass = document.getElementById("spass").value;
  if (signName === "" && signEmail === "" && signPass === "") {
    alert("Please fill input details");
  } else {
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
}

function signInbtn(e) {
  e.preventDefault();
  let loginEmail = document.getElementById("loname").value;
  let loginPass = document.getElementById("lopass").value;
  let isFound = false;
  let user;
  if (loginEmail === "" && loginPass === "") {
    alert("Please fill input details");
  } else {
    for (let i = 0; i < userArray.length; i++) {
      if (
        userArray[i].useremail === loginEmail &&
        userArray[i].userpass === loginPass
      ) {
        user = userArray[i].userName;
        localStorage.setItem("loggedInUser", user);
        isFound = true;
        break;
      }
    }
    if (isFound) {
      console.log("ello", user);
      window.location.href = "../Html/socialmedia.html";
    } else {
      alert("Login Failed");
    }
  }
}

// Blog Section Functionality
function closebtn() {
  let closeButton = document.getElementById("blog");
  closeButton.classList.remove("model");
  closeButton.classList.add("hide");
}

function createBlog() {
  let blog = document.getElementById("blog");
  blog.classList.add("model");
  blog.classList.remove("hide");
}

// View Blogs
function viewBlogs() {
  let blogs = JSON.parse(localStorage.getItem("blog")) || [];
  renderBlogs(blogs);

  // Agar tumhare paas "View Blogs" button hai jisko disable karna ho:
  let viewBtn = document.getElementById("Vblog");
  if (viewBtn) viewBtn.disabled = true;
  viewBlogs.disabled = true;
}

// Create Blog
function submitBlog(e) {
  e.preventDefault();
  let blogTitle = document.getElementById("title").value;
  let blogContent = document.getElementById("content").value;
  let authorName = document.getElementById("author").value;
  let file = document.getElementById("image").value;
  let closeButton = document.getElementById("blog");
  let viewBlogs = document.getElementById("Vblog");
  // SubmitBlogs In LocalStorage
  let BlogArray = JSON.parse(localStorage.getItem("blog")) || [];
  if (
    blogTitle === "" &&
    blogContent === "" &&
    authorName === "" &&
    blogImage === ""
  ) {
    alert("Please fill input details");
    // Hide the blog modal
  } else {
    closeButton.classList.remove("model");
    closeButton.classList.add("hide");
    // Create a new blog object
    let BlogDetail = {
      title: blogTitle,
      Content: blogContent,
      author: authorName,
      image: file,
    };
    BlogArray.push(BlogDetail);
    localStorage.setItem("blog", JSON.stringify(BlogArray));
  }
}
function editBlog(index) {
  let blogs = JSON.parse(localStorage.getItem("blog")) || [];
  let blog = blogs[index];

  // Modal open karo
  let modal = document.getElementById("blog");
  modal.classList.add("model");
  modal.classList.remove("hide");

  // Purana data input fields me fill karo
  document.getElementById("title").value = blog.title;
  document.getElementById("content").value = blog.Content;
  document.getElementById("author").value = blog.author;
  document.getElementById("image").value = blog.file; // simple URL

  // Hidden input me index save karo
  document.getElementById("updateIndex").value = index;
}
function submitBlog(e) {
  e.preventDefault();

  let blogTitle = document.getElementById("title").value;
  let blogContent = document.getElementById("content").value;
  let authorName = document.getElementById("author").value;
  let blogImage = document.getElementById("image").value; // simple URL
  let updateIndex = document.getElementById("updateIndex").value;
  let closeButton = document.getElementById("blog");

  if (!blogTitle || !blogContent || !authorName || !blogImage) {
    alert("Please fill input details");
    return;
  }

  let BlogArray = JSON.parse(localStorage.getItem("blog")) || [];

  closeButton.classList.remove("model");
  closeButton.classList.add("hide");

  let updatedBlog = {
    title: blogTitle,
    Content: blogContent,
    author: authorName,
    file: blogImage, // simple URL save
  };

  if (updateIndex !== "") {
    // Existing blog update
    BlogArray[updateIndex] = updatedBlog;
    document.getElementById("updateIndex").value = "";
    alert("Blog Updated Successfully");
  } else {
    // Naya blog create
    BlogArray.push(updatedBlog);
    alert("Blog Created Successfully");
  }
  localStorage.setItem("blog", JSON.stringify(BlogArray));
}
function deleteBlog(index) {
  let blogs = JSON.parse(localStorage.getItem("blog")) || [];

  if (confirm("Are you sure you want to delete this blog?")) {
    blogs.splice(index, 1); // array se delete
    localStorage.setItem("blog", JSON.stringify(blogs));
    viewBlogs(); // frontend refresh karo taake change turant dikhe
  }
}

function searchBlogs() {
  let query = document.getElementById("blogSearch").value.toLowerCase();
  let blogs = JSON.parse(localStorage.getItem("blog")) || [];
  let card = document.getElementById("Cards");

  // Agar query empty hai → saare blogs show karo
  if (!query) {
    renderBlogs(blogs);
    return;
  }

  // Filter karo blogs array jo title ya content me query match kare
  let filtered = blogs.filter((blog) => {
    let title = blog.title.toLowerCase();
    let content = blog.Content.toLowerCase();
    return title.includes(query) || content.includes(query);
  });

  // Render karo filtered blogs
  renderBlogs(filtered);
}
function renderBlogs(blogsArray) {
  let card = document.getElementById("Cards");
  card.innerHTML = ""; // Purane cards hatao

  for (let i = 0; i < blogsArray.length; i++) {
    let b = blogsArray[i];
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
            <i class="fa-regular fa-thumbs-up" onclick="increment(this)"></i>
            <span class="count">0</span>
          </div>          
          <div class="pbtn">
            <button onclick="editBlog(${i})">Edit</button>
            <button onclick="deleteBlog(${i})">Delete</button>
          </div>
        </div>
      </div>
    `;
  }
}
