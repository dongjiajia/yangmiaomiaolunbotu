window.onload=function(){
	var container=document.getElementById("container");
	var imgs=document.getElementById('imgs');
	var buttons=document.getElementById('button').getElementsByTagName('div');
	var left=document.getElementById('left');
	var right=document.getElementById('right');
	var temp=0;
	var flag=false;
	var timer;

//平移图像
	function animate(offset){
		flag=true;
		var newLeft=parseInt(imgs.style.left) + offset;
//平滑切换
		offset=offset/30;
		function run(){

			if( (offset<0&& (parseInt(imgs.style.left) >newLeft))||( offset>0 && (parseInt(imgs.style.left)<newLeft) )){
				imgs.style.left=parseInt(imgs.style.left) + offset + 'px';
				setTimeout(run,10);
			}else{

				if (newLeft<-1800) {
					imgs.style.left=-600+'px';
				};
				if (newLeft>-600) {
					imgs.style.left=-1800+'px';
				};
				flag=false;
			}
			
		}
		run();

		
	}
//移动小按钮
	function showButton(){
		for(var i=0;i<buttons.length;i++){
			buttons[i].className='';
		}
		buttons[temp].className='on';
	}
//点击切换上、下一张
	right.onclick=function(){

		if (temp==2) {
			temp=-1;
		};
		if (!flag) {
		temp++;
		animate(-600);	
		showButton();		
		};

	}
	left.onclick=function(){
		if (temp==0) {
			temp=3;
		};
		if (!flag) {
		temp--;
		animate(600);
		showButton();			
		};
	}
//小按钮点击切换
	for(var j=0;j<buttons.length;j++){
		buttons[j].onclick=function(){
			var index=parseInt(this.getAttribute('index'));
			offset=-600*(index-temp);
			if (!flag) {
				animate(offset);
				temp=index;
				showButton();
			};

		}
	}
//自动下一张
	function autoNext(){
		timer=setInterval(function(){
			right.onclick();
		},3000);
	}
	function stopNext(){
		clearInterval(timer);
	}
	autoNext();
	container.onmouseover=stopNext;
	container.onmouseout=autoNext;


}