var http = require('http');
var fs = require("fs");
var qs = require("querystring");
var qs = require("querystring");

var MongoClient = require("mongodb").MongoClient;
var dbUrl = "mongodb://localhost:27017/";

//create a server object;
http.createServer(function (req, res) {
   
	if(req.url=="/login"){
		
		if(req.method=="POST"){
		
			return req.on('data', function(data){
				formdata='';
				formdata+=data;
				//console.log(formdata);
				
				data=qs.parse(formdata);
				auser=data['apple'];
				apass=data['orange'];
				console.log(auser);
				console.log(apass);
				
				MongoClient.connect(dbUrl, function(err,db){
					
					var dbo=db.db("testdb");
					var myobj={"name":auser,"password":apass};
					//dbo.collection("table1").insertOne(myobj,function(err,res){
					dbo.collection("table1").find(myobj).toArray(function(err, result){
					//dbo.collection("table1").deleteOne(myobj, function(err, obj) {	
					
						if(err) throw err;
						//res.end("fail");
						console.log(result);
						console.log(result.length);
						
						if (result.length>0){
							var myobj1={"name":auser};
							dbo.collection("favourite").find(myobj1).toArray(function(err, result){
							
							if(err) throw err;
							console.log(result);
							console.log(result.length);
						
							if (result.length>0){					
								res.end("success2");
							}else{
								res.end("success1");	
							}
							db.close();
							});			
						}else{
							res.end("fail");
						}
					});
				});
	});
	
	}else{
		
		sendFileContent(res, "login.html", "text/html");
	}
		
	}else if(req.url=="/confirmlogout"){
		
		sendFileContent(res, "confirmlogout.html", "text/html");
		
	}else if(req.url=="/reg"){
			
		if(req.method=="POST"){
			
			return req.on('data', function(data){
				formdata='';
				formdata+=data;
				
				data=qs.parse(formdata);
				auser=data['apple'];
				apass=data['orange'];
				console.log(auser);
				console.log(apass);
				
				MongoClient.connect(dbUrl, function(err,db){
					
					var dbo=db.db("testdb");
					var myobj1={"name":auser};
					//var myobj={"name":auser,"password":apass};
					
					//dbo.collection("table1").insertOne(myobj,function(err,res){
					dbo.collection("table1").find(myobj1).toArray(function(err, result){
					//dbo.collection("table1").deleteOne(myobj, function(err, obj) {	
					
						if(err) throw err;
						console.log(result);
						
						if (result.length>0){
							res.end("alreadyexist");
						}else{
							var myobj={"name":auser,"password":apass};
							dbo.collection("table1").insertOne(myobj,function(err,res){
							db.close();
						});
						res.end("success");		
					};
				});									
		});
	
	});
	
	}else{

		sendFileContent(res, "register.html", "text/html");
	}
	}else if(req.url=="/showfavouriteafterlogin"){
		
		if(req.method=="POST"){
		
			return req.on('data', function(data){
				formdata='';
				formdata+=data;
				console.log(formdata);
				//auser=data;
				data=qs.parse(formdata);
				auser=data['apple'];
				//apass=data['orange'];
				console.log(auser);
				//console.log(apass);
				
				MongoClient.connect(dbUrl, function(err,db){
					
					var dbo=db.db("testdb");
					var myobj={"name":auser};
					//dbo.collection("table1").insertOne(myobj,function(err,res){
					//dbo.collection("table1").find(myobj).toArray(function(err, result){
					//dbo.collection("table1").deleteOne(myobj, function(err, obj) {	
					dbo.collection("favourite").find(myobj).toArray(function(err, result){
						
						if(err) throw err;
						console.log("abc"+result);
						res.end(JSON.stringify(result));	
						
						//if (result.length>0){
							//var myobj1={"name":auser};
							//dbo.collection("favourite").find(myobj1).toArray(function(err, result){
							
							//if(err) throw err;
							//console.log(result);
						
							//if (result.length>0){					
								//res.end("success2");
							//}else{
							//	res.end("success1");	
							//}
						db.close();
					});			
				});
					//console.log('db is running!');
					
			});
		}else{
		
		sendFileContent(res, "showfavouriteafterlogin.html", "text/html");	
		
		}
	}else if(req.url=="/removefavourite"){
		
		if(req.method=="POST"){
		
			return req.on('data', function(data){
				formdata='';
				formdata+=data;
				//console.log(formdata);
				//auser=data;
				data=qs.parse(formdata);
				auser=data['lemon'];
				favbreed=data['apple'];
				favimage=data['orange'];
				//auser=data['apple'];
				//apass=data['orange'];
				//console.log(auser);
				//console.log(apass);
				
				MongoClient.connect(dbUrl, function(err,db){
					
					var dbo=db.db("testdb");
					var myobj={"name":auser,"favouriteBreed":favbreed,"favouriteImage":favimage};
					//var myobj={"name":auser};
					//dbo.collection("table1").insertOne(myobj,function(err,res){
					//dbo.collection("table1").find(myobj).toArray(function(err, result){
					dbo.collection("favourite").deleteOne(myobj, function(err, obj) {	
					//dbo.collection("favourite").find(myobj).toArray(function(err, result){
						
						if(err) throw err;
						//console.log(result);
						//res.end(JSON.stringify(result));	
						
						//if (result.length>0){
							//var myobj1={"name":auser};
							//dbo.collection("favourite").find(myobj1).toArray(function(err, result){
							
							//if(err) throw err;
							//console.log(result);
						
							//if (result.length>0){					
								//res.end("success2");
							//}else{
							//	res.end("success1");	
							//}
						//db.close();
					});			
					res.end("success");
				
				});
					//console.log('db is running!');
					
			});
		}else{
		
		sendFileContent(res, "removefavourite.html", "text/html");	
		
		}
	}else if(req.url=="/main"){
		
		sendFileContent(res, "index.html", "text/html");

	}else if(req.url=="/mainafterlogin"){
		
		if(req.method=="POST"){
			//console.log("hi I am posting");
			return req.on('data', function(data){
				formdata='';
				formdata+=data;
				//console.log(data);
				
				data=qs.parse(formdata);
				auser=data['lemon'];
				favbreed=data['apple'];
				favimage=data['orange'];
				
				MongoClient.connect(dbUrl, function(err,db){
					//var s=0;
					//var f;
					var dbo=db.db("testdb");
					var myobj={"name":auser,"favouriteBreed":favbreed,"favouriteImage":favimage};
					var myobj1={"name":auser};
					console.log(myobj);
					//dbo.collection("favourite").insertOne(myobj,function(err,res){
					dbo.collection("favourite").find(myobj1).toArray(function(err, result){
					//dbo.collection("table1").deleteOne(myobj, function(err, obj) {	
					
						if(err) throw err;
						console.log("abc");
						console.log(result.length);
						//console.log(f);
						
						if (result.length<9){
							var myobj={"name":auser,"favouriteBreed":favbreed,"favouriteImage":favimage};
							dbo.collection("favourite").find(myobj).toArray(function(err, result){
								console.log(result);
								if(err) throw err;
								console.log(result.length);
								//console.log("f"+f);
								
								if (result.length>0){
									//console.log("ff"+f);
									console.log("hi2");
									res.end("duplicate");	
									//f=2;
									
									
								}else{
									dbo.collection("favourite").insertOne(myobj,function(err,res){
									console.log("hi0");
									db.close();
									//res.end("success");	
									})
									res.end("success");	
								};
								//db.close();
								});
						}else{
							console.log("hi1");
							//f=1;
							res.end("fail");
						}				
					});	
			});
	});
	
	}else{

		//console.log("loading444");
		sendFileContent(res, "indexafterlogin.html", "text/html");
	}	
		

}else if(/^\/[a-zA-Z0-9\/-/]*.js$/.test(req.url.toString())){
sendFileContent(res, req.url.toString().substring(1), "text/javascript");
}else if(/^\/[a-zA-Z0-9\/-/]*.bundle.min.js$/.test(req.url.toString())){
sendFileContent(res, req.url.toString().substring(1), "text/javascript");
}else if(/^\/[a-zA-Z0-9\/-/]*.css$/.test(req.url.toString())){
sendFileContent(res, req.url.toString().substring(1), "text/css");
}else if(/^\/[a-zA-Z0-9\/-]*.min.css$/.test(req.url.toString())){
sendFileContent(res, req.url.toString().substring(1), "text/css");
}else if(/^\/[a-zA-Z0-9\/-]*.jpg$/.test(req.url.toString())){
sendFileContent(res, req.url.toString().substring(1), "image/jpg");
}else if(/^\/[a-zA-Z0-9-._\/]*.min.js$/.test(req.url.toString())){
sendFileContent(res, req.url.toString().substring(1), "text/javascript");
}else if(/^\/[a-zA-Z0-9-]*.min.css.map$/.test(req.url.toString())){
sendFileContent(res, req.url.toString().substring(1), "text/map");
}else if(/^\/[a-zA-Z0-9\/-/]*.min.js.map$/.test(req.url.toString())){
sendFileContent(res, req.url.toString().substring(1), "text/map");
}else if(/^\/[a-zA-Z0-9\/-/]*.css.map$/.test(req.url.toString())){
sendFileContent(res, req.url.toString().substring(1), "text/map");
}else if(/^\/[a-zA-Z0-9\/-/]*.png$/.test(req.url.toString())){
sendFileContent(res, req.url.toString().substring(1), "image/png");
}else if(/^\/[a-zA-Z0-9\/-/]*.ico$/.test(req.url.toString())){
sendFileContent(res, req.url.toString().substring(1), "text/ico");
}else if(/^\/[a-zA-Z0-9\/-/?]*.ttf$/.test(req.url.toString())){
sendFileContent(res, req.url.toString().substring(1), "text/font");
}else if(/^\/[a-zA-Z0-9\/-/?]*.woff$/.test(req.url.toString())){
sendFileContent(res, req.url.toString().substring(1), "text/woff");
}else if(/^\/[a-zA-Z0-9\/-/?]*.woff2$/.test(req.url.toString())){
sendFileContent(res, req.url.toString().substring(1), "text/woff2");

}else if(/^\/[a-zA-Z0-9\/-/?]*.bootstrap-icons.css$/.test(req.url.toString())){
sendFileContent(res, req.url.toString().substring(1), "text/css");

}else if(/^\/[a-zA-Z0-9\/-/?]*.validate.js$/.test(req.url.toString())){
sendFileContent(res, req.url.toString().substring(1), "text/javascript");


}else{
console.log("Requested URL is: " + req.url);
res.end();
}
}).listen(8080); //the server object listens on port 8080


function sendFileContent(response, fileName, contentType){
fs.readFile(fileName, function(err, data){
if(err){
response.writeHead(404);
response.write("Not Found!");
}
else{
response.writeHead(200, {'Content-Type': contentType});
response.write(data);
}
response.end();
});
}