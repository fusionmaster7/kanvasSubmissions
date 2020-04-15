var firebaseConfig = {
  apiKey: "AIzaSyDxZrjUTyrIJqONYJZ71_i6wIr6UKtdD6A",
  authDomain: "kanvas-862ce.firebaseapp.com",
  databaseURL: "https://kanvas-862ce.firebaseio.com",
  projectId: "kanvas-862ce",
  storageBucket: "kanvas-862ce.appspot.com",
  messagingSenderId: "534176018661",
  appId: "1:534176018661:web:5b40267b2a0f00c6dee40c",
  measurementId: "G-J7BS9KG8YC",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const webRef = db.collection("webdev");
const graphicRef = db.collection("graphics");

//Getting number of entries
webRef.get().then((snap) => {
  document.getElementById(
    "web-entries"
  ).innerHTML = `Number of entries: ${snap.size}`;
});

graphicRef.get().then((snap) => {
  document.getElementById(
    "graphic-entries"
  ).innerHTML = `Number of entries: ${snap.size}`;
});

//Function to add row
const addRow = (tableId, userObj) => {
  let table = document.getElementById(tableId);
  const len = table.rows.length;
  let row = table.insertRow(len);
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);
  let cell3 = row.insertCell(2);
  let cell4 = row.insertCell(3);
  let cell5 = row.insertCell(4);
  let cell6 = row.insertCell(5);
  let cell7 = row.insertCell(6);
  let anchor = document.createElement("a");
  const exp = /^https:\/\//;
  if (!exp.test(userObj.url)) {
    anchor.setAttribute("href", `https://${userObj.url}`);
    anchor.setAttribute("target", "_blank");
  } else {
    anchor.setAttribute("href", userObj.url);
    anchor.setAttribute("target", "_blank");
    userObj.url = userObj.url.replace(exp, "");
  }
  anchor.innerText = userObj.url;
  cell1.innerHTML = len;
  cell2.innerHTML = userObj.name;
  cell3.innerHTML = userObj.college;
  cell4.innerHTML = userObj.email;
  cell5.appendChild(anchor);
  cell6.innerHTML = userObj.slack;
  cell7.innerHTML = userObj.phone;
};

const renderWebTable = async () => {
  try {
    webRef.get().then((querySnap) => {
      querySnap.forEach((doc) => {
        addRow("webdev", doc.data());
      });
    });
  } catch (error) {
    console.log(error);
  }
};
(async () => {
  await renderWebTable();
})();

const renderGraphicTable = async () => {
  try {
    graphicRef.get().then((querySnap) => {
      querySnap.forEach((doc) => {
        addRow("graphics", doc.data());
      });
    });
  } catch (error) {
    console.log(error);
  }
};
(async () => {
  await renderGraphicTable();
})();
