/**
 * 瀑布布局
 * @param {Array}  domImgs       图片DOM的数组
 * @param {node}   wrap           布局的包裹层
 * @param {Number} gap            图片的margin值
 * @param {number} columnNumber   图片的列数
 * @param {number} wrapWidth      包裹层的宽度
 */
function Gallery(domImgs, wrap, gap, columnNumber) {
	this.domImgs = domImgs;
	this.wrap = wrap;
	this.gap = gap;
	this.columnNumber= columnNumber;
	this.wrapWidth = this.wrap.clientWidth;	
	this.childColumnsLength = [];

}
/**
 * 负责渲染图片的css样式
 * @param  {[type]} imgWidth [description]
 * @return {[type]}          [description]
 */
Gallery.prototype.renderStyle = function(imgWidth, childColumns) {

	var j = this.domImgs.length;
	for (var i = 0; i < j; i++) {
		this.domImgs[i].style.width = imgWidth + "px;";
		this.addImage(this.domImgs[i],childColumns);
	}
};
/**
 * 总体负责将图片渲染到页面
 * @return {[type]} [description]
 */
Gallery.prototype.renderImgs = function() {
	var colWidth = Math.floor((this.wrapWidth - (this.columnNumber+ 1) * this.gap) / this.columnNumber);
	var childColumns = this.addChild(this.wrap, colWidth);
	this.renderStyle(colWidth, childColumns);
	// this.addImage(this.domImgs,childColumns);

};
/**
 * 为给定包裹层添加子列，将子列的class设为.col,并返回子列
 * @param {Node} 		ancestor       被添加子列的包裹层
 * @param {Number} 		columWidth     子列宽度
 * @return {NodeList}   返回子列
 */
Gallery.prototype.addChild = function(ancestor, columWidth) {
	var childColumns = [];
	for (var i = 0; i < this.columnNumber; i++) {
		childColumns[i] = document.createElement('div');
		childColumns[i].setAttribute('class', 'col');
		childColumns[i].style.width = columWidth + 'px';
		childColumns[i].style.marginRight = this.gap + 'px';
		ancestor.appendChild(childColumns[i]);
	}
	return childColumns;
};


/**
 * 负责将每一个图片加到页面中对应的列里
 * @param {Node} image         被加到页面的img元素
 * @param {Node} childColumns  父包裹层的子列
 */
Gallery.prototype.addImage= function(image,childColumns) {
	var smalleast = this.getSmalleast();
	childColumns[smalleast].appendChild(image);
}
/**
 * 判断最小的列数
 * @return {Number} 返回最小列数的数组下标
 */
Gallery.prototype.getSmalleast = function(){
	var length = this.columnNumber;
	var smalleast = 0;
	for(var i = 1; i < length; i++){
		if(this.childColumnsLength[i] < this.childColumnsLength[i-1]){
			smalleast = i;
		}
	}
	return smalleast;
}