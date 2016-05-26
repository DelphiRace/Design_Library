(function( $ ){

    $.fn.bsDialogSelect = function(action, option) {
        if(typeof action == "object"){
            option = $.extend({}, $.fn.bsDialogSelect.defaults, action);
            action = "";
        }else{
            option = $.extend(true, {}, $.fn.bsDialogSelect.defaults, option);
        }
        // console.log(action, option);
        
        return new bsDialogSelect(this, option, action);
    }

    $.fn.bsDialogSelect.defaults = {
        headerCloseBtn: true,
        title: "&nbsp;",
        showFooterBtn: true,
        autoShow: true,
        width: null,
        height: null,
        modalClass: null,
        button: [],
        selectData: {},
        start: function(){}
    };

    function bsDialogSelect($selector, option, action){
        var self = this;
        this.bsDialogSelectShow = function(){     
            var nowModalIn = $(".modal.fade.in").length + 1;
            // $(".modal.fade.in").eq(-2).fadeOut(300);
            $selector.modal({
                backdrop: 'static',
                show: 'show'
            }).on("shown.bs.modal",function(event){

            }).on("hidden.bs.modal",function(event){
                // console.log($(".modal.fade.in"));
                $(".modal.fade.in").eq(-1).fadeIn(300);
                $selector.off("showbsDialogSelect");
            });
            
            if(nowModalIn > 1){
                $(".modal.fade.in").last().fadeOut(300);
            }
            
        };

        this.bsDialogSelectClose = function(){
            $selector.modal("hide");
            $selector.off("showbsDialogSelect");
        };

        this.start = function(){

            if($selector.find(".modal-content").length){
                return;
            }
            
            $selector.addClass("modal fade").attr("aria-hidden","true");
            var originContent = $selector.html();
            $selector.empty();
            var bsModal = $("<div>").addClass("modal-dialog");
            if(option.width != null){
                bsModal.css("width", option.width);
            }

            if(option.height != null){
                bsModal.css("height", option.height);
            }

            if(option.modalClass != null){
                bsModal.addClass(option.modalClass);
            }

            bsModal.appendTo($selector);
            var bsModalContent = $("<div>").addClass("modal-content").appendTo(bsModal);
            var bsModalHeader = $("<div>").addClass("modal-select-header");
            // title Button
            if(option.headerCloseBtn){
                $("<button>").addClass("close")
                .attr("data-dismiss","modal")
                .html("&times;")
                .click(function(){
                    $selector.off("showbsDialogSelect");
                })
                .appendTo(bsModalHeader);
            }
            $("<div>").addClass("modal-title").appendTo(bsModalHeader);
            // title into Header Bar
            bsModalHeader.appendTo(bsModalContent);

            // bodys
            var modalBody = $("<div>").addClass("modal-body");

            // title-bar content
            var titleBar = $("<div>").addClass("modal-select-title-bar");
            // if(option.headerCloseBtn){
                $("<i>").addClass("fa fa-search fa-lg modal-select-search")
                .click(function(){
                    // $selector.off("showbsDialogSelect");
                })
                .appendTo(titleBar);
            // }
            $("<h4>").addClass("modal-select-title").html(option.title).appendTo(titleBar);


            // body content
            titleBar.appendTo(modalBody);
            modalBody.append(originContent).appendTo(bsModalContent);

            // footer Button
            if(option.showFooterBtn){
                var buttonArea = $("<div>").addClass("modal-footer");
                    // console.log(typeof option.button, option.button);

                $.each(option.button,function(index,content){
                    var button = $("<button>");
                    
                    button.addClass("btn btn-default").text(content.text).click(function(){
                        if(typeof content["click"] != "undefined"){
                            content["click"]();
                        }
                    });
                    if(typeof content.className != "undefined"){
                        button.addClass(content.className);
                    }
                    button.appendTo(buttonArea);
                        
                });
                buttonArea.appendTo(bsModalContent);
            }

            option["start"]();
        }

        switch(action){
            case "show":
                self.bsDialogSelectShow();
                return;
            break;
            case "close":
                self.bsDialogSelectClose();
                return;
            break;
        }
            
        
        if(option.autoShow){
            self.start();
            self.bsDialogSelectShow();
        }else{
            self.start();
        }
    }
})(jQuery);