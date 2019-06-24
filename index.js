// Showdown.js Config
var showdown = require("showdown"),
    converter = new showdown.Converter(),
    text = "/MarkdownData/blog-posts/Review ScreenToGif.md",
    html = converter.makeHtml(text);


// Low Db Config
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);

// Chalk stdout Config
const chalk = require('chalk');
const log = console.log;
const warn = chalk.yellow
const error = chalk.bold.red;

// Native Module Config
const path = require("path");
const fs = require("fs");

// Other Modueles Config
var dir = require("node-dir");
const slugify = require('@sindresorhus/slugify');
var jsop = require('jsop')
const axios = require('axios')

var mark = new Array();


// var config = require("./config/config.json")
// console.log(config.blog_sources)
// const sourcesRaw = JSON.stringify(config.blog_sources)
// console.log(sourcesRaw)

// //     sourcesRaw.forEach(currentItem => {
// //     axios.get(currentItem)
// //     console.log(currentItem)
// // })




async function getPosts() {

    const l = await axios.all([
        axios.get("https://cdn.jsdelivr.net/gh/MattixNow/writings/posts/Review%20ScreenToGif.md"),

      ])
      .then(axios.spread((a) => {
        //console.log("firs" + a.data)
        // console.log("coucou" + appleRes.data)
      }))
    
}



getPosts().then(x => {
    process()
})

function process() {

    db.defaults({
        posts: []
    }).write();

    db.get('posts')
        .remove()
        .write()

    dir.readFiles(
        __dirname + "/MarkdownData/",
        function (err, content, shortName, next) {
            if (err) throw err;
            var outputFileNime = path.parse(shortName).name;
            console.log("content:", content);
            console.log("coucou:  ", outputFileNime);
            content = converter.makeHtml(content)
            let identifiant = slugify(outputFileNime)


            // var postExist = db.get('posts').find({
            //     id: identifiant
            // })

            // // var config = require(postExist)
            // log(warn("postExist petit test : "))
            // log(postExist)
            // //log(warn("postExist petit test : " + JSON.stringify(postExist)))
            // var test = db.get('posts')
            //     .map('id')
            //     .value()
            // log(error(postExist.id))
            // console.log("test de la database : ", test)


            db.get("posts")
                .push({
                    id: identifiant,
                    title: outputFileNime,
                    body: content
                })
                .write();

            // if (test.length === 0) {
            //     console.log('create new posts in an empty db')
            //     db.get("posts")
            //         .push({
            //             id: identifiant,
            //             title: outputFileNime,
            //             body: content
            //         })
            //         .write();
            // } //else if () {}

            // if (postExist) {
            //     console.log('Already exist')
            //     db.get('posts').find({
            //         id: identifiant
            //     }).assign({
            //         title: outputFileNime,
            //         body: content
            //     }).value()
            // } else {
            //     console.log('create new posts in db')
            //     db.get("posts")
            //         .push({
            //             id: identifiant,
            //             title: outputFileNime,
            //             body: content
            //         })
            //         .write();


            // }



            next();
        },
        function (err, files) {
            if (err) throw err;
            console.log("finished reading files:", files);
            console.log(mark);
        }
    );


    // TODO : Remove .md extension in blog posts title
}