const formatBytes = (num: number) => {
  if (num == null || num === undefined || num <= 0) {
    return "0 Bytes";
  }
  var scaleCounter = 0;
  var scaleInitials = [
    " Bytes",
    " KB",
    " MB",
    " GB",
    " TB",
    " PB",
    " EB",
    " ZB",
    " YB",
  ];
  while (num >= 1024 && scaleCounter < scaleInitials.length - 1) {
    num /= 1024;
    scaleCounter++;
  }
  if (scaleCounter >= scaleInitials.length)
    scaleCounter = scaleInitials.length - 1;
  var compactNumber = num
    .toFixed(2)
    .replace(/\.?0+$/, "")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  compactNumber += scaleInitials[scaleCounter];
  return compactNumber.trim();
};
export default formatBytes;
