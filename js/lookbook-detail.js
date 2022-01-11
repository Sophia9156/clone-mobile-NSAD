
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

      // 무한루프 슬라이드를 위해 클론노드 추가하기
      // 첫번째와 마지막번째 리스트를 복제해 맨 앞과 맨 뒤에 추가하기
      const slideWrap = document.querySelector('.lookbook-img-wrap');
      const firstLi = slideWrap.firstElementChild;
      const lastLi = slideWrap.lastElementChild;
      let cloneFirst = firstLi.cloneNode(true);
      let cloneLast = lastLi.cloneNode(true);

      slideWrap.appendChild(cloneFirst);
      slideWrap.insertBefore(cloneLast,slideWrap.firstElementChild);

      // 룩북 이미지를 감싸고 있는 곳의 넓이 정하기
      // 중괄호 배열의 길이를 가져올 경우에는 Object.keys().length 이용
      // 룩북 이미지 개수에 복제한 리스트의 개수 2를 더해줌
      slideWrap.style.width = `${100*(Object.keys(data.lookbookImg[idx]).length+2)}%`;

      // 맨 앞에는 마지막번째 이미지가 삽입된 상태이기 때문에 자식요소의 한 개 넓이만큼만 이동을 시켜줌
      // 첫번째 이미지부터 시작되도록하기 위해
      slideWrap.style.left = '-100%';

      // 하단 인디케이터 삽입
      for(let indi = 0; indi<Object.keys(data.lookbookImg[idx]).length; indi++){
        $('.indi-dot').append(`<span>`);
      };
      $('.indi-dot span').eq(0).addClass('active');

      // 룩북 이미지 터치 슬라이드
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
              if(current < $('.lookbook-img-wrap li').length - 3){
                current++;
                $('.indi-dot span').eq(current-1).removeClass('active');
                $('.indi-dot span').eq(current).addClass('active');
                slideWrap.style.transition = '1000ms';
                slideWrap.style.left = `-${100 * (current+1)}%`;
              }else{
                // 복제한 슬라이드로 이동시킨 뒤 setTimeout을 이용해 원래 가야할 슬라이드로 transition 없이 이동시킨다
                current++;
                slideWrap.style.transition = '1000ms';
                slideWrap.style.left = `-${100 * (current+1)}%`;
                current = 0;
                $('.indi-dot span').removeClass('active');
                $('.indi-dot span').eq(current).addClass('active');
                setTimeout(function(){
                  slideWrap.style.transition = '0ms';
                  slideWrap.style.left = `-${100 * (current+1)}%`;
                },1050);
              }
            }else{
              if(current > 0){
                current--;
                $('.indi-dot span').eq(current+1).removeClass('active');
                $('.indi-dot span').eq(current).addClass('active');
                slideWrap.style.transition = '1000ms';
                slideWrap.style.left = `-${100 * (current+1)}%`;
              }else{
                slideWrap.style.transition = '1000ms';
                slideWrap.style.left = `-${100 * current}%`;
                current = Object.keys(data.lookbookImg[idx]).length - 1;
                $('.indi-dot span').removeClass('active');
                $('.indi-dot span').eq(current).addClass('active');
                setTimeout(function(){
                  slideWrap.style.transition = '0ms';
                  slideWrap.style.left = `-${100 * (current+1)}%`;
                },1050);
              }
            }
          }
        }
      });

      // 버튼으로 슬라이드
      $('.arrow-prev').on('click',function(){
        if(current > 0){
          current--;
          $('.indi-dot span').eq(current+1).removeClass('active');
          $('.indi-dot span').eq(current).addClass('active');
          slideWrap.style.transition = '1000ms';
          slideWrap.style.left = `-${100 * (current+1)}%`;
        }else{
          slideWrap.style.transition = '1000ms';
          slideWrap.style.left = `-${100 * current}%`;
          current = Object.keys(data.lookbookImg[idx]).length - 1;
          $('.indi-dot span').removeClass('active');
          $('.indi-dot span').eq(current).addClass('active');
          setTimeout(function(){
            slideWrap.style.transition = '0ms';
            slideWrap.style.left = `-${100 * (current+1)}%`;
          },1050);
        }
      });
      $('.arrow-next').on('click',function(){
        if(current < $('.lookbook-img-wrap li').length - 3){
          current++;
          $('.indi-dot span').eq(current-1).removeClass('active');
          $('.indi-dot span').eq(current).addClass('active');
          slideWrap.style.transition = '1000ms';
          slideWrap.style.left = `-${100 * (current+1)}%`;
        }else{
          current++;
          slideWrap.style.transition = '1000ms';
          slideWrap.style.left = `-${100 * (current+1)}%`;
          current = 0;
          $('.indi-dot span').removeClass('active');
          $('.indi-dot span').eq(current).addClass('active');
          setTimeout(function(){
            slideWrap.style.transition = '0ms';
            slideWrap.style.left = `-${100 * (current+1)}%`;
          },1050);
        }
      });

    }
  })
};
dataChange();