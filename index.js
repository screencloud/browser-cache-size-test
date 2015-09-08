(function(){

function determineCacheSize(url, callback){
	var count = 0; 
	var nc = (new Date().getTime()).toString();
	var image = new Image();
	var done = false; 

	var cacheCheck = function(url, callback){
		var image = new Image();
		image.src = url; 
		// check to see if tail is cached 
		setTimeout(function(){
			// console.log("checking if "+image.src+" is cached", image.complete, image.width);
			if(image.complete || (image.width+image.height) > 0) {
				callback(true); 
			} else {
				image.onload = null; 
				image = null; 
				delete image;  
				callback(false); 
			} 
		}, 100);
	}

	var onload = function(){
		//console.log("count", count); 
		count++;
		if(callback.progress !== undefined){
			callback.progress(count); 
		}
		if(count % 2 == 0){ // every other item 
			cacheCheck(url + "?nc="+nc+"&c="+(count/2), function(isCached){
				if(!isCached){
					done = true; 
					image.onload = null; 
					image = null; 
					delete image;
					if(callback.complete !== undefined){
						callback.complete(count);
					} else {
						callback(count);	
					}
				}
			});
		}
		// image.src = "about:blank";
		image = null; 
		image = new Image();
		image.onload = onload; 
		if(!done){
			setTimeout(function(){
				if(done || !image) return;   
				image.src = url + "?nc="+nc+"&c="+count;
			},100);
		}
	}
	image.onload = onload; 
	image.src = url + "?nc="+nc+"&c="+count; 
}

var url = "http://cloudharmony.com/probe/test5mb.jpg"; 
var size = 5;
var unit = "mb";  

var browserCacheSizeTest = function(callback){
	var complete = function(count){
		var cacheSize = size * count; 
		if(callback.complete !== undefined){
			callback.complete(cacheSize); 	
		} else {
			callback(cacheSize); 
		}
	}; 
	var progress; 
	if(callback.progress != undefined){
		progress = function(count){
			var loaded = size * count;
			callback.progress(loaded);  
		};
	}
	determineCacheSize(url, {complete: complete, progress: progress});
}

try {
	module.exports = browserCacheSizeTest;
} catch(e){
	window.browserCacheSizeTest = browserCacheSizeTest; 
}

})(); 
