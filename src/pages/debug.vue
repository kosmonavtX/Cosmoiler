<template>
<f7-page>
    <f7-navbar :title="this.$t('system.title')" back-link="Back" sliding></f7-navbar>


    <div v-if=this.$store.state.connect>
        <f7-list accordion>

            <f7-list-item accordion-item title="Скорость" class="settings" media="<i class='icon icon-light-up'>">
                <f7-accordion-content>
                    <f7-list media-list>
                        <f7-list-item>
                            <f7-card>
                                <f7-card-content>

                                    <div :style="styledivBright">
                                        <f7-label class="labelin">{{ $t('system.led.bright', {p: paramSPEED}) }}</f7-label>
                                        <f7-input type="range" min="100" max="150" step="10" v-model.number="paramSPEED">
                                        </f7-input>
                                    </div>

                                </f7-card-content>
                            </f7-card>
                        </f7-list-item>
                    </f7-list>
                </f7-accordion-content>
            </f7-list-item>

        </f7-list>
    </div>
</f7-page>
</template>

<script>
    export default {
        data() {
            return {
                cautionStyle: 'font-size: 18px; font-weight: bold; color: #e91e63; margin-bottom',
                stylediv1: 'margin-top: 6px',
                styledivBright: 'margin-top: 0px'
            }
        },
        computed: {
            paramSPEED: {
                set(value) {
                    this.$store.commit('UPD_DBG_SPEED', value);
                    this.$store.dispatch('Speed')
                },
                get() {
                    return this.$store.state.debug.speed
                },
            }
        }
    }

</script>

<style>


</style>
