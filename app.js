const express = require ("express");
const bodyParser = require("body-parser");
const path = require("path");
const date = require(__dirname+"/date.js");
const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname , "Public")));

const port=3000;
const items = [];
const workItems = [];

app.get("/",(req,res)=>{
    let day=date.getDate();
    res.render("list", {listTitle:day, newListItems:items});
});

app.post("/", (req, res) => {
    let item = req.body.newItem;
    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work")
    }
    else {
        items.push(item);
        res.redirect("/");
    }
});

app.get("/work",(req,res)=>{
    res.render("list", { listTitle: "Work List", newListItems: workItems});

})

app.get("/about",(req,res)=>{
    res.render("about",{});
});

app.listen(port,()=>{
    console.log(`Server started on port ${port}`);
});