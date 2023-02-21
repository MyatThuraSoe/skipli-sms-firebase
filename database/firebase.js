var admin = require("firebase-admin");

const firebaseConfig = {
  type: "service_account",
  project_id: "skipli-twilioi-firebase",
  private_key_id: "ba0602f26fa15dfc29edf04ff1a2daba484793ad",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCuDrmIn5zh187f\n0z/e1jIsEMEpNtPc0GJd1b+GYSG7pghr4b7w/wNsgk5PhjZU4wclCfGOZm0XZwcg\nb2fQ1Taz6QtUuxf5iAmuYmVy+86ooTzcZLiFyHI+AUQn9JhdXjG81C8LTfO19InZ\n6DCT3U5QdLS+kXTNEebZQOm1TyDoBmF9SiT5w5hB3od29isrGq0w+zmslELfKlJY\nK5cD/ZAH6G4+Lyz9z5fuZjzRAsdgPR8LdKhzLVYMqIyXxWg66ms9WjaimY11PN9R\nkvCkH0DhdFYf0fc5Ewwm2L0Ye6qMcZieOTMvkV+s8GOao2xS4eKki8DiqNte577w\nkspfUzgjAgMBAAECggEAK4wCjjSEzxorp2MWZT2Iwu6ULSgK/IFkQt7B8rBlfKmv\nDLKnj2r149V8GzhUaot8U593wG1O2N6NcWd9/UkCzSM+kv3WIzeOWINEp25ph1YD\nwI4wfkQmlO3DLA3tetqgrgIWHQltMnZScOK/GJdzSvzP5afFpbLXYz5y2kpITNQ1\n8iJCKJvjdLZd+XH/cetwB91WB1D3Ajul3n5y/FDbkYmAnJoBLjqm95ZcCdsN2wzz\n7/sQImG71rq0DSuV4/Ql0sBXquDDsd2+ps64aCzP2ujPP4X/q33vQvW9GR13ORM5\n3z5mIJQ474eD3esEn9Ni0ypzR/8CMy2qcskJgbxleQKBgQDjJP8mH7fD0n+VrJQ2\n/qC6yIOWTHQIeqNrDiduQkGbR86N9UxIc/6GtMRGp/wCllMa3ziahbihwiEsPTfd\nYvRotO6lNUsiwYyZ2m1HRdvwexfoHjfAjrlh5ZSxii9iUI3Qd0D7Uplnjafo2aJ9\nZ5oyG6yDg6xU6KD2nugNRrSFGQKBgQDEK0b4d9LTTy/wOXBfy8lNG4sx+6ngNVl9\nwA/Ujx53+OSAHUDzCgywy4Ip3hEJ7/1YcgprKXeC3FS7H1SPutmK/CxMG/aTkS9A\nl+PHYNHwbDigXm8YUFDU91h7VQ01M3GiqGnaL1p60r+f5gQqHlesz2RdlOjVhhY7\nS2gE9X3ymwKBgQDcsOaCaRDH3y59AweigzUxJX7MOg4G6vj6G+9trkxGDbd/r9Rl\nFOY4hUuqhq5Q6TNniXhakg/4gkBu1jAAFpP3Y8v2klglNb5hAZtpQ1PVTBPHQAzV\nNxahKkmVUfiF4lRXNnbZeMB5n2WD1GiOxWlIxCCSSw3WFYvG8k/uDkN4iQKBgGX0\n0Egnju3AxHuoft1rP07SOABceqhLUh3nitLBJ+bW93wWuEEZQgtJWneEMXrmvtgP\nPZcA0Fq1RVyUJhEl3hc8hZFxHzEHTnXV+88OZU7+EFhZfIg4hiqJ+/Tt+ZVjDXaq\n7Yk2/2HC01G57QQvDQaGK/XvhSwlKrzark+VgEZtAoGBAJecY8LILxZfeGECq1d2\np8ozbpyY29c3Zs2H4/fABOWOJ0aPbusNuHU0JpWfIuXfIdM4MXTzO8Zu+VB91udk\nKPOG4a1jmC3BSeDTY1WfyPPCpyRBcTpT08lRmSKBGPDbTC6aV+Kt04N4xaykoh0x\nUbM08VYTSnUDxyvS0Rv6ra9y\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-of5qw@skipli-twilioi-firebase.iam.gserviceaccount.com",
  client_id: "109327475605046927794",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-of5qw%40skipli-twilioi-firebase.iam.gserviceaccount.com",
};

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
  databaseURL:
    "https://skipli-twilioi-firebase-default-rtdb.asia-southeast1.firebasedatabase.app",
});

const db = admin.firestore();

module.exports = db;
