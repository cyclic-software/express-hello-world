const drawer = document.getElementById('drawer-navigation');
const letSlidebar = document.getElementById('letSlidebar');
const slideRemove = document.getElementById('slideRemove');

letSlidebar.addEventListener('click',() =>{
    if(drawer.classList.contains('-translate-x-full')){
        drawer.classList.remove('-translate-x-full');
    }else{
        drawer.classList.add('-translate-x-full');
    }
});

slideRemove.addEventListener('click',()=>{
    drawer.classList.add('-translate-x-full');
});


const workspaceBtn = document.getElementById('workspaceBtn');
const workspaces = document.getElementById('workspaces');
const downArrow = document.getElementById('downArrow');

workspaceBtn.addEventListener('click', () => {
    if(workspaces.classList.contains('hidden')){
        workspaces.classList.remove('hidden');
        downArrow.classList.add('rotate-180');
    }else{
        workspaces.classList.add('hidden');
        downArrow.classList.remove('rotate-180');
    }
})


const workBtn = document.getElementById('workspace-work-btn');
const work = document.getElementById('workspace-work');
const workArrow = document.getElementById('workArrow');

workBtn.addEventListener('click', () => {
    if(work.classList.contains('hidden')){
        work.classList.remove('hidden');
        workArrow.classList.add('rotate-180');
    }else{
        work.classList.add('hidden');
        workArrow.classList.remove('rotate-180');
    }
})

const schoolBtn = document.getElementById('workspace-school-btn');
const school = document.getElementById('workspace-school');
const schoolArrow = document.getElementById('schoolArrow');

schoolBtn.addEventListener('click', () => {
    if(school.classList.contains('hidden')){
        school.classList.remove('hidden');
        schoolArrow.classList.add('rotate-180');
    }else{
        school.classList.add('hidden');
        schoolArrow.classList.remove('rotate-180');
    }
})

const dailyBtn = document.getElementById('workspace-daily-btn');
const daily = document.getElementById('workspace-daily');
const dailyArrow = document.getElementById('dailyArrow');

dailyBtn.addEventListener('click', () => {
    if(daily.classList.contains('hidden')){
        daily.classList.remove('hidden');
        dailyArrow.classList.add('rotate-180');
    }else{
        daily.classList.add('hidden');
        dailyArrow.classList.remove('rotate-180');
    }
})



const dropdownAvatar = document.getElementById('dropdownAvatar');
const dropdownAvatarBtn = document.getElementById('dropdownAvatarBtn');

dropdownAvatarBtn.addEventListener('click',()=>{
    if(dropdownAvatar.classList.contains('hidden')){
        dropdownAvatar.classList.remove('hidden');
    }else{
        dropdownAvatar.classList.add('hidden');
    }
})




const addBtn = document.getElementById('addBtn');
const addForm = document.getElementById('addForm');
const addFormRemove = document.getElementById('addFormRemove');

addBtn.addEventListener('click',()=>{
    if(addForm.classList.contains('hidden')){
        addForm.classList.remove('hidden');
        addForm.classList.add('flex');
    }else{
        addForm.classList.add('hidden');
        addForm.classList.remove('flex');
    }
})

addFormRemove.addEventListener('click',()=>{
    addForm.classList.add('hidden');
    addForm.classList.remove('flex');
})