$('#addTaskForm').submit(function(e){
    e.preventDefault()
    var input = {
        title : $('#titleTaskForm').val(),
        description : $('#descTaskForm').val(),
        due_date : $('#dueTaskForm').val()
    }
    $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/tasks/',
            dataType: 'json',
            data: input,
            headers : {
                token : localStorage.getItem('token')
            }
    })
    .done(function(task){
        $('#addNewTask').modal('toggle')
        fetchTask()
    })
    .fail(function(xhr, status, error){
        var errorMessage = xhr.status + ': ' + xhr.responseText
        console.log(errorMessage)
        $('.modal-body').prepend(`
            <div class="alert alert-danger" role="alert">
                ${errorMessage}
            </div>
        `)
    })
})
function fetchTask(){
    console.log("load data")
    $('#list-task').empty()
    $.ajax({
        url : 'http://localhost:3000/tasks/myTask', 
        headers : {
            token : localStorage.getItem('token')
        }
    })
    .done(function(tasks){
        tasks.forEach(task => {
            var date = new Date (task.due_date).toDateString()
            $('#list-task').append(`
                <div class="col-md-4">
                    <div class="card" style="max-width: 15rem;">
                            <div class="card-body">
                                <h5 class="card-title">${task.title}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">Due : ${date}</h6>
                                <p class="card-text">${task.description}</p>
                                <div style="justify-content: center">
                                    <input type="button" name=${task._id} class="btn btn-primary btn-sm" value="${task.status}" onclick="updateStatusTask(this.name, this.value)"></input>
                                    <input type="button" name=${task._id} class="btn btn-danger btn-sm" onclick="deleteTask(this.name)" value="Delete"></input>
                                </div>
                            </div>
                    </div>
                </div>
            `)
        });
        
    })
    .fail(function(err){
        console.log(err)
    })
}
function deleteTask(id){
    $.ajax({
        type : 'DELETE',
        url : `http://localhost:3000/tasks/${id}`, 
        headers : {
            token : localStorage.getItem('token')
        }
    })
    .done(function(tasks){
        fetchTask()
    })
    .fail(function(err){
        console.log(err)
    })
}
function updateStatusTask(id, status){
    // console.log("masuk sini")
    if(status == 'done'){
        var newStatus = 'on progress'
    }else{
        var newStatus = 'done'
    }
    $.ajax({
        type : 'PUT',
        url : `http://localhost:3000/tasks/${id}`, 
        headers : {
            token : localStorage.getItem('token')
        },
        data : {
            status : newStatus
        }
    })
    .done(function(tasks){
        fetchTask()
        showDetailGroup(currentIdGroup)
    })
    .fail(function(err){
        console.log(err)
    })
}
function showTaskTab(){
    $('#menu-task').show()
    $('#menu-project').hide()
    $('#list-group').hide()
    $('.tab-task').addClass('active')
    $('.tab-project').removeClass('active')
}
