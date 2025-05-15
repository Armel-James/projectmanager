import { signOutUser, monitorAuthState } from "../scripts/firebase/auth.js";

// Sign out func
const signOutButton = document.getElementById("sign-out-btn")
signOutButton.addEventListener("click", signOutUser)

// user sign in validator
monitorAuthState((user) => {
  if (user) {
    document.getElementById("user-name").textContent = user.displayName;
    document.getElementById("user-email").textContent = user.email;
    document.getElementById("profile-pic").src = user.photoURL
    document.getElementById("profile-pic-big").src = user.photoURL
    console.log(user.displayName)
  } else {
    console.log("signed out. monAuthState")// debug
    window.location.href = "index.html";// redirect if no valid user signed in
  }
})

// Project creator
document.getElementById('saveProjectBtn').addEventListener('click', async function () {
  const form = document.getElementById('projectForm');

  monitorAuthState(async (user) => {
    if (user) {
      if (form.checkValidity()) {
        const projectName = document.getElementById('projectName').value;
        const description = document.getElementById('description').value;
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;

        const userRef = doc(db, "users", auth.currentUser.uid);

        // console.log(auth.currentUser.uid);
        const projectsRef = collection(userRef, "Projects");
        const newProject = {
          projectName,
          description,
          startDate,
          endDate
        };


        const dref = setDoc(doc(projectsRef), newProject, { merge: true })
        .then(() => {
          // document.getElementById("projectsContainer").replaceChildren(ProjectDisplay(user));
          document.getElementById("projectsContainer").innerHTML = "";
          ProjectDisplay(user);
          // location.reload();
          // renderProjectCard(newProject);
        })
        .catch((error) => {
            console.error("Error writing document: ", error);// debug
          });

        console.log('Project Name:', projectName);// debug
        console.log('Description:', description);// debug
        console.log('Start Date:', startDate);//debug
        console.log('End Date:', endDate);//debug

        // Close modal
        const projectModal = new bootstrap.Modal(document.getElementById('projectModal'));

        // clean form
        form.reset();
      } else {
        form.reportValidity();
      }
    } else {
      console.log("error")
    }
  })
});

// TEMPLATE: Render project input data
function renderProjectCard(project) {
  const { projectId, projectName, description, startDate, endDate } = project;
  return `<div class="card mx-1 my-1" id=${projectId}>
          <div class="card-body project-card-content">
            <div class="card-title">
              <div class="project-content">
                <h6 class="project-title">${projectName}</h6>
                <p class="project-description">${description}</p>
                <p class="to-hide card-text"><small class="text-muted">Start: ${startDate}</small></p>
                <p class="to-hide card-text"><small class="text-muted">End: ${endDate}</small></p>
              </div>
              
              <div class="card-button-container">
                <button type="button" class="card-btn btn-delete" id="${projectId}">
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

// Project view
monitorAuthState(async (user) => {
  if (user) {
    ProjectDisplay(user);
  } else {
    console.log("User is not signed in.");// debug
  }
});

// Proj display func
async function ProjectDisplay(user) {

    // Proj view
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

    // Delete proj func
    const deleteButtons = document.querySelectorAll(".btn-delete");

    deleteButtons.forEach(button => {
      button.addEventListener("click", function () {
        const projectRef = doc(db, "users", user.uid, "Projects", button.id);
        
        console.log("Delete button clicked!");// debug

        deleteDoc(projectRef);

        console.log(`Project ${button.id} deleted successfully.`);// debug

        div.querySelector(`#${button.id}`).remove();
      });
    });

    // Open proj func
    const openProj = document.querySelectorAll(".card-play")
    openProj.forEach(a => {a.addEventListener("click", function () {
      window.location.href = "proj.html";
      console.log(window.location.pathname);
      console.log("working open proj func")
    })})
}

import { auth, db } from "./firebase/firebase-config.js";
import { doc, collection, setDoc, getDocs, deleteDoc } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";