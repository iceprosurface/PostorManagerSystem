$(function(){
 
                var ok1=false;
                var ok2=false;
                var ok3=false;
                var ok4=false;
                // 验证用户名
                $('input[name="usr"]').focus(function(){
                    $(this).parent().removeClass('success').addClass('error');
                }).blur(function(){
                    if($(this).val().length >= 3 && $(this).val().length <=12 && $(this).val()!=''){
                        $(this).parent().removeClass('error').addClass('success');
                        ok1=true;
                    }else{
                    	$(this).parent().removeClass('success').addClass('error');
                    }
                     
                });
 
                //验证密码
                $('input[name="password"]').focus(function(){
                	$(this).parent().removeClass('success').addClass('error');
                }).blur(function(){
                    if($(this).val().length >= 6 && $(this).val().length <=20 && $(this).val()!=''){
                    	$(this).parent().removeClass('error').addClass('success');
                        ok2=true;
                    }else{
                    	$(this).parent().removeClass('success').addClass('error');
                    }
                     
                });
 
                //验证确认密码
                    $('input[name="repassword"]').focus(function(){
                    	$(this).parent().removeClass('success').addClass('error');
                }).blur(function(){
                    if($(this).val().length >= 6 && $(this).val().length <=20 && $(this).val()!='' && $(this).val() == $('input[name="password"]').val()){
                    	$(this).parent().removeClass('error').addClass('success');
                        ok3=true;
                    }else{
                    	$(this).parent().removeClass('success').addClass('error');
                    }
                     
                });
                   
                //验证邮箱
                $('input[name="email"]').focus(function(){
                	$(this).parent().removeClass('success').addClass('error');
                }).blur(function(){
                    if(($(this).val().match( /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/))){
                    	$(this).parent().removeClass('error').addClass('success');
                    	ok4=true;
                    }else{                  
                    	$(this).parent().removeClass('success').addClass('error');
                    }
                     
                });
                //登录的验证
                $('.login').click(function(){
                	
                });
                //提交按钮,所有验证通过方可提交
 
                $('.register').click(function(){
                	
                    if(ok1 && ok2 && ok3 && ok4){
                    	var params=$('#register').serialize();
                    	$.ajax({
            				type:"post",
            				url:"/index.php/Register/validater",
            				data:params,
            				async:false,
            				dataType:"json",
            				success:function(data){
            					json=eval('('+data+')');
            					respondDialog('#dialog','',json.response);
            					$('#dialog').removeClass('info');
        						$('#dialog').removeClass('alert');
        						$('#dialog').removeClass('success');
        						$('#dialog').removeClass('warning');
            					if(json.stuts!=1){
            						if(json.stuts==3){
            							$('#dialog').addClass('warning');
            						}else{
            							$('#dialog').addClass('alert');
            						}
            						
            					}else{
            						$('#dialog').addClass('success');
            					}
            				}
            			});
                    }else{
                        return false;
                    }
                });
                 
            });