$(function(){
	for(var i =0;i<$('.main-title').length;i++){
		var wH2 = $('.main-title h2').eq(i).width();
		var wSpan = $('.main-title h2 span').eq(i).innerWidth();
		var lineWidth = (wH2-wSpan)/2;
		$('.line-l').eq(i).width(lineWidth);
		$('.line-r').eq(i).width(lineWidth);
	};
	
	$(window).scroll(function(){
		var scrollTop = $(window).scrollTop();
		if(scrollTop>600){
			$('.fixed-button').show();
		}else{
			$('.fixed-button').hide();
		}
	});

	$('.returnTop').click(function(){
		$("html,body").animate({scrollTop:0}, 300);
	});
//
    $('.TAB_CLICK li:not(:last)').hover(function(){
        var idx = $(this).index();
        var con = $(this).parents('.TAB_CLICK');
        var conBox = $(con).attr('id');
        $(this).addClass('on').siblings('li:not(:last)').removeClass('on');
        $(conBox).hide().eq(idx).fadeIn();
    })

    $('.TAB_CLICK2 li').click(function(){
        var idx = $(this).index();
        var con = $(this).parents('.TAB_CLICK2');
        var conBox = $(con).attr('id');
        $(this).addClass('on').siblings('li').removeClass('on');
        $(conBox).hide().eq(idx).fadeIn();
    })

    if( typeof WOW == 'function'){
          if (!(/msie [6|7|8|9]/i.test(navigator.userAgent))){
              new WOW().init();
          };
      }

      $('.list_answer a').click(function(){
            $(this).parents('li').toggleClass('on').siblings().removeClass('on');
            $(this).parents('li').find('.con').stop(true,true).slideToggle(400).parents('li').siblings().find('.con').slideUp(400);
      })



      $('.popBtn').click(function() {
          $('.ind-loopvideo-hook').addClass('open');
          iframeVideo($(this));
      });

      $('.indvideomask,.ind-videoclose').click(function() {
          $('#indVideoIframe').remove();
          $("#indLoopvideo").removeClass('open');
      });

      $('.list_position li').hover(function(){
            $(this).find('.con').toggle();
      })

      $('.header-nav li').hover(function(){
            $(this).find('.con').stop().slideToggle();
      })


      $('.header .login').click(function(){
            $('.popLogin,.popLogin .login,.m_mask').fadeIn();
      })

      $('.header .registered').click(function(){
            $('.popLogin,.popLogin .registered,.m_mask').fadeIn();
      })

      $('.popLogin .tab').click(function(){
           $(this).parents('.conbox').hide().siblings().show();
      })

      $('.close').click(function(){
            $('.popLogin .conbox,.m_mask,.popLogin,#pop_ad').fadeOut();
      })

      $('.footer-menu li').hover(function(){
        $(this).find('.con').stop(true,true).slideToggle();
      })

      $('.fixed-button li').hover(function() {
          /* Stuff to do when the mouse enters the element */
          // $(this).toggleClass('on');
          $(this).find('.pop').stop(true,true).fadeToggle();
          $(this).toggleClass('on');
          fAuto($('.fixed-button dd em'));
      });
});

function banner(){
	var num = 0;
	var set = null;

	var liLength = $('.banner li').length;

	$('.banner ul').width(liLength*100+'%');
	$('.banner li').width((100/liLength)+'%');

	if(liLength>1){
		for(var i=0;i<liLength;i++){
			var span = document.createElement('span');
			if(i==0){
				span.className="act";
			}
			$('.banner-page').append(span);
		}
	};
	set = setInterval(function(){
		if(!$('.banner ul').is(":animated")){
			num++;
			if(num>=liLength){
				num =0;
			}

			$('.banner ul').animate({
                left:-num*100+'%'
            },500);

			$('.banner-page span').eq(num).addClass('act').siblings('span').removeClass('act');
		}
	},5000);

	$('.banner-page span').click(function(){
		num = $(this).index();
		$('.banner ul').animate({left:-num*100+'%'},500);
		$('.banner-page span').eq(num).addClass('act').siblings('span').removeClass('act');
	});


};

