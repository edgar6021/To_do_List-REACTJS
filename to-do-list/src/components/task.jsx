import { useEffect, useState } from "react";
import $ from "jquery";
import 'datatables.net';



function Task() {
const [task, settask] = useState([]);

useEffect (()=>{
const table = $('#taskTable').DataTable({
        responsive: true,
        autoWidth: false,
        bDestroy: true,
        iDisplayLength: 10,
        order: [[0, "asc"]],
        searching: true
});

$('#addTask').on('click', addTask);
$('#deleteItemSelect').on('click',deleteSelectTask);


$('#taskTable').on('click', 'button.btn-edit', function(){
    const index =$(this).data('index');
    editTask(index);
});

$('#taskTable').on('click', 'button.btn-delete', function(){
    const index =$(this).data('index');
    deleteTask(index);
})
$('#taskTable').on('click', 'button.btn-details', function(){
    const index=$(this).data('index');
    showTaskDetails(index);
});

return()=> {
table.destroy();
};

}, );

const addTask= () =>{
const title = $('#title').val().trim();
const description =$('#description').val().trim();
const date = $('#date').val().trim();

if(title ==='' || description === '' || date === ''){
 alert('Todos los campos son necesarios')
 return;
}

const newTask = {title, description, date};
settask([newTask]);

$(title).val('');
$(description).val('');
$(date).val('');

updateTable();

}

const updateTable = () =>{
const table = $('#taskTable').DataTable();
table.clear();

task.forEach((tasks, index)=>{
    table.row.add([
        `<input type="checkbox" data-index="${index}">`,
         tasks.title,
         tasks.description,
        tasks.date,
`<button class="btn btn-primary btn-edit" data-index="${index}">Editar</button>
 <button class="btn btn-danger btn-delete" data-index="${index}">Eliminar</button>
 <button type="button" class="btn btn-warning btn-details" data-index="${index}">Detalles</button>`
]);

});
table.draw();

};
const deleteSelectTask = () =>{
    const checkboxes = $('#taskTable tbody input[type="checkbox"]');

    checkboxes.each(function(){
    const index = $(this).data('index');
        task.splice(index, 1);
});
updateTable();
}

const editTask =(index)=>{
const editedTask = task[index];
$('title').val(editedTask.title);
$('description').val(editedTask.description);
$('date').val(editedTask.date);

task.splice(index, 1);
updateTable();
}

const deleteTask= (index)=>{
    task.splice(index, 1)
    updateTable();
}
const showTaskDetails=(index)=>{
    const tarea = task[index];

    $('#taskModalTitle').html(`<p><strong>Titulo:</strong>${tarea.title}</p>`);
    $('#taskModalBody').html ( `
        <p><strong>Descripción:</strong> ${tarea.description}</p>
        <p><strong>Fecha:</strong> ${tarea.date}</p>
    `);
    
    $('#taskModal').modal('show');

}

    return (
        <>
            <div className="container">
            <h1>Lista de Tareas</h1>
            <form id="taskForm">
                <label htmlFor="title">Título:</label>
                <input type="text" id="title" required />

                <label htmlFor="description">Descripción:</label>
                <textarea id="description"></textarea>

                <label htmlFor="date">Fecha:</label>
                <input type="date" id="date" />

                <button type="button" className="btn btn-success" id="addTask">Agregar Tarea</button>
                <button type="button" className="btn btn-danger" id="deleteItemSelect">Eliminar</button>
            </form>
            <main className="app-content">
                <div className="row">
                    <div className="col-md-12">
                        <div className="tile">
                            <div className="tile-body">
                                <div className="table-responsive">
                                    <table className="table table-hover table-bordered" id="taskTable">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>Título</th>
                                                <th>Descripción</th>
                                                <th>Fecha</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <div className="modal" id="taskModal" tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="taskModalTitle"></h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body" id="taskModalBody">
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </>
    );
}

export default Task;
