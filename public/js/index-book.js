let pathName = window.location.pathname;
console.log(pathName);
let params = new URL(document.location).searchParams;
// console.log(params.get('status'))
if (pathName == "/book" && params.get("status") == null) {
  $(".all-books").addClass("active");
}
if (params.get("status") == "publish") {
  $(".publish-books").addClass("active");
}
if (params.get("status") == "draft") {
  $(".draft-books").addClass("active");
}
if (pathName == "/book/trash") {
  $(".trash-books").addClass("active");
}
$(".input-keyword").on("input", function (e) {
  let s = $(this).val()
  $("#tombolKeyword").on("click", function (e) {
      if (params.get("status") == null) {
        window.location.href = "/book?keyword=" + s+ "&page=1";
      }
      if (params.get("status") == "publish") {
        window.location.href = "/book?keyword=" + s + "&status=publish" + "&page=1";
      }
      if (params.get("status") == "draft") {
        window.location.href = "/book?keyword=" + s + "&status=draft"+ "&page=1";
      }
      if (pathName == "/book/trash") {
        window.location.href = "/book/trash?keyword=" + s+ "&page=1";
      }
  });

  console.log($(this).val());
});
