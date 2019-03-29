<template>
<div id="player" > </div>
</template>
<script>
export default {
  data() {
    return {
      Video360Url : '/src/playerAssets/London Park.mp4',

    }
  },
  watch: {

  },
  methods: {

  },
  filters: {

  },
  beforeCreate() {


  },
  mounted() {
          // require modules
          var Clappr = require("clappr");
          var Video360 = require("clappr-video360");


            // Configure your Clappr player.
            var PlayerInstance = new Clappr.Player({
                source: this.Video360Url,
                width: 1305,
                 height: 768,//fix this
                plugins: {
                    container: [Video360,],

                },
                parentId: '#player',
                autoPlay: true,
                loop: true,
                mediacontrol: {seekbar: "red", buttons: "#66B2FF"},
            });

            // Important to disable the click to pause native plugin of clappr
            // otherwise you won't be able to use correctly the player
            PlayerInstance.getPlugin('click_to_pause').disable();

  }
}
</script>
<style scoped>

</style>

