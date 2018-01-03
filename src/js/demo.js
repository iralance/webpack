import $ from "jquery"
import _ from "lodash"
import png from '../images/1.jpg'
//速控
$("h1").html("this is a h1").on('click', _.throttle(function(){
    console.log('click h1');
}, 1000));

$('#img').attr('src',png);


const fruits = ['Apple','Orange','Banana'];
for(let fruit of fruits) {
    if(fruit == 'Orange'){
        continue;
    }
    console.log(fruit);
}
