
//数据转化
function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : "0" + n;
}
// 根据时间戳转换时间
export function formatTime(number, format) {
  var formateArr = ["Y", "M", "D", "h", "m", "s"];
  var returnArr = [];

  var date = new Date(number);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));

  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));

  for (var i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}