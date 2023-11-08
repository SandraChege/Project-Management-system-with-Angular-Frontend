"use strict";
window.addEventListener('DOMContentLoaded', () => {
    const userEmail = localStorage.getItem('user_email');
    if (userEmail) {
        console.log(userEmail);
    }
    else {
        console.log('userEmail not found');
    }
    const projectDetails = [];
    fetch('http://localhost:4600/project/')
        .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
        .then((data) => {
        projectDetails.push(...data);
        const user_project = projectDetails.filter(project => project.AssignedUserEmail === userEmail);
        console.log(user_project);
        const projectBriefs = document.querySelector('.projectItem');
        user_project.forEach(project => {
            const projectName = document.createElement('h2');
            projectName.classList.add('projectName');
            projectName.textContent = project.projectName;
            const projectDescription = document.createElement('li');
            projectDescription.classList.add('projectDetails');
            projectDescription.innerHTML = `
                  <span class="label label-description">Project Description:</span>
                  <span class="value value-description">${project.projectDescription}`;
            const projectAssignee = document.createElement('li');
            projectAssignee.classList.add('projectDetails');
            projectAssignee.innerHTML = `
                  <span class="label label-assignee">Assigned User:</span>
                  <span class="value value-assignee">${project.AssignedUserName}`;
            let dates = new Date(project.endDate);
            const formattedEndDate = dates.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: '2-digit'
            });
            const projectEndDate = document.createElement('li');
            projectEndDate.classList.add('projectDetails');
            projectEndDate.innerHTML = `
                <span class="label label-enddate">End Date:</span>
                 <span class="value value-enddate">${formattedEndDate}`;
            const projectAssigneeEmail = document.createElement('li');
            projectAssigneeEmail.classList.add('projectDetails');
            projectAssigneeEmail.innerHTML = `
                  <span class="label label-email">Assigned User Email:</span>
                  <span class="value value-email">${project.AssignedUserEmail}`;
            projectBriefs.appendChild(projectName);
            projectBriefs.appendChild(projectDescription);
            projectBriefs.appendChild(projectEndDate);
            projectBriefs.appendChild(projectAssignee);
            projectBriefs.appendChild(projectAssigneeEmail);
            const initialStatus = project.projectStatus;
            console.log('Project Status: ', project.projectStatus);
            const user = document.getElementById('user');
            user.textContent = project.AssignedUserName;
            const statusDiv = document.querySelector('.status');
            const statusOptions = ['pending', 'started', 'Halfway', 'completed'];
            const NoProject = document.querySelector('.noProjects');
            statusOptions.forEach((status) => {
                const radioBtn = document.createElement('input');
                radioBtn.type = 'radio';
                radioBtn.name = 'status';
                radioBtn.value = status;
                const label = document.createElement('label');
                label.textContent = status;
                statusDiv.appendChild(radioBtn);
                statusDiv.appendChild(label);
                statusDiv.appendChild(document.createElement('br'));
                radioBtn.addEventListener('click', () => {
                    var _a, _b;
                    const selectedStatus = radioBtn.value;
                    updateStatusOnServer(selectedStatus, userEmail);
                    if (selectedStatus === 'Completed') {
                        const projectElement = projectBriefs;
                        (_a = projectElement.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(projectElement);
                        (_b = statusDiv.parentNode) === null || _b === void 0 ? void 0 : _b.removeChild(statusDiv);
                        const noProjectStatus = document.createElement('div');
                        noProjectStatus.textContent = 'You currently dont have any projects';
                        noProjectStatus.classList.add('noProject');
                        NoProject.style.display = 'block';
                        NoProject.appendChild(noProjectStatus);
                        // document.body.appendChild(noProjectStatus);
                    }
                });
                if (status === initialStatus) {
                    radioBtn.checked = true;
                }
            });
        });
        function updateStatusOnServer(newStatus, userEmail) {
            fetch('http://localhost:4600/project/projectStatus', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    AssignedUserEmail: userEmail,
                    NewStatus: newStatus,
                }),
            })
                .then((response) => {
                if (response.ok) {
                    console.log('Project status updated successfully.');
                }
                else {
                    console.error('Failed to update project status.');
                }
            })
                .catch((error) => {
                console.error('Error updating project status:', error);
            });
        }
    })
        .catch((error) => {
        console.error('Error fetching projects:', error);
    });
});
