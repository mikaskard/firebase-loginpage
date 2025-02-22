import {firebaseConfig} from './config.js';
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();
const signupForm = document.querySelector('.registration.form');
const loginForm = document.querySelector('.login.form');
const forgotForm=document.querySelector('.forgot.form');
const container=document.querySelector('.container');
const signupBtn = document.querySelector('.signupbtn');
const anchors = document.querySelectorAll('a');
anchors.forEach(anchor => {
  anchor.addEventListener('click', () => {
    const id = anchor.id;
    switch(id){
    case 'loginLabel':
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
        forgotForm.style.display = 'none';
        break;
      case 'signupLabel':
        signupForm.style.display = 'block';
        loginForm.style.display = 'none';
        forgotForm.style.display = 'none';
        break;
      case 'forgotLabel':
        signupForm.style.display = 'none';
        loginForm.style.display = 'none';
        forgotForm.style.display = 'block';
        break;
    }
  });
});

function showNotification(message, type = 'success') {
    const notificationContainer = document.querySelector('.notification-container') || createNotificationContainer();
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notificationContainer.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notificationContainer.removeChild(notification);
        }, 300);
    }, 3000);
}

function createNotificationContainer() {
    const container = document.createElement('div');
    container.className = 'notification-container';
    document.body.appendChild(container);
    return container;
}

signupBtn.addEventListener('click', () => {
  const name = document.querySelector('#name').value;
  const username = document.querySelector('#username').value;
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value;
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const uid = user.uid;
        user.sendEmailVerification()
        .then(() => {
          showNotification('Verification email sent. Please check your inbox and verify your email before signing in.', 'success');
        })
        .catch((error) => {
          showNotification('Error sending verification email: ' + error.message, 'error');
        });
        console.log('User data saved to Firestore');
        firestore.collection('users').doc(uid).set({
          name: name,
          username: username,
          email: email,
      })
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
        forgotForm.style.display = 'none';
    })
    .catch((error) => {
      showNotification(error.message, 'error');
    });
});
const loginBtn = document.querySelector('.loginbtn');
loginBtn.addEventListener('click', () => {
  const email = document.querySelector('#inUsr').value.trim();
  const password = document.querySelector('#inPass').value;
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      if (user.emailVerified) {
        showNotification('User is signed in with a verified email.', 'success');
        location.href = "signout.html";
      } else {
        showNotification('Please verify your email before signing in.', 'error');
      }
    })
    .catch((error) => {
      showNotification("You Entered a wrong password Or Email Adress.", 'error');
    });
});
const forgotBtn=document.querySelector('.forgotbtn');
forgotBtn.addEventListener('click', () => {
  const emailForReset = document.querySelector('#forgotinp').value.trim();
 if (emailForReset.length>0) {
   auth.sendPasswordResetEmail(emailForReset)
 .then(() => {
   showNotification('Password reset email sent. Please check your inbox to reset your password.', 'success');
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
        forgotForm.style.display = 'none';
    })
    .catch((error) => {
    showNotification('Error sending password reset email: ' + error.message, 'error');
  });
  }
});

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login.form');
    const signupForm = document.querySelector('.registration.form');
    const forgotForm = document.querySelector('.forgot.form');

    const signupLink = document.querySelectorAll('.link[href="#signup"]');
    const loginLink = document.querySelectorAll('.link[href="#login"]');
    const forgotLink = document.querySelector('.forgot-password');

    signupLink.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            loginForm.style.display = 'none';
            forgotForm.style.display = 'none';
            signupForm.style.display = 'block';
        });
    });

    loginLink.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            signupForm.style.display = 'none';
            forgotForm.style.display = 'none';
            loginForm.style.display = 'block';
        });
    });

    forgotLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.style.display = 'none';
        signupForm.style.display = 'none';
        forgotForm.style.display = 'block';
    });

    // Initially show the login form and hide others
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
    forgotForm.style.display = 'none';
});
