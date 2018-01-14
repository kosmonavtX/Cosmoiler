<template>
<f7-page>
    <f7-navbar title="Настройки" back-link="Back" sliding v-on:back-click="back"></f7-navbar>
    <f7-list accordion>
        <f7-list-item accordion-item title="Настройки насоса" class="settings" media="<i class='icon icon-pump'>">
            <f7-accordion-content>
                <f7-list media-list>
                    <f7-list-item>

                        <!--            <div slot="root" class='icon icon-meter'></div>-->
                        <div slot="inner">
                            <div style="margin-top: 6px">
                                <f7-label class="labelin">Время вкл: {{param1}}</f7-label>
                                <f7-input type="range" min="50" max="500" step="10" v-model="param1"></f7-input>

                                <f7-label class="labelin">Время выкл: {{param2}}</f7-label>
                                <f7-input type="range" :min="param1 * 2" :max="param1 * 4" step="10" v-model="param2"></f7-input>
                            </div>
                        </div>

                    </f7-list-item>
                </f7-list>
            </f7-accordion-content>
        </f7-list-item>
    </f7-list>
</f7-page>    
</template>

<script>
    
   // import store from '../store/store'
    
    export default {
        data () {
            return {
            }
        },
        methods: {
            back: function() {
                //this.$store.dispatch('changeConfig');// ??
            },
        },  
/*        created: function() {
            this.$f7.accordionOpen('<li class="settings accordion-item">')
        },*/
        beforeDestroy: function() {
            this.$store.dispatch('changeConfig');// ??
        },
        computed: {
            param1: {
                get() {return this.$store.state.config.pump.dpms},
                set(value) { this.$store.commit('UPD_MAN_DPMS', value) }
            },
            param2: {
                get() { return this.$store.state.config.pump.dpdp },
                set(value) { this.$store.commit('UPD_MAN_DPDP', value) }
            }
        }
    }
</script>

<style>
    
</style>