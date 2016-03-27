var toast = function(msg) {
  Materialize.toast(msg, 4000);
}

$( document ).ready(function(){
  $(".button-collapse").sideNav();

});

window.onload = function(){
  var $container = $('#masonry-grid');
  // initialize
  $container.masonry({
    columnWidth: '.topCol',
    itemSelector: '.topCol',
  });
  
};
