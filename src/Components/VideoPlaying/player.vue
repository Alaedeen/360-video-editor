<template>
<div id="player" style=""> </div>
</template>
<script>
export default {
  data() {
    return {

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
    // The URL to the 360 video player

            // var Video360Url = '/src/playerAssets/London Park.mp4';
            var Video360Url = 'http://thiago.me/demo-360/cool.mp4';

            // Configure your Clappr player.
            var PlayerInstance = new Clappr.Player({
                source: Video360Url,
                width: '100%',
                height: 600,//fix this 
                plugins: {
                    container: [Video360],
                },
                parentId: '#player',
            });

            // Important to disable the click to pause native plugin of clappr
            // otherwise you won't be able to use correctly the player
            PlayerInstance.getPlugin('click_to_pause').disable();
            PlayerInstance.play()

  }
}
</script>
<style scoped>

</style>

