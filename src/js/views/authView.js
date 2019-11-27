import { DOM } from '../base';

const signInHtml = `
    <div class="auth__form--group">
        <input type="email" class="auth__form--input" id="email" placeholder="email address" autocomplete="off">
        <label for="email" class="auth__form--label">email address</label>
    </div>
    <div class="auth__form--group">
        <input type="password" class="auth__form--input" id="password" placeholder="password">
        <label for="password" class="auth__form--label">password</label>
    </div>
    <a href="#" class="auth__form--btn">
        sign in
        <!-- <div class="loader"></div> -->
    </a>
`;

const signUpHtml = `
    <div class="auth__form--group">
        <input type="email" class="auth__form--input" id="email" placeholder="email address" autocomplete="off">
        <label for="email" class="auth__form--label">email address</label>
    </div>
    <div class="auth__form--group">
        <input type="text" class="auth__form--input" id="display-name" placeholder="display name" autocomplete="off">
        <label for="display-name" class="auth__form--label">display name</label>
    </div>
    <div class="auth__form--group">
        <input type="password" class="auth__form--input" id="password" placeholder="password">
        <label for="password" class="auth__form--label">password</label>
    </div>
    <a href="#" class="auth__form--btn">
        sign up
    </a>
`;

export const initializeAuth = ()=>{
    document.querySelector(DOM["auth-content"]).innerHTML = signInHtml;
    document.querySelector(DOM["auth-label"]).innerHTML = `
        <span class="auth__form--description">Don't have an account?</span>&nbsp;
        Create one
    `;
}

export const toggleAuthModes = ()=> {
    document.querySelector(DOM["auth-label"]).addEventListener('click', ()=>{
        if(!document.getElementById(DOM["auth-switch"]).checked){
            document.querySelector(DOM["auth-content"]).innerHTML = signUpHtml;
            document.querySelector(DOM["auth-label"]).innerHTML = `
                <span class="auth__form--description">Have an account?</span>&nbsp;
                Sign in
            `;
        }else{
           initializeAuth(); 
        }
    });
}

export const showAuthPopup = ()=>{
    document.querySelector(DOM.auth).style.opacity = '1';
    document.querySelector(DOM.auth).style.visibility = 'visible';
    document.querySelector(DOM["auth-popup"]).style.transform = 'scale(1) translate(-50%, -50%)';
}

export const closeAuthPopup = ()=>{
    document.querySelector(DOM.auth).style.opacity = '0';
    document.querySelector(DOM.auth).style.visibility = 'hidden';
    document.querySelector(DOM["auth-popup"]).style.transform = 'scale(.8) translate(-50%, -50%)';
}

export const retrieveUserData = ()=>{
    let emailValue = document.getElementById('email').value;
    let passwordValue = document.getElementById('password').value;
    let displayNameValue = (document.getElementById('display-name') === null) ? '' : document.getElementById('display-name').value;

    if(!document.getElementById(DOM["auth-switch"]).checked){
        return {
            email: emailValue,
            password: passwordValue
        };
    }else{
        return {
            email: emailValue,
            password: passwordValue,
            display: displayNameValue
        };
    }
}

export const authLoading = ()=>{
    document.querySelector(DOM["auth-btn"]).innerHTML = `<div class="loader"></div>`;
}

export const authDone = ()=>{
    document.querySelector(DOM["auth-btn"]).innerHTML = `<p>sign up</p>`;
}

export const showError = (err)=>{
    console.log(err);
    let labels = Array.from(document.querySelectorAll('label'));
    if(err === 'auth/invalid-email'){
        for (const label of labels) {
            if(label.htmlFor === 'email'){
                document.getElementById('email').style.border = '.1rem solid red';
                document.getElementById('email').focus();
                label.style.color = 'red'
                label.textContent = 'Invalid email';
            }
        }
    }else if(err === 'auth/weak-password'){
        for (const label of labels) {
            if(label.htmlFor === 'password'){
                document.getElementById('password').style.border = '.1rem solid red';
                document.getElementById('password').focus();
                label.style.color = 'red'
                label.textContent = 'Password not up to 6 characters';
            }
        }
    }else if(err === 'auth/user-not-found'){
        for (const label of labels) {
            if(label.htmlFor === 'email'){
                document.getElementById('email').style.border = '.1rem solid red';
                document.getElementById('email').focus();
                label.style.color = 'red'
                label.textContent = 'User not found';
            }
        }
    }else if(err = 'auth/wrong-password'){
        for (const label of labels) {
            if(label.htmlFor === 'password'){
                document.getElementById('password').style.border = '.1rem solid red';
                document.getElementById('password').focus();
                label.style.color = 'red'
                label.textContent = 'Incorrect password';
            }
        }
    }

}

export const showCurrentUser = ()=>{
    document.querySelector(DOM["current-user"]).textContent = (localStorage.getItem('username') !== null) ? `Hello, ${localStorage.getItem('username')} 👋` : `Hello, Guest 🙂`;
}