$(function() {
    
    $(document).on('click','.hoverline',function() {
        var image = '<img width="100%" src="http://srvappli2012:83/images_collab/' + ($(this).closest('tr').find('td:eq(2)').html()).trim() + '.png " alt="thumbnail" class="img-thumbnail"></img>';
       $("#images_click").html(image);
       $('.nomUser').html(($(this).closest('tr').find('td:eq(1)').html()).trim())
       $('#matUser').html(($(this).closest('tr').find('td:eq(2)').html()).trim())
    })
})