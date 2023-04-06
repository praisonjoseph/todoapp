const express = require('express')
const app = express()
const port = 8000;

const db = require('./config/mongoose')
const ToDo = require('./models/todo')
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('assets'))
app.use(express.urlencoded())

// todoList = [
//     {
//         description: "Crud operation means to create, read, update, and delete.",
//         category: "Personal",
//         due_date: "13/5/2023"
//     },
//     {
//         description: "Todo List App in JavaScript.",
//         category: "Work",
//         due_date: "16/5/2023"
//     },
//     {
//         description: "The tasks you added to this todo app will be stored in the browser’s local storage",
//         category: "School",
//         due_date: "11/5/2023"
//     }

// ]

app.get('/', async function (req, res) {
    const todoList = await ToDo.find()
    return res.render('home', { title: "ToDo App", todo_items: todoList })
})

app.post('/create-task', async function (req, res) {
    console.log(req.body)
    const {
        description,
        category,
        due_date,
        submit,
    } = req.body;
    console.log(description, category, due_date, submit)
    const newToDo = new ToDo({
        description,
        category,
        due_date,
    })
    await newToDo.save().then(savedToDo => {
        console.log(savedToDo); // true
    })
        .catch((err) => {
            console.log(err)
            // res.status(500)
        });
    return res.redirect('back')
})


app.post('/delete-task/', async (req, res) => {
    try {
        var removeList = req.body.todocheck;
        console.log(req.body, removeList)
        if (typeof removeList === "string") {
            await ToDo.findByIdAndDelete({ _id: removeList }).exec();
        }
        else if (typeof removeList === "object") {
            for (var i = 0; i < removeList.length; i++) {
                await ToDo.findByIdAndDelete({ _id: removeList[i] }).exec();
            }
        }
    }
    catch (err) {
        handleError(err);
    }
    return res.redirect('back')
})

app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the server at ${err}`)
    }
    console.log(`Server is running at port ${port}`)
})

