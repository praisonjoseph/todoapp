const express = require('express')
const app = express()
const port = 8000;

// const db = require('./config/mongoose')
// const ToDo = require('./models/todo')
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('assets'))
app.use(express.urlencoded())

todoList = [
    {
        description: "item 1",
        category: "Personal",
        due_date: "13/5/2023"
    },
    {
        description: "item 2",
        category: "Work",
        due_date: "16/5/2023"
    },
    {
        description: "item 3",
        category: "School",
        due_date: "11/5/2023"
    }

]

app.get('/', function(req, res){
    return res.render('home', {title: "ToDo App", todo_items: todoList})
})

app.post('/create-delete-task', function(req, res){
    const submit = req.body.submit;
    if(submit === "add"){
      console.log("Do add")
    } else if(submit === "delete"){
        console.log("Do delete")
    } 
    return res.redirect('back')
})

app.listen(port, function(err) {
    if (err) {
        console.log(`Error in running the server at ${err}`)
    }
    console.log(`Server is running at port ${port}`)
})

