
// 팝업창 하루동안 보이지 않기
const todayNoShow = document.querySelector('.popup-bottom');

todayNoShow.onclick = function(){
  if($('.popup-bottom input').prop('checked')){
    let noShowDay = new Date();
    noShowDay.setDate(noShowDay.getDate() + 1);
    document.cookie = `test=하루동안;expires=${noShowDay.toUTCString()}`;
  }
  $('.popup').hide();
}
if(document.cookie.match('test')){
  $('.popup').hide();
}
$('.popup-close').on('click',function(){
  $('.popup').hide();
})


// 메인 슬라이드 상태바 움직이기
let interval, num=1;
let clear = function(){
  clearInterval(interval);
}
let barMove = function(){
  clear();
  interval = setInterval(function(){
    num < 3 ? num++ : num = 1;
    $('.slide-nav').html(`0${num}`);
    $('.slide-status-bar span').css('width',`${33.3*num}%`);
  },4000)
}
$('.slide-status-bar span').css('width',`${33.3}%`)
$('.slide-nav').html(`01`);
barMove();


// 하단 이벤트 슬라이드 표시
const elEvent = document.querySelector('.event');

window.onload = function(){
  setTimeout(function(){
    elEvent.classList.add('active');
  },300)
}


// 하단 이벤트 슬라이드 터치로 움직이기
let dPos = {x:0, dx:0, dir:'left'};
let itemW = $('.eventSlide1').width();
let current = 0;

$('.event-slide-bg').draggable({
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
        if(current < $('.eventSlide').length - 1)current++;
      }else{
        if(current > 0)current--;
      }
      $('.event-slide-bg').animate({
        left: `-${104 * current}%`
      });
      $('.event-status span').animate({
        left: `${50 * current}%`
      })
    }
  }
});
