/**
 * 周围网点js
 */
var map;
//var marker;
var outlets = {
		createMarker : function(obj) {
			//map.removeOverlay(marker);    
			var li = $(obj);
			var point = new BMap.Point(li.attr('data-x'), li.attr('data-y')); 
			var marker = new BMap.Marker(point);        // 创建标注    
			map.addOverlay(marker);  
			map.centerAndZoom(point, 13);
			marker.addEventListener('click',function(event){  
				var content = '<b class="iw_poi_title" title="国瑞店">国瑞店'+li.attr('data-x')+'</b><br />'
					+'<dl class="iw_poi_content"><dt>地址：</dt><dd>东城区崇外大街18号LG层</dd><dt>电话：</dt><dd>01059432680</dd></dl>';
                var info=new BMap.InfoWindow(content);  
                marker.openInfoWindow(info);  
			});
		}
		
}

$(function(){
	 // 门店切换  美工写的  s
    $('.store-list > ul > li').click(function(){
      $(this).addClass('active').siblings().removeClass('active');
      $(this).parents('.store-list').siblings('.map-area').animate({'width': '700px'}, 300);
      $(this).parents('.store-list').siblings('.store-photo').show(300);
    });
    $('.store-photo').hover(function(){
      $(this).animate({'width': '500px'}, 300);
      $(this).siblings('.map-area').animate({'width': '450px'}, 300);
    }, function(){
      $(this).animate({'width': '250px'}, 'fast', function(){
        if ($(this).css('display') == 'block') {
          $(this).siblings('.map-area').animate({'width': '700px'}, 'fast');
        }
      });
    });
    $('.store-photo i.icon-close').click(function(){
      $(this).parent().hide(300);
      $(this).parent().siblings('.map-area').animate({'width': '950px'}, 300);
    });
 // 门店切换  美工写的  e
    //初始化分页控件
    $('#pagination').pagination({
        items: 30,
        itemsOnPage: 10,
        cssStyle: 'light-theme'
    });
    
    
 // 百度地图API功能
	map = new BMap.Map("map-area");            // 创建Map实例
	map.addControl(new BMap.NavigationControl());
	map.enableScrollWheelZoom();
	map.centerAndZoom('北京', 13);
    
});


