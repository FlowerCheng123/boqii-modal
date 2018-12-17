<template>
  <div class="boqii-modal" @click="modalClick" v-show="!isHide">
    <div class="boqii-modal-inner" @click.stop="clickStop">
      <transition name="custom-classes-transition" :enter-active-class="'animated '+ enterAnimate" :leave-active-class="'animated '+leaveAnimate " :duration="duration">
        <templateModal @close="close" :params="propsParams" v-if="visible" @success="success" @fail="fail" @hide="hide" @show="show"></templateModal>
      </transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .boqii-modal {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    box-sizing: border-box;
    text-align: center;
    z-index: 9999;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 0.04rem 0.2rem;
    font-size: 0.3rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

<script type="text/babel">
  export default {
    props: {
      message: String,
      className: {
        type: String,
        default: ''
      },
      position: {
        type: String,
        default: 'middle'
      },
      iconClass: {
        type: String,
        default: ''
      }
    },
    components: {
      templateModal: null
    },
    data() {
      return {
        visible: false,
        modalVisible: false,
        propsParams: {},
        enterAnimate: 'bounceInDown',
        leaveAnimate: 'bounceOutUp',
        duration: 700,
        backdropClickable: false,
        isHide: false
      };
    },
    methods: {
      close() {
        console.log("main.vue close")
        this.visible = false;
        this.modalVisible = false;
        this.removeModal(this);
        this.closeCb()
      },
      success(data) {
        this.successCb(data, this);
      },
      fail(data) {
        this.failCb(data);
      },
      hide(data){
        this.hideModal()
      },
      show(data){
        this.showMdal();
      },
      clickStop() {
  
      },
      modalClick(){
        this.backdropClickable?this.close():'';
      }
    }
  };
</script>