
$(document).ready(function(){
    console.log("hello world");
    $("#addProdBtn").click(function(){
        add_product();
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
        checkUnique(sku, pname, pprice);
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
        $("#product_list").HTML( "<p>No record found</p>");
    }
    else {

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
        $(".table_output").html(result);
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
        $("#product_sku").val() = prodArr.id;
        $("#product_name").val() = prodArr.name;
        $("#product_price").val() = prodArr.price;
        $("#product_quantity").val() = prodArr.price;
        $("#updateProdBtn").style = "display:block";
        $("#updateProdBtn").setAttribute("onclick", `updateProdArr(${id})`);
        $("#addProdBtn").style = "display:none";
        $("#product_sku").setAttribute("disabled",'disabled');
    
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
                prodArray[i].name = $("prodName").val();
                prodArray[i].price = $("prodPrice").val();
            }
           
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
