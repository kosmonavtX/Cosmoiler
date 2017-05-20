<template>
<f7-page>
    <f7-navbar title="Настройки" back-link="Back" sliding v-on:back-click="back"></f7-navbar>
    <f7-list accordion>
        <f7-list-item accordion-item title="Предустановки" class="settings" after="<i class='icon icon-presets'>">
            <f7-accordion-content>
                <f7-list media-list>
                    <f7-list-item title="Город" after="<i class='icon icon-building'>" class="presets-icon">

                        <!--            <div slot="root" class='icon icon-meter'></div>-->
                        <div slot="inner">
                            <div style="margin-top: 6px">
                                <f7-label class="labelin">Вемя (сек):</f7-label>
                                <f7-input type="number" v-model.number="config.time.presets[0].dp_time" placeholder="Введите время между включениями"></f7-input>
                                <f7-label class="labelin">Капли:</f7-label>
                                <f7-input type="number" v-model.number="config.time.presets[0].dp_num" placeholder="Количество капель за цикл"></f7-input>
                            </div>
                        </div>

                    </f7-list-item>
                    <f7-list-item title="ТРАССА" after="<i class='icon icon-highway'>" class="presets-icon">
                        <div slot="inner">
                            <div style="margin-top: 6px">
                                <f7-label class="labelin">Время (сек):</f7-label>
                                <f7-input type="number" v-model.number="config.time.presets[1].dp_time" laceholder="Введите время между включениями"></f7-input>
                                <f7-label class="labelin">Капли:</f7-label>
                                <f7-input type="number" v-model.number="config.time.presets[1].dp_num" placeholder="Количество капель за цикл"></f7-input>
                            </div>
                        </div>
                    </f7-list-item>
                    <f7-list-item v-if="false" title="Концевик" after="<i class='icon icon-highway'>" class="presets-icon">
                        <div slot="inner">
                            <div>
                                <f7-list-item class="labelin" checkbox name="my-checkbox" value="1" title="Checkbox 1" checked></f7-list-item>
                            </div>
                        </div>
                    </f7-list-item>
                </f7-list>
            </f7-accordion-content>
        </f7-list-item>
        <f7-list-item accordion-item title="Настройки насоса" class="settings" after="<i class='icon icon-pump'>">
            <f7-accordion-content>
                <f7-list media-list>
                    <f7-list-item>

                        <!--            <div slot="root" class='icon icon-meter'></div>-->
                        <div slot="inner">
                            <div style="margin-top: 6px">
                                <!--                                <f7-label class="labelin">Время вкл.</f7-label>
                                <f7-input type="number" v-model.number="config.time.pump.dpms"  placeholder="Введите время импульса насоса (1/1000 сек)"></f7-input>
                                <f7-label class="labelin">Время выкл:</f7-label>
                                <f7-input type="number" v-model.number="config.time.pump.dpdp" placeholder="Время между импульсами (1/1000 сек)"></f7-input>-->

                                <f7-label class="labelin">Время вкл: {{config.time.pump.dpms}}</f7-label>
                                <f7-input type="range" min="10" max="500" step="10" v-model="config.time.pump.dpms"></f7-input>
                                <f7-label class="labelin">Время выкл: {{config.time.pump.dpdp}}</f7-label>
                                <f7-input type="range" :min="config.trip.pump.dpms * 4" :max="config.time.pump.dpms * 50" step="10" v-model="config.time.pump.dpdp"></f7-input>
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