const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());



/********************ROUTES*********************/



//create a new blog post
app.post("/posts", async(req, res) => {
    try {
        //todo
        const { title, content } = req.body;
        const newPost = await pool.query(
            "INSERT INTO blogposts (title, content) VALUES ($1, $2) RETURNING *",
            [title, content]
        );

        console.log(newPost.rows[0]);

        res.json(newPost.rows[0]);

    } catch (err) {
        console.error(err.message);
    }
});



//get all blog posts
app.get("/posts", async(req, res) => {
    try {
        const allPosts = await pool.query("SELECT * FROM blogposts");

        console.log(allPosts.rows);

        res.json(allPosts.rows);

    } catch (err) {
        console.error(err.message);
    }
});



//get a specific blog post
app.get("/posts/:id", async(req, res) => {
    try {
        const { id } = req.params;

        const thisPost = await pool.query(
            "SELECT * FROM blogposts WHERE post_id = $1",
            [id]
        );

        console.log(thisPost.rows);

        res.json(thisPost.rows);

    } catch (err) {
        console.error(err.message);
    }
});



//update a specific blog post
app.put("/posts/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        const updatePost = await pool.query(
            "UPDATE blogposts SET title = $1, content = $2 WHERE post_id = $3",
            [title, content, id]
        );

        res.json("Blog post was updated.");

    } catch (err) {
        console.error(err.message);
    }
});



//delete a blog post
app.delete("/posts/:id", async(req, res) => {
    try {
        const { id } = req.params;

        const delPost = await pool.query(
            "DELETE FROM blogposts WHERE post_id = $1",
            [id]
        );

        res.json("Blog post was deleted.");


    } catch (err) {
        console.error(err.message);
    }
});



/**************RUN SERVER****************/

app.listen(5000, ()=> {
    console.log("server has started on port 5000");
});