const express = require('express'),
	  expressSanitizer = require('express-sanitizer'),
	  methodOvrd = require('method-override'),
	  app = express(),
	  bodyParser = require('body-parser'),
	  mongoose = require('mongoose');

// #############################################################################
// Logs all request paths and method
app.use(function (req, res, next) {
  res.set('x-timestamp', Date.now())
  res.set('x-powered-by', 'cyclic.sh')
  console.log(`[${new Date().toISOString()}] ${req.ip} ${req.method} ${req.path}`);
  next();
});



// ####### config ->

app.use(methodOvrd('_method'));
app.set('view engine','ejs');
app.use(express.urlencoded({extended: true})); // changed this to true
app.use(expressSanitizer());
app.use(express.static("public"));


// #############################################################################
// This configures static hosting for files in /public that have the extensions
// listed in the array.
// var options = {
//   dotfiles: 'ignore',
//   etag: false,
//   extensions: ['htm', 'html','css','js','ico','jpg','jpeg','png','svg'],
//   index: ['index.html'],
//   maxAge: '1m',
//   redirect: false
// }
// app.use(express.static('public', options))

// ########### App code ->

const db = mongoose.connection;
mongoose.connect(process.env.MONGO_ACCESS_URI , {useNewUrlParser: true, useUnifiedTopology: true});

db.then(() => {
  console.log("MongoDB connected!");
})
.catch(err => console.log(err));

db.on('error', (err) => {
  console.log(err);
})
//Routes -->

const blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type:Date, default: Date.now}
});

const Blog = mongoose.model('Blog',blogSchema);

// Blog.create({
// 	title: 'First Blog',
// 	image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80',
// 	body: 'This is really a nice blog in my opinion'
// });



app.get('/',(req,res)=>{
		
	res.redirect("/blogs");
	
	});

// INDEX Route -->

app.get('/blogs',async (req,res)=>{
	
	try{
		const blogs = await Blog.find({});
		console.log("Page Visited!!");
		res.render('index',{blogs});
	}
	catch (err){
		console.log(err.message)
	}
	
});

// NEW -->

app.get('/blogs/new',(req,res)=>{
	res.render('new');
});

//CREATE Route -->

app.post('/blogs',(req,res)=>{
	
	req.body.blog.body = req.sanitize(req.body.blog.body);
	
	Blog.create(req.body.blog).then((dt)=>{
		res.redirect("/blogs");
		console.log("New Post Added");
		console.log(dt);
	}).catch((err) =>{
		console.log(err)
		res.redirect("/blogs/new");
	});

});

//SHOW Route -->

app.get('/blogs/:id',async (req,res)=>{
	
	try{
		const blog = await Blog.findById(req.params.id);
		res.render('show',{ blog });
	}
	catch(err){
		console.log(err)
		res.redirect("/")
	}
		
});

//UPDATE Route -->

app.get('/blogs/:id/edit', async (req,res)=>{

	try{
		const blog = await Blog.findById(req.params.id);
		res.render('edit',{ blog });
	}
	catch(err){
		console.log(err);
		res.redirect(`/blogs/${req.params.id}`);
	}
});

app.put('/blogs/:id', async (req,res)=>{
	
	req.body.blog.body = req.sanitize(req.body.blog.body);
	
	try{
		const newdta = await Blog.findByIdAndUpdate(req.params.id, req.body.blog, { new:true });
		console.log("Post Updated!!")
		console.log(newdta);
		res.redirect('/blogs/'+req.params.id);
	}
	catch (err){
		console.log(err);
		res.redirect("/");
	}
});

 // DELETE Route -->

app.delete('/blogs/:id', async (req,res)=>{
	
	try{
		await Blog.findByIdAndDelete(req.params.id);
		console.log("Post Deleted!!");
		res.redirect("/");
	}
	catch (err){
		console.log(err)
		res.send("Post not delete. err");
	}
});

// #############################################################################
// Catch all handler for all other request.
app.use('*', (req,res) => {
  res.json({
      at: new Date().toISOString(),
      method: req.method,
      hostname: req.hostname,
      ip: req.ip,
      query: req.query,
      headers: req.headers,
      cookies: req.cookies,
      params: req.params
    })
    .end()
})

module.exports = app
