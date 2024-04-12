const signIn = document.querySelector("button")

const emailInput = document.querySelector("#email")
const passwordInput = document.querySelector("#password")

signIn.addEventListener("click", async (e)=> {
    e.preventDefault()
    let email = emailInput.value
    let password = passwordInput.value

    if (!email && !password) return alert("Input fields Empty")
    if (!email) return alert("Email field empty")
    if (!password) return alert("Password field empty")
    if (!validateEmail(email)) return alert("Enter a valid email")
    
    try {
        const response = await fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        if (!response.ok) {
            throw new Error('Login failed');
        }
        const data = await response.json();
        // console.log(data);
        alert("you are logged In Successfully")
        window.location.replace('/public/index.html')
    } catch (error) {
        console.error('Error:', error);
        alert("Unable to login")
    }
    
})

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}