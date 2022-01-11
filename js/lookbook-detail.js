
let dataChange = function(){
  $.ajax({
    url: 'js/data.json',
    success: function(data){

      // 룩북 이미지 삽입
      let imgLi = '', indiDot = '';
      let idx = localStorage.lookbookidx;
      $.each(data.lookbookImg[idx],function(k,v){
        imgLi += `
        <li class="img"><img src="${v}" alt=""></li>`;
      });
      $('.lookbook-img-wrap').html(imgLi);

      // 룩북 이미지를 감싸고 있는 곳의 넓이 정하기
      // 중괄호 배열의 길이를 가져올 경우에는 Object.keys().length 이용
      $('.lookbook-img-wrap').css('width',`${100*Object.keys(data.lookbookImg[idx]).length}%`);

      // 하단 인디케이터 삽입
      for(let indi = 0; indi<Object.keys(data.lookbookImg[idx]).length; indi++){
        $('.indi-dot').append(`<span>`);
      };
      $('.indi-dot span').eq(0).addClass('active');

      // 룩북 이미지 슬라이드
      let dPos = {x:0, dx:0, dir:'left'};
      let itemW = $('.lookbook-img-wrap li').width();
      let current = 0;

      $('.lookbook-img-wrap').draggable({
        axis:'x',
        revert: function(){
          dPos.dir = (dPos.x > dPos.dx) ? 'left' : 'right';
          dPos.state = itemW * 0.2 > Math.abs(dPos.x - dPos.dx);
          return dPos.state;
        },
        start: function(e){
          dPos.x = e.pageX;
        },
        drag: function(e){
          dPos.dx = e.pageX;
        },
        stop: function(){
          if(!dPos.state){
            if(dPos.dir == 'left'){
              if(current < $('.lookbook-img-wrap li').length - 1){
                current++;
                $('.indi-dot span').eq(current-1).removeClass('active');
                $('.indi-dot span').eq(current).addClass('active');
              }
            }else{
              if(current > 0){
                current--;
                $('.indi-dot span').eq(current+1).removeClass('active');
                $('.indi-dot span').eq(current).addClass('active');
              }
            }
            $('.lookbook-img-wrap').animate({
              left: `-${100 * current}%`
            });
          }
        }
      });

      // 버튼으로 슬라이드
      $('.arrow-prev').on('click',function(){
        if(current > 0)current--;
        $('.lookbook-img-wrap').animate({
          left: `-${100 * current}%`
        });
        $('.indi-dot span').eq(current+1).removeClass('active');
        $('.indi-dot span').eq(current).addClass('active');
      });
      $('.arrow-next').on('click',function(){
        if(current < $('.lookbook-img-wrap li').length - 1)current++;
        $('.lookbook-img-wrap').animate({
          left: `-${100 * current}%`
        });
        $('.indi-dot span').eq(current-1).removeClass('active');
        $('.indi-dot span').eq(current).addClass('active');
      });

    }
  })
};
dataChange();