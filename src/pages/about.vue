<template>
  <f7-page>
    <f7-navbar :title="this.$t('menu.about')" back-link="Back" sliding></f7-navbar>
    <f7-block inner>
        <p>S/N: {{obj.sn}}</p>
        <!--<p>Firmware version: {{obj.fw.major}}.{{obj.fw.minor}}.{{obj.fw.build}}</p>-->
        <p>Firmware version: {{obj.fw}}</p>
        <p>HW version: rev.{{obj.hw}}</p>
    </f7-block>
  </f7-page>
</template>

<script>


export default {
    data: function() {
        return {
            obj: this.$store.state.ver//{fw: {major: 999, minor: 999, build: 9999}, hw: 999, sn: 0},
        }
    },
}
</script>