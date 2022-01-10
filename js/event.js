
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

      window.onload = function(){
        $('.event-unit').eq(0).addClass('active');
      };

    }
  })
};
dataChange();