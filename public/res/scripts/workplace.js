import { signOutUser, monitorAuthState } from "../scripts/firebase/auth.js";

// const projectModalCancel = document.getElementById("projectModalCancel")
//projectModalCancel.addEventListener("click", )

const signOutButton = document.getElementById("sign-out-btn")

signOutButton.addEventListener("click", signOutUser)

monitorAuthState((user) => {
  if (user) {
    document.getElementById("user-name").textContent = user.displayName;
    document.getElementById("user-email").textContent = user.email;
    document.getElementById("profile-pic").src = user.photoURL
    document.getElementById("profile-pic-big").src = user.photoURL
    console.log(user.displayName)
  } else {
    // firebase.auth().signOut()
    console.log("signed out. monAuthState")
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
        const projectsRef = collection(userRef, "Projects");
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
        // projectModal.hide();

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


function renderProjectCard(project) {
  const { projectId, projectName, description, startDate, endDate } = project;
  return `<div class="card mx-1 my-1">
          <div class="card-body project-card-content">
            <div class="card-title">
              <div class="project-content" id="${projectId}">
                <h6 class="project-title">${projectName}</h6>
                <p class="project-description">${description}</p>
                <p class="card-text"><small class="text-muted">Start: ${startDate}</small></p>
                <p class="card-text"><small class="text-muted">End: ${endDate}</small></p>
              </div>
              
              <div class="card-button-container">
                <button type="button" class="card-btn btn-delete">
                  <img src="res/images/delete.png">
                </button>
                
                <button type="button" class="card-btn btn-info">
                  <img src="res/images/info.png">
                </button>
              </div>
            </div>
            
            <div class="d-flex align-items-end justify-content-end bg-green">
              <a class="card-play">
                <img src="res/images/play.png">
              </a>
            </div>
          </div>
        </div>`;
}


monitorAuthState(async (user) => {
  if (user) {
    const projectsContainer = document.getElementById('projectsContainer');
    const projectsRef = collection(db, "users", user.uid, "Projects");
    const querySnapshot = await getDocs(projectsRef);

    querySnapshot.forEach((doc) => {
      const projectId = doc.id;
      const projectData = doc.data();
      const formattedProject = {
        projectId: projectId,
        projectName: projectData.projectName,
        description: projectData.description,
        startDate: projectData.startDate,
        endDate: projectData.endDate
      };
      projectsContainer.innerHTML += renderProjectCard(formattedProject);
    });
    const deleteButtons = document.querySelectorAll(".btn-delete");

    deleteButtons.forEach(button => {
      button.addEventListener("click", function () {
        console.log("Delete button clicked!");
        // 
      });
    });
  } else {
    console.log("User is not signed in.");
  }
});



import { auth, db } from "./firebase/firebase-config.js";
import { doc, collection, setDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";