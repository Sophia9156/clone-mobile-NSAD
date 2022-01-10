
let dataChange = function(){
  $.ajax({
    url: 'js/data.json',
    success: function(data){

      //종료된 이벤트 삽입
      let expiredEvent = '';
      for(let i = 0; i < 11; i++){
        expiredEvent +=`
        <li class="event-unit expired-unit">
          <figure class="event-img">
            <img src="${data.expiredEvent[i].thumb}" alt="">
          </figure>
          <div class="event-title">
            <h4>${data.expiredEvent[i].title}</h4>
            <p>${data.expiredEvent[i].date}</p>
          </div>
        </li>`;
      }
      $('.expired-event-wrap').html(expiredEvent);

      $('.expired-unit').on('click',function(){
        alert('종료된 이벤트입니다!');
      });


      window.onload = function(){
        $('.event-unit').eq(0).addClass('active');
      };
      
      window.onscroll = function(){
        $('.event-unit').each(function(k,v){
          if(v.offsetTop - window.innerHeight*0.8 < window.scrollY){
            v.classList.add('active');
          }
        });
      }
    }
  })
};
dataChange();