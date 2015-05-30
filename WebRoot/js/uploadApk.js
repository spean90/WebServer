var uploadApk = {
		upload : function(){
			 $('#fileForm').form('submit',{  
				 	url : '/file/uploadApk.do',
			        success:function(data){  
			        	data = JSON.StrToJSON(data);
			           if (data.code=='0000') {
			        	   $('#version').val(data.object.version);
			        	   $('#message').val(data.object.message);
			           }else {
			        	   Modal.showAlert(data.msg);
			           }
			        }  
			    });   
		},
		pushFile : function(){
			 $('#fileForm').form('submit',{  
				 	url : '/file/pushApk.do',
			        success:function(data){  
			        	data = JSON.StrToJSON(data);
			           if (data.code=='0000') {
			        	   Modal.showAlert('操作成功');
			           }else {
			        	   Modal.showAlert(data.msg);
			           }
			        }  
			    });   
		}
}

$(function(){});