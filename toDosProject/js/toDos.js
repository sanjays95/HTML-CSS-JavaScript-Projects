//Click off TODO

$("ul").on("click","li",function(){
	$(this).toggleClass("completed");
});

$("ul").on("click","span",function(event){

	$(this).parent().fadeOut(400,function(){
		$(this).remove();});
		event.stopPropogation();
})

$("input[type='text']").keypress(function(event){
	if(event.which === 13){
	
		var toDoText = $(this).val() ;
		$(this).val("");
		$("ul").append("<li><span><i class='fa fa-trash' aria-hidden='true'></i></span> "+ toDoText + "</li>");
	}

})

$(".fa-pencil-square-o").click(function(){
	$("input[type='text']").fadeToggle();
})