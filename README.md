# browser-cache-size-test

Determine browser cache size by loading cache with images from cloudfront, should be accurate within about 5mb. Run multiple times to get more accurate value. Note browser cache size can be dynamic so use this as an indication only. 

Usage: 

var browserCacheSizeTest = require('browser-cache-size-test'); 
browserCacheSizeTest(callback(size)){
	alert("Cache size is about "+size+"mb"); 
}