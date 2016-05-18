/**
 * 循环创建htmlDOM的img标签，图片为placehold.it提供
 * @param  {Number} num        图片数量
 * @param  {Number} lengthBase 图片长度的基数
 * @param  {Number} widthBase  图片宽度的基数
 * @param  {Array} colors      16进制的颜色格式，给图片上色
 * @return {Array}            图片的html格式的数组
 */
function getDomImgs(num, lengthBase, widthBase, colors) {
	var domImgs = [];
	var length = 0;
	var width = 0;
	var colorLen = colors.length;
	var index = 0;
	for (var i = 0; i < num; i++) {
		index = Math.floor(Math.random() * colorLen);
		length = Math.round(Math.random() * lengthBase);
		width = Math.round(Math.random() * widthBase);
		domImgs[i] = document.createElement('img');
		domImgs[i].src = "http://placehold.it/" + length + "/" + colors[index];
	}
	return domImgs;
}


function init() {
	var colors = ['6D2E5B', '26453D', '0B1013', 'ECB88A', 'ECB88A', 'ECB88A', 'CA7853', '58B2DC', '58B2DC', 'F7C242'];
	var domImgs = getDomImgs(20, 400, 800, colors);
	var wrap = document.querySelector('.gallery-wrap');
	var gallery = new Gallery(domImgs, wrap, 16, 4);
	gallery.renderImgs();
}
addLoadEvent(init);