<template>
<f7-page>
    <f7-navbar title="Настройки" back-link="Back" sliding v-on:back-click="back"></f7-navbar>
<!--                            <f7-list media-list>
                            <f7-list-item swipeout title="Предустановки..." media="<i class='icon icon-presets'></i>" link="#" subtitle="Смазывать через заданное расстояние...">
                            <f7-swipeout-actions>
                                <f7-swipeout-button close color="purple" id="trip">Город</f7-swipeout-button>
                                <f7-swipeout-button href="/trip/" color="teal">Трасса</f7-swipeout-button>     
                            </f7-swipeout-actions>
                            </f7-list-item>
    </f7-list>-->
    <f7-list accordion>
        <f7-list-item accordion-item title="Предустановки" class="settings" media="<i class='icon icon-presets'>" subtitle="Смазывать через заданное расстояние...">
            <f7-accordion-content>
                <f7-list media-list>
                    <f7-list-item title="Город" after="<i class='icon icon-building'>" class="presets-icon">

                        <!--            <div slot="root" class='icon icon-meter'></div>-->
                        <div slot="inner">
                            <div :style="stylediv1">
                                <f7-label class="labelin">Вемя: {{param1}} сек</f7-label>
                                <f7-input 
                                          type="range" 
                                          min="10" max="600" step="10"
                                          v-model.number="param1" 
                                          placeholder="Введите время между включениями">
                                </f7-input>
                                <f7-label class="labelin">Капли: {{param2}} </f7-label>
                                <f7-input 
                                          type="range" 
                                          min="1" max="10" step="1"
                                          v-model.number="param2" 
                                          placeholder="Количество капель за цикл">
                                </f7-input>
                            </div>
                        </div>

                    </f7-list-item>
                    <f7-list-item title="ТРАССА" after="<i class='icon icon-highway'>" class="presets-icon">
                        <div slot="inner">
                            <div :style="stylediv1">
                                <f7-label class="labelin">Время: {{param3}} сек</f7-label>
                                <f7-input 
                                          type="range" 
                                          min="10" max="600" step="10"
                                          v-model.number="param3" 
                                          placeholder="Введите время между включениями">
                                </f7-input>
                                <f7-label class="labelin">Капли: {{param4}} </f7-label>
                                <f7-input 
                                          type="range" 
                                          min="1" max="10" step="1"
                                          v-model.number="param4" 
                                          placeholder="Количество капель за цикл">
                                </f7-input>
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
        <f7-list-item accordion-item title="Настройки насоса" class="settings" media="<i class='icon icon-pump'>">
            <f7-accordion-content>
                <f7-list media-list>
                    <f7-list-item>

                        <!--            <div slot="root" class='icon icon-meter'></div>-->
                        <div slot="inner">
                            <div :style="stylediv1">
                                <!--                                <f7-label class="labelin">Время вкл.</f7-label>
                                <f7-input type="number" v-model.number="config.time.pump.dpms"  placeholder="Введите время импульса насоса (1/1000 сек)"></f7-input>
                                <f7-label class="labelin">Время выкл:</f7-label>
                                <f7-input type="number" v-model.number="config.time.pump.dpdp" placeholder="Время между импульсами (1/1000 сек)"></f7-input>-->

                                <f7-label class="labelin">Время вкл: {{param5}} мсек </f7-label>
                                <f7-input 
                                          type="range" 
                                          min="10" max="500" step="10" 
                                          v-model="param5">
                                </f7-input>
                                <f7-label class="labelin">Время выкл: {{param6}} мсек</f7-label>
                                <f7-input 
                                          type="range" 
                                          :min="param5 * 4" :max="param5 * 50" step="10" 
                                          v-model="param6">
                                </f7-input>
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
                stylediv1: 'margin-top: 6px'
            }
        },
        methods: {
            back: function() {
                console.log('back')
//                this.$store.dispatch('changeConfig');
            }  
        },
        beforeDestroy: function() {
            this.$store.dispatch('changeConfig');            
        },        
        computed: {
            param1: {
                get() {return this.$store.state.config.time.presets[0].dp_time},
                set(value) { this.$store.commit({type: 'UPD_TIME_DPTIME', data: value, preset: 0}) }
            },
            param2: {
                get() {return this.$store.state.config.time.presets[0].dp_num},
                set(value) { this.$store.commit({type: 'UPD_TIME_DPNUM', data: value, preset: 0}) }
            },
            param3: {
                get() {return this.$store.state.config.time.presets[1].dp_time},
                set(value) { this.$store.commit({type: 'UPD_TIME_DPTIME', data: value, preset: 1}) }
            },
            param4: {
                get() {return this.$store.state.config.time.presets[1].dp_num},
                set(value) { this.$store.commit({type: 'UPD_TIME_DPNUM', data: value, preset: 1}) }
            },             
            param5: {
                get() {return this.$store.state.config.time.pump.dpms},
                set(value) { this.$store.commit('UPD_TIME_DPMS', value) }
            },
            param6: {
                get() {return this.$store.state.config.time.pump.dpdp},
                set(value) { this.$store.commit('UPD_TIME_DPDP', value) }
            },            
        },
        components: {
        }
    }
</script>

<style>
    
</style>