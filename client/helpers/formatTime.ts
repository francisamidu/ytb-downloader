const secondsToHms = (seconds: string | number) => {
  let d = Number(seconds);

  if (d <= 0) {
    return "00:00:00";
  } else {
    let h = Math.floor(d / 3600);
    let m = Math.floor((d % 3600) / 60);
    let s = Math.floor((d % 3600) % 60);

    let hDisplay = h <= 9 ? "0" + h + ":" : h + ":";
    let mDisplay = m <= 9 ? "0" + m + ":" : m + ":";
    let sDisplay = s <= 9 ? "0" + s : s;

    return hDisplay + mDisplay + sDisplay;
  }
};
export default secondsToHms;