function reviews(){
	var nNum = 0;
    var nLi = $('.reviews-scroll li').length;
    $('.reviews-scroll ul').width(nLi*242);
    
    if( nLi <= 5 ){
        $('.reviews-btn-l,.reviews-btn-r').hide();
    }else{
        $('.reviews-btn-l,.reviews-btn-r').show();
    }

	$('.reviews-btn-r').click(function(){
        clearInterval(Lsum);
		if(!$('.reviews-scroll ul').is(':animated')){
			nNum++;
			if(nNum <= nLi-5){
				$('.reviews-scroll ul').animate({
                    left:-nNum*242
                },200);
			}else{
                nNum = 0;
                $('.reviews-scroll ul').animate({
                    left:0
                },200);
			}
        };
        Lsum = setInterval(autoPlay,4000);
	});

	$('.reviews-btn-l').click(function(){
        clearInterval(Lsum);
		if(!$('.reviews-scroll ul').is(':animated')){
			nNum--;
			if(nNum >=0){
				$('.reviews-scroll ul').animate({left:-nNum*242},200);
			}else{
                nNum = nLi - 5 ;
				$('.reviews-scroll ul').animate({
                    left : - (nNum * 242)
                },200);
			}
        }
        Lsum = setInterval(autoPlay,4000);
    });
    
    function autoPlay(){
       $('.reviews-btn-r').trigger('click');
    }

    var Lsum = setInterval(autoPlay,4000);

    $('.reviews-scroll').hover(function(){
        clearInterval(Lsum);
    },function(){
        Lsum = setInterval(autoPlay,4000);
    })

}

function teacher(){
	var tNum = 0;
    var tLi = $('.teacher-slide .teacher-scroll li').length;
    if( tLi <= 5 ){
        $('.teacher-btn-l,.teacher-btn-r').hide();
    }else{
        $('.teacher-btn-l,.teacher-btn-r').show();
    }

    $('.teacher-slide .teacher-scroll ul').width(tLi*242);
    
	$('.teacher-btn-r').click(function(){
        clearInterval(Lsum);
		if(!$('.teacher-slide .teacher-scroll ul').is(':animated')){
			tNum++;
			if(tNum<=tLi-5){
				$('.teacher-slide .teacher-scroll ul').animate({left:-tNum*242},200);
			}else{
                tNum = 0;
                $('.teacher-slide .teacher-scroll ul').animate({left:0},200);
			}
        };
        Lsum = setInterval(autoPlay,4000);
	});
	$('.teacher-btn-l').click(function(){
        clearInterval(Lsum);
		if(!$('.teacher-slide .teacher-scroll ul').is(':animated')){
			tNum--;
			if(tNum >=0){
				$('.teacher-slide .teacher-scroll ul').animate({left:-tNum*242},200);
			}else{
                tNum=tLi-5;
                $('.teacher-slide .teacher-scroll ul').animate({left:-tNum*242},200);
			}
        }
        Lsum = setInterval(autoPlay,4000);
    });
    
    function autoPlay(){
        $('.teacher-btn-r').trigger('click');
     }
 
     var Lsum = setInterval(autoPlay,4000);
 
     $('.teacher-slide .teacher-scroll ul').hover(function(){
         clearInterval(Lsum);
     },function(){
         Lsum = setInterval(autoPlay,4000);
     })
}

/*首页视频路径*/
function iframeVideo(video) {
    var videosrc = video.attr('data-video');
    var videodesc = video.attr('data-videodesc');
    var videoText = video.attr('data-text');
    $('.ind-loopvideo-hook .video-desc').html(videodesc);
    $('#indLoopvideo .text').text(videoText);
    var iframe = $('<iframe src="' + videosrc + '" class="ind-videoiframe" id="indVideoIframe" scrolling="no" allowfullscreen></iframe>');
    iframe.appendTo($('.ind-loopvideo-hook .video-inner'));
}

