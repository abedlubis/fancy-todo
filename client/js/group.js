$('#addGroupTaskForm').submit(function(e){
    e.preventDefault()
    var input = {
        title : $('#titleGroupTaskForm').val(),
        description : $('#descGroupTaskForm').val(),
        due_date : $('#dueGroupTaskForm').val()
    }
    $.ajax({
            type: 'POST',
            url: `http://localhost:3000/projects/${currentIdGroup}/task`,
            dataType: 'json',
            data: input,
            headers : {
                token : localStorage.getItem('token')
            }
    })
    .done(function(task){
        $('#addGroupTask').modal('toggle')
        console.log(currentIdGroup,"=======")
        showDetailGroup(currentIdGroup)
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
$
$('#addNewGroup').submit(function(e){
    e.preventDefault()
    var input = {
        name : $('#nameGroup').val()
    }
    $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/projects/',
            dataType: 'json',
            data: input,
            headers : {
                token : localStorage.getItem('token')
            }
    })
    .done(function(project){
        $("#addNewGroup").trigger("reset");
        fetchGroup()
    })
    .fail(function(xhr, status, error){
        var errorMessage = xhr.status + ': ' + xhr.responseText
        console.log(errorMessage)
        $('#addNewGroup').append(`
            <div class="alert alert-danger" role="alert">
                ${errorMessage}
            </div>
        `)
    })
})


function tambahMemberBaru(id) {
    var email = $('#nameMember').val()
    console.log(email,"=============")
    $.ajax({
            type: 'PUT',
            url: `http://localhost:3000/projects/${id}/invite/${email}`,
            dataType: 'json',
            headers : {
                token : localStorage.getItem('token')
            }
    })
    .done(function(project){
        $("#addGroupForm").trigger("reset");
        showDetailGroup(currentIdGroup)
    })
    .fail(function(xhr, status, error){
        var errorMessage = xhr.status + ': ' + xhr.responseText
        console.log(errorMessage)
        $('#detailGroup .input-group').append(`
            <div class="alert alert-danger" role="alert">
                ${errorMessage}
            </div>
        `)
    })    
}

function fetchGroup(){
    $('#list-group ul').empty()
    $.ajax({
        url : 'http://localhost:3000/projects/myProject', 
        headers : {
            token : localStorage.getItem('token')
        }
    })
    .done(function(user){
            user.projects.forEach(project=>{
                $('#list-group ul').append(`
                    <li class="list-group-item" id=${project._id} onclick="showDetailGroup(this.id)">${project.name}</li>
                `)
            })
        
    })
    .fail(function(err){
        console.log(err)
    })
}

function showProjectTab(){
    $('#menu-project').show()
    $('#menu-task').hide()
    $('#list-group').show()
    $('.tab-task').removeClass('active')
    $('.tab-project').addClass('active')
}

function showDetailGroup(id){
    currentIdGroup = id;
    $('#detailGroup').empty()
    $.ajax({
        url : `http://localhost:3000/projects/${id}`, 
        headers : {
            token : localStorage.getItem('token')
        }
    })
    .done(function(group){
        console.log(group)
        $('#detailGroup').append(`
        <div class="row">
            <div class="col-md-12">
                <div class="card text-white bg-primary mb-3">
                    <div class="card-body">
                        <h4 class="card-title">${group.name}</h4>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4">
                <h5> Member (${group.members.length}) : </h5>
                <ul class="list-group" id="listofmember">
                    
                </ul>
                <div class="input-group my-3">
                    <form class="form-inline" id="addGroupForm" >
                        <input type="text" class="form-control" id="nameMember" style="width: 8rem;" placeholder="email member" aria-label="input member name" aria-describedby="button-addon2">
                        <button class="btn btn-secondary btn-md" onclick="tambahMemberBaru(this.id)" type="submit" name="${group._id}" id="${group._id}" value="invite">invite</button>   
                    </form>
                </div>
            </div>
            <div class="col-md-8">
                <h5> Task : </h5> <button class="btn btn-primary" data-toggle="modal" data-target="#addGroupTask">Add Group Task</button>
                <div  class="row mt-2" id="listoftaskgroup">

                </div>

            </div>
        </div>
       
        `)
        group.members.forEach(member=>{
            $('#listofmember').append(`
            <li class="list-group-item d-flex justify-content-between align-items-center">
                ${member.email}
            </li>
            `)
        })
        group.tasks.forEach(task=>{
            var date = new Date (task.due_date).toDateString()
            $('#listoftaskgroup').append(`
            <div class="col-md-6 mt-2">
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
        })
    })
    .fail(function(err){
        console.log(err)
    })
}

