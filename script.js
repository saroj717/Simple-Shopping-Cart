var sum = function (accumulator, currentValue) {
  // console.log("i am here")
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
  $(document).on('click', '.btn.remove', function (event) {
    // console.log(subTotal)
    var num = parseFloat($(this).closest('tr').children('.totalPrice').text());
    // console.log(num)
    var index = subTotal.indexOf(num);
    $(this).closest('tr').remove();
    subTotal.splice(index, 1);
    // console.log(subTotal);
  });

  //Adding items and updating price in the shopping cart
  $(document).on('click', '.btn.increase', function (event) {
    var element = $(this).closest('tr').find('.quantity input');
    var qnt = parseInt(element.val());
    element.val(++qnt);
    
    var increasePrice = parseFloat(($(this).closest('tr').find('.price input').val()));
    var updatedQuantity = parseFloat(element.val());

    var priceCalculate = parseFloat($(this).closest('tr').children('.totalPrice').text())
    var i = subTotal.indexOf(priceCalculate);
    subTotal[i] = parseFloat((increasePrice * updatedQuantity).toFixed(2));

    $(this).closest('tr').children('.totalPrice').html((increasePrice * updatedQuantity).toFixed(2));
  })

  //Removing items and updating price from the shopping cart

  $(document).on('click', '.btn.decrease', function (event) {
    var decreaseQnt = $(this).closest('tr').find('.quantity input');
    if (parseInt(decreaseQnt.val()) === 0) {
      return;
    } else {
      var newQnt = parseFloat(decreaseQnt.val());
      decreaseQnt.val(--newQnt);

      var decreasingPrice = parseFloat($(this).closest('tr').find('.price input').val());
      var decreasePriceQty = parseFloat(decreaseQnt.val());

      var inversePriceCalculate = parseFloat($(this).closest('tr').children('.totalPrice').text());
      var j = subTotal.indexOf(inversePriceCalculate);
      subTotal[j] = parseFloat((decreasingPrice * decreasePriceQty).toFixed(2));
      console.log(j, subTotal);
      $(this).closest('tr').children('.totalPrice').html((decreasingPrice * decreasePriceQty).toFixed(2));
    }
    
  })

  //Adding items, price and quantity in the cart
  $('#addItems').on('submit', function (event) {
    event.preventDefault();
    var addName = $(this).children('.name').val();
    var addPrice = $(this).children('.price').val();
    var addQuantity = $(this).children('.quantity').val();
    var totalp = addPrice * addQuantity;
    subTotal.push(totalp);

    $('tbody').append('<tr>' +
    '<td class="name">' + addName + '</td>' +
    '<td class="price"><input type="number" value="' + addPrice + '" /></td>' +
    '<td class="quantity"><input type="number" value="' + addQuantity + '" /></td>' +
    '<td ><button class="btn btn-sm btn-warning increase"><strong>+</strong></button></td>' +
    '<td ><button class="btn btn-sm btn-warning decrease"><strong>-</strong></button></td>' +
    '<td class="totalPrice">' + totalp + '</td>' +
    '<td><button class="btn btn-danger btn-sm remove">Cancel</button></td>' +
    '</tr>');

    $(this).children('.name').val('');
    $(this).children('.price').val('');
    $(this).children('.quantity').val('');
    console.log(addName, addPrice, addQuantity);

})
});