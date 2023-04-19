const width = 1200;
const goldenRec = (1 + Math.sqrt(5)) / 2;

var num = 0;
var useColor = true;
var backGroundColor = "#000000";
var lineColor = "#000000";
var padding = 10;
var w = 0.1;
var lineLight = false;
var bloom = false;
var wi = 5;
const colors = [
  "#9b59b6",
  "#3498db",
  "#1abc9c",
  "#e74c3c",
  "#f1c40f",
  "#2c3e50",
  "#7f8c8d",
  "#27ae60",
  "#d35400",
  "#c0392b",
  "#16a085",
  "#f39c12",
  "#2980b9",
  "#8e44ad",
  "#34495e",
  "#2ecc71",
  "#e67e22",
  "#95a5a6",
  "#f44336",
  "#ecf0f1",
];

const dirs = ["row", "column", "row-reverse", "column-reverse"];
const ani = ["left", "top", "right", "bottom"]
Set();

function Set() {
  var x = padding;
  var y = padding;
  document.body.style.backgroundColor = backGroundColor;
  var svg = document.getElementById("svg");
  svg.setAttribute("width", width);
  svg.setAttribute("height", width / goldenRec);

  function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

    return {
      x: centerX + radius * -Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  }

  function describeArc(x, y, radius, startAngle, endAngle) {
    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
      "M",
      start.x,
      start.y,
      "A",
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
    ].join(" ");

    return d;
  }

  CreateRect((width - 2 * padding) / goldenRec);

  function CreateRect(val) {
    num++;
    if (num > 100) {
      return;
    }
    var test =
      "<rect class='haku-from-"+ani[num%ani.length]+"' haku-ani-delay='"+100*num+"' height='" +
      val +
      "' width='" +
      val +
      "' fill='" +
      (useColor ? colors[num % colors.length] : backGroundColor) +
      "' x=' " +
      x +
      "' y='" +
      y +
      "'/>";
    svg.innerHTML += test;
    let mx, my, st, end, mx1, my1;
    if (lineLight) {
      w /= goldenRec;
    }
    let l = 0;
    switch (num % 4) {
      case 0:
        mx = x;
        my = y + val;
        st = -90;
        end = 0;
        y -= val / goldenRec;
        break;
      case 1:
        mx = x;
        my = y;
        mx = x;
        my = y;
        (st = -180), (end = -90);
        x += val;
        break;
      case 2:
        mx = x + val;
        my = y;
        st = 90;
        end = 180;
        y += val;
        x += val / goldenRec / goldenRec;
        break;
      case 3:
        mx = x + val;
        my = y + val;
        st = 0;
        end = 90;
        x -= val / goldenRec;
        y += val / goldenRec / goldenRec;
        break;
    }
    svg.innerHTML +=
      '<path  id="path' +
      num +
      '" d="' +
      describeArc(mx, my, val, st, end) +
      '" fill="none" style="fill-opacity: 0' +
      "; stroke: " +
      lineColor +
      '; filter: url(#glow);" stroke-width="' +
      w +
      '"/>';

    CreateRect(val * (goldenRec - 1));
  }
  if (bloom) {
    // var mask = document.getElementById("mask")
    // // mask.className="masked-element";
    // mask.style.backgroundColor= "#ff0000"
    // document.getElementById("main").appendChild(mask)
  }
  OnScroll()
}
