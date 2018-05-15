var http=require('http');
var fs=require('fs');
var path=require('path');
var server=http.createServer();
var mark=0;
var sr;
server.on('request',function(req,res)
{
	var url=req.url;
	var reg=/(index)/;
	var re=/(404)/;
	if(reg.exec(url)||reg.exec(re))mark=0;
	if(url=='/')mark=0;
	if(mark==0)
	{
		var fullpath="./html"+url;
		console.log('The URL is : '+url);
		if(url=='/')
		{
			sr=fullpath+'index';
			fullpath=fullpath+'index/index.html';
			mark=1;
		}
		else 
		{
			sr=fullpath;
			fullpath=fullpath+url+'.html';
			mark=1;
		}
		console.log(fullpath);
		fs.readFile(fullpath,function(err,data)
		{
			if(err)
			{
			fs.readFile('./html/404/404.html','utf8',function(ERR,DATA)
				{
					if(ERR)
					{
						throw ERR;
					}
					sr='./html/404';
					mark=1;
					res.end(DATA);
				});
				return;
			}
		res.end(data);
		});
	}
	else
	{
		if(url=='favicon.ico')
		{
			return;
		}
		var fullpath=sr+url;
		console.log(fullpath);
		fs.readFile(fullpath,function(err,data)
		{
			if(err)
			{
			fs.readFile('./html/404/404.html','utf8',function(ERR,DATA)
			{
				if(ERR)
				{
					throw ERR;
				}
				sr='./html/404';
				mark=1;
				res.end(DATA);
			});
			return;
			}
			res.end(data);
		});
	}
});
server.listen(3000,function()
{
	console.log('server is listening at port 3000');
});
