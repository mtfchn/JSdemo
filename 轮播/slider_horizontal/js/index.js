function sliderHorizontal(container) {

	var currentIndex;
	var slider = container.querySelector('.slider');
	var list = container.querySelector('.list');
	var items = container.querySelectorAll('.list .item');
	var length = items.length;
	var liWidth = items[0].offsetWidth;
	var id;
	init();
	

	function init() {
		currentIndex = 1;
		container.querySelector('.list').style.width = length * liWidth + 'px';
		list.style.left = -currentIndex * liWidth + 'px'

		container.querySelector('.right').onclick = function() {
			sliderNext();
		}
		container.querySelector('.left').onclick = function() {
			sliderPrev();
		}

		var bullets = container.querySelectorAll('.bullet');
		for(var i = 0; i < bullets.length; i++) {
			bullets[i].index = i;
			bullets[i].onclick = function() {
				currentIndex = this.index + 1;
				slideTo(currentIndex);
			}
		}
		
		container.onmousemove = function(){
			stop();
		}
		container.onmouseout = function(){
			auto();
		}
		auto();
	}

	function slideTo(index) {

		if(currentIndex === length) {
			currentIndex = index = 2;
			list.style.left = -liWidth + 'px'
		}
		if(currentIndex === -1) {
			currentIndex = index = length - 3;
			list.style.left = -(length - 2) * liWidth + 'px'

		}
		
//		var left = -index * liWidth;
//		animate(list, {
//			left: left
//		})
		list.style.left = -index * liWidth + 'px';
		list.style.transition = 'all 1s linear 0s'
		
		var focusIndex;
		var bullets = container.querySelectorAll('.bullet');
		if(index === 0){
			focusIndex = bullets.length - 1;
		}else if(index === length-1){
			focusIndex = 0;
		}else{
			focusIndex = index-1;
		}
		
		container.querySelector('.focus').className = 'bullet';
		bullets[focusIndex].className += ' focus'
		
		
	}

	function sliderNext() {
		currentIndex++;
		slideTo(currentIndex);

	}

	function sliderPrev() {
		currentIndex--;
		slideTo(currentIndex);
	}

	function auto() {
		clearInterval(id);
		id = setInterval(function(){
			sliderNext();
		},2000)
	}

	function stop() {
		clearInterval(id)
	}
}

sliderHorizontal(document.querySelector('.slider'));

//透明度滑动
function getStyle(el, property) {
	if(getComputedStyle) {
		return getComputedStyle(el)[property];
	} else {
		return el.currentStyle[property];
	}
}

function animate(el, properties, fn) {
	clearInterval(el.timerId);
	//console.log(el.timerId);

	el.timerId = setInterval(function() {
		var isAllDone = true;
		var current;
		for(var property in properties) {
			//console.log(property);                  //key
			//console.log(properties[property])       //target
			if(property === 'opacity') {
				current = Math.round(parseFloat(getStyle(el, 'opacity')) * 100);
			} else {
				current = parseInt(getStyle(el, property));
			}

			var target = properties[property];
			var speed = (target - current) / 30;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

			if(speed !== 0) {
				isAllDone = false;
			}

			if(property === 'opacity') {
				el.style.opacity = (current + speed) / 100;
			} else {
				el.style[property] = current + speed + 'px';
			}

		}

		if(isAllDone) {
			clearInterval(el.timerId);
			if(typeof fn === 'function') {
				fn();
			}
		}
	}, 10)
}