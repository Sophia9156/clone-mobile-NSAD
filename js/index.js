const todayNoShow = document.querySelector('.popup-bottom');

todayNoShow.onclick = function(){
  if($('.popup-bottom input').prop('checked')){
    let noShowDay = new Date();
    noShowDay.setDate(noShowDay.getDate() + 1);
    document.cookie = `test=하루동안;expires=${noShowDay.toUTCString()}`;
  }
  $('.popup').hide();
}
if(document.cookie.match('test')){
  $('.popup').hide();
}
$('.popup-close').on('click',function(){
  $('.popup').hide();
})


fetch('js/data.json')
.then(
  (data)=> data.json()
)
.then(
  (data)=> {
    let imgLi = '';
    data.mainSlide.forEach(function(v,k){
      imgLi += `<li>
        <img class="slide slide${k+1} mainSlide" src="${v}" alt="">
        <img class="slide slide${k+1} subSlide" src="${v}" alt="">
        </li>`;
    })
    $('section ul').append(imgLi);
  }
)