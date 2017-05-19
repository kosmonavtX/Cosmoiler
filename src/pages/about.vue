<template>
  <f7-page>
    <f7-navbar title="О системе" back-link="Back" sliding></f7-navbar>
    <f7-block inner>
        <p>S/N: {{obj.sn}}</p>
        <p>Firmware version: {{obj.fw.major}}.{{obj.fw.minor}}.{{obj.fw.build}}</p>
        <p>HW version: rev.{{obj.hw}}</p>
    </f7-block>
  </f7-page>
</template>

<script>


export default {
    data: function() {
        return {
            obj: {fw: {major: 999, minor: 999, build: 9999}, hw: 999, sn: 0},
        }
    },
    created: function () {
        console.log("beforeMount About");
        this.fetchFW();
    },
    methods: {
        fetchFW: function() {
            var self = this;
            this.axios.get('http://' + self.$root.uri + "/ver.json").then(
            function(response) {
                self.obj = response.data;//JSON.parse(response.data);
                console.log(self.obj);
                console.log(response);
            }, 
            function(err) {
                console.log('error get ver.json');
            })
        }
    }
}
</script>