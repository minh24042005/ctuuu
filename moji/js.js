const slide = document.querySelectorAll(".photo");
console.log(slide);

var index = 0;
setInterval(
() => {
  slide[index].classList.remove("show");
  index = (index + 1) % 3;
  slide[index].classList.add("show");}
    , 4000);
const btn = document.querySelectorAll("button")
  //console.log(button);
btn.forEach(function(button,index){
    button.addEventListener('click',function(event){
        var btnItem = event.target
        
        
        var produt = btnItem.parentElement
        console.log(produt);
        var produtImg = produt.querySelector('img').src
        var produtName = produt.querySelector('H1').innerText
        var produtPrice =produt.querySelector('span').innerText
    
        addcart(produtPrice,produtImg,produtName)

    })

})
function addcart(produtPrice,produtImg,produtName){
    var addtr =document.createElement('tr')
    var cartItem = document.querySelectorAll('tbody tr');
    for(var i = 0; i < cartItem.length; i++){
        var produtT=document.querySelectorAll(".title")
        if(produtT[i].innerHTML == produtName ){
            alert("sản phẩm đã có trong giỏ hàng")
            return
        }
    }
    var trcontent = `<tr><td style="display: flex; align-items: center;"><img src="${produtImg}" alt=""><span class="title">${produtName}</span></td><td><p><span class="prices">${produtPrice}</span><sup>đ</sup></p></td><td><input style="width: 40px;outline: none; font-size: 30px;" type="number" value="1" min="1" class="cart-quantity-input"></td><td style="cursor: pointer;"><span class="cart-delete">xóa</span></td></tr>`
    addtr.innerHTML = trcontent
    var carrTable = document.querySelector('tbody')
    carrTable.append(addtr)
    
    // Gán event listener cho nút xóa (DeletCart Logic)
    addtr.querySelector('.cart-delete').addEventListener("click", function(event){
        var cartDelete = event.target
        var cartItemR = cartDelete.parentElement.parentElement
        cartItemR.remove()
        carttotal()
    });

   // Gán event listener cho input số lượng (InputChange Logic)
    addtr.querySelector('.cart-quantity-input').addEventListener("change", function(){
        carttotal()
    });
    carttotal()

}

/*----------------------totalprice-------------------------*/

function carttotal(){
    var cartItem = document.querySelectorAll('tbody tr');
    var totalAllCart = 0; // Biến lưu tổng tiền cuối cùng của giỏ hàng
    
    for(var i = 0; i < cartItem.length; i++){
        
        // Lấy Số lượng: Chuyển thẳng sang số nguyên (integer)
        var inputvalue = cartItem[i].querySelector("input").value;
        var quantity = parseInt(inputvalue); 
        
        // Lấy Giá sản phẩm (CẦN LÀM SẠCH)
        var produtPriceString = cartItem[i].querySelector(".prices").innerHTML;
        
        // Xóa TẤT CẢ các dấu chấm (dùng regex /\./g) trong chuỗi
        var cleanPriceString = produtPriceString.replace(/\./g, '');
        var productPrice = parseInt(cleanPriceString);
        // ----------------------------------------------------
        
        // Kiểm tra an toàn
        if (isNaN(productPrice) || isNaN(quantity)) {
             console.log("Cảnh báo: Giá hoặc Số lượng không hợp lệ!");
             continue; 
        }
        var A = productPrice * quantity;
        totalAllCart += A; 
       
       // totalID= totalAllCart.toLocaleString('de-DE')
    }
    var carticon=document.querySelector(".cart-icon span")
    var carttotalA = document.querySelector(".price-total span")
    carttotalA.innerHTML= totalAllCart.toLocaleString('de-DE')
    if (carticon) {
        carticon.innerHTML= totalAllCart.toLocaleString('de-DE')
    }
    console.log(carttotalA);
}

/*----------------------totalprice-------------------------*/
// function deletcart(){
//      var cartItem = document.querySelectorAll('tbody tr');
//     for(var i = 0; i < cartItem.length; i++){
//         var produtT=document.querySelectorAll('.cart-delete')
//         produtT[i].addEventListener("click",function(event){
//             var cartDelete = event.target
//             var cartItemR = cartDelete.parentElement.parentElement
//             cartItemR.remove()
//             carttotal()
//         })
//     }
// }
// function inputchange(){
//          var cartItem = document.querySelectorAll('tbody tr');
//     for(var i = 0; i < cartItem.length; i++){
//         console.log(cartItem);
        
//         var inputvalue=cartItem[i].querySelector('input')
//         inputvalue.addEventListener("change", function(){
//             carttotal()
//          })
//     }
// }


const cartcloss=document.querySelector(".fa-circle-xmark")
const cartshow = document.querySelector(".fa-cart-shopping")
cartshow.addEventListener("click",function(){
    console.log(cartshow);
    
    document.querySelector(".cart").style.right="0"
})
cartcloss.addEventListener("click",function(){
    document.querySelector(".cart").style.right="-100%"
})


// --- Chức năng Tìm kiếm Sản phẩm ---
function filterProducts() {
    // 1. Lấy giá trị từ ô tìm kiếm
    var input = document.getElementById('searchInput');
    // Chuyển từ khóa tìm kiếm sang chữ HOA để đảm bảo tìm kiếm KHÔNG phân biệt chữ hoa/thường.
    var filter = input.value.toUpperCase();
    //Lấy tất cả các sản phẩm. mỗi sản phẩm là một thẻ có class "product-item".
    var productItems = document.querySelectorAll('.product-item');
    //Lặp qua từng sản phẩm để so sánh và lọc
    productItems.forEach(function(item) {
        var productNameElement = item.querySelector('H1');  
        if (productNameElement) {
            // Lấy nội dung văn bản của tên sản phẩm
            var productName = productNameElement.textContent || productNameElement.innerText;
            // Kiểm tra xem tên sản phẩm (đã chuyển sang chữ HOA) có chứa từ khóa tìm kiếm hay không.
            if (productName.toUpperCase().indexOf(filter) > -1) {
                item.style.display = ""; 
            } else {
                item.style.display = "none";
            }
        }
    });
}
