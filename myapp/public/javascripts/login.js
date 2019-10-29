alert(1);
$(document).ready(function () {
    $('.delete-article').on('click',function (event) {
        $target = $(event.target);
        console.log($target.attr('data-id'));
    });
});