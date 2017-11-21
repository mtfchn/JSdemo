function Grid(opt) {
	this._init(opt);

}
Grid.prototype._init = function(opt) {
	this.judge = opt.judge;
	this.tr = opt.tr;
	this.x = opt.x;
	this.y = opt.y;
	this.td = document.createElement('td');
	this.tr.appendChild(this.td);
	this.randomType();
	this.bindClick();
	this.bindFlag();
	this.status = 0;
	this.isOpened = false;

}
Grid.prototype.randomType = function() {
	this.type = Math.floor(Math.random() * 100) % 7 === 0 ? 'mine' : 'empty';
	if(this.type === 'mine' && this.judge.count <= this.judge.max) {
		this.judge.count++;
		this.td.dataset.type = 'mine';
		//		this.td.className = 'mine';
	} else {
		this.type = 'empty';
	}
}
Grid.prototype.isMine = function() {
	return this.type === 'mine';
}
Grid.prototype.bindClick = function() {
	var that = this;
	this.td.onclick = function() {
		that.judge.judge(that.isMine(), that);
		that.isOpened = true;
	}
}
Grid.prototype.bindFlag = function() {
	var that = this;
	this.td.oncontextmenu = function() {
		if(!that.isOpened){
			var status = ['origin', 'flag', 'question'];
			that.status++;
			that.status = that.status % status.length;
			that.td.className = status[that.status];
		}
		
		return false;
	}
}
Grid.prototype.setNumber = function(num) {
	this.isOpened = true;
	if(num === 0) {
		this.td.className = 'zero';
		return;
	}
	this.td.innerHTML = num;
}
Grid.prototype.setType = function() {
	
}