<template>
<f7-page>
    <f7-navbar title="Настройки" back-link="Back" sliding v-on:back-click="back"></f7-navbar>
    <f7-list accordion>
        <f7-list-item accordion-item title="Настройки насоса" class="settings" after="<i class='icon icon-pump'>">
            <f7-accordion-content>
                <f7-list media-list>
                    <f7-list-item>

                        <!--            <div slot="root" class='icon icon-meter'></div>-->
                        <div slot="inner">
                            <div style="margin-top: 6px">
                                <f7-label class="labelin">Время вкл: {{config.manual.pump.dpms}}</f7-label>
                                <f7-input type="range" min="10" max="500" step="10" v-model="config.manual.pump.dpms"></f7-input>
                                <!--                                <f7-input type="number" v-model.number="config.trip.pump.dpms" placeholder="Введите время импульса насоса (1/1000 сек)"></f7-input>-->
                                <f7-label class="labelin">Время выкл: {{config.manual.pump.dpdp}}</f7-label>
                                <f7-input type="range" :min="config.manual.pump.dpms * 1.5" :max="config.manual.pump.dpms * 50" step="10" v-model="config.manual.pump.dpdp"></f7-input>
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
    export default {
        data () {
            return {
                config: this.$root.config,
            }
        },
        methods: {
            back: function() {
                this.$root.saveConfig();
            }  
        },        
        components: {
        }
    }
</script>

<style>
    
</style>