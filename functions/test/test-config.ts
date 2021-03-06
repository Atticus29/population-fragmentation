import * as TestFunctions from 'firebase-functions-test';
// import * as firebase from 'firebase';

const firebaseConfig = {
  databaseURL: "https://dragglesimulator.firebaseio.com",
  projectId: "dragglesimulator",
  storageBucket: "dragglesimulator.appspot.com",

}

 // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

const envConfig = { stripe: { secret: 'sk_test_6YWZDNhzfMq3UWZwdvcaOwSa' }};

const fun = TestFunctions(firebaseConfig, 'service-account.json')

fun.mockConfig(envConfig);

export { fun };
