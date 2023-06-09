//toggle forms
const LoginForm = document.querySelector("#login");
const SignupForm = document.querySelector("#signup");

LoginForm.style.display = "none";
document.querySelector("#linkLogin").addEventListener("click", e => {
    e.preventDefault();
    LoginForm.style.display = "flex";
    SignupForm.style.display = "none";
});
document.querySelector("#linkSignup").addEventListener("click", e => {
    e.preventDefault();
     SignupForm.style.display = "flex";
     LoginForm.style.display = "none";

});

const pages = {};

pages.base_url = "http://127.0.0.1:8000/api";

const setToken = () => {
  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
pages.getAPI = async (api_url) => {
    try{
        return await axios(api_url);
    }catch(error){
        console.log("Error from GET API");
    }
}

let signup_btn = document.getElementById('btn_signup');
let signin_btn = document.getElementById('btn_login');
signup_btn.addEventListener('click', signup);
signin_btn.addEventListener('click', signin);


function signup() {

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    
    let data = new FormData();
    
    data.append('name', name);
    data.append('email', email);
    data.append('password', password);
    // window.location.href = "./html/admin.html";
    axios.post(pages.base_url+'/register', data)
    .then((result) => {
    console.log(result);
    if (result.data.status== "success") {
      console.log("Signed up successfully!");
      // save token to local storage
       localStorage.setItem('token', result.data.authorisation.token);
       localStorage.setItem("name", result.data.user.name);  
       localStorage.setItem("user_id", result.data.user.id); 
            
    } else {
      console.log("unable to sign up");
    }
  })
  .catch((err) => {
    console.log(err);
  });
         
};


function signin() {

    let email = document.getElementById('email_signin').value;
    let password = document.getElementById('password_signin').value;
    
    let data = new FormData();
    data.append('email', email);
    data.append('password', password);
    axios.post(pages.base_url+'/login', data).then(function (result) {
        console.log(result.data)

    if (result.data.status== "success") {
    alert("logged up successfully!");
    // Save the token to local storage
  
    localStorage.setItem('user_id', result.data.user.id); 
    localStorage.setItem('name', result.data.user.name); 
    localStorage.setItem('token',result.data.authorisation.token);
  
    } else {
      alert("Make sure login information is correct");
    }
  })
  .catch((err) => {
    console.log(err);
  });

}