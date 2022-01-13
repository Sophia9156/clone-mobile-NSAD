let dataChange = function(){
  $.ajax({
    url:'js/data.json',
    success: function(data){
      // 상품 목록 뿌리기
      let productList = '';
      for(let i=0; i<20; i++){
        productList += `<li>
                          <div class="product-img-box">
                            <a href="product-detail.html">
                              <img src="${data.newCollection[i].thumb}" alt="">
                            </a>
                          </div>
                          <div class="product-info">
                            <a href="product-detail.html">
                              <h4>${data.newCollection[i].name}</h4>
                              <span>￦${data.newCollection[i].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')}</span>
                            </a>
                          </div>
                        </li>`;
      };

      $('.product-list-box-all').html(productList);

      // SHOW MORE 눌렀을 때 상품 더 뿌리기
      let clickNum = 0;
      $('.display-more-wrap').on('click',function(){
        clickNum++;
        if(clickNum == 1){
          for(i=20*clickNum; i<20*(clickNum+1); i++){
            productList += `<li>
                              <div class="product-img-box">
                                <a href="product-detail.html">
                                  <img src="${data.newCollection[i].thumb}" alt="">
                                </a>
                              </div>
                              <div class="product-info">
                                <a href="product-detail.html">
                                  <h4>${data.newCollection[i].name}</h4>
                                  <span>￦${data.newCollection[i].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')}</span>
                                </a>
                              </div>
                            </li>`;
          }
        }else{
          // 아직 안 보여준 상품이 20개 보다 적을 때 상품 뿌리기
          productList += `<li>
                              <div class="product-img-box">
                                <a href="product-detail.html">
                                  <img src="${data.newCollection[40].thumb}" alt="">
                                </a>
                              </div>
                              <div class="product-info">
                                <a href="product-detail.html">
                                  <h4>${data.newCollection[40].name}</h4>
                                  <span>￦${data.newCollection[40].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')}</span>
                                </a>
                              </div>
                            </li>`;
          $('.display-more-wrap').hide();
        }
        
        $('.product-list-box-all').html(productList);
      });


      // 카테고리 인덱스 활성화 표시, 상품 개수 표시하기
      $('.product-list-category li').eq(0).addClass('active');
      $('.product-list-box-wrap ul').eq(0).addClass('active');
      $('.product-list-total em').html(data.newCollection.length);

      let idx=0;
      $('.product-list-category li').on('click',function(){
        idx = $(this).index();

        $('.product-list-category li').removeClass('active');
        $('.product-list-box-wrap ul').removeClass('active');

        $('.product-list-category li').eq(idx).addClass('active');
        $('.product-list-box-wrap ul').eq(idx).addClass('active');

        if($('.product-list-box-wrap ul').eq(0).hasClass('active')){
          $('.product-list-total em').html(data.newCollection.length);
        }else{
          $('.product-list-total em').html('0');
        }
      });

      // 클릭한 제품의 인덱스 로컬스토리지에 남기기
      $('.product-list-box li').on('click',function(){
        localStorage.productIdx = $(this).index();
      });
    }
  });
  //setTimeout(dataChange,600000);
};
dataChange();



// 보기 타입 전환
$('#view-type-grid').addClass('active');
$('.product-list-box').removeClass('list');

$('#view-type-list').on('click',function(){
  $('#view-type-grid').removeClass('active');
  $('#view-type-list').addClass('active');
  $('.product-list-box').addClass('list');
});
$('#view-type-grid').on('click',function(){
  $('#view-type-list').removeClass('active');
  $('#view-type-grid').addClass('active');
  $('.product-list-box').removeClass('list');
})



// 스크롤시 타이틀 표시 변환
let pos = {y:0,dy:0,state:true};
let scrollState = function(){
  pos.y = window.scrollY;
  pos.state = pos.y > pos.dy;
  pos.dy = pos.y;
};

const category = document.querySelector('.product-list-top-wrap');
$(window).on('scroll',function(){
  scrollState();
  if(pos.state){
    $('.title-wrap').addClass('active');
    $('.product-list-category-wrap').css({transform:'translateY(-100%)'});
  }else{
    if(category.offsetTop > window.scrollY){
      $('.title-wrap').removeClass('active');
      $('.product-list-category-wrap').css({transform:'translateY(0)'});
    }
  }
});