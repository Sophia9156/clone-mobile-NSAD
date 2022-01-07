

let dataChange = function(){
  $.ajax({
    url: 'js/data.json',
    success: function(data){

      // 진행중 이벤트 삽입
      let ongoingEvent = '';
      $.each(data.ongoingEvent,function(k,v){
        ongoingEvent +=`
        <li class="event-unit">
          <figure class="event-img">
            <img src="${v.thumb}" alt="">
          </figure>
          <div class="event-title">
            <h4>${v.title}</h4>
            <p>${v.date}</p>
          </div>
        </li>`;
      });
      $('.ongoing-event-wrap').html(ongoingEvent);

      //종료된 이벤트 삽입
      let expiredEvent = '';
      for(let i = 11; i < 22; i++){
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
      })
    }
  })
};
dataChange();