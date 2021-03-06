"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import styles from "./styles"

var cleanups = {
  // some useless stuff for us
  // that svgo doesn't remove
  title: /<title>.*<\/title>/gi,
  desc: /<desc>.*<\/desc>/gi,
  comment: /<!--.*-->/gi,
  defs: /<defs>.*<\/defs>/gi,

  // remove hardcoded dimensions
  width: / +width="\d+(\.\d+)?(px)?"/gi,
  height: / +height="\d+(\.\d+)?(px)?"/gi,

  // remove fill
  fill: / +fill=\"(none|#[0-9a-f]+)\"/gi,

  // Sketch.app shit
  sketchMSShapeGroup: / +sketch:type=\"MSShapeGroup\"/gi,
  sketchMSPage: / +sketch:type=\"MSPage\"/gi,
  sketchMSLayerGroup: / +sketch:type=\"MSLayerGroup\"/gi

  // @styled(styles)
};
var SVGInline = function (_Component) {
  _inherits(SVGInline, _Component);

  function SVGInline() {
    _classCallCheck(this, SVGInline);

    return _possibleConstructorReturn(this, (SVGInline.__proto__ || Object.getPrototypeOf(SVGInline)).apply(this, arguments));
  }

  _createClass(SVGInline, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          className = _props.className,
          component = _props.component,
          svg = _props.svg,
          fill = _props.fill,
          stroke = _props.stroke,
          strokeSize = _props.strokeSize,
          width = _props.width,
          accessibilityLabel = _props.accessibilityLabel,
          accessibilityDesc = _props.accessibilityDesc,
          classSuffix = _props.classSuffix,
          cleanupExceptions = _props.cleanupExceptions,
          componentProps = _objectWithoutProperties(_props, ["className", "component", "svg", "fill", "stroke", "strokeSize", "width", "accessibilityLabel", "accessibilityDesc", "classSuffix", "cleanupExceptions"]);

      var _props2 = this.props,
          cleanup = _props2.cleanup,
          height = _props2.height;


      if (
      // simple way to enable entire cleanup
      cleanup === true ||
      // passing cleanupExceptions enable cleanup as well
      cleanup.length === 0 && cleanupExceptions.length > 0) {
        cleanup = Object.keys(cleanups);
      }
      cleanup = cleanup.filter(function (key) {
        return !(cleanupExceptions.indexOf(key) > -1);
      });

      if (width && height === undefined) {
        height = width;
      }

      // remove useless props for wrapper
      delete componentProps.cleanup;
      delete componentProps.height;

      var classes = (0, _classnames2.default)(_defineProperty({
        "SVGInline": true,
        "SVGInline--cleaned": cleanup.length
      }, className, className));
      var svgClasses = classes.split(" ").join(classSuffix + " ") + classSuffix;
      var svgStr = SVGInline.cleanupSvg(svg, cleanup).replace(/<svg/, "<svg class=\"" + svgClasses + "\"" + (fill ? " fill=\"" + fill + "\"" : "") + (stroke ? " stroke=\"" + stroke + "\"" : "") + (strokeSize ? " stroke-width=\"" + strokeSize + "\"" : "") + "stroke-linecap=\"square\"" + (width || height ? " style=\"" + (width ? "width: " + width + ";" : "") + (height ? "height: " + height + ";" : "") + "\"" : ""));
      var match = void 0;
      if (accessibilityDesc) {
        match = /<svg.*?>/.exec(svgStr);
        var pos = match.index + match[0].length;
        svgStr = svgStr.substr(0, pos) + ("<desc>" + accessibilityDesc + "</desc>") + svgStr.substr(pos);
      }
      if (accessibilityLabel) {
        match = match || /<svg.*?>/.exec(svgStr);
        var _pos = match.index + match[0].length - 1;
        var id = "SVGInline-" + SVGInline.idCount++ + "-title";
        svgStr = svgStr.substr(0, _pos) + (" role=\"img\" aria-labelledby=\"" + id + "\"") + svgStr.substr(_pos, 1) + ("<title id=\"" + id + "\">" + accessibilityLabel + "</title>") + svgStr.substr(_pos + 1);
      }
      return _react2.default.createElement(component, _extends({}, componentProps, { // take most props
        className: classes,
        dangerouslySetInnerHTML: {
          __html: svgStr
        }
      }));
    }
  }]);

  return SVGInline;
}(_react.Component);

SVGInline.propTypes = {
  className: _propTypes2.default.string,
  classSuffix: _propTypes2.default.string,
  component: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func]),
  svg: _propTypes2.default.string.isRequired,
  fill: _propTypes2.default.string,
  stroke: _propTypes2.default.string,
  strokeSize: _propTypes2.default.number,
  cleanup: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.array]),
  cleanupExceptions: _propTypes2.default.array,
  width: _propTypes2.default.string,
  height: _propTypes2.default.string,
  accessibilityLabel: _propTypes2.default.string,
  accessibilityDesc: _propTypes2.default.string
};

SVGInline.defaultProps = {
  component: "span",
  classSuffix: "-svg",
  cleanup: [],
  cleanupExceptions: []
};

SVGInline.idCount = 0;

SVGInline.cleanupSvg = function (svg) {
  var cleanup = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  return Object.keys(cleanups).filter(function (key) {
    return cleanup.indexOf(key) > -1;
  }).reduce(function (acc, key) {
    return acc.replace(cleanups[key], "");
  }, svg).trim();
};

exports.default = SVGInline;
