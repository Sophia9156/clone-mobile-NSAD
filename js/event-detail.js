

let dataChange = function(){
  $.ajax({
    url: 'js/data.json',
    success: function(data){

      // 이벤트 내용 삽입
      let eventDetail = '';
      $.each(data.ongoingEvent,function(k,v){
        eventDetail +=`
        <h4>${v.title}</h4>
        <p>${v.date}</p>
        <img src="${v.full}" alt="">`;
      });
      $('.event-content').html(eventDetail);

    }
  })
};
dataChange();