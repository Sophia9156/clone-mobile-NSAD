
let dataChange = function(){
  $.ajax({
    url: 'js/data.json',
    success: function(data){

      // 룩북 리스트 삽입
      let lookbookList = '';
      $.each(data.lookbook,function(k,v){
        lookbookList +=`
        <li class="lookbook-unit"><a href="lookbook-detail.html">
          <figure class="lookbook-thumb">
            <img src="${v.thumb}" alt="">
          </figure>
          <div class="lookbook-title">
            <h4>${v.title}</h4>
          </div>
        </a></li>`;
      });
      $('.lookbook-wrap').html(lookbookList);

      window.onload = function(){
        $('.lookbook-unit').eq(0).addClass('active');
      };

      window.onscroll = function(){
        $('.lookbook-unit').each(function(k,v){
          if(v.offsetTop - window.innerHeight*0.8 < window.scrollY){
            v.classList.add('active');
          }
        });
      }

      $('.lookbook-unit').on('click',function(){
        localStorage.lookbookidx = $(this).index();
      });
    }
  })
};
dataChange();