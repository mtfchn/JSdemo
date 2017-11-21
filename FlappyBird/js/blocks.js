function box() {
    this.all = document.querySelector('.all');
    this.id;

    this.boxOne = function () {
        this.boxup = document.createElement('div');
        this.boxdown = document.createElement('div');
        this.boxup.className = 'boxup';
        this.boxdown.className = 'boxdown';
        this.boxup.style.top = 0;
        this.boxdown.style.bottom = 0;
        this.boxup.style.height = Math.floor(Math.random() * 170) + 100 + 'px';//设置上水管长度
        this.boxdown.style.height = this.all.offsetHeight - parseInt(this.boxup.style.height) - 150 + 'px';//下水管高度，水管间间距150px
        this.boxup.style.left = this.boxdown.style.left = this.all.offsetWidth + 'px';//两个水管水平位置相同
        this.all.appendChild(this.boxup);
        this.all.appendChild(this.boxdown);
    }

    this.moveBox = function () {
        var that = this;
        that.id = setInterval(function () {
            that.boxup.style.left = that.boxup.offsetLeft - 8 + 'px';
            that.boxdown.style.left = that.boxdown.offsetLeft - 8 + 'px';
        },50)//水管移动速度
    }
}