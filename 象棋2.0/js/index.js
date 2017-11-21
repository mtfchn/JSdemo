function prompt(info) {
	var $notice = $("<div><div>");
	$notice.css({
		width: 300,
		height: 45,
		fontSize: '20px',
		lineHeight: '45px',
		background: 'rgba(0,0,0,.8)',
		borderRadius: '6px',
		position: 'fixed',
		color: 'white',
		textAlign: 'center',
		zIndex: 999999999,
		mozUserSelect: 'none',
		msUserSelect: 'none',
		webkitUserSelect: 'none',
		display: 'none'
	});
	$notice.appendTo($("body")).css({
		left: (window.innerWidth - $notice.width()) / 2,
		top: (window.innerHeight - $notice.outerHeight()) / 2
	});
	$notice.html(info).fadeIn(200).delay(1000).fadeOut(500, function() {
		//完成后清除
		$notice.remove();
	});
}
//函数入口
$(function() {
	var $oC = $(".chessboard #canvas");
	var box_size = 60; //格子大小
	var piece_size = 19; //棋子半径大小
	var idList = ['車', '馬', '相', '士', '帥', '士', '相', '馬', '車', '车', '马', '相', '士', '将', '士', '相', '马', '车', '炮', '兵', '卒'];

	//棋子 参数为(坐标X,坐标Y,棋子内容)
	function Piece(x, y, txt) {
		this.el = document.createElement('div');
		this.size = piece_size * 2;
		this.el.style.width = this.size + 'px';
		this.el.className = 'piece'; //棋子
		this.el.style.height = this.size + 'px';
		this.el.style.zIndex = 10000;
		this.el.style.borderRadius = '50%';
		this.el.style.background = '#FFD89F';
		this.el.style.border = '1px solid #8A6A53';
		this.el.style.boxShadow = '0 2px 2px 2px #987356';
		this.el.style.textAlign = 'center';
		this.el.style.lineHeight = this.size + 'px';
		this.el.style.fontSize = '20px';
		this.el.style.fontWeight = 900;
		this.el.style.textShadow = '-1px -1px #987356';
		this.el.style.cursor = 'pointer';
		this.el.style.position = 'absolute';
		this.el.style.left = x + 'px';
		this.el.style.top = y + 'px';
		this.el.style.webkitUserSelect = 'none';
		this.el.style.msUserSelect = 'none';
		this.el.style.mozUserSelect = 'none';
		this.el.innerHTML = txt; //字(内容)
		this.el.isAlive = true; //默认为活着的
		$(".chessboard").append(this.el);
		this.init(); //初始化
		this.type(); //类别(为棋子添加文字信息)
	}
	Piece.prototype.init = function() {
		var _this = this;
		$lastSelected = null;
		//选中 或 取消  点击 事件
		$(this.el).click(function() {
			//判断是否还活着
			if($(this)[0].isAlive) {
				//判断点击的是否是自己 如果是 则 取消选择(并退出)
				if($(this).hasClass('selected')) {
					$(this).removeClass('selected');
					$(".wall .chessboard span.prompt").css({
						backgroundColor: 'rgba(198,72,96,0)'
					}).removeClass('prompt');
					return;
				}
				var $pieceChecked = $(".wall .chessboard div.selected");
				$(_this.el).addClass('selected').siblings('div').removeClass('selected');
				//保存选中棋子
				$lastSelected = $pieceChecked;
				//点击选中后 落子提示
				laziPrompt();
				//判断是否为敌方棋子
				//alert($(_this.el).html());
				//判断是否选中棋子
				if($pieceChecked.html()) {
					//吃 和 被吃不同类才能吃  (这里的_this表示被吃对象)
					if(($pieceChecked[0].isEnemy !== _this.el.isEnemy)) {
						//判断是否符合规则    $(this)=== $(_this.el) 被吃对象
						if(check($pieceChecked, $(this))) {
							//符合规则移动棋子
							move($pieceChecked, $(this));
							//被吃棋子 取消选中
							$(this).removeClass('selected');
							$(this)[0].isAlive = false; //设为  死
							//判断死去棋子是否为 将(相) 如果是  GameOver
							if($(this).hasClass('jiang')) {
								$("#mark").show(0);
								if($(this)[0].isEnemy) {
									$("#mark p").html('恭喜！你赢了!!!').animate({
										top: '50%'
									}, 1000)
								} else {
									$("#mark p").html('可惜！你输了!!!').animate({
										top: '50%'
									}, 1000)
								}
								return; //退出
							}
							//敌方(蓝色)棋子向左移出 
							if(_this.el.isEnemy) {
								$(this).animate({
									left: -(Math.random() * 150 + 100),
									top: Math.random() * 150 + 100,
								}, 1000);
							} else {
								$(this).animate({
									left: Math.random() * 300 + 100 + $oC.width(),
									top: Math.random() * 300 + 100,
								}, 1000);
							}
						} else {
							if($lastSelected) {
								$lastSelected.addClass('selected').siblings('div').removeClass('selected');
							}
							prompt('咬我呀?');
						}
						$(".wall .chessboard span.prompt").css({
							backgroundColor: 'rgba(198,72,96,0)'
						}).removeClass('prompt');
					}
				}
			}

		});
	};
	//落子提示
	function laziPrompt() {
		$span = $(".wall .chessboard span");
		var $pieceChecked = $(".wall .chessboard div.selected");
		$.each($span, function(i, ev) {
			if($pieceChecked) {
				//判断是否符合规则
				if(check($pieceChecked, $(ev))) {
					$(ev).css({
						backgroundColor: 'rgba(198,72,96,0.8)'
					});
					$(ev).addClass('prompt');
				} else {
					$(ev).css({
						backgroundColor: 'rgba(198,72,96,0)'
					});
				}
			}
			//console.log($pieceChecked)
		});
	}
	//棋子类别 
	Piece.prototype.type = function() {
		//['車', '馬', '相', '士', '帥', '士', '相', '馬', '車', '车', '马', '相', '士', '将', '士', '相', '马', '车', '炮', '兵', '卒'];
		//车，車
		if(this.el.innerHTML === idList[0] || this.el.innerHTML === idList[9]) {
			$(this.el).addClass('ju');
		}
		//马，馬
		if(this.el.innerHTML === idList[1] || this.el.innerHTML === idList[10]) {
			$(this.el).addClass('ma');
		}
		//相
		if(this.el.innerHTML === idList[2]) {
			$(this.el).addClass('xiang');
		}
		//士
		if(this.el.innerHTML === idList[3]) {
			$(this.el).addClass('shi');
		}
		//帥，将
		if(this.el.innerHTML === idList[4] || this.el.innerHTML === idList[13]) {
			$(this.el).addClass('jiang');
		}
		//炮
		if(this.el.innerHTML === idList[18]) {
			$(this.el).addClass('pao');
		}
		//兵, 卒
		if(this.el.innerHTML === idList[19] || this.el.innerHTML === idList[20]) {
			$(this.el).addClass('zu');
		}
	}
	//自己 (红色棋子)  继承  
	function SelfPiece(x, y, txt) {
		Piece.apply(this, [x, y, txt]);
		this.el.style.color = 'red';
		//identity 身份 
		this.el.isEnemy = false;
	}
	SelfPiece.prototype = Object.create(Piece.prototype);
	//敌人(蓝色棋子)enemy  继承  
	function EnemyPiece(x, y, txt) {
		Piece.apply(this, [x, y, txt]);
		this.el.style.color = '#1E0D69';
		//identity 设置身份 
		this.el.isEnemy = true;
	}
	EnemyPiece.prototype = Object.create(Piece.prototype);

	//获取2D场景
	var oGc = $oC[0].getContext('2d');
	oGc.save(); //保存路径
	oGc.strokeStyle = '#B22A38';
	for(var i = 0; i < 10; i++) {
		oGc.beginPath(); //开始路径
		//水平线
		oGc.moveTo(0.5, i * box_size + 0.5);
		oGc.lineTo($oC.width() + 0.5, i * box_size + 0.5);
		//垂直线
		oGc.moveTo(i * box_size + 0.5, 0.5);
		oGc.lineTo(i * box_size + 0.5, $oC.height() + 0.5);
		oGc.stroke();
		oGc.closePath(); //闭合路径
	}
	//上斜线
	oGc.moveTo(3 * box_size, 0);
	oGc.lineTo(5 * box_size, 2 * box_size);
	oGc.moveTo(5 * box_size, 0);
	oGc.lineTo(3 * box_size, 2 * box_size);
	//下斜线
	oGc.moveTo(3 * box_size, 7 * box_size);
	oGc.lineTo(5 * box_size, 9 * box_size);
	oGc.moveTo(5 * box_size, 7 * box_size);
	oGc.lineTo(3 * box_size, 9 * box_size);
	oGc.stroke();
	//清除中间
	oGc.clearRect(1, 4 * box_size + 1, $oC.width() - 2, box_size - 1);
	oGc.restore(); //恢复路径

	//创建棋子
	function createPiece() {
		//后排
		for(var i = 0; i < 9; i++) {
			new SelfPiece(box_size * i - piece_size, $(".chessboard").height() - piece_size, idList.slice(0, 9)[i]);
			new EnemyPiece(box_size * i - piece_size, -piece_size, idList.slice(9, 18)[i]);
		}
		//炮
		new SelfPiece(box_size - piece_size, box_size * 7 - piece_size, idList[18]);
		new SelfPiece(box_size * 7 - piece_size, box_size * 7 - piece_size, idList[18]);
		new EnemyPiece(box_size - piece_size, box_size * 2 - piece_size, idList[18]);
		new EnemyPiece(box_size * 7 - piece_size, box_size * 2 - piece_size, idList[18]);
		//兵，卒
		for(var i = 0; i < 5; i++) {
			new SelfPiece(2 * i * box_size - piece_size, box_size * 6 - piece_size, idList[piece_size]);
			new EnemyPiece(2 * i * box_size - piece_size, box_size * 3 - piece_size, idList[20]);
		}
		initSpan(); //初始化创建span
	}
	//初始化创建span
	function initSpan() {
		var span = '';
		for(i = 0; i < 90; i++) {
			span += '<span></span>';
		}
		$(span).appendTo($(".wall .chessboard"));
		$span = $(".wall .chessboard span");
		$span.css({
			display: 'block',
			width: 40,
			height: 40,
			position: 'absolute',
			borderRadius: '50%',
			backgroundColor: 'rgba(198,72,96,0)',
			cursor: 'pointer'
		});
		//初始化span位置
		for(var i = 0; i < 10; i++) {
			for(var j = 0; j < 9; j++) {
				$span.eq(parseInt(j + '' + i)).css({
					left: box_size * j - piece_size,
					top: box_size * i - piece_size
				});
			}
		}
		//待定位置
		$span.hover(function() {
			$(this).css({
				backgroundColor: 'rgba(198,72,96,0.8)'
			});
		}, function() {
			if(!$(this).hasClass('prompt')) {
				$(this).css({
					backgroundColor: 'rgba(198,72,96,0)'
				});
			}

		});
		//(落子)
		$span.click(function() {
			//alert(.index())
			var $pieceChecked = $(".wall .chessboard div.selected");
			if($pieceChecked) {
				//console.log($pieceChecked.position().left + '|' + $pieceChecked.position().top);
				//console.log($(this).position().left + '|' + $(this).position().top);
				//判断是否符合规则
				if(check($pieceChecked, $(this))) {
					$(".wall .chessboard span.prompt").css({
						backgroundColor: 'rgba(198,72,96,0)'
					}).removeClass('prompt')
					//第一个参数是要移动的对象，第二个是落子对象
					move($pieceChecked, $(this));
					$pieceChecked.removeClass('selected');
				} else {
					prompt('不符合规则,请重新落子!');
				}
			} else {
				prompt('请选棋子!');
			}

		});

	}
	//移动棋子//第一个参数是要移动的对象，第二个是落子对象
	function move($obj, $pisition) {
		$obj.animate({
			left: $pisition.position().left,
			top: $pisition.position().top
		}, 500);
	}
	//判断卒(兵)是否过河了
	function zuIsCrossTheRiver($zu) {
		//判断是否为敌军棋子
		if($zu[0].isEnemy) {
			if($zu.position().top >= (box_size * 5 - piece_size)) {
				return true;
			} else {
				return false;
			}
		} else {
			if($zu.position().top <= (box_size * 4 - piece_size)) {
				return true;
			} else {
				return false;
			}
		}

	}
	//判断相是否过河了  $lazi为落子对象
	function xiangIsCrossTheRiver($xiang, $lazi) {
		//判断是否为敌方
		if($xiang[0].isEnemy) {
			if($lazi.position().top >= (box_size * 5 - piece_size)) {
				return true; //表示越界了
			} else {
				return false;
			}
		} else {
			if($lazi.position().top <= (box_size * 4 - piece_size)) {
				return true; //表示越界了
			} else {
				return false;
			}
		}
	}
	//求两点之间的距离
	function distance(x1, y1, x2, y2) {
		return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
	}
	//	alert(distance(101,521,221,401));
	//	alert(distance(101,521,161,461));
	//	alert(distance(221,401,161,461));

	//$selected为选中的棋子,$lazi为落子处
	//(有过河需要判断是否为敌方棋子)
	//参数(选中棋子,落子位置)
	function check($selected, $lazi) {
		var $piece = $(".wall .chessboard .piece"); //获取棋子对象
		if($selected.hasClass('ju')) {
			//判断是否符合规则 (水平或垂直,直线走) 第一次判断
			if(($lazi.position().left === $selected.position().left) ^ ($lazi.position().top === $selected.position().top)) {
				//判断中间是否有障碍物(遍历棋子) 第二次判断
				var isHasBar = false; //假设没有
				$.each($piece, function(i, ev) {
					//首先判断(筛选)是否在同一条直线上
					if(($piece.eq(i).position().left === $selected.position().left) || ($piece.eq(i).position().top === $selected.position().top)) {

						//再判断是否在两者之间(水平线上)
						if($lazi.position().left === $selected.position().left) {
							if((Math.abs($piece.eq(i).position().top) < Math.abs($selected.position().top) && Math.abs($piece.eq(i).position().top) > Math.abs($lazi.position().top)) || (Math.abs($piece.eq(i).position().top) > Math.abs($selected.position().top) && Math.abs($piece.eq(i).position().top) < Math.abs($lazi.position().top))) {
								isHasBar = true;
							}
						}
						//再判断是否在两者之间(垂直线上)
						if($lazi.position().top === $selected.position().top) {
							if((Math.abs($piece.eq(i).position().left) < Math.abs($selected.position().left) && Math.abs($piece.eq(i).position().left) > Math.abs($lazi.position().left)) || (Math.abs($piece.eq(i).position().left) > Math.abs($selected.position().left) && Math.abs($piece.eq(i).position().left) < Math.abs($lazi.position().left))) {
								isHasBar = true;
							}
						}
					}
				});
				if(isHasBar) {
					//有障碍物
					return false;
				} else {
					return true;
				}

			} else {
				return false;
			}
		} else if($selected.hasClass('ma')) {
			//判断是否符合规则
			//初步判断是否走(日)  第一次判断
			if((Math.abs($lazi.position().left - $selected.position().left) === 2 * box_size && Math.abs($lazi.position().top - $selected.position().top) === box_size) || (Math.abs($lazi.position().left - $selected.position().left) === box_size && Math.abs($lazi.position().top - $selected.position().top) === 2 * box_size)) {
				//再次判断是否蹩脚
				var ishasbar = false; //假设没有障碍物
				$.each($piece, function(i, ev) {
					//第二次判断
					if(($(ev).position().top === ($selected.position().top + $lazi.position().top) / 2) && ($(ev).position().left === $selected.position().left) || ($(ev).position().left === ($selected.position().left + $lazi.position().left) / 2) && ($(ev).position().top === $selected.position().top)) {
						ishasbar = true; //表有障碍物
						//console.log($(ev))
					}
				});
				if(ishasbar) {
					return false;
				} else {
					return true; //表没有障碍物
				}
			} else {
				return false;
			}

		} else if($selected.hasClass('xiang')) {
			//判断是否过河了  (相不允许过河) 参数(选中,落子) 第一次判断
			if(xiangIsCrossTheRiver($selected, $lazi)) {
				return false;
			} else {
				//判断是否符合规则  第二次判断
				if(Math.abs($lazi.position().left - $selected.position().left) === 2 * box_size && Math.abs($lazi.position().top - $selected.position().top) === 2 * box_size) {
					//相(判断中间是否有障碍物) 第三次判断
					var ishasbar = false; //假设没有障碍物
					$.each($piece, function(i, ev) {
						if(($(ev).position().left === ($selected.position().left + $lazi.position().left) / 2) && ($(ev).position().top === ($selected.position().top + $lazi.position().top) / 2)) {
							ishasbar = true; //表有障碍物
							//console.log($(ev))
						}
					});
					if(ishasbar) {
						return false;
					} else {
						return true; //表没有障碍物
					}
				} else {
					return false;
				}
			}
		} else if($selected.hasClass('shi')) {
			//判断是否为敌军棋子
			if($selected[0].isEnemy) {
				//判断是否符合规则  第一次判断
				if(($lazi.position().left >= 3 * box_size - piece_size) && ($lazi.position().left <= 5 * box_size - piece_size) && ($lazi.position().top <= 2 * box_size - piece_size)) {
					//只能水平，或垂直走一个格子  第二次判断
					if(Math.abs($lazi.position().left - $selected.position().left) === box_size && Math.abs($lazi.position().top - $selected.position().top) === box_size) {
						return true;
					} else {
						return false;
					}
				} else {
					return false;
				}
			} else {
				//(红子)  判断是否符合规则
				if(($lazi.position().left >= 3 * box_size - piece_size) && ($lazi.position().left <= 5 * box_size - piece_size) && ($lazi.position().top >= 7 * box_size - piece_size)) {
					//只能水平，或垂直走一个格子
					if(Math.abs($lazi.position().left - $selected.position().left) === box_size && Math.abs($lazi.position().top - $selected.position().top) === box_size) {
						return true;
					} else {
						return false;
					}
				} else {
					return false;
				}
			}
		} else if($selected.hasClass('jiang')) {
			//判断是否为敌方棋子
			if($selected[0].isEnemy) {
				//判断是否符合规则     限制位置
				if(($lazi.position().left >= 3 * box_size - piece_size) && ($lazi.position().left <= 5 * box_size - piece_size) && ($lazi.position().top <= 2 * box_size - piece_size)) {
					//只能水平，或垂直走一个格子
					if(((Math.abs($lazi.position().left - $selected.position().left) === box_size) && $lazi.position().top === $selected.position().top) || ((Math.abs($lazi.position().top - $selected.position().top) === box_size) && $lazi.position().left === $selected.position().left)) {
						return true;
					} else {
						return false;
					}
				} else {
					return false;
				}
			} else {
				//判断是否符合规则    限制位置
				if(($lazi.position().left >= 3 * box_size - piece_size) && ($lazi.position().left <= 5 * box_size - piece_size) && ($lazi.position().top >= 7 * box_size - piece_size)) {
					//只能水平，或垂直走一个格子
					if(((Math.abs($lazi.position().left - $selected.position().left) === box_size) && $lazi.position().top === $selected.position().top) || ((Math.abs($lazi.position().top - $selected.position().top) === box_size) && $lazi.position().left === $selected.position().left)) {
						return true;
					} else {
						return false;
					}
				} else {
					return false;
				}
			}
		} else if($selected.hasClass('pao')) {
			//判断是否符合规则 (水平或垂直,直线走);
			var barNums = 0; //障碍物个数
			if(($lazi.position().left === $selected.position().left) ^ ($lazi.position().top === $selected.position().top)) {

				$.each($piece, function(i, ev) {
					//首先判断(筛选)是否在同一条直线上
					if(($piece.eq(i).position().left === $selected.position().left) || ($piece.eq(i).position().top === $selected.position().top)) {
						//再判断是否在两者之间(水平线上)
						if($lazi.position().left === $selected.position().left) {
							if((Math.abs($piece.eq(i).position().top) < Math.abs($selected.position().top) && Math.abs($piece.eq(i).position().top) > Math.abs($lazi.position().top)) || (Math.abs($piece.eq(i).position().top) > Math.abs($selected.position().top) && Math.abs($piece.eq(i).position().top) < Math.abs($lazi.position().top))) {
								barNums++;
							}
						}
						//再判断是否在两者之间(垂直线上)
						if($lazi.position().top === $selected.position().top) {
							if((Math.abs($piece.eq(i).position().left) < Math.abs($selected.position().left) && Math.abs($piece.eq(i).position().left) > Math.abs($lazi.position().left)) || (Math.abs($piece.eq(i).position().left) > Math.abs($selected.position().left) && Math.abs($piece.eq(i).position().left) < Math.abs($lazi.position().left))) {
								barNums++;
							}
						}
					}
				});

				if(barNums === 0) {
					//console.log($lazi !== $piece)
					//判断是吃子 还是移动
					if($lazi.hasClass('piece')) {
						//console.log($lazi !== $piece)
						return false;  //不隔棋子不允许吃
					} else {
						return true;
					}
				} else if(barNums === 1) {
					//判断是吃子 还是移动
					if($lazi.hasClass('piece')) {
						//console.log($lazi !== $piece)
						return true; //允许吃不允许移动
					} else {
						return false;
					}
				} else {
					return false;//隔着2个或多个不允许移动不允许吃
				}

			} else {
				return false;
			}
		} else if($selected.hasClass('zu')) {
			//判断是否为敌军棋子
			if($selected[0].isEnemy) {
				/*****判断是否符合规则*****/
				//判断是否过河   第一次判断
				if(zuIsCrossTheRiver($selected)) {
					//过河 后水平一个格子 且  不能后退
					if($lazi.position().top >= $selected.position().top) {//限制落子点在被选棋子下方
						//  向下移动 || 水平移动
						if((Math.abs($lazi.position().top - $selected.position().top) === box_size && $lazi.position().left === $selected.position().left) || (Math.abs($lazi.position().left - $selected.position().left) === box_size && $lazi.position().top === $selected.position().top)) {
							return true;
						} else {
							return false;
						}
					} else {
						return false;
					}
				} else {
					//没过河
					if($lazi.position().left === $selected.position().left && ($lazi.position().top - $selected.position().top) === box_size) {
						return true;
					} else {
						return false;
					}

				}

			} else {
				/*****判断是否符合规则*****/
				//我方棋子判断是否过河
				if(zuIsCrossTheRiver($selected)) {
					//过河 后水平一个格子   且 不能后退 
					if($lazi.position().top <= $selected.position().top) {//限制落子点在被选棋子上方
						//  垂直 || 水平移动
						if((Math.abs($lazi.position().top - $selected.position().top) === box_size && $lazi.position().left === $selected.position().left) || (Math.abs($lazi.position().left - $selected.position().left) === box_size && $lazi.position().top === $selected.position().top)) {
							return true;
						} else {
							return false;
						}
					} else {
						return false;
					}

				} else {
					//没过河
					if($lazi.position().left === $selected.position().left && ($lazi.position().top - $selected.position().top) === -box_size) {
						return true;
					} else {
						return false;
					}
				}

			}
			//return false;
		} else {
			prompt('请选择棋子!');
		}
		return true;
	}
	createPiece();
	//	//判断是否在同一条垂直线上
	//	var ishasBar = true; //假设有
	//	if($selected.position().left === $(".wall .chessboard div.jiang:eq(0)").position().left) {
	//		//如果在同一条垂直线上，再次判断是否中间有障碍物
	//		$.each($piece, function(i, ev) {
	//			if($(ev).position().left !== $selected.position().left) {
	//				//表没有障碍物
	//				ishasBar = false;
	//			}
	//		});
	//	}
	//	if(!ishasBar) {
	//		return true;
	//	}

});