function renderBacklogTasks(id, title, dueDate, category, categoryColor, urgency, description, editors) {
  let backlogTask = renderBacklogTasksHtml(id, title, dueDate, category, categoryColor, urgency, description, editors);
  
  document.getElementById('task-container').innerHTML += backlogTask;
  renderBacklogEditors(id, editors);
}

function renderBacklogEditors(id, editors) {
  let imageWrapper = document.getElementById(`backlog-image-wrapper-${id}`);
  for (let i = 0; i < editors.length; i++) {
    imageWrapper.innerHTML += `<img id="${editors[i]}-${id}" src="src/img/${editors[i]}.jpg" alt="">`
  }
}

async function moveTaskToBoard(taskId) {
  for (let i = 0; i < allTasks.length; i++) {
    let index = allTasks[i].id.indexOf(taskId.substring(11));
    if (index !== -1) {
      allTasks[i].backlog = 'false';
      break;
    }
  }
  await backend.setItem('allTasks', JSON.stringify(allTasks));
  location.reload();
}

function editTask(editId) {
  window.scrollTo({top: 0});
  oldEditors = editors;
  currentEditTask = editId;
  document.getElementById('edit-task-wrapper').classList.remove('d-none');
  document.getElementById('edit-task-wrapper').style.backgroundColor = '#fff';
  loadForm('form-edit-task');
  
  for (let i = 0; i < allTasks.length; i++) {
    let index = allTasks[i].id.indexOf(editId.substring(5));
    if (index !== -1) {
      getEditTaskValue(i);
      for(let i=0; i<editors.length; i++) {
        document.getElementById(`${editors[i]}`).classList.add('editor-selected');
      }
      break;
    }
  }
}

function getEditTaskValue(i) {
  let id = allTasks[i].id;
  document.getElementById('title').value = document.getElementById(`backlog-title-${id}`).innerHTML;
  document.getElementById('datePicker').value = document.getElementById(`backlog-date-${id}`).innerHTML;
  document.getElementById('category').value = document.getElementById(`backlog-category-${id}`).innerHTML;
  document.getElementById('urgency').value = document.getElementById(`backlog-urgency-${id}`).innerHTML;
  document.getElementById('description').value = document.getElementById(`backlog-description-${id}`).innerHTML;
  editors = allTasks[i].editors;
}

function cancelEdits(){
  resetForm();
  document.getElementById('edit-task-wrapper').classList.add('d-none');
}

function setTaskUpdateValues(i) {
  allTasks[i].title = document.getElementById('title').value;
  allTasks[i].dueDate = document.getElementById('datePicker').value;
  allTasks[i].category = document.getElementById('category').value;
  allTasks[i].categoryColor = setCategoryColor(category.value);
  allTasks[i].urgency = document.getElementById('urgency').value;
  allTasks[i].description = document.getElementById('description').value;
  allTasks[i].editors = editors;
}

async function updateTask() {
  currentEditTask = currentEditTask.substring(5);
  for (let i = 0; i < allTasks.length; i++) {
    let index = allTasks[i].id.indexOf(currentEditTask.substring(5));
    if (index !== -1) {
      setTaskUpdateValues(i);
    }
  }
  await save();
  location.reload();
}

async function deleteTask(taskId) {
  for (let i = 0; i < allTasks.length; i++) {
    let index = allTasks[i].id.indexOf(taskId.substring(7));
    if (index !== -1) {
      allTasks.splice(i, 1);
      break;
    }
  }
  await backend.setItem('allTasks', JSON.stringify(allTasks));
  location.reload();
}