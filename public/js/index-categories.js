
let pathName = window.location.pathname;
console.log(pathName);
let params = new URL(document.location).searchParams;
// console.log(params.get('status'))
if (pathName == "/categories") {
  $(".categories-index").addClass("active");
}
if (pathName == "/categories/trash") {
  $(".categories-trash").addClass("active");
}
$(".input-keyword").on("input", function (e) {
  let s = $(this).val()
  $("#tombolKeyword").on("click", function (e) {
      if (pathName == '/categories') {
        window.location.href = "/categories?keyword=" + s+ "&page=1";
      }
      if (pathName == "/book/trash") {
        window.location.href = "/categories/trash?keyword=" + s+ "&page=1";
      }
  });

  console.log($(this).val());
});
