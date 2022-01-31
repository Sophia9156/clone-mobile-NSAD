// 장바구니에 담긴 상품이 있을 때 / 없을 때
let buyItems = [];

if(localStorage.buyItems){
  $('.empty').removeClass('active');
  $('.filled').addClass('active');
  buyItems = JSON.parse(localStorage.getItem('buyItems'));
}else{
  $('.empty').addClass('active');
  $('.filled').removeClass('active');
}


// 장바구니에 상품 localStorage로 추가하기
let dataChange = function(){
  $.ajax({
    url: 'js/data.json',
    success: function(data){
      
      $.each(data.newCollection,function(k,v){
        buyItems.forEach(function(buyItem){
          if(buyItem.item == v.name){
            let buyLi = function(size,quantity){
              $('.product-list-wrap').append(`
                <li class="product-unit">
                  <div class="unit-top">
                    <div class="select-one">
                      <input type="checkbox" class="selectOne" name="selectOne">
                      <label for="selectOne">
                        <span class="material-icons-outlined">
                          check_circle
                        </span>
                      </label>
                    </div>
                    <figure><img src="${v.thumb}" alt=""></figure>
                    <div class="product-info">
                      <p class="product-name">${v.name}</p>
                      <p class="product-size">사이즈 : <span class="size">${size}</span></p>
                      <p class="product-quantity">수량 : <span class="qty">${quantity}</span> 개</p>
                      <p class="product-price">￦<span class="price">${v.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')}</span></p>
                    </div>
                    <div class="product-unit-close">
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                  <p class="unit-bottom">기본-금액별배송비 ￦0 (택배-선결제)</p>
                </li>
              `);
            };
            if(buyItem.M > 0){
              buyLi(Object.keys(buyItem)[1],buyItem.M);
              if(buyItem.L > 0){
                buyLi(Object.keys(buyItem)[2],buyItem.L);
                if(buyItem.XL > 0){
                  buyLi(Object.keys(buyItem)[3],buyItem.XL);
                }
              }else{
                if(buyItem.XL > 0){
                  buyLi(Object.keys(buyItem)[3],buyItem.XL);
                }
              }
            }else{
              if(buyItem.L > 0){
                buyLi(Object.keys(buyItem)[2],buyItem.L);
                if(buyItem.XL > 0){
                  buyLi(Object.keys(buyItem)[3],buyItem.XL);
                }
              }else{
                if(buyItem.XL > 0){
                  buyLi(Object.keys(buyItem)[3],buyItem.XL);
                }
              }
            }
          }
        });
      });

      

      let totalQuantity = 0, totalPrice = 0;

      function totalFun(){
        totalQuantity = 0;
        $('.selectOne').each(function(k,v){
          if($(v).prop('checked')){
            totalQuantity += Number($('.qty').eq(k).text());
          };
        });
        $('#totalQuantity').html(totalQuantity);
      };
      function priceFun(){
        totalPrice = 0;
        $('.selectOne').each(function(k,v){
          if($(v).prop('checked')){
            totalPrice += Number($('.qty').eq(k).text())*Number($('.price').eq(k).text().replace(",",""));
          };
        });
        $('#totalPrice').html(totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g,','));
        $('#totalPriceSum').html(totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g,','));
      };

      // 전체상품 체크, 최종 결정 창 표시
      window.onload = function(){
        $('#selectAll').prop('checked', true);
        $('.selectOne').prop('checked', true);

        totalFun();
        priceFun();
      };

      $('#selectAll').on('click',function(){
        if($('#selectAll').prop('checked')){
          $('.selectOne').prop('checked', true);
        }else{
          $('.selectOne').prop('checked', false);
        }

        totalFun();
        priceFun();
      });
      
      $('.select-one label').each(function(k,v){
        v.onclick = function(){
          if($('.selectOne').eq(k).prop('checked')){
            $('.selectOne').eq(k).prop('checked', false);
            $('#selectAll').prop('checked', false);
          }else{
            $('.selectOne').eq(k).prop('checked', true);
          }

          totalFun();
          priceFun();
        };
      });


      // 선택 상품 삭제
      $('.select-delete button').on('click',function(){
        $('.selectOne').each(function(k,v){
          if($(v).prop('checked')){
            buyItems.forEach(function(buyItem){
              if($('.product-name').eq(k).text() == buyItem.item){
                if($('.size').eq(k).text() == 'M'){
                  buyItem.M = 0;
                  if(buyItem.M == '0' && buyItem.L == '0' && buyItem.XL == '0'){
                    buyItems.splice(buyItems.indexOf(buyItem),1)
                  };
                }else if($('.size').eq(k).text() == 'L'){
                  buyItem.L = 0;
                  if(buyItem.M == '0' && buyItem.L == '0' && buyItem.XL == '0'){
                    buyItems.splice(buyItems.indexOf(buyItem),1)
                  };
                }else if($('.size').eq(k).text() == 'XL'){
                  buyItem.XL = 0;
                  if(buyItem.M == '0' && buyItem.L == '0' && buyItem.XL == '0'){
                    buyItems.splice(buyItems.indexOf(buyItem),1)
                  };
                }
              }
              $('.product-unit').eq(k).remove();
              localStorage.setItem('buyItems',JSON.stringify(buyItems));
            });
          };
        });
        
        totalFun();
        priceFun();
      });

      // 개별 상품 삭제
      $('.product-unit-close').each(function(k,v){
        $(v).on('click',function(){
          buyItems.forEach(function(buyItem){
            if($('.product-name').eq(k).text() == buyItem.item){
              if($('.size').eq(k).text() == 'M'){
                buyItem.M = 0;
                if(buyItem.M == '0' && buyItem.L == '0' && buyItem.XL == '0'){
                  buyItems.splice(buyItems.indexOf(buyItem),1)
                };
              }else if($('.size').eq(k).text() == 'L'){
                buyItem.L = 0;
                if(buyItem.M == '0' && buyItem.L == '0' && buyItem.XL == '0'){
                  buyItems.splice(buyItems.indexOf(buyItem),1)
                };
              }else if($('.size').eq(k).text() == 'XL'){
                buyItem.XL = 0;
                if(buyItem.M == '0' && buyItem.L == '0' && buyItem.XL == '0'){
                  buyItems.splice(buyItems.indexOf(buyItem),1)
                };
              }
            }
          });
          localStorage.setItem('buyItems',JSON.stringify(buyItems));
          $('.product-unit').eq(k).remove();
        });
      });
      
    }
  });
};
dataChange();