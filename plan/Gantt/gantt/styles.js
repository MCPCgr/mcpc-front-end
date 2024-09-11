var SIZE = '14px';
var TYPE = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

function getFont(options) {
  var fontSize = options && options.fontSize ? options.fontSize : SIZE;
  var fontFamily = options && options.fontFamily ? options.fontFamily : TYPE;

  return "bold " + fontSize + " " + fontFamily;
}

export default function getStyles(options) {
  var bgColor = options && options.bgColor ? options.bgColor : '#fff';
  var lineColor = options && options.lineColor ? options.lineColor : '#eee';
  var redLineColor = options && options.redLineColor ? options.redLineColor : '#f04134';
  var groupBack = options && options.groupBack ? options.groupBack : '#3db9d3';
  var groupFront = options && options.groupFront ? options.groupFront : '#299cb4';
  var taskBack = options && options.taskBack ? options.taskBack : 'rgba(174,241,190,0.85)';
  var taskFront = options && options.taskFront ? options.taskFront : '#46ad51';
  var milestone = options && options.milestone ? options.milestone : '#d33daf';
  var warning = options && options.warning ? options.warning : '#faad14';
  var danger = options && options.danger ? options.danger : '#f5222d';
  var link = options && options.link ? options.link : '#ffa011';
  var textColor = options && options.textColor ? options.textColor : '#222';
  var lightTextColor = options && options.lightTextColor ? options.lightTextColor : '#999';
  var lineWidth = options && options.lineWidth ? options.lineWidth : '1px';
  var thickLineWidth = options && options.thickLineWidth ? options.thickLineWidth : '1.4px';
  var fontSize = options && options.fontSize ? options.fontSize : SIZE;
  var smallFontSize = options && options.smallFontSize ? options.smallFontSize : '12px';
  var fontFamily = options && options.fontFamily ? options.fontFamily : TYPE;
  var whiteSpace = options && options.whiteSpace ? options.whiteSpace : 'pre';

  var line = {
    stroke: lineColor,
    'stroke-width': lineWidth
  };
  var redLine = {
    stroke: redLineColor,
    'stroke-width': lineWidth
  };
  var thickLine = {
    stroke: lineColor,
    'stroke-width': thickLineWidth
  };
  var text = {
    fill: textColor,
    'dominant-baseline': 'central',
    'font-size': fontSize,
    'font-family': fontFamily,
    'white-space': whiteSpace
  };
  var smallText = {
    fill: lightTextColor,
    'font-size': smallFontSize
  };

  return {
    week: {
      fill: 'rgba(252, 248, 227, .6)'
    },
    box: Object.assign({}, thickLine, {
      fill: bgColor
    }),
    line: line,
    cline: redLine,
    bline: thickLine,
    label: text,
    groupLabel: Object.assign({}, text, {
      'font-weight': '600'
    }),
    text1: Object.assign({}, text, smallText, {
      'text-anchor': 'end'
    }),
    text2: Object.assign({}, text, smallText),
    text3: Object.assign({}, text, smallText, {
      'text-anchor': 'middle'
    }),
    text4: Object.assign({}, text, smallText, {
      'text-anchor': 'end',
      fill:'#fff'
    }),
    link: {
      stroke: link,
      'stroke-width': '2px',
      fill: 'none',
      cursor: "pointer"
    },
    linkArrow: {
      fill: link
    },
    milestone: {
      fill: milestone
    },
    groupBack: {
      fill: groupBack
    },
    groupFront: {
      fill: groupFront
    },
    taskBack: {
      fill: taskBack
    },
    taskFront: {
      fill: taskFront
    },
    warning: {
      fill: warning
    },
    danger: {
      fill: danger
    },
    ctrl: {
      display: 'none',
      fill: '#f0f0f0',
      stroke: '#929292',
      'stroke-width': '1px'
    }
  };
}
