//城市
//从index.html截取过来。改变其运行时间为；请求数据返回之后执行；
function citySelect(element,t,index,callBack){
    this.container = element;
    this.clientHeight = window.innerHeight||document.documentElement.clientHeight;
    this.pageHeight = document.body.offsetHeight;
    this.child = t(".city-box",this.container);
    this.bgDiv =t(".city_bg",this.container);
    this.width = this.child.width();
    this.items = t(".city-list-2 li",this.container);
    this.nums = this.items.size();
    this.clone = "<span class='insertCon clearfix'></span>";
    this.colunm = Math.floor(this.width/this.items.width());
    this.cloes = t(".city-close",this.container);
    this.btn = t(".cor-gary");
    this.index = index;
    this.callback = callBack;
    this.setup();


}
window.citySelect.prototype = {
    setup:function(){
        var _this = this;
        this.innsertDom();
        this.bgDiv.css("height",this.pageHeight);
        this.dataCon = $(".insertCon",this.container);
        this.items.eq(this.index).find("a").eq(0).addClass("on");
        this.dataCon.eq(Math.floor(this.index/this.colunm)).html(this.items.eq(this.index).find("span").html()).css("display","block");
        this.items.each(function(a){
            var dataNum = Math.floor(a/_this.colunm);
            _this.items.eq(a).click(function(){
                _this.items.find("a").removeClass("on");
                _this.dataCon.hide();
                _this.doData($(this),dataNum,_this.dataCon);
            })
        })
        this.cloes.click(function(){
            _this.container.fadeOut();
        });
        this.bgDiv.click(function(){
            _this.container.fadeOut();
        });
        this.btn.click(function(){
            _this.container.fadeIn();
            _this.callback(_this.child,_this.clientHeight)
        })
    },
    innsertDom:function(){
        for(var i= this.colunm;i<this.nums;i+=this.colunm){
            this.items.eq(i).before(this.clone);
        }
        if(this.nums%this.colunm){
            this.items.eq(this.nums-1).after(this.clone);
        }
    },
    doData:function(element,index,dataCon){
        if(!element||!dataCon) return null;
        var datahtml = element.find("span");
        dataCon.eq(index).html(datahtml.html()).css("display","block");
        element.find("a").eq(0).addClass("on");
    }

}
