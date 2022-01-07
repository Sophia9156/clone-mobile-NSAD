let quantity = 0;

let dataChange = function(){
  $.ajax({
    url: 'js/data.json',
    success: function(data){
      let productImg = '';
      $.each(data.newCollection,function(k,v){
        productImg = `
          <p><img src="${data.newCollection[localStorage.idx].full1}" alt=""></p>
          <p><img src="${data.newCollection[localStorage.idx].full2}" alt=""></p>`;
      });
      $('.title-img-slide-wrap').html(productImg);

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

      let productName = '';
      $.each(data.newCollection,function(k,v){
        productName = `
        <h4>${data.newCollection[localStorage.idx].name}</h4>`;
      });
      $('.product-name').html(productName);

      let productPrice = '';
      $.each(data.newCollection,function(k,v){
        productPrice = `
        <p>￦ ${data.newCollection[localStorage.idx].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')}</p>`;
      });
      $('.product-name').append(productPrice);

      let buyPrice = '';
      $.each(data.newCollection,function(k,v){
        buyPrice = `
        ￦ <span>${data.newCollection[localStorage.idx].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')}</span>`;
      });
      $('.buy-cart-total').html(buyPrice);

      let productDetailImg = '';
      $.each(data.newCollection,function(k,v){
        productDetailImg = `
        <img src="img/new-collection/common1.jpg" alt="">
        <img src="img/new-collection/common2.jpg" alt="">
        <img src="${data.newCollection[localStorage.idx].detail1}" alt="">
        <img src="${data.newCollection[localStorage.idx].detail2}" alt="">
        <img src="img/new-collection/common3.jpg" alt="">
        <img src="img/new-collection/common4.jpg" alt="">`;
      });
      $('.product-detailImg-img').html(productDetailImg);

      let productBenefit = '';
      $.each(data.newCollection,function(k,v){
        productBenefit = `
        <p>적립 마일리지 : <b>+${data.newCollection[localStorage.idx].price*0.05}원</b> [상품 : ${(data.newCollection[localStorage.idx].price*0.05).toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')}원]</p>`;
      });
      $('.product-info-benefit dd').append(productBenefit);

      let productBenefit2 = '';
      $.each(data.newCollection,function(k,v){
        productBenefit2 = `
        <dt>구매혜택</dt>
        <dd>적립 마일리지 : +${data.newCollection[localStorage.idx].price*0.05}원 [상품 : ${(data.newCollection[localStorage.idx].price*0.05).toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')}원]</dd>`;
      });
      $('.product-detail-info-content').prepend(productBenefit2);



      $('.buy-cart-size-btn button').on('click',function(){
        quantity++;
        $('.buy-cart-total span').html((data.newCollection[localStorage.idx].price*quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g,','));
        $(this).addClass('active');
        $('.buy-cart-size-add').addClass('active');
        $('.buy-cart-size-add').append(`
          <li>
            <p class="selected-size">${$(this).attr('data-value')}</p>
            <div class="selected-size-quantity-wrap">
              <button class="quantity-less">
                <span class="material-icons-outlined">remove</span>
              </button>
              <span class="selected-size-quantity">${quantity}</span>
              <button class="quantity-more">
                <span class="material-icons-outlined">add</span>
              </button>
            </div>
            <div class="selected-size-price">￦ <span>${data.newCollection[localStorage.idx].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',')}</span></div>
            <div class="selected-size-delete">
              <span></span>
              <span></span>
            </div>
          </li>
        `);

        $('.quantity-less').on('click',function(){
          if(quantity > 1){quantity--;}
          $('.selected-size-quantity').html(quantity);
          $('.buy-cart-total span').html((data.newCollection[localStorage.idx].price*quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g,','));
        });
        $('.quantity-more').on('click',function(){
          if(quantity < 10){quantity++;}
          $('.selected-size-quantity').html(quantity);
          $('.buy-cart-total span').html((data.newCollection[localStorage.idx].price*quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g,','));
        });

        $('.selected-size-delete').on('click',function(){
          $('.buy-cart-size-btn button').removeClass('active');
          $('.buy-cart-size-add').removeClass('active');
          $('.buy-cart-size-add').html('');
          quantity = 0;
          $('.buy-cart-total span').html((data.newCollection[localStorage.idx].price*quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g,','));
        });

      });

      $('.buy-cart-btn').on('click',function(){
        $('.buy-cart-box-wrap').addClass('active');
        $('.buy-cart-total span').html(data.newCollection[localStorage.idx].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g,','));
      });

      $('.buy-cart-box-close').on('click',function(){
        $('.buy-cart-box-wrap').removeClass('active');
        $('.buy-cart-size-btn button').removeClass('active');
        $('.buy-cart-size-add').removeClass('active');
        $('.buy-cart-size-add').html('');
        quantity = 0;
        $('.buy-cart-total span').html((data.newCollection[localStorage.idx].price*quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g,','));
      });

      $('.buy-btn').on('click',function(){
        if(quantity>=1){
          window.location.href = "login.html";
          localStorage.buyquantity = quantity;
        }
      });
      $('.cart-btn').on('click',function(){
        if(quantity>=1){
          window.location.href = "cart.html";
          localStorage.buyquantity = quantity;
        }
      });

    }
  })
}
dataChange();

$('.title-img-indicator span').eq(0).addClass('active');

$('.product-tab-list > li').eq(0).addClass('active');
$('.product-tab-detail > li').eq(0).addClass('active');

$('.product-tab-list > li').on('click',function(){
  let liNum = $(this).index();
  $('.product-tab-list > li').removeClass('active');
  $('.product-tab-list > li').eq(liNum).addClass('active');

  $('.product-tab-detail > li').removeClass('active');
  $('.product-tab-detail > li').eq(liNum).addClass('active');
});

$('.product-share-mini').on('click',function(){
  $('.product-share-big').addClass('active');
});
$('.product-share-big-close').on('click',function(){
  $('.product-share-big').removeClass('active');
});

$('.product-detailImg-info-title').on('click',function(){
  $('.product-detailImg-info-content').toggleClass('active');
  $('.product-detailImg-info-drop').toggleClass('active');
});








