
let dataChange = function(){
  $.ajax({
    url: 'js/data.json',
    success: function(data){

      // 진행중 이벤트 삽입
      let specialLi = '';
      $.each(data.special,function(k,v){
        specialLi +=`
        <li class="special-unit"><a href="${v.link}">
          <figure class="special-img">
            <img src="${v.thumb}" alt="">
          </figure>
          <div class="special-title">
            <h4>${v.title}</h4>
            <p>${v.date}</p>
          </div>
        </a></li>`;
      });
      $('.special-wrap').html(specialLi);

      window.onload = function(){
        $('.special-unit').eq(0).addClass('active');
      };

      // 스크롤 시 위치값에 따라 아이템 보이기
      window.onscroll = function(){
        $('.special-unit').each(function(k,v){
          if(v.offsetTop - window.innerHeight*0.8 < window.scrollY){
            v.classList.add('active');
          }
        });
      }

      // 링크가 없을 경우에만 경고창 띄우기
      $('.special-unit').on('click',function(){
        if($(this).link != ''){
          alert('진행중인 기획전이 아닙니다.')
        }
      });

    }
  })
};
dataChange();