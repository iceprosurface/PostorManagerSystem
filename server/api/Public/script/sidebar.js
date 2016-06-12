var isClick = false;
function ini(){
	$("#off").hide();
	$("#site_1").hide();
	$("#site_2").hide();
	$("#site_3").hide();
}
function slip(){
	var side=$("#sideTable");
	var site_1=$("#site_1");
	var site_2=$("#site_2");
	var site_3=$("#site_3");
	var para_1=$("#para_1");
	var para_2=$("#para_2");
	var para_3=$("#para_3");
	if(isClick){
		isClick =false;
		para_1.fadeOut("fast");
		para_2.fadeOut("fast");
		para_3.fadeOut("fast");
		$("#site_3").animate({width:'1px'},"fast");
		$("#site_2").delay(200).animate({width:'1px'},"fast");
		$("#site_1").delay(400).animate({width:'1px'},"fast");
		$("#show").fadeIn(1000);
		$("#off").hide();
		side.delay(600).animate({height:'30px',opacity:'0.4'},"fast");
		side.animate({width:'50px',opacity:'1.0'},"slow");
		site_3.height(40);
		site_3.fadeOut();
		site_2.height(40);
		site_2.fadeOut();
		site_1.height(40);
		site_1.fadeOut();
	}else{
		isClick =true;
		side.animate({width:'100px',opacity:'0.4'},"slow");
		side.animate({height:'500px',opacity:'1.0'},"fast");
		$("#show").hide();
		$("#off").fadeIn(1000);
		$("#site_1").show();
		$("#site_1").height(40);
		$("#site_1").delay(1000).animate({width:'90px'},"slow");
		$("#site_2").show();
		$("#site_2").height(40);
		$("#site_2").delay(1200).animate({width:'90px'},"slow");
		$("#site_3").show();
		$("#site_3").height(40);
		$("#site_3").delay(1400).animate({width:'90px'},"slow");
		para_1.fadeIn("slow");
		para_2.fadeIn("slow");
		para_3.fadeIn("slow");
	}

}
