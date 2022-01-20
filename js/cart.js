
// 장바구니에 담긴 상품이 없을 때
$('.empty').addClass('active');
$('.filled').removeClass('active');


// 장바구니에 담긴 상품이 있을 때
if(Number(localStorage.M) > 0 || Number(localStorage.L) > 0 || Number(localStorage.XL) > 0){
  $('.empty').removeClass('active');
  $('.filled').addClass('active');
}


let list = [
  {name: localStorage.buyItem, size:localStorage.getItem('M'), qty: localStorage.M},
  {name: localStorage.buyItem, size:localStorage.getItem('L'), qty: localStorage.L},
  {name: localStorage.buyItem, size:localStorage.getItem('XL'), qty: localStorage.XL}
]


// 장바구니에 상품 localStorage로 추가하기
let dataChange = function(){
  $.ajax({
    url: 'js/data.json',
    success: function(data){
      
      let buyProduct = '';
      $.each(data.newCollection,function(k,v){
        list.forEach(function(buyItem){
          if(buyItem == v.name){
            buyProduct += `
            <li class="product-unit">
              <div class="unit-top">
                <div class="select-one">
                  <input type="checkbox" id="selectOne" name="selectOne">
                  <label for="selectOne">
                    <span class="material-icons-outlined">
                      check_circle
                    </span>
                  </label>
                </div>
                <figure><img src="${v.thumb}" alt=""></figure>
                <div class="product-info">
                  <p class="product-name">${v.name}</p>
                  <p class="product-size">사이즈 : ${buyItem.size}</p>
                  <p class="product-quantity">수량 : <span class="qty">${buyItem.qty}</span> 개</p>
                  <p class="product-price">￦<span class="price">${v.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')}</span></p>
                </div>
                <div class="product-unit-close">
                  <span></span>
                  <span></span>
                </div>
              </div>
              <p class="unit-bottom">기본-금액별배송비 ￦0 (택배-선결제)</p>
            </li>`;
          }
        });
      });
      
      $('.product-list-wrap').html(buyProduct);


      // 전체상품 체크
      let checkBoxes = document.querySelectorAll('#selectOne');
      let totalSum = '';
      selectAll.onclick = function(){
        selectOne.checked = this.checked;
        if(checkBox.checked){
          $('#totalQuantity').html();
          $('#totalPrice').html(localStorage.buyPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g,','));
          totalSum = localStorage.buyPrice;
          $('#totalPriceSum').html(totalSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g,','));
        }else{
          $('#totalQuantity').html('0');
          $('#totalPrice').html('0');
          $('#totalPriceSum').html('0');
        }
      };
      checkBoxes.forEach(function(v){
        v.onclick = function(){
          selectAll.checked = this.checked;
          if(checkBox.checked){
            $('#totalQuantity').html();
            $('#totalPrice').html(localStorage.buyPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g,','));
            totalSum = localStorage.buyPrice;
            $('#totalPriceSum').html(totalSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g,','));
          }else{
            
          }
        }
      });

      // 최종 결정 창 표시
      window.onload = function(){
        selectAll.checked = true;
        checkBoxes.forEach(function(v){
          v.checked = selectAll.checked;
          if(checkBox.checked){
            $('#totalQuantity').html();
            $('#totalPrice').html(localStorage.buyPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g,','));
            totalSum = localStorage.buyPrice;
            $('#totalPriceSum').html(totalSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g,','));
          }
        });
      }


      // 선택 상품 삭제
      $('.select-delete').on('click',function(){
        if(selectOne.checked){

          $('header .cart span').html();

          buyProduct = '';
          $('.product-list-wrap').html(buyProduct);
          $('#totalQuantity').html('0');
          $('#totalPrice').html('0');
          $('#totalPriceSum').html('0');
        }
      });

      // 개별 상품 삭제
      $('.product-unit-close').on('click',function(){

        $('header .cart span').html();

        buyProduct = '';
        $('.product-list-wrap').html(buyProduct);
        $('#totalQuantity').html('0');
        $('#totalPrice').html('0');
        $('#totalPriceSum').html('0');
      });
      
    }
  });
};
dataChange();