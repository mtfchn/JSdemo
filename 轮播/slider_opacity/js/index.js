function sliderOption(container) {
	var previes, current;
	init();
	var length = document.querySelectorAll('.list').length;
	var id;
	var isStop;

	function init() {
		current = previes = 0;
		var bullets = document.querySelectorAll('.bullet');
		var left = document.querySelector('.left');
		var right = document.querySelector('.right');
		left.onclick = function() {
			sliderPre();
		};
		right.onclick = function() {
			sliderNext();
		};

		for(var i = 0; i < bullets.length; i++) {
			bullets[i].index = i;
			bullets[i].onclick = function() {
				previes = current;
				current = this.index;
				silderTo(previes, current);
				
			}
		}
		
		container.onmouseover = function(){
			isStop = true;
			stop();
		}
		container.onmouseout = function(){
			isStop = false;
			auto();
		}
		
		auto();
	}

	function silderTo(pre, curr) {
		var lis = document.querySelectorAll('.list');
		var bullets = document.querySelectorAll('.bullet');
		animation(lis[pre], {
			opacity: 0
		})
		animation(lis[curr], {
			opacity: 100
		},function(){
			if(!isStop){
				auto();
			}
		})
		
		bullets[previes].className = 'bullet';
		bullets[current].className += ' focus';
		//		lis[pre].style.opacity = 0;
		//		lis[curr].style.opacity = 1;
	}

	function sliderNext() {
		previes = current;
		current++;
		if(current === length) {
			current = 0;
		}
		silderTo(previes, current);
	}

	function sliderPre() {
		previes = current;
		current--;
		if(current === -1) {
			current = length - 1;
		}
		silderTo(previes, current);
	}

	function auto() {
		clearInterval(id)
		id = setInterval(function(){
			sliderNext();
		},2000)
	}

	function stop() {
		clearInterval(id)
	}

}
var div = document.querySelector('.slider')
sliderOption(div)











//透明度滑动
function getStyle(el, property) {
	if(getComputedStyle) {
		return getComputedStyle(el)[property];
	} else {
		return el.currentStyle[property];
	}
}

function animation(el, propertise, fn) {
	clearInterval(el.timeId);

	el.timeId = setInterval(function() {
		var isAllDone = true;
		var current;
		for(var property in propertise) {
			if(property === 'opacity') {
				current = Math.abs(parseFloat(getStyle(el, 'opacity')) * 100);
			} else {
				current = parseInt(getStyle(el, property));
			}

			var target = propertise[property];
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
			clearInterval(el.timeId);
			if(typeof fn === 'function') {
				fn();
			}
		}

	}, 20)
}