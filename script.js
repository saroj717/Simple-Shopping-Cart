var sum = function (accumulator, currentValue) {
  console.log("i am here")
  return accumulator + currentValue;
}

$('document').ready(function () {
  var subTotal = [];
  
  $('tbody tr').each(function (i, ele) {
    var price = parseFloat(($(ele).find('.price input').val()));
    var quantity = parseFloat($(ele).find('.quantity input').val());

    var total = price * quantity;
    $(ele).children('.totalPrice').html(total);

    subTotal.push(total);

  })

  //Calculating Sub Total price 
  $('#calculatePrice').on('click', function () {
    $('#subTotal').html(subTotal.reduce(sum, 0).toFixed(2));
     return subTotal.reduce(sum, 0);
  })

  //Cancelling items from the Shopping cart
  $('.btn.remove').on('click', function (event) {
    // console.log(subTotal)
    var num = parseFloat($(this).closest('tr').children('.totalPrice').text());
    // console.log(num)
    var index = subTotal.indexOf(num);
    $(this).closest('tr').remove();
    subTotal.splice(index, 1);
    // console.log(subTotal);
  });

  //Adding items and updating price in the shopping cart
  $('.btn.increase').on('click', function (event) {
    var element = $(this).closest('tr').find('.quantity input');
    var qnt = parseInt(element.val());
    element.val(++qnt);
    
    var increasePrice = parseFloat(($(this).closest('tr').find('.price input').val()));
    var updatedQuantity = parseFloat(element.val());
    $(this).closest('tr').children('.totalPrice').html((increasePrice * updatedQuantity).toFixed(2));
  })

  //Removing items and updating price from the shopping cart

  $('.btn.decrease').on('click', function (event) {
    var decreaseQnt = $(this).closest('tr').find('.quantity input');
    if (parseInt(decreaseQnt.val()) === 0) {
      return;
    } else {
      var newQnt = parseFloat(decreaseQnt.val());
      decreaseQnt.val(--newQnt);

      var decreasingPrice = parseFloat($(this).closest('tr').find('.price input').val());
      var decreasePriceQty = parseFloat(decreaseQnt.val());
      $(this).closest('tr').children('.totalPrice').html((decreasingPrice * decreasePriceQty).toFixed(2));
    }
    
  })

  //Adding items, price and quantity in the cart
  $('addItems').on('click', function () {

  })

});


