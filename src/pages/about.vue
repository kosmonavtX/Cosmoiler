<template>
  <f7-page>
    <f7-navbar :title="this.$t('menu.about')" back-link="Back" sliding></f7-navbar>
    <f7-block inner>
        <p class="about">S/N: {{pn.pn}}</p>
        <p class="about">FW: {{obj.fw}}</p>
        <p class="about">HW: rev.{{obj.hw}}</p>
    </f7-block>
  </f7-page>
</template>

<script>


export default {
    data: function() {
        return {
            obj: this.$store.state.ver,//{fw: {major: 999, minor: 999, build: 9999}, hw: 999, sn: 0},
            pn: this.$store.state.pn
        }
    },
}
</script>