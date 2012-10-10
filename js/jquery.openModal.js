function exit(hpId, dT){
  /**************************************************************************************
  * CONTROLS CLOSING THE MASK
  **************************************************************************************/
  $('a.close.modal-close-x-button').click(function(){
    $('#ap-modal-mask').hide();
    $('.ap-window').hide();
    if(hpId){
      hpId.load();
      $("."+dT).hide();
    }
  });
  //added by jbeach so that we can apply the close class and have it work functionally on both 
  //the corner x and the standard theme cancel buttons (and anything else)
  $('.close').click(function(){
    $('#ap-modal-mask').hide();
    $('.ap-window').hide();
    if(hpId){
      hpId.load();
    $("."+dT).hide();
    }
  });   
  $('#ap-modal-mask').click(function(){
    $(this).hide();
    $('.ap-window').hide();
    if(hpId){
      hpId.load();
      $("."+dT).hide();
    }
  }); 
}

function openModal(id, data){
  $(id).click(function(e){

    	e.preventDefault();
    	
    	var maskHeight = $(document).height(),
    		maskWidth = $(window).width(),
    		winH = $(window).height(),
    		winW = maskWidth,
    		winO = $(window).scrollTop(),
        target = $(e.target),
        actionId = target.attr('action-id'),
        text = target.text(),
        firstChildId,
        markup,
        homePlayerId,
        dataType = data.type;

    	if(data.type === "video"){  
        homePlayerId=_V_(data.id);
        $("."+dataType).css("display","block").fadeIn(2000);
        //$(".vjs-big-play-button").css("display","block");
        //$(".vjs-controls").css("display","none");

        // $(".vjs-big-play-button").click(function(){
        //   $(".vjs-controls").css("display","block");
        // });
        homePlayerId.play();
        $("#"+data.id).css("z-index","2000").center();
    	}
    	
    	if(data.type === "approveReject"){
        markup ='<div class="clicked-row-content">' + "id : " + actionId + ", text : " + text + '</div>';
        $('#values').html(markup);
        firstChildId = "#" + $('#approveReject > div').attr('id');
    	}

      $('#ap-modal-mask').css({'width':maskWidth,'height':maskHeight});
      $('#ap-modal-mask').fadeIn(1000);
      $(firstChildId).center();
      $(firstChildId).fadeIn(2000);
      exit(homePlayerId, dataType);

      $(window).resize(function () {
          maskHeight = $(document).height();
          maskWidth = $(window).width();
          $('#ap-modal-mask').css({'width':maskWidth,'height':maskHeight});
      });

  });

}

(function($){
  $.fn.openModal = function(options){
  	var id = $(this), opts;
    
    if(options.type === "video"){
      $.fn.openModal.defaults = {
          type: "video",
          videoImg: {
            poster:'https://secure-media.collegeboard.org/CollegePlanning/media/image/Student_MH015_Photo_710w.jpg',
            height:'399',
            width:'710'},
          video: {src:'https://secure-media.collegeboard.org/CollegePlanning/media/video/student/Student_MH015_Video.mp4',
          type:'video/mp4'},
          captions: false
      };
    }else{
      $.fn.openModal.defaults = {
          type: "approveReject"
      };
    }


  	opts = $.extend({}, $.fn.openModal.defaults, options);

  	openModal(id, opts);

  	return this;	
  	
  };

})(jQuery);
