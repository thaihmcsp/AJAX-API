$.ajax({
    url:'http://localhost:3000/api/account',
    type:'POST',
    data:{
        _id : String,
        username: String,
        password: String
    }
})
.then(function(data){
    var ul = $('<ul></ul>')

    for (let i = 0; i < data.length; i++) {
        var x = data[i];

        var username = $(`<p> ${x.username}</p>`)
        var id = $(`<p> ${x._id}</p>`)
        var password = $(`<p> ${x.password}</p>`)
        
        var li = $(`
        <li> _ID: ${id} / username: ${username} / password: ${password}</li>                    
        `)

        $(ul).append(li)

        $('body').append(ul)            
    }
})
.catch(function(err){
    console.log(err);
})
