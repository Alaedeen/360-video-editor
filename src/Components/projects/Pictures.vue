<template>
<div style="margin-right: -5em;margin-top: 2em;">
  <label id="#bb" class="btn"> Add New Picture
    <input type="file" id="File"   size="60" @change="onImageSelected" >
  </label>

</div>
</template>

<script>
export default {
  methods: {
    onImageSelected(event){
      alert(event.target.files[0].type.includes("image"));

    }
  },
}
</script>

<style scoped>
label{
    margin-left: 25%;
    padding: 10px;
    background: red;
    display: table;
    color: #fff;
     }



input[type="file"] {
    display: none;
}

</style>

