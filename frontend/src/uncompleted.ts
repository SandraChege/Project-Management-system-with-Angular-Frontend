window.addEventListener('DOMContentLoaded', () => {

    const projectItemsContainer = document.getElementById("projectItems") as HTMLElement;
    const projectInfo = document.getElementById('projectInfo') as HTMLDivElement;

    fetch('http://localhost:4600/project/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data: any[]) => {
            console.log(data);

            data.forEach((project: any) => {
                if (!project.isCompleted) {
                    const projectItem = document.createElement('div');
                    projectItem.classList.add('projectItem');

                    const projectNameSpan = document.createElement('h1');
                    projectNameSpan.textContent = project.projectName;
                    projectNameSpan.classList.add('namespan');

                    const projectID = document.createElement('li');
                    projectID.textContent = project.projectID;

                    const buttonContainer = document.createElement('div');
                    buttonContainer.classList.add('buttonContainer');

                    const viewTaskButton = document.createElement('button');
                    viewTaskButton.classList.add('viewTaskButton');
                    viewTaskButton.innerHTML = 'view';

                    projectItem.appendChild(projectNameSpan);
                    buttonContainer.appendChild(viewTaskButton);
                   
                    projectItem.appendChild(buttonContainer);

                    const truth = project.isCompleted;
                    console.log(`Answer: ${truth}`);

                    projectItemsContainer.appendChild(projectItem);

                   
                    function showProjectDetails() {
                        const backgroundOverlay = document.getElementById('backgroundOverlay') as HTMLDivElement;
                        backgroundOverlay.style.display = 'block';

                        projectInfo.innerHTML = '';
                        projectInfo.style.display = 'block';

                        const projectDetailsDiv = document.createElement('div');
                        projectDetailsDiv.classList.add('projectDetails');

                        const projectInfoButtons = document.createElement('div');
                        projectInfoButtons.classList.add('infoButtons');

                        const closeProjectInfo = document.createElement('button');
                        closeProjectInfo.classList.add('closeProjectInfo');
                        closeProjectInfo.textContent = 'Close';

                        const projectInfoDetails = document.createElement('ul');
                        projectInfoDetails.classList.add('details');

                        let dates = new Date(project.endDate)
                        const formattedEndDate = dates.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit'
                        });

                      
                        projectInfoDetails.innerHTML = `
                    
                        <li><strong>Project ID:</strong> ${project.projectID}</li>
                        <li><strong>Project Name:</strong> ${project.projectName}</li>
                        <li><strong>Description:</strong> ${project.projectDescription}</li>
                        <li><strong>End Date:</strong> ${formattedEndDate}</li>
                        <li><strong>Assigned User Email:</strong> ${project.AssignedUserEmail}</li>
                        <li><strong>Assigned User Name:</strong> ${project.AssignedUserName}</li>
                        <li><strong>Project Status:</strong> ${project.projectStatus}</li>
                        <li><strong>Is Completed:</strong> ${truth ? 'Yes' : 'No'}</li>
                    `;

                        projectDetailsDiv.appendChild(projectInfoDetails);

                        projectInfoButtons.appendChild(closeProjectInfo);

                        projectInfo.appendChild(projectDetailsDiv);
                        projectInfo.appendChild(projectInfoButtons);

                        closeProjectInfo.addEventListener('click', (e) => {
                            projectInfo.style.display = 'none';
                            backgroundOverlay.style.display = 'none';
                        });
                    }

                   
                    viewTaskButton.addEventListener('click', showProjectDetails);
                }
            });
        })
        .catch(error => {
            console.error('Error fetching projects:', error);
        });
});
