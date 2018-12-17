import Main from './main.vue'
import Vue from 'vue'

var modalStack = []
var ModalConstructor = function() {}

function initModal(Main) {
  ModalConstructor = Vue.extend(Main)
}

var getAnInstance = () => {
  if (modalStack.length > 0) {
    var instance = modalStack[0]
    modalStack.splice(0, 1)
    return instance
  }
  return new ModalConstructor({
    el: document.createElement('div')
  })
}
var isExistModal = false
var BoqiiModal = (options = {}) => {
  if (isExistModal) return
  var templateModal = options.template
  var props = options.params || {}
  var instance = {}
  var enterAnimate = options.enter
  var leaveAnimate = options.leave
  var successCb = options.success || function() {}
  var failCb = options.fail || function() {}
  var closeCb = options.close || function() {}
  var MainInstance = Object.assign({}, Main)
  var duration = options.duration >= 0 ? options.duration : 700
  var backScroll = options.backScroll || false;
  var backdropClickable = options.backdropClickable || false
  var scrollTop = 0;
  isExistModal = true
  MainInstance.components = {
    templateModal
  }
  MainInstance.methods.removeModal = function(instance2) {
    isExistModal = false
    setTimeout(() => {
      instance.$el.parentNode.removeChild(instance.$el)
      if (!backScroll) {
        document.body.style.overflow = 'initial';
        document.body.style.position = 'initial';
        document.scrollingElement.scrollTop = scrollTop;
      }
    }, duration)
  }
  MainInstance.methods.successCb = function(data, instance) {
    isExistModal = false
    successCb(data, instance)
  }
  MainInstance.methods.failCb = function(data) {
    isExistModal = false
    failCb(data)
  }
  MainInstance.methods.closeCb = function(data) {
    isExistModal = false
    closeCb(data)
  }
  MainInstance.methods.hideModal = function () {
    console.log("============");
    isExistModal = false
    instance.isHide = true;
  }
  MainInstance.methods.showMdal = function(){
    isExistModal = true
    instance.isHide = false; 
  }

  initModal(MainInstance)
  instance = getAnInstance()
  instance.closed = false

  document.body.appendChild(instance.$el)
  Vue.nextTick(function() {
    instance.enterAnimate = enterAnimate || 'bounceInDown'
    instance.leaveAnimate = leaveAnimate || 'bounceOutUp'
    instance.propsParams = props
    instance.modalVisible = true
    instance.visible = true
    instance.duration = duration
    instance.backdropClickable = backdropClickable
    if (!backScroll ){
      document.body.style.overflow = 'hidden';
      scrollTop = document.scrollingElement.scrollTop;
      document.body.style.top = -scrollTop + 'px';
      document.body.style.width = '100vw';
      document.body.style.position = 'fixed';
    }
  })
  return instance
}

export default BoqiiModal
