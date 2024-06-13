import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 5540;
let tasks = [];
let tasksWork =[];


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


// TODAY
app.get("/", (req, res) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const currentDate = new Date();

  const dayOfWeek = currentDate.getDay();

  const dayOfMonth = currentDate.getDate();

  const month = currentDate.getMonth();

  const year = currentDate.getFullYear();

  const formattedDate = `${dayNames[dayOfWeek]}, ${monthNames[month]} ${dayOfMonth}`;
  res.render("index.ejs", { tasks, 
                            today: formattedDate
                          });
});

// WORK 
app.get("/work", (req, res) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const currentDate = new Date();

  const dayOfWeek = currentDate.getDay();

  const dayOfMonth = currentDate.getDate();

  const month = currentDate.getMonth();

  const year = currentDate.getFullYear();

  const formattedDate = `${dayNames[dayOfWeek]}, ${monthNames[month]} ${dayOfMonth}`;
  res.render("work.ejs", { tasksWork, 
                            today: formattedDate
                          });
});


app.post("/tasks", (req, res) => {
  tasks.push({ name: "item", value: req.body.item });
  console.log(tasks);
  res.redirect("/");
});

app.post("/tasks-work", (req, res) => {
  tasksWork.push({ name: "item", value: req.body.item });
  console.log(tasksWork);
  res.redirect("/work");
});

app.post("/tasks-delete", (req, res) => {
  const taskIdToDelete = req.body.taskIds;
  const isChecked = Array.isArray(taskIdToDelete)
    ? taskIdToDelete
    : [taskIdToDelete];

  tasks = tasks.filter((_, index) => !isChecked.includes(index.toString()));

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
