function renderDesktopNavigationHtml() {
    return `
        <a href="join.html" class="logo-wrapper myLink" data-pathname="/join.html">
        <img class="logo" src="src/icons/join_logo.png" alt="">
        </a>
        
        <div class="menu-wrapper">
        <a href="join.html" class="menu-item myLink" data-pathname="/join.html">Board</a>
        <a href="backlog.html" class="menu-item myLink" data-pathname="/backlog.html">Backlog</a>
        <a href="task.html" class="menu-item myLink" data-pathname="/task.html">Add Task</a>
        <a href="help.html" class="menu-item myLink" data-pathname="/help.html">Help</a>
        <a href="index.html" class="menu-item myLink" data-pathname="/index.html">Logout</a>

        </div>
        
        <!-- 
        <div class="horizontal-line"></div>
        
        <div class="menu-wrapper">
        <a href="imprint.html" class="menu-item myLink" data-pathname="/imprint.html">Imprint</a>
        <a href="privacy.html" class="menu-item myLink" data-pathname="/privacy.html">Privacy</a>
        </div>
        
        <div class="horizontal-line"></div>
        
        <div class="menu-wrapper">
        <a class="menu-item" href="login.html">Logout</a>
        </div>
        -->
        
        <img class="profile-img" src="src/img/user-1.jpg" alt="">
    `;
}

function renderMobileNavigationHtml() {
    return `
        <div class="nav-header">
        <img src="src/img/user-1.jpg" class="profile-img" alt="">
        <a href="join.html"><img src="src/icons/logo.png" class="logo" alt=""></a>
        <div id="menu-btn" class="menu-btn" onclick="toggleMobileNavigation()">
            <div class="menu-line"></div>
        </div>
        </div>
        <!-- <div id="nav-body-wrapper" class="nav-body-wrapper"> -->
        <div id="nav-body" class="nav-body">
            <a href="join.html">Board</a>
            <a href="backlog.html">Backlog</a>
            <a href="task.html">Add Task</a>
            <a href="help.html">Help</a>
            <a href="login.html">Logout</a>

            <!--
            <a href="imprint.html">Imprint</a>
            <a href="privacy.html">Privacy</a>
            <a href="login.html">Logout</a>
            -->
        </div>
        <!-- </div> -->
     `;
}

function renderBacklogTasksHtml(id, title, dueDate, category, categoryColor, urgency, description, editors) {
return `
    <div class="category-color" style="background-color: ${categoryColor}">
    <div class="task-wrapper">
        <div class="assigned-wrapper">
        <div>ASSIGNED TO</div>
        <div id="backlog-image-wrapper-${id}" class="image-wrapper">
        </div>
        </div>
        <div class="title-wrapper">
        <div>TITLE</div>
        <div id="backlog-title-${id}">${title}</div>
        </div>
        <div class="category-wrapper">
        <div>CATEGORY</div>
        <div id="backlog-category-${id}">${category}</div>
        </div>
        <div class="date-wrapper">
        <div>DUE DATE</div>
        <div id="backlog-date-${id}">${dueDate}</div>
        </div>
        <div class="urgency-wrapper">
        <div>URGENCY</div>
        <div id="backlog-urgency-${id}">${urgency}</div>
        </div>
        <div class="description-wrapper">
        <div>DESCRIPTION</div>
        <div id="backlog-description-${id}" class="description">${description}</div>
        </div>
        <div class="button-wrapper">
        <div class="tooltip">
            <img onclick="moveTaskToBoard(this.id)" id="move-board-${id}" src="src/icons/move.svg" alt="">
            <span class="tooltiptext">Move To Board</span>
        </div>
        <div class="tooltip">
            <img onclick="editTask(this.id)" id="edit-${id}" src="src/icons/edit.svg" alt="">
            <span class="tooltiptext">Edit</span>
        </div>
        <div class="tooltip">
            <img onclick="deleteTask(this.id)" id="delete-${id}" src="src/icons/delete.svg" alt="">
            <span class="tooltiptext">Delete</span>
        </div>
        </div>
    </div>
    </div>
`;
}

function renderLoadFormHtml() {
    return `
        <div id="msg-success" class="msg-success d-none">Task was created successfully</div>
                
                <div class="item title-wrapper">
                <div>TITLE</div>
                <input id="title" required type="text">
                </div>
        
                <div class="item date-wrapper">
                <div>DUE DATE</div>
                <input id="datePicker" required type="date">
                </div>
                    
                <div class="item category-wrapper">
                <label for="category">CATEGORY</label>
                <select name="category" id="category" required>
                    <option value="Management">Management</option>
                    <option value="Software-Development">Software Development</option>
                    <option value="Design">Design</option>
                    <option value="Human-Resources">Human Resources</option>
                </select>
                </div>
    
                <div class="item urgency-wrapper">
                <label for="urgency">URGENCY</label>
                <select name="urgency" id="urgency" required>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                </div>
                    
                <div class="item description-wrapper">
                <label for="description">DESCRIPTION</label>
                <textarea required id="description" rows="3"></textarea>
                </div>
        
                <div class="item assigned-wrapper">
                <div>ASSIGNED TO</div>
                <div id="task-image-wrapper" class="image-wrapper">
                    <img onclick="selectTaskEditors(this.id)" id="user-1" src="src/img/user-1.jpg" alt="">
                    <img onclick="selectTaskEditors(this.id)" id="user-2" src="src/img/user-2.jpg" alt="">
                    <img onclick="selectTaskEditors(this.id)" id="user-3" src="src/img/user-3.jpg" alt="">
                    <img onclick="selectTaskEditors(this.id)" id="user-4" src="src/img/user-4.jpg" alt="">
                    <img onclick="selectTaskEditors(this.id)" id="user-5" src="src/img/user-5.jpg" alt="">
                </div>
                </div>
    
                <div id="button-wrapper" class="item button-wrapper">
                </div>
    `;
}

function generateTasksHtml(getTasks, i, urgencyColor) {
    return /*html*/ `
          <div id="${getTasks[i]['id']}" class="board-task" style="background-color: ${getTasks[i]['categoryColor']}" draggable="true" ondragstart="setCurrentDraggedElement(${getTasks[i]['id']})">
            <div class="board-task-inner">
              <div class="board-task-title">${getTasks[i].title}</div>
              <div class="board-task-description">${getTasks[i].description}</div>
              <div class="board-toolbar">
                <div class="board-urgency" style="color: ${urgencyColor}">${getTasks[i].urgency}</div>
                <div class="board-due-date">${getTasks[i].dueDate}</div>
                <img src="src/icons/delete.svg" onclick="deleteBoardTask(${getTasks[i]['id']})">
            </div>
          <div>`;
  }

  function renderFormButtons(){
    let buttons;
    let path = window.location.pathname.split("/").pop();
    if(path == 'task.html') {
      buttons = `
      <button type="button" onclick="resetForm()">CANCEL</button>
      <button type="submit">CREATE TASK</button>
      `
    }
    if(path == 'backlog.html') {
      buttons = `
      <button type="button" onclick="cancelEdits()">CANCEL</button>
      <button type="submit">UPDATE TASK</button>
      `
    }
    document.getElementById('button-wrapper').innerHTML = buttons;
  }