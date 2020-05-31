<template>
<f7-page>
    <f7-navbar :title="this.$t('settings')" back-link="Back" sliding v-on:back-click="back"></f7-navbar>
    <div v-if=this.$store.state.connect>
        <f7-list accordion>
<!--             <f7-list-item opened accordion-item :title="this.$t('settings.pump.title')" class="settings" media="<i class='icon icon-pump'>">
                <f7-accordion-content> -->
                    <f7-list media-list>
                        <f7-list-item>
                            <div slot="inner">
                                <div style="margin-top: 6px">
                                    <f7-label class="labelin">{{ $t('settings.pump.on', {p: param1}) }}</f7-label>
                                    <f7-input type="range" min="10" max="500" step="5" v-model="param1"></f7-input>

                                    <f7-label class="labelin">{{ $t('settings.pump.off', {p: param2}) }}</f7-label>
                                    <f7-input type="range" :min="param1 * 2" :max="2000" step="10" v-model="param2"></f7-input>
                                </div>
                            </div>

                        </f7-list-item>
                    </f7-list>
<!--                 </f7-accordion-content>
            </f7-list-item> -->

        </f7-list>
    </div>
</f7-page>
</template>

<script>

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
        beforeDestroy: function() {
            this.$store.dispatch('changeManualCnfg');
        },
        computed: {
            param1: {
                get() {return this.$store.state.manual.manual.pump.dpms},
                set(value) { this.$store.commit('UPD_MAN_DPMS', value) }
            },
            param2: {
                get() { return this.$store.state.manual.manual.pump.dpdp },
                set(value) { this.$store.commit('UPD_MAN_DPDP', value) }
            }
        }
    }
</script>

<style>

</style>
