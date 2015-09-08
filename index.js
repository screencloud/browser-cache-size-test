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
		if(count % 2 == 0){ // every other item 
			cacheCheck(url + "?nc="+nc+"&c="+(count/2), function(isCached){
				if(!isCached){
					done = true; 
					image.onload = null; 
					image = null; 
					delete image;
					callback(count); 
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
	determineCacheSize(url, function(count){
		var cacheSize = size * count; 
		callback(cacheSize); 
		// alert("cache is about.. "+cacheSize+" "+unit+" give of take "+count+" "+unit); 
	});
}

try {
	module.exports = browserCacheSizeTest;
} catch(e){
	window.browserCacheSizeTest = browserCacheSizeTest; 
}

})(); 
