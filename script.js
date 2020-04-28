var firebaseConfig = {
  /*YOUR CONFIG HERE*/
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
  let repoAnchor = document.createElement("a");
  let emailAnchor = document.createElement("a");
  let mobileAnchor = document.createElement("a");
  emailAnchor.setAttribute("href", `mailto:${userObj.email}`);
  mobileAnchor.setAttribute("href", `tel:${userObj.phone}`);
  const exp = /^https:\/\//;
  if (!exp.test(userObj.url)) {
    repoAnchor.setAttribute("href", `https://${userObj.url}`);
    repoAnchor.setAttribute("target", "_blank");
  } else {
    repoAnchor.setAttribute("href", userObj.url);
    repoAnchor.setAttribute("target", "_blank");
    userObj.url = userObj.url.replace(exp, "");
  }
  repoAnchor.innerText = userObj.url;
  emailAnchor.innerText = userObj.email;
  mobileAnchor.innerText = userObj.phone;
  cell1.innerHTML = len;
  cell2.innerHTML = userObj.name;
  cell3.innerHTML = userObj.college;
  cell4.appendChild(emailAnchor);
  cell5.appendChild(repoAnchor);
  cell6.innerHTML = userObj.slack;
  cell7.appendChild(mobileAnchor);
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
