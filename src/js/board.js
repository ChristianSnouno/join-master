function showTasks() {
    renderTasks('todo');
    renderTasks('inprogress');
    renderTasks('testing');
    renderTasks('done');
  }
  
  function renderTasks(selectedStatus) {
    let content = document.getElementById(`${selectedStatus}`);
    content.innerHTML = '';
    let getTasks = allTasks.filter(function (currentTask) {
      return currentTask.status == `${selectedStatus}`;
    });
    for (let i = 0; i < getTasks.length; i++) {
      if (getTasks[i].backlog === 'false') {
        let urgencyColor = setUrgencyColor(getTasks[i]);
        content.innerHTML += generateTasksHtml(getTasks, i, urgencyColor);
      }    
    };  
  }
  
  
  function setCurrentDraggedElement(id) {
    currentDraggedElement = id;
  }
  
  async function moveTo(status) {
    selectDraggedElement(status);
    hoverHighlight(status, false);
    await save();
    showTasks();
  }
  
  function selectDraggedElement(status) {
    allTasks.forEach(element => {
      if (element.id == currentDraggedElement) {
        element.status = status;
      }
    });
  }
  
  function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function hoverHighlight(status, toSet) {
    if (toSet) {
      document.getElementById(`${status}`).classList.add('highlight');
    } else {
      document.getElementById(`${status}`).classList.remove('highlight');
    }
  }
  
  function setUrgencyColor(currentTask) {
    let urgency = currentTask['urgency'];
    if (urgency == "High") {
      return 'red';
    } else if (urgency == "Medium") {
      return 'blue';
    } else {
      return 'DarkSeaGreen';
    }
  }

  async function deleteBoardTask(id) {
    for (let i = 0; i < allTasks.length; i++) {
      if (allTasks[i].id == id) {
        allTasks.splice(i, 1);
      }
    }
    await save();
    showTasks();
  }