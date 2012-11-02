(function($){

$(function() {

  // SLIDER PLUGIN
  // EXAMPLE USAGE : $('#topSlider').slider('', 1000);


  $.fn.extend({
    slider: function(x, y){


      var viewport = window.innerWidth;
      var parentID = $(this).attr('id');
      var slides = $(this).children("div.slide");
      var slideCount = slides.length;
      var slideWidth = 100/slideCount
      
      $(this).addClass('slider');
      $(this).append('<nav><ul></ul></nav>'); 

      var num = 0

      //add bullets and number slides
      slides.each(function(){
        num++

        $(this).addClass('item-'+ num +'')
        $(this).parent().find('nav ul').append('<li style="width:'+ slideWidth +'%;" rel="'+ num +'">&bull;</li>');

        if(num == 1){
          $(this).addClass('active')
          $(this).parent().find('nav ul li:first').addClass('active');
        }else{}
      });
      // end numbering


      function dotClick(){
        $('#'+ parentID +' nav ul li').unbind("click", dotClick);


        var currentSlide = $('#'+ parentID +' nav ul li.active').attr("rel");
        var nextSlide = $(this).attr("rel");

        //progress slide from right to left

        if(nextSlide > currentSlide){
          
          $('#'+ parentID +' .slide.active').animate({
            left: '-100%'
          },500, function(){
            $(this).removeClass('active').removeAttr('style');
          });


          $('#'+ parentID +' .slide.item-'+ nextSlide +'').attr('style', 'left:100%;').animate({
            left: '0%'
          },500, function(){
            $(this).addClass('active');
          });
          
        }
        else if(currentSlide > nextSlide){
          $('#'+ parentID +' .slide.active').removeClass('active').animate({
            left: '100%'
          },500, function(){
            $(this).removeAttr('style');
          });


          $('#'+ parentID +' .slide.item-'+ nextSlide +'').addClass('active').attr('style', 'left:-100%;').animate({
            left: '0%'
          },500, function(){
          });
        }

        $('#'+ parentID +' nav ul li.active').removeClass("active");
        $(this).addClass("active");

        

        setTimeout( function(){
          $('#'+ parentID +' nav ul li').bind("click", dotClick);
        }, 1000);
      }


      $('#'+ parentID +' nav ul li').bind("click", dotClick);




        $('#'+ parentID +'').swipeleft(function(){
          if($('#'+ parentID +' .slide.active').hasClass("item-"+ slideCount +"")){}else{
            $('#'+ parentID +' nav ul li.active').next().trigger('click');
          }
        });

        $('#'+ parentID +'').swiperight(function(){
          
          if($('#'+ parentID +' .slide.active').hasClass("item-1")){}else{
            $('#'+ parentID +' nav ul li.active').prev().trigger('click');
          }
          
        });

      
      
    }
  });

});

})( jQuery.noConflict() );

