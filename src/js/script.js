let currentTask = [];
let isMenuOpen = false;
let isUserDataShown = false;
let currentDraggedElement;
let allTasks = [];
let editors = [];
let oldEditors = [];
let currentEditTask;
let currentId;



/**
 * This function is used to 
 * 
 */
async function init(){
  setURL('https://christiansnouno.com/join/smallest_backend_ever');
  await downloadFromServer();
  await loadAllUsers();
  renderNavigation();
  setMenuActive();
}

async function initBoard(){
  init();
  await loadDataFromServer();
  showTasks();
}

async function initBacklog(){
  init();
  await loadTasks(); 
  //await loadDataFromServer();
}

async function initTask(){
  init();
  resetForm();
}

function renderNavigation() {
  renderDesktopNavigation();
  renderMobileNavigation();
}

/* START DESKTOP NAVIGATION */
function renderDesktopNavigation(){
  let desktopNav = renderDesktopNavigationHtml();
  document.getElementById('desktop-nav').innerHTML = desktopNav;
}
/* END DESKTOP NAVIGATION */

/* START MOBILE NAVIGATION */
function renderMobileNavigation(){
  let mobileNav = renderMobileNavigationHtml();
  document.getElementById('mobile-nav').innerHTML = mobileNav;
}
/* END MOBILE NAVIGATION */

function setMenuActive(){
  let links = document.getElementsByClassName("myLink");
  let URL = window.location.pathname;
  URL = URL.substring(URL.lastIndexOf('/'));
  for (let i = 0; i < links.length; i++) {
    if (links[i].dataset.pathname == URL) {
      links[i].classList.add("active");
    }
  }
}

function toggleMobileNavigation() {
  const menuBtn = document.getElementById('menu-btn');
  navBody = document.getElementById("nav-body");
  if(menuBtn){
      isMenuOpen = !isMenuOpen;
      if(isMenuOpen){
        menuBtn.classList.add('open');
        navBody.style.height = '160px';
      } else {
        menuBtn.classList.remove('open');
        navBody.style.height = '0';
      }
  }
}

function checkNavigation() {
  let mobileNav = document.getElementById('mobile-nav');
  let desktopNav = document.getElementById('desktop-nav');
  if (window.innerWidth <= 800 && mobileNav && desktopNav) {
    mobileNav.classList.remove('d-none');
    desktopNav.classList.add('d-none');
  }
  if(window.innerWidth > 800 && mobileNav && desktopNav) {
    mobileNav.classList.add('d-none');
    desktopNav.classList.remove('d-none');
  }
}

window.addEventListener('load', checkNavigation);
window.addEventListener('resize', checkNavigation);

async function loadTasks() {
  await loadDataFromServer();
  for (let i = 0; i < allTasks.length; i++) {
    let id = allTasks[i].id;
    let title = allTasks[i].title;
    let dueDate = allTasks[i].dueDate;
    let category = allTasks[i].category;
    let categoryColor = allTasks[i].categoryColor;
    let urgency = allTasks[i].urgency;
    let description = allTasks[i].description;
    let editors = allTasks[i].editors;
    
    if(allTasks[i].backlog == 'true') {
      renderBacklogTasks(id, title, dueDate, category, categoryColor, urgency, description, editors);
    }
  }
}

async function loadDataFromServer() {
  await downloadFromServer();
  let allTasksAsString = await backend.getItem(`allTasks`) || [];
  
  if(allTasksAsString.length != 0){
    allTasks = JSON.parse(allTasksAsString);
  }
}

async function pushDataToServer(currentTask){
  allTasks.push(currentTask);
  await backend.setItem('allTasks', JSON.stringify(allTasks));
}

function loadForm(formId) {
  document.getElementById(`${formId}`).innerHTML = renderLoadFormHtml();
  renderFormButtons();
}

function setCategoryColor(category) {
  if(category == 'Management'){
    return '#7190FC';
  }
  if(category == 'Software-Development'){
    return '#ffb071';
  }
  if(category == 'Design'){
    return '#e271ff';
  }
  if(category == 'Human-Resources'){
    return '#55ae66';
  }
  else {
    return '#000';
  }
}

function selectTaskEditors(id){
  let editor = document.getElementById(id);
  let index = editors.indexOf(id);

  if (index !== -1) {
    editors.splice(index, 1);
  }
  editor.classList.toggle('editor-selected');
  if(editor.classList.contains('editor-selected')){
    editors.push(id);
  }
}

async function save() {
  await backend.setItem('allTasks', JSON.stringify(allTasks));
}