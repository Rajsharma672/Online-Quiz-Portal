// Future interactive scripts can go here
console.log("Landing page loaded");

//Register Form Submission
const registerForm = document.getElementById('registerForm');

if(registerForm){
  registerForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const dob = document.getElementById('dob').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    const response = await fetch('http://localhost:9090/auth/register',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({name, address, phone, dob, email, password, role})
    });
    if(response.ok){
      alert("Registered Successfully")
      window.location.href="../loginpage/login.html"
    }else{
      alert("Registration failed");
    }
  })
}

//login form submission
const loginForm = document.getElementById('loginForm');

if(loginForm){
  loginForm.addEventListener('submit',async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:9090/auth/login', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({email, password})
    });
    if(response.ok){
      const data = await response.json();
      alert('Login Successful!');

      //storing user info for sesson handling
      localStorage.setItem('user', JSON.stringify(data));

      //redirecting based on role
      if(data.role.toLowerCase() === 'admin'){
        window.location.href = '../admin/dashboard.html';
      }else{
        window.location.href = '../student/dashboard.html';
      }
    }else{
      alert("Invalid email or password");
    }
  });
}