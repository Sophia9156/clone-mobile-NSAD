

let dataChange = function(){
  $.ajax({
    url:'js/data.json',
    success: function(data){


      // 상품 목록 뿌리기 & SHOW MORE 눌렀을 때 상품 더 뿌리기
      const newCollection = data.newCollection;

      let productList = '', clickNum = 0, i = 0;
      let productListAdd = function(){
        if(i < newCollection.length - 1){
          for(i = clickNum*20; i < (clickNum*20)+20; i++){
            productList += `<li data-name="${newCollection[i].name}">
                              <div class="product-img-box">
                                <a href="product-detail.html">
                                  <img src="${newCollection[i].thumb}" alt="">
                                </a>
                              </div>
                              <div class="product-info">
                                <a href="product-detail.html">
                                  <h4>${newCollection[i].name}</h4>
                                  <span>￦${newCollection[i].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')}</span>
                                </a>
                              </div>
                            </li>`;
          };
          $('.product-list-box-all').html(productList);

          // 클릭한 제품 로컬스토리지에 남기기
          $('.product-list-box li').on('click',function(){
            localStorage.productIdx = $(this).attr('data-name');
          });
        }else{
          productList = '';
          newCollection.forEach(function(newCollection){
            productList += `<li data-name="${newCollection.name}">
                              <div class="product-img-box">
                                <a href="product-detail.html">
                                  <img src="${newCollection.thumb}" alt="">
                                </a>
                              </div>
                              <div class="product-info">
                                <a href="product-detail.html">
                                  <h4>${newCollection.name}</h4>
                                  <span>￦${newCollection.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')}</span>
                                </a>
                              </div>
                            </li>`;
          });
          $('.product-list-box-all').html(productList);

          // SHOW MORE 숨기기
          $('.display-more-wrap').hide();


          // 클릭한 제품 로컬스토리지에 남기기
          $('.product-list-box li').on('click',function(){
            localStorage.productIdx = $(this).attr('data-name');
          });
        }  
      };
      productListAdd();



      // SHOW MORE 눌렀을 때 상품 더 뿌리기    
      $('.display-more-wrap').on('click',function(){
        clickNum++;
        productListAdd();
      });


      // 상품 정렬 바꾸기
      let listSort = function(boolean){
        newCollection.sort(function(a,b){
          if(boolean){
            return a.price - b.price;
          }else{
            return b.price - a.price;
          }
        });

        productList = '', clickNum = 0, i = 0;
        productListAdd();

      };

      $('#sort').on('change',function(){
        if($(this).val() == 'low'){
          listSort(1);
          $('.display-more-wrap').show();
        }else if($(this).val() == 'high'){
          listSort(0);
          $('.display-more-wrap').show();
        }else{
          location.reload();
        }
      });
      


      // 카테고리 인덱스 활성화 표시, 상품 개수 표시하기
      $('.product-list-category li').eq(0).addClass('active');
      $('.product-list-box-wrap ul').eq(0).addClass('active');
      window.onload = function(){
        if($('.product-list-box-all').hasClass('active')){
          $('.product-list-total em').html(data.newCollection.length);
        }else{
          $('.product-list-total em').html('0');
        }
      };

      let idx=0;
      $('.product-list-category li').on('click',function(){
        idx = $(this).index();

        $('.product-list-category li').removeClass('active');
        $('.product-list-box-wrap ul').removeClass('active');

        $('.product-list-category li').eq(idx).addClass('active');
        $('.product-list-box-wrap ul').eq(idx).addClass('active');

        if($('.product-list-box-all').hasClass('active')){
          $('.product-list-total em').html(data.newCollection.length);
        }else{
          $('.product-list-total em').html('0');
        }
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
