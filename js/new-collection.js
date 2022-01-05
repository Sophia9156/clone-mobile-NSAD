let dataChange = function(){
  $.ajax({
    url:'js/data.json',
    success: function(data){
      let productList = '';
      for(let i=0; i<20; i++){
        productList += `<li>
                          <div class="product-img-box">
                            <a href="#">
                              <img src="${data.newCollection[i].thumb}" alt="">
                            </a>
                          </div>
                          <div class="product-info">
                            <a href="#">
                              <h4>${data.newCollection[i].name}</h4>
                              <span>${data.newCollection[i].price}</span>
                            </a>
                          </div>
                        </li>`;
      };

      $('.product-list-box-all').html(productList);

      let clickNum = 0;
      $('.display-more-wrap').on('click',function(){
        clickNum++;
        for(i=20*clickNum; i<20*(clickNum+1); i++){
          productList += `<li>
                            <div class="product-img-box">
                              <a href="#">
                                <img src="${data.newCollection[i].thumb}" alt="">
                              </a>
                            </div>
                            <div class="product-info">
                              <a href="#">
                                <h4>${data.newCollection[i].name}</h4>
                                <span>${data.newCollection[i].price}</span>
                              </a>
                            </div>
                          </li>`;
        }
        $('.product-list-box-all').html(productList);
      });
      
      $('.product-list-total em').html(data.newCollection.length);
    }
  });
  setTimeout(dataChange,600000);
};
dataChange();





$('.product-list-category li').eq(0).addClass('active');
$('.product-list-box-wrap ul').eq(0).addClass('active');

let idx=0;
$('.product-list-category li').on('click',function(){
  idx = $(this).index();

  $('.product-list-category li').removeClass('active');
  $('.product-list-box-wrap ul').removeClass('active');

  $('.product-list-category li').eq(idx).addClass('active');
  $('.product-list-box-wrap ul').eq(idx).addClass('active');
});




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




let pos = {y:0,dy:0,state:true};
let scrollState = function(){
  pos.y = window.scrollY;
  pos.state = pos.y > pos.dy;
  pos.dy = pos.y;
};

$(window).on('scroll',function(){
  scrollState();
  if(pos.state){
    $('.title-wrap').addClass('active');
    $('.product-list-category-wrap').css({transform:'translateY(-100%)'});
  }else{
    $('.title-wrap').removeClass('active');
    $('.product-list-category-wrap').css({transform:'translateY(0)'});
  }
});