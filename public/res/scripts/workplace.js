import { signOutUser, monitorAuthState } from "../scripts/firebase/auth.js";

const projectModalCancel = document.getElementById("projectModalCancel")
projectModalCancel.addEventListener("click", )

const signOutButton = document.getElementById("sign-out-btn")

signOutButton.addEventListener("click", signOutUser)
monitorAuthState((user) => {
  if (user) {
    document.getElementById("user-name").textContent = user.displayName;
    document.getElementById("user-email").textContent = user.email;
    document.getElementById("profile-pic").src = user.photoURL
    document.getElementById("profile-pic-big").src = user.photoURL
  } else {
    firebase.auth().signOut()
    window.location.href = "index.html";
  }
})

// ==================== new code
document.getElementById('saveProjectBtn').addEventListener('click', async function () {
  // Validate form
  const form = document.getElementById('projectForm');

  //==================EXPERIMENTAL (replacement for nexxt code block below)

  monitorAuthState((user) => {
    if (user) {
      if (form.checkValidity()) {
        // Gather form data
        const projectName = document.getElementById('projectName').value;
        const description = document.getElementById('description').value;
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;

        // Reference to the user's document
        const userRef = doc(db, "users", auth.currentUser.uid);

        console.log(auth.currentUser.uid);
        // Reference to the 'Projects' subcollection
        const projectsRef = collection(userRef, "Projects");// maybe use setDoc()
        // Data for a new project
        const newProject = {
          projectName,
          description,
          startDate,
          endDate,
          // Additional project fields
        };
        setDoc(doc(projectsRef), newProject, { merge: true });

        // Output form data to console (replace this with your desired functionality)
        console.log('Project Name:', projectName);
        console.log('Description:', description);
        console.log('Start Date:', startDate);
        console.log('End Date:', endDate);

        // Close modal
        const projectModal = new bootstrap.Modal(document.getElementById('projectModal'));
        projectModal.hide();

        // Reset form
        form.reset();
      } else {
        form.reportValidity();
      }
    } else {
      console.log("error")
    }
  })

  //==================
/*
  if (form.checkValidity()) {
    // Gather form data
    const projectName = document.getElementById('projectName').value;
    const description = document.getElementById('description').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    // Reference to the user's document
    const userRef = doc(db, "users", auth.currentUser.uid);

    console.log(auth.currentUser.uid);
    // Reference to the 'Projects' subcollection
    const projectsRef = collection(userRef, "Projects");// maybe use setDoc()
    // Data for a new project
    const newProject = {
      projectName,
      description,
      startDate,
      endDate,
      // Additional project fields
    };
    await setDoc(doc(projectsRef), newProject, { merge: true });

    // Output form data to console (replace this with your desired functionality)
    console.log('Project Name:', projectName);
    console.log('Description:', description);
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);

    // Close modal
    const projectModal = new bootstrap.Modal(document.getElementById('projectModal'));
    projectModal.hide();

    // Reset form
    form.reset();
  } else {
    form.reportValidity();
  }*/
});


import { auth, db } from "./firebase/firebase-config.js";
import { doc, collection, setDoc } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

// Data for a new project


// Add a new project document with an auto-generated ID
