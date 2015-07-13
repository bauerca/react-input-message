'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var React = require('react'),
    cn = require('classnames'),
    connectToMessageContainer = require('./connectToMessageContainer');

var stringOrArrayOfStrings = React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.arrayOf(React.PropTypes.string)]);

var MessageTrigger = (function (_React$Component) {
  _inherits(MessageTrigger, _React$Component);

  function MessageTrigger() {
    _classCallCheck(this, MessageTrigger);

    _React$Component.apply(this, arguments);
  }

  MessageTrigger.prototype.getContext = function getContext() {
    return process.env.NODE_ENV !== 'production' ? this.context : this._reactInternalInstance._context;
  };

  MessageTrigger.prototype.componentWillMount = function componentWillMount() {
    this._unregister = this.getContext().register(this.props['for'], this.props.group, this);
  };

  MessageTrigger.prototype.componentWillUnmount = function componentWillUnmount() {
    this._unregister();
  };

  MessageTrigger.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    this._unregister();
    this._unregister = this.getContext().register(nextProps['for'], nextProps.group, this);
  };

  MessageTrigger.prototype.render = function render() {
    var _cn;

    var errClass = this.props.activeClass,
        active = this.props['for'] && this.props.active,
        child = React.Children.only(this.props.children);

    return React.cloneElement(child, _extends({}, this._events(child.props), {

      className: cn(child.props.className, (_cn = {}, _cn[errClass] = active, _cn))
    }));
  };

  MessageTrigger.prototype._events = function _events(childProps) {
    var _this = this;

    var notify = this._notify;

    return this.props.events.reduce(function (map, evt) {
      map[evt] = notify.bind(_this, childProps[evt], evt);
      return map;
    }, {});
  };

  MessageTrigger.prototype._notify = function _notify(handler, event) {
    var context = this.getContext(),
        forProps = this.props['for'] ? [].concat(this.props['for']) : [];

    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    if (forProps.length) context.onValidateFields(forProps, event, this, args);else context.onValidateGroup(this.props.group, event, this, args);

    handler && handler.apply(this, args);
  };

  _createClass(MessageTrigger, null, [{
    key: 'propTypes',
    value: {
      events: React.PropTypes.arrayOf(React.PropTypes.string),
      activeClass: React.PropTypes.string,

      'for': stringOrArrayOfStrings,
      group: stringOrArrayOfStrings
    },
    enumerable: true
  }, {
    key: 'contextTypes',
    value: {
      onValidateFields: React.PropTypes.func,
      onValidateGroup: React.PropTypes.func,
      register: React.PropTypes.func
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      events: ['onChange'],
      activeClass: 'message-active'
    },
    enumerable: true
  }]);

  return MessageTrigger;
})(React.Component);

module.exports = connectToMessageContainer(MessageTrigger);

function requiredIfNot(propName, propType) {
  var type = React.PropTypes.string;

  return function (props, name, componentName) {
    var type = propType;

    if (!props.hasOwnProperty(propName)) type = type.isRequired;

    return type(props, name, componentName);
  };
}

