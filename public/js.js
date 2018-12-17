
// var a="a";
// var b="0";
// // alert(document.getElementById(a).value);

// $(function(){
    
//     $('#'+a).change(function(){
//         var a=document.getElementById(a).value;
        
//         $.ajax({
//             method: 'get',
//             url: '/products/category/5bf2474b6ca1b41c87d99a9b',
//             data: { brand : a},
//             dataType: 'json',
//             success: function(json){
//                 var data = json.hits.hits.map(function(hit){
//                     return hit;
//                 });
 
//                 console.log(data);
 
//                 $('#searchResults').empty();
//                 for( var i=0; i < data.length; i++){
//                     var html = "";
//                     html += '<div class="col-md-4">';
//                     html += '<a href="/product/' + data[i]._source._id + '">';
//                     html += '<div class="thumbnail">';
//                     html += '<img src="' + data[i]._source.image + '">';
//                     html += '<div class="caption">';
//                     html += '<h3>' + data[i]._source.name + '</h3>';
//                     // html += '<p>' + data[i]._source.category.name + '</p>';
//                     html += '<p>$' + data[i]._source.price  + '.00</p>';
//                     html += '</div>';
//                     html += '</div>';
//                     html += '</a>';
//                     html += '</div>';
 
//                     $('#searchResults').append(html);
//                 }
//             },
//             error: function(err){
 
//                 $('#searchResults').empty();
 
//                 var html = "'<p>Noting Found</p>'";
 
//                 $('#searchResults').append(html);
 
//                 console.log(err);
//             }
//         });
//     });
//  });