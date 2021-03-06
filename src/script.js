
$(document).ready(function(){
    console.log("hello world");
    $("#addProdBtn").click(function(){
        add_product();
    });
    $(".close").click(function(){
        $(".error").attr("style","display:none");
        $(".success").attr("style","display:none");
    });
   

});
var prodArray = [];
function add_product() {
    var sku = $("#product_sku").val();
    var pname = $("#product_name").val();
    var pprice = $("#product_price").val();
    var pquantity =$("#product_quantity").val();
    console.log(pquantity);

    if(checkData(sku, pname, pprice, pquantity)) {
        checkUnique(sku, pname, pprice, pquantity);
        display();
    }

}
function checkData(sku, pname, pprice, pquantity) {
    //check valid values entered
    if (sku == "" || isNaN(sku)) {
        alert("Enter correct ID");
        $("#product_sku").focus();
    }
    else if (isNaN(pname) === false || pname === "") {
        alert("Field empty or invalid entry!");
        $("#product_name").focus();
    }
    else if (isNaN(pprice) || pprice === "") {
        alert("Field empty or invalid entry!");
        $("#product_price").focus();
    }
    else if (isNaN(pquantity) || pquantity === "") {
        alert("Field empty or invalid entry!");
        $("#product_quantity").focus();
    }
    else {
        return true;
    }

}
function dataInsert(sku, pname, pprice, pquantity) {
    //insert elements in array
    prodArray.push({
        "id": sku,
        "name": pname,
        "price": pprice,
        "quantity": pquantity
    });
}
function checkUnique(sku, pname, pprice, pquantity) {
    //check id is unique or not
    if (prodArray.length == 0) {
        dataInsert(sku, pname, pprice, pquantity);
        return;
    }
    else {
        for (var i = 0; i < prodArray.length; i++) {
            if (prodArray[i].id == sku) {
                alert("ID already exist");
                return;
            }
        }
        dataInsert(sku, pname, pprice, pquantity);
    }
}
//display in table format
function display() {
    var result = "";

    if (prodArray.length === 0) {
        $(".error").attr("style","display:block");
        $(".err_msg").html( "<p>No record found</p>");
        $(".table_output").html("");
    }
    else {
        $(".succ_msg").html( "Successfully.");
        $(".success").attr("style","display:block");
        for (var i = 0; i < prodArray.length; i++) {
            result += `<tr>
            <td>${prodArray[i].id}</td>
            <td>${prodArray[i].name}</td>
            <td>${prodArray[i].price}</td>
            <td>${prodArray[i].quantity}</td>
            <td><a href ="#" onclick="dataEdit('${prodArray[i].id}')">Edit</a> |
            <a href ="#" onclick="deleteProd('${prodArray[i].id}')">Delete</a></td>
            </tr>`;
        }
        $(".table_output").html ("<table>\
        <tr>\
            <th>SKU</th>\
            <th>Name</th>\
            <th>Price</th>\
            <th>Quantity</th>\
            <th>Action</th>\
        </tr>"+result+"\</table>");
        
        
        }
    }



    function dataEdit(id) {
        var prodArr = getData(id);
        $("#product_sku").val(prodArr.id);
        $("#product_name").val(prodArr.name);
        $("#product_price").val(prodArr.price) ;
        $("#product_quantity").val(prodArr.quantity)  ;
        $("#updateProdBtn").click(function(){
            updateProdArr(id);
            $("#updateProdBtn").attr("style","display:none");
            $("#addProdBtn").attr("style","display:block");
            $( "#product_sku" ).prop( "disabled", false );

        });
        $("#updateProdBtn").attr("style","display:block");
        $("#addProdBtn").attr("style","display:none");
        $( "#product_sku" ).prop( "disabled", true );
    
    }
    //fetch product id
    function getData(id) {
        {
            for (let i = 0; i < prodArray.length; i++) {
                if (prodArray[i].id == id) {
                    return prodArray[i];
                }
            }
        }
    }
    function updateProdArr(id) {
        for (let i = 0; i < prodArray.length; i++) {
            if (prodArray[i].id == id) {
                prodArray[i].id = $("#product_sku").val();
                prodArray[i].name = $("#product_name").val();
                prodArray[i].price = $("#product_price").val();
                prodArray[i].quantity = $("#product_quantity").val()
            }
            $(".success").attr("style","display:block");
            $(".succ_msg").html( "Product Updated Successfully.");
        }
        display();
    }
    function deleteProd(id){
        for (let i =0; i<prodArray.length; i++){
            if (prodArray[i].id == id){
                prodArray.splice(i, 1);
                display();
                break;
            }
        }
        
        
    }
