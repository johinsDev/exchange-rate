export default function number_format(
  number: string,
  decimals: number,
  dec_point: string,
  thousands_point: string
) {
  if (!decimals) {
    const len = number.toString().split(".").length;
    decimals = len > 1 ? len : 0;
  }

  if (!dec_point) {
    dec_point = ".";
  }

  if (!thousands_point) {
    thousands_point = ",";
  }

  number = parseFloat(number).toFixed(decimals);

  number = number.replace(".", dec_point);

  const splitNum = number.split(dec_point);

  splitNum[0] = splitNum[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousands_point);

  number = splitNum.join(dec_point);

  return number;
}
