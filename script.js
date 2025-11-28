document.addEventListener('DOMContentLoaded', () => {
    
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

   
    loadTasks();

    
    function loadTasks() {
       
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        
        
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    
    function addTask(taskText, save = true) {
        
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

       
        const li = document.createElement('li');
        li.textContent = taskText;

        
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.classList.add('remove-btn');

        
        removeBtn.onclick = function() {
            
            taskList.removeChild(li);
            
            
            removeTaskFromStorage(taskText);
        };

        
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }

        
        if (save) {
            taskInput.value = "";
        }
    }

    
    function removeTaskFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        
       
        const index = storedTasks.indexOf(taskText);
        if (index > -1) {
            storedTasks.splice(index, 1);
        }
        
        
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    addButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        addTask(taskText, true); 
    });

    
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            addTask(taskText, true); 
        }
    });
});