// /*视频关闭*/
// function videoCloseFun() {

//     var video_wrap = $("#indLoopvideo");

// }

function adAuto (el) {
    // body...
    var mt = - (el.innerHeight()/2);
    el.css('margin-top', mt);

}


function fAuto (el) {
    el.each(function(index, e) {
        // var mt = - ($(this).innerHeight()/2);
        var mt = - $(this).innerHeight()/2;
        // console.log(mt);
        $(this).css('margin-top', mt);
    });
}


window.onload=function(){
	banner();
	reviews();
	teacher();

    $(".news-banner").slide({
        mainCell:".bd ul",
        autoPlay:true,
        autoPage:true,
        titCell:'.hd ul'
    });

    $(".lecturerSlide .slide").slide({
        mainCell:".bd ul",
        effect:"leftLoop",
        autoPlay:true,
        vis:3
    });

    $('.fixed-button .brank .bd a').each(function(i, el) {
        $('.fixed-button .brank .bd a').slice(i*5,i*5+5).wrapAll('<li></li>')
    });

    $(".fixed-button .brank").slide({
        mainCell:".bd ul",
        // effect:"fad",
        autoPlay:true
        // vis:5
    });

    // $('.unit-content .bd a').each(function(i, el) {
    //     $('.unit-content .bd a').slice(i*24,i*24+24).wrapAll('<li></li>');
    // });

    $('.unit-content').slide({
        titCell:".hd ul",
        mainCell:".bd ul",
        autoPage:true,
        // effect:"leftLoop",
        autoPlay:true
    })

    adAuto($('#pop_ad'));

    
    setTimeout(function(){
        $('.m_mask,#pop_ad').fadeOut(); 
    },3000)


    
    // 判断是否 第一次进入页面
    if(!sessionStorage.getItem("autosave")){
         sessionStorage.setItem("autosave",true);
    }else{
        $('#pop_ad,.m_mask').hide();
    }
}


$(window).resize(function(){
    adAuto($('#pop_ad'));
})

$(function(){
    $('#register').click(function(){
        
        //var rege =/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
		var rege = /^[\w\-\.]+@[\w\-\.]+(\.\w+)+$/;
        if($.trim($('#reg input[name=email]').val()) == ''){
            $('#reg input[name=email]').focus();
            return false;
        }else if(!rege.test($.trim($("#reg input[name='email']").val()))){
            alert('请输入正确的邮箱！');
            return false;
        }

        if($('#reg input[name=pasd]').val() == ''){
            $('#reg input[name=pasd]').focus();
            return false;
        }else if($('#reg input[name=pasd]').val().length < 6 || $('#reg input[name=pasd]').val().length > 18){
            alert('密码的长度在6到18位字符之间！');
            return false;
        }
		if($('#reg input[name=pasds]').val() == ''){
			alert('请确认密码！');
            return false;
			}
        if($('#reg input[name=pasd]').val() != $('#reg input[name=pasds]').val()){
            alert('两次密码不一致！');
            return false;
        }

        if($.trim($('#reg input[name=username]').val()) == ''){
            $('#reg input[name=username]').focus();
            return false;
        }

        if($.trim($('#reg input[name=verify]').val()) == ''){
            $('#reg input[name=verify]').focus();
            return false;
        }

        $('#reg').submit();
        
    })
    $('#login_').click(function(){

        if($.trim($('#log input[name=email]').val()) == ''){
            $('#log input[name=email]').focus();
            return false;
        }

        if($.trim($('#log input[name=pasd]').val()) == ''){
            $('#log input[name=pasd]').focus();
            return false;
        }

        $('#log').submit();
        
    })
})