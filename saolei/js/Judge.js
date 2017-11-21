function Judge(opt) {
	this._init(opt);
}
Judge.prototype._init = function(opt) {
	this.w = opt.w;
	this.h = opt.h;
	this.max = opt.max;
	this.count = 0;
	this.grids = [];
	this.openedCount = 0;
	this.createBoard();
	
}
Judge.prototype.createBoard = function() {
	var w = this.w;
	var h = this.h;
	var table = document.createElement('table');
	var tbody = document.createElement('tbody');
	var tr;
	for(var i = 0; i < h; i++) {
		tr = document.createElement('tr');
		for(var j = 0; j < w; j++) {
			this.grids.push(new Grid({
				judge: this,
				tr: tr,
				x: j,
				y: i
			}));
		}
		tbody.appendChild(tr);
	}
	table.appendChild(tbody);
	document.body.appendChild(table);
}
Judge.prototype.judge = function(isMine, grid) {
	if(isMine) {
		this.gameOver('boom');
		return;
	}
	var x = grid.x;
	var y = grid.y;
	this.calcNumber(x, y);
}
Judge.prototype.getGrid = function(x, y) {
	if(x < 0 || x >= this.w || y < 0 || y >= this.h) {
		return null;
	}
	var index = y * this.w + x;
	return this.grids[index];
}
Judge.prototype.calcNumber = function(x, y) {
	var num = 0;
	var grid;
	var currGrid = this.getGrid(x, y);
	if(!currGrid || currGrid.isOpened === true) {
		return;
	}
	for(var i = y - 1; i <= y + 1; i++) {
		for(var j = x - 1; j <= x + 1; j++) {
			if(i === y && j === x) {
				continue;
			}
			grid = this.getGrid(j, i);
			if(grid && grid.isMine()) {
				num++;
			}
		}
	}

	currGrid.setNumber(num);
	this.openedCount++;
	if(this.openedCount === this.w * this.h - this.count) {
		this.gameOver('well down');
		return;
	}

	if(num === 0) {
		this.calcNumber(x - 1, y - 1);
		this.calcNumber(x, y - 1);
		this.calcNumber(x + 1, y - 1);
		this.calcNumber(x - 1, y);
		this.calcNumber(x + 1, y);
		this.calcNumber(x - 1, y + 1);
		this.calcNumber(x, y + 1);
		this.calcNumber(x + 1, y + 1);
	}
}
Judge.prototype.gameOver = function(msg) {
	setTimeout(()=>{
		alert(msg);
		location.reload();
	},10)
	
}