# firebase-loginpage
Plug and play Login/signup form using Firebase. 

# Preview 

![login_page](https://github.com/user-attachments/assets/04ca5f76-1358-4e40-9920-119baeb75512)
![signup_page](https://github.com/user-attachments/assets/68151858-7d10-4489-82d6-f16b5e7844d8)
![forgotpass_page](https://github.com/user-attachments/assets/540da903-000d-4221-8747-e93f882b2c41)


# Important Information

User needs to verify his email address before accesing through sign in page. 
Inbuild Custom Notification System with each error code text.
You can change the redirection of the user after succesfully login in file `page0.js` in line 99 

# Config File
Make sure to replace your own firebase info in config.js in order to work!
// Config.js
```
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID" 
};
```

