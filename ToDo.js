let updateMode = false;

const cancelDeleteButton = document.getElementById('cancelDeleteButton');
cancelDeleteButton.addEventListener('click', function() {
    const confirmDeleteDialog = document.getElementById('confirmDeleteDialog');
    confirmDeleteDialog.close();
} );

const confirmDeleteButton = document.getElementById('confirmDeleteButton');
confirmDeleteButton.addEventListener('click', function() {
    const id = document.getElementById('idToDelete');
    fetch('http://localhost:9000/delete.php?id=' + id.value)
    .then( () =>{
    alert('Registro eliminado');
    showTask();
})
    .catch((error) =>{
        console.log(error);
        alert('No se pudo eiminar el registro');
    } )
} );

function insert(){
    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const date = document.getElementById('date').value;
    const task ={
        id:id,
        name:name,
        description:description,
        date:date
    };
    let apiFile = 'insert.php';
    if(updateMode == true) $apiFile = 'update.php'
    fetch(`http://localhost:9000/${apiFile}`,{method: "POST", body: JSON.stringify(task)})
    .then(() => {
        alert("Tarea registrada")
            showTask()
    })
    .catch((error)=>{
        console.log(error)
        alert('No se puedo registrar la tarea')
    })
}
function showTask() {
    fetch("http://localhost:9000/list.php")
    .then(response => data = response.json())
    .then(data => {
        task = data
        renderTask(task)
    })
    .catch( error =>{
        console.log(error)
        alert ("Error al listar las tareas")
    })

}

function renderTask(task){
    clearTask();
    for(let i=0; i<task.length; i++){

        const colName= document.createElement('td');
        colName.innerHTML= task[i].name;

        const colDescription= document.createElement('td');
        colDescription.innerHTML= task[i].description;

        const colDate= document.createElement('td');
        colDate.innerHTML= task[i].date;

        const colStatus= document.createElement('td');
        colStatus.innerHTML= task[i].status;

        const colUpdate= document.createElement('button');
        colUpdate.innerHTML ='Editar';
        colUpdate.setAttribute('onclick', `fillform('${task[i].id}', '${task[i].name}', '${task[i].description}', '${task[i].date}')`);
        
        const colDelete= document.createElement('button');
        colDelete.innerHTML ='Eliminar';
        colDelete.setAttribute('onclick', `confirmDelete('${task[i].id}', '${task[i].name}', '${task[i].description}', '${task[i].date}')`);


        row = document.createElement('tr');
        row.setAttribute('class', 'task-data');
        row.appendChild(colName);
        row.appendChild(colDescription);
        row.appendChild(colDate);
        row.appendChild(colStatus);
        row.appendChild(colUpdate);
        row.appendChild(colDelete);
        const table = document.getElementById('task');
        table.appendChild(row);
    }
}

function clearTask(){
    const task= document.getElementsByClassName('task-data');
    const arrayTask= [...task];
    arrayTask.map(task => task.remove());
}

function fillform(id, name, description, date){
    //const inputId = document.createElement('input');
    //inputId.value = id;
    //inputId.setAttribute('type', 'hidden');
    //inputId.setAttribute('id', 'id');
    //const div = document.getElementById('frm');
    //div.appendChild(inputId);
    const txtId = document.getElementById('id');
    txtId.value = id;

    const txtname = document.getElementById('name');
    txtname.value = name;
    const txtdescription = document.getElementById('description');
    txtdescription.value = description;
    const txtdate = document.getElementById('date');
    txtdate.value = date;
    updateMode = true;
}

function confirmDelete(id, name, description, date){
    const confirmDeleteDialog = document.getElementById('confirmDeleteDialog');
    confirmDeleteDialog.showModal();

    const spanName =document.getElementById('spanName');
    spanName.innerHTML = name;
    const spanDescription =document.getElementById('spanDescription');
    spanName.innerHTML = description;
    const spanDate =document.getElementById('spanDate');
    spanName.innerHTML = date;

    const txtId =document.getElementById('idToDelete');
    txtId.value = id; 
}