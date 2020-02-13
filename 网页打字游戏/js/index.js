// 创建元素的计时器
var createElement;
// 创建元素移动的计时器
var moveElement;
// 开始按钮|暂停按钮
var sums=0;
var flag = 0;  //0:将要开始动作 1将要暂停动作
var speedval = 1000;  //元素下落的速度
var element_sum = 0;
var element_zhengquelv =0.00;
var time = 0;
var speed1 =0 ;
var jishi = 0;
var jishi2 = 0;
// 创建一个代码块,在页面元素全部加载完成之后,再执行下面的脚本代码
$(function(){
	// alert("ccccccc");
	// 1点击"说明"按钮,弹出弹窗;点击关闭的时候,关闭弹窗.
	$("#decription").click(function(){
		// 弹出“说明弹窗”，让当前说明窗口，  display变为 block
		$("#decription_win").css("display","block");
		
	});
	$("#decription_win span").click(function(){
		// 弹出“说明弹窗”，让当前说明窗口，  display变为 none
		$("#decription_win").css("display","none");
	});
	
	// 2点击“开始”按钮，弹出登录界面
	$("#start").click(function(){
		$("#lohin_win").css("display","block");
		});
	// 3当点击 登录界面中"注册"按钮，弹出注册界面
	$("#go_register").click(function(){
		// 注册界面显示出来
		$("#register_win").css("display","block");
		// 登陆界面隐藏
		$("#lohin_win").css("display","none");
	    });	
		// 4当点击注册界面"注册"按钮,跳转登录页面
		$("#register").click(function(){
			// 注册界面隐藏
			$("#register_win").css("display","none");
			// 登录界面弹出来
			$("#lohin_win").css("display","block");
		});
		// 5当点击"登录"按钮,跳转主界面
		$("#lohin").click(function(){
			// 登录页面隐藏
			$("#lohin_win").css("display","none");
			//打字游戏界面隐藏
			$("#page1").css("display","none");
			//page2主页面显示
			$("#page2").css("display","display");
			
		});
	
	    // 6点击"设置""按钮,弹出设置快慢界面
	    $("#buts_set").click(function(){
			// 显示速度设置界面
			$("#speed").css("display","block");
			
		});
	    // 7点击"关闭"设置界面
	     $("#speed span").click(function(){
			  $("#speed").css("display","none");
		 });
		
		// 8点击"退出"按钮,弹出page1
		$("#buts_exit").click(function(){
			 // page1弹出
			 $("#page1").css("display","block");
			 // page2隐藏
			 // $("#page2").css("display","none");
		});
		// 9 开始游戏
		$("#buts_start").click(function(){
			if(flag == 0){ 
				jishi2 = setInterval(function() {
										jishi++;			// 每秒jishi变量+1
										speed = Math.floor(sums/jishi*60);		//打字的速度
																				//打字总数*（jishi/60）
										// $("#element_sum").html(element_score.toFixed(2)); 	// 修改游戏界面的得分值
										// $("#element_correctRate").html(element_correctRate.toFixed(2)); 	// 修改游戏界面的正确率
										$("#element_speed").html(speed); 	// 修改游戏界面的打字速度
									}, 1000);
				
				
				//判断标记，是否为0
				moveElement = setInterval(function(){
					// // 找到page2页面中的所有类名".word"的元素,
					// 让其样式属性top根据其当前的位置,
					// 进行相应的增长,从而是实现下落的效果
					var spans = $("#page2 .word");
					for(var i=0;i<spans.length;i++){
						var span = spans[i];//javascript对象
						//获取到的数据做一个处理,"-30px"
						var top_centent = $(span).css("top");
						top_centent = top_centent.replace("px","");//为了能够参与运算 将px去掉						
						if(top_centent > 430){
								$(span).remove();
						}else{
								top_centent = parseInt(top_centent) + 5;// -30 + 5 =-25 :设置当前元素改变
								$(span).css("top",top_centent+"px");
							}														
						}												
					},speedval);			
				// 将要开始
				flag = 1;//切换为将要暂停的状态
				// 标记变换，由0变为1：开始与暂停之间变换
				$("#buts_start").html("暂停");				
				//按钮上文字的变化				
			}else{
				// 将要暂停
				 clearInterval(createElement);
				 clearInterval(moveElement);
				// 标记变换，由0变为1：开始与暂停之间变换
				flag = 0;
		
				
				//按钮上文字的变化
				$("#buts_start").html("继续");
			
			}
			// 创建一个计时器,动作:不停的创建页面元素
			createElement = setInterval(function(){
				// 1动态生成一个元素,放到page2元素中
				var left_content = randomFrom(0,620);
				// 2随机生成一个字母
				var word_number = randomFrom(97,122);
				var word = String.fromCharCode(word_number);				
				$("#page2").append("<span class='word' style='left:"+left_content+"px;'>"+word+"</span>");
				// "+word+"				
			},5000);			
		});
		// 10点击键盘 消灭页面对应的字母元素.
		$("body").keypress(function(){
			
			sums=sums+1;
			// alert(sums);
			//1 获取当前用户按下的键
			var keycode = event.keyCode;
			keycode = String.fromCharCode(keycode);
			// alert(keycode);
			// 2拿这个键和页面中所有存在的,类名为.word的元素的内容进行比对
			// 如果比对成功,则消灭他,否则,不变
			var spans = $("#page2 .word")
			for(var i=0;i<spans.length;i++){
				var span = spans[i];
				var span_content = $(span).html();
				if(span_content == keycode){//字母被击中了
					// 消灭元素
					$(span).remove();
					// 分数+1
					element_sum = element_sum + 1;
					// 给止指定位置赋值
					$("#element_sum").html(element_sum);
					//11得分正确率
					element_zhengquelv = element_sum/sums*100;
					$("#element_zhengquelv").html(element_zhengquelv.toFixed(2));
					
				}else{				
					element_zhengquelv = element_sum/sums*100;
					$("#element_zhengquelv").html(element_zhengquelv.toFixed(2));
				}
				
			}
			
		});
		
		$("#speed select").change(function(){//切换速度按钮 就会触发事件
			
			//1获取当前下拉列表，选中的值
			var p = this.selectedIndex;
			var q = $('option').eq(p).val();
			// alert(q);
			
			
			//2根据选中的值 去判定下落的速度
			if(q == "快" ){
				speedval = 100;
			}else if(q == "中"){
				speedval = 500;
			}else if(q == "慢"){
				speedval = 2000;
			}
		})
	    // 12 结束功能
		$("#buts_over").click(function(){
			$("#page2 .word").remove();
			// 停止计时器
			clearInterval(createElement);
			clearInterval(moveElement);
			
		});
		
		
		
})