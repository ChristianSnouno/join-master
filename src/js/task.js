async function addTask() {
  let title = document.getElementById('title')  
  let date = document.getElementById('datePicker')
  let category = document.getElementById('category')
  let urgency  = document.getElementById('urgency')
  let description = document.getElementById('description')
  let categoryColor = setCategoryColor(category.value);
  let currentTask = createTasksJson(title, date, category, urgency, description, categoryColor);
  
  await loadDataFromServer();
  await pushDataToServer(currentTask);
  resetForm();
  window.scrollTo({ top: 0, behavior: 'smooth' })
  showSuccessMessage();
}

function createTasksJson(title, date, category, urgency, description, categoryColor) {
  return {
    "id": `${new Date().getTime()}`,
    "title": title.value,
    "dueDate": date.value,
    "category": category.value,
    "categoryColor": categoryColor,
    "urgency": urgency.value,
    "description": description.value,
    "editors": editors,
    "backlog": 'true',
    "status": "todo"
  };
}

function showSuccessMessage() {
  let msgSuccess = document.getElementById('msg-success');
  
  if(msgSuccess.classList.contains('d-none')){
    msgSuccess.classList.remove('d-none');
  }
  msgSuccess.style.zIndex = '';
  msgSuccess.style.animation = 'none';
  msgSuccess.offsetHeight;
  msgSuccess.style.animation = null;
}

function resetForm() {
  document.getElementById('title').value = '';  
  document.getElementById('datePicker').value = ''; 
  document.getElementById("category").selectedIndex = -1;
  document.getElementById("urgency").selectedIndex = -1;
  document.getElementById('description').value = ''; 
  resetEditors();
}

function resetEditors() {
  editors = [];
  
  let element = document.getElementById('task-image-wrapper');
        let children = element.children;
        for(let i=0; i<children.length; i++){
            let child = children[i];
            if(child.classList.contains('editor-selected')){
              child.classList.remove('editor-selected');
            }
        }
}