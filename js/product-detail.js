let totalBuyQuantity = 0;
let quantity = {m: 0, l: 0, xl: 0};

let dataChange = function(){
  $.ajax({
    url: 'js/data.json',
    success: function(data){

      const newCollection = data.newCollection;


      // 상품 정보 불러오기
      let productDetail = '';
      $.each(newCollection,function(k,v){
        if(localStorage.productIdx == v.name){
          productDetail = `
          <div class="title-img-wrap">
            <div class="title-img-slide-wrap">
              <p><img src="${v.full1}" alt=""></p>
              <p><img src="${v.full2}" alt=""></p>
            </div>
            <div class="title-img-indicator">
              <span></span>
              <span></span>
            </div>
          </div>
          <div class="product-detail-wrap">
            <div class="product-name-wrap">
              <div class="product-name">
                <h4>${v.name}</h4>
                <p>￦ ${v.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')}</p>
              </div>
              <div class="product-share-wrap">
                <div class="product-share-mini">
                  <img src="img/new-collection/mo_shareBtn.png" alt="">
                </div>
                <div class="product-share-big">
                  <div class="product-share">
                    <div class="product-share-big-close">
                      <span></span>
                      <span></span>
                    </div>
                    <h5>공유하기</h5>
                    <ul class="share-icon-collection">
                      <li>
                        <a href="https://www.facebook.com/">
                          <img src="img/new-collection/icon-facebook.png" alt="facebook">
                          <p>페이스북</p>
                        </a>
                      </li>
                      <li>
                        <a href="https://www.twitter.com/">
                          <img src="img/new-collection/icon-twitter.png" alt="twitter">
                          <p>트위터</p>
                        </a>
                      </li>
                      <li>
                        <a href="https://www.pinterest.com/">
                          <img src="img/new-collection/icon-pinterest.png" alt="pinterest">
                          <p>핀터레스트</p>
                        </a>
                      </li>
                      <li>
                        <a href="https://www.kakaostory.com/">
                          <img src="img/new-collection/icon-kakao.png" alt="kakaostory">
                          <p>카카오스토리</p>
                        </a>
                      </li>
                    </ul>
                    <div class="url-copy">
                      <input type="text" value="http://s.godo.kr/01tp0" disabled>
                      <button>URL 복사</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
      
            <div class="product-info-wrap">
              <dl class="product-info-code">
                <dt>자체상품코드</dt>
                <dd>VMW21503Z1</dd>
              </dl>
              <dl class="product-info-benefit">
                <dt>혜택</dt>
                <dd>
                  <p>할인 : []</p>
                  <p>적립 마일리지 : <b>+${v.price*0.05}원</b> [상품 : ${(v.price*0.05).toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')}원]</p>
                </dd>
              </dl>
              <dl class="product-info-delivery">
                <dt>배송정보</dt>
                <dd>
                  <p>￦0 (조건부배송) <small>주문시결제(선결제)</small></p>
                  <p>택배</p>
                </dd>
              </dl>
              <dl class="product-info-description">
                <dt>제품설명</dt>
                <dd></dd>
              </dl>
            </div>
      
            <div class="product-detailImg-wrap">
              <ul class="product-tab-list">
                <li>상품정보</li>
                <li>상품안내</li>
                <li>상품리뷰 (1)</li>
                <li>상품문의 (0)</li>
              </ul>
              <ul class="product-tab-detail">
                <li class="product-detailImg">
                  <figure class="product-detailImg-img"> 
                    <img src="img/new-collection/common1.jpg" alt="">
                    <img src="img/new-collection/common2.jpg" alt="">
                    <img src="${v.detail1}" alt="">
                    <img src="${v.detail2}" alt="">
                    <img src="img/new-collection/common3.jpg" alt="">
                    <img src="img/new-collection/common4.jpg" alt="">
                  </figure>
                  <div class="product-detailImg-info">
                    <div class="product-detailImg-info-title">
                      <p class="product-detailImg-info-title-text">상품필수 정보</p>
                      <p class="product-detailImg-info-drop">
                        <span></span>
                        <span></span>
                      </p>
                    </div>
                    <dl class="product-detailImg-info-content">
                      <dt>구매혜택</dt>
                      <dd>적립 마일리지 : +${v.price*0.05}원 [상품 : ${(v.price*0.05).toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')}원]</dd>
                      <dt>제품소재</dt>
                      <dd>...</dd>
                      <dt>색상</dt>
                      <dd>...</dd>
                      <dt>사이즈</dt>
                      <dd>...</dd>
                      <dt>제조사 / 원산지</dt>
                      <dd>...</dd>
                      <dt>제조년월</dt>
                      <dd>...</dd>
                      <dt>품질보증기준</dt>
                      <dd>...</dd>
                      <dt>A/S책임자와 전화번호</dt>
                      <dd>...</dd>
                      <dt>세탁방법 및 취급 주의 사항</dt>
                      <dd>...</dd>
                    </dl>
                  </div>
                </li>
                <li class="product-detail-info">
                  <div class="product-detail-info-title">
                    <p class="product-detail-info-title-text">상품안내</p>
                  </div>
                  <dl class="product-detail-info-content">
                    
                    <dt>상품코드</dt>
                    <dd>1000000404</dd>
                    <dt>자체상품코드</dt>
                    <dd>VMW21503Z1</dd>
                    <dt>판매기간</dt>
                    <dd>...</dd>
                    <dt>배송안내</dt>
                    <dd>
                      - 배송비 : 기본배송료는 2,500원 입니다. (도서,산간,오지 일부지역은 배송비가 추가될 수 있습니다)  30,000원 이상 구매시 무료배송입니다.<br>
                      - 본 상품의 평균 배송일은 3일입니다.(입금 확인 후) [영업일 기준 / 주말 공휴일 제외]<br>
                    </dd>
                    <dt>교환안내</dt>
                    <dd>
                      ▶ 교환/반품 방법<br>
                      - 교환/반품은 상품 수령 후 14일 이내에 신청 가능<br>
                      - [홈페이지] -> [MY PAGE] 를 통하여 접수 or CS CENTER (1644-7781)을 통한 교환/반품 접수<br>
                      - 지정된 택배사(CJ대한통운)를 통하여 회수예약 진행 후 발송<br>
                      - 본사로 상품 회수 후 상품 확인 후 교환/ 반품 진행<br>
                    </dd>
                    <dt>환불안내</dt>
                    <dd>- 상품 청약철회 가능기간은 상품 수령일로 부터 14일 이내 입니다.</dd>
                    <dt>AS안내</dt>
                    <dd>- 상품 하자문의 : 상품에 불량에 의한 반품, 교환, A/S등은 공정거래위원회에서 고시한 소비자 분쟁해결기준에 따라 반품, 교환, A/S를 받을 수 있습니다</dd>
                  </dl>
                </li>
                <li class="product-detail-review-wrap">
                  <div class="product-detail-review-title">
                    <p class="product-detail-review-title-text">상품리뷰</p>
                  </div>
                  <div class="product-detail-review-button">
                    <button>후기작성</button>
                  </div>
                  <ul class="product-detail-review">
                    <li>
                      <div class="review-user-info">
                        <span id="user-id">c7***</span>
                        <small>I</small>
                        <span id="review-date">2021.12.20</span>
                      </div>
                      <div class="review-title">
                        <h6>너무 좋습니다!!</h6>
                      </div>
                      <div class="review-rate">
                        <span class="material-icons-outlined">star</span>
                        <span class="material-icons-outlined">star</span>
                        <span class="material-icons-outlined">star</span>
                        <span class="material-icons-outlined">star_half</span>
                        <span class="material-icons-outlined">star_outline</span>
                      </div>
                    </li>
                  </ul>
                  <div class="review-more">
                    <button>더보기 1/1</button>
                  </div>
                </li>
                <li class="product-detail-question">
                  <div class="product-detail-question-title">
                    <p class="product-detail-question-title-text">상품문의</p>
                  </div>
                  <div class="product-detail-question-button">
                    <button>문의하기</button>
                  </div>
                  <div class="question-more">
                    <button>더보기 0/0</button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          `;


          // 하단 BUY NOW or CART 버튼 눌렀을 때
          let productPrice = v.price;

          $('.buy-cart-btn').on('click',function(){
            $('.buy-cart-box-wrap').addClass('active');
            $('.buy-cart-total span').html(v.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,','));
          });

          // BUY NOW or CART 버튼 열렸을 때 닫기

          $('.buy-cart-box-close').on('click',function(){
            $('.buy-cart-box-wrap').removeClass('active');
            $('.buy-cart-size-btn button').removeClass('active');
            $('.buy-cart-size-add').html('');
            quantity = {m: 0, l: 0, xl: 0};
          });
        
          
          let finalPrice;
          let showFinalPrice = function(){
            finalPrice = productPrice*(quantity.m + quantity.l + quantity.xl);
            $('.buy-cart-total span').html(finalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g,','));
          };

          // 구매 탭에서 사이즈 클릭했을 때
          let buyLi = function(selectedSize,size){
            $('.buy-cart-size-add').append(`
              <li>
                <p class="selected-size">${selectedSize.attr('data-value')}</p>
                <div class="selected-size-quantity-wrap">
                  <button class="quantity-less" data-value="${selectedSize.attr('data-value')}">
                    <span class="material-icons-outlined">remove</span>
                  </button>
                  <span class="selected-size-quantity" data-value="${selectedSize.attr('data-value')}">${size}</span>
                  <button class="quantity-more" data-value="${selectedSize.attr('data-value')}">
                    <span class="material-icons-outlined">add</span>
                  </button>
                </div>
                <div class="selected-size-price">￦ <span>${v.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')}</span></div>
                <div class="selected-size-delete" data-value="${selectedSize.attr('data-value')}">
                  <span></span>
                  <span></span>
                </div>
              </li>
            `);
            $('.buy-cart-size-add li').addClass('active');
          };


          $('.buy-cart-size-btn button').on('click',function(){
            if($('.buy-cart-size-add li').length < $('.buy-cart-size-btn button').length){
              if($(this).attr('data-value') == 'M [04]'){
                quantity.m = 1;
                buyLi($(this),quantity.m); 
              }else if($(this).attr('data-value') == 'L [05]'){
                quantity.l = 1;
                buyLi($(this),quantity.l);
              }else{
                quantity.xl = 1;
                buyLi($(this),quantity.xl);
              }
              
            }

            // 최종 가격 보여주기
            showFinalPrice();
            // 사이즈 버튼 활성화
            $(this).addClass('active');
            $('.buy-cart-size-add li').addClass('active');



            // 구매 수량 조절
            $('.quantity-less').each(function(k,v){
              v.onclick = function(){
                if($(this).attr('data-value') == 'M [04]'){
                  if(quantity.m > 1){quantity.m -= 1;}
                  $('.selected-size-quantity[data-value="M [04]"]').html(quantity.m);
                }else if($(this).attr('data-value') == 'L [05]'){
                  if(quantity.l > 1){quantity.l -= 1;}
                  $('.selected-size-quantity[data-value="L [05]"]').html(quantity.l);
                }else{
                  if(quantity.xl > 1){quantity.xl -= 1;}
                  $('.selected-size-quantity[data-value="XL [06]"]').html(quantity.xl);
                }
                showFinalPrice();
              }              
            });
            $('.quantity-more').each(function(k,v){
              v.onclick = function(){
                if($(this).attr('data-value') == 'M [04]'){
                  quantity.m += 1;
                  $('.selected-size-quantity[data-value="M [04]"]').html(quantity.m);
                }else if($(this).attr('data-value') == 'L [05]'){
                  quantity.l += 1;
                  $('.selected-size-quantity[data-value="L [05]"]').html(quantity.l);
                }else if($(this).attr('data-value') == 'XL [06]'){
                  quantity.xl += 1;
                  $('.selected-size-quantity[data-value="XL [06]"]').html(quantity.xl);
                }
                showFinalPrice();
              };
            });


            // 구매 수량 delete 했을 때
            $('.selected-size-delete').each(function(k,v){
              v.onclick = function(){
                $(this).parent().detach();
                if($(this).attr('data-value') == 'M [04]'){
                  quantity.m = 0;
                  $('.buy-cart-size-btn button[data-value="M [04]"]').removeClass('active');
                }else if($(this).attr('data-value') == 'L [05]'){
                  quantity.l = 0;
                  $('.buy-cart-size-btn button[data-value="L [05]"]').removeClass('active');
                }else if($(this).attr('data-value') == 'XL [06]'){
                  quantity.xl = 0;
                  $('.buy-cart-size-btn button[data-value="XL [06]"]').removeClass('active');
                }
                showFinalPrice();
              }
              
            });


            // 수량 선택하고 BUY NOW or CART 버튼 눌렀을 때
            // 로컬 스토리지에 구매수량 남기기
            $('.buy-btn').on('click',function(){
              if($('.buy-cart-box-wrap').hasClass('active'))window.location.href = "login.html";
            });
            $('.cart-btn').on('click',function(){
              if($('.buy-cart-box-wrap').hasClass('active')){
                localStorage.buyItem = localStorage.productIdx;
                localStorage.M = quantity.m;
                localStorage.L = quantity.l;
                localStorage.XL = quantity.xl;
                  

                $('.before-cart-wrap').addClass('active');          
                $('header .cart span').text(localStorage.buyquantity);

                $('.cart-cancle').on('click',function(){
                  $('.before-cart-wrap').removeClass('active');
                });

                $('.cart-move').on('click',function(){
                  window.location.href = "cart.html";
                });
              }
            });

          });

        }
        $('section').html(productDetail);

      });


      // product 이미지 드래그로 슬라이드
      let dPos = {x:0, dx:0, dir:'left'};
      let itemW = $('.title-img-slide-wrap p').width();
      let current = 0;

      $('.title-img-slide-wrap').draggable({
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
              if(current < $('.title-img-slide-wrap p').length - 1)current++;
            }else{
              if(current > 0)current--;
            }
            $('.title-img-slide-wrap').animate({
              left: `-${100 * current}%`
            });
            if(dPos.dir == 'left'){
              $('.title-img-indicator span').eq(0).removeClass('active');
              $('.title-img-indicator span').eq(1).addClass('active');
            }else{
              $('.title-img-indicator span').eq(1).removeClass('active');
              $('.title-img-indicator span').eq(0).addClass('active');
            }
          }
        }
      });



      // product 이미지 슬라이드 기본 상태
      $('.title-img-indicator span').eq(0).addClass('active');

      $('.product-tab-list > li').eq(0).addClass('active');
      $('.product-tab-detail > li').eq(0).addClass('active');



      // product 정보 탭
      $('.product-tab-list > li').on('click',function(){
        let liNum = $(this).index();
        $('.product-tab-list > li').removeClass('active');
        $('.product-tab-list > li').eq(liNum).addClass('active');

        $('.product-tab-detail > li').removeClass('active');
        $('.product-tab-detail > li').eq(liNum).addClass('active');
      });



      // product 공유하기 버튼
      $('.product-share-mini').on('click',function(){
        $('.product-share-big').addClass('active');
      });
      $('.product-share-big-close').on('click',function(){
        $('.product-share-big').removeClass('active');
      });



      // 상품필수 정보 드롭다운
      $('.product-detailImg-info-title').on('click',function(){
        $('.product-detailImg-info-content').toggleClass('active');
        $('.product-detailImg-info-drop').toggleClass('active');
      });



    }
  });
}    
dataChange();