'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var React = require('react');

var stringOrArrayofStrings = React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.arrayOf(React.PropTypes.string)]);

module.exports = function (Component) {
  return (function (_React$Component) {
    _inherits(MessageListener, _React$Component);

    function MessageListener() {
      _classCallCheck(this, MessageListener);

      _React$Component.apply(this, arguments);
    }

    MessageListener.prototype.getContext = function getContext() {
      return process.env.NODE_ENV !== 'production' ? this.context : this._reactInternalInstance._context;
    };

    MessageListener.prototype.componentWillMount = function componentWillMount() {
      var _this = this;

      this._removeChangeListener = this.getContext().listen(function () {
        return _this.setState(_this._getValidationState());
      });

      this.setState(this._getValidationState());
    };

    MessageListener.prototype.componentWillUnmount = function componentWillUnmount() {
      this._removeChangeListener();
    };

    MessageListener.prototype.render = function render() {
      return React.createElement(Component, _extends({}, this.props, this.state));
    };

    MessageListener.prototype._getValidationState = function _getValidationState() {
      var messages = this.getContext().messages(this.props['for'], this.props.group);

      return {
        messages: messages,
        active: !!(messages && Object.keys(messages).length)
      };
    };

    _createClass(MessageListener, null, [{
      key: 'propTypes',
      value: {
        'for': stringOrArrayofStrings,
        group: stringOrArrayofStrings
      },
      enumerable: true
    }, {
      key: 'contextTypes',
      value: {
        messages: React.PropTypes.func,
        listen: React.PropTypes.func
      },
      enumerable: true
    }]);

    return MessageListener;
  })(React.Component);
};

