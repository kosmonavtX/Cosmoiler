<template>
<f7-page>
    <f7-navbar title="Настройки" back-link="Back" sliding v-on:back-click="back"></f7-navbar>

    <f7-list accordion>
        <f7-list-item accordion-item title="Предустановки" class="settings" media="<i class='icon icon-presets' >">
            <f7-accordion-content>
                <f7-list media-list>
                    <f7-list-item title="Город" after="<i class='icon icon-building'>" class="presets-icon">

                        <!--            <div slot="root" class='icon icon-meter'></div>-->
                        <div slot="inner">
                            <div :style="stylediv1">
                                <f7-label class="labelin">Расстояние: {{param1}} км</f7-label>
                                <f7-input 
                                          type="range" 
                                          id="0" 
                                          v-model.number="param1"
                                          min="1" max="20" step="1"
                                          placeholder="Введите расстояние между включением">
                                </f7-input>
                                <f7-label class="labelin">Капли: {{param2}}</f7-label>
                                <f7-input 
                                          type="range" 
                                          id="1" 
                                          v-model.number="param2" 
                                          min="1" max="10" step="1"                                          
                                          placeholder="Количество капель за цикл">
                                </f7-input>
                            </div>
                        </div>

                    </f7-list-item>
                    <f7-list-item title="ТРАССА" after="<i class='icon icon-highway'>" class="presets-icon">

                        <div slot="inner">
                            <div :style="stylediv1">
                                <f7-label class="labelin">Расстояние: {{param3}} км</f7-label>
                                <f7-input 
                                          type="range" 
                                          id="2" 
                                          v-model.number="param3"
                                          min="1" max="50" step="1"
                                          placeholder="Введите расстояние между включением">
                                </f7-input>
                                <f7-label class="labelin">Капли: {{param4}} </f7-label>
                                <f7-input 
                                          type="range" 
                                          id="3" 
                                          v-model.number="param4" 
                                          min="1" max="10" step="1"
                                          placeholder="Количество капель за цикл">
                                </f7-input>
                            </div>
                        </div>

                    </f7-list-item>
                </f7-list>
            </f7-accordion-content>
        </f7-list-item>
        <f7-list-item accordion-item title="Настройки насоса" class="settings" media="<i class='icon icon-pump' >">
            <f7-accordion-content>
                <f7-list media-list>
                    <f7-list-item>
                        <div slot="inner">
                            <div :style="stylediv1">
                                <f7-label class="labelin">Время вкл: {{param5}} мсек</f7-label>
                                <f7-input 
                                          type="range" 
                                          min="10" max="500" step="10" 
                                          v-model="param5">
                                </f7-input>
                                <!--                                <f7-input type="number" v-model.number="config.trip.pump.dpms" placeholder="Введите время импульса насоса (1/1000 сек)"></f7-input>-->
                                <f7-label class="labelin">Время выкл: {{param6}} мсек</f7-label>
                                <f7-input 
                                          type="range" 
                                          :min="param5 * 4" :max="param5 * 50" step="10" 
                                          v-model="param6">
                                </f7-input>
                                <!--                                <f7-input type="number" v-model.number="config.trip.pump.dpdp" placeholder="Время между импульсами (1/1000 сек)"></f7-input>-->
                            </div>
                        </div>

                    </f7-list-item>
                </f7-list>
            </f7-accordion-content>
        </f7-list-item>
        <f7-list-item accordion-item title="Колесо (с датчиком)" class="settings" media="<i class='icon icon-gauge2'>">
            <f7-accordion-content>

                <f7-list media-list>
                    <f7-list-item>

                        <!--            <div slot="root" class='icon icon-meter'></div>-->
                        <div slot="inner">
                            <div :style="stylediv1">
                                <f7-label class="labelin">Диаметр:</f7-label>
                                <f7-input type="select" v-model="param7">
                                    <option v-bind:value="16">16"</option>
                                    <option v-bind:value="17">17"</option>
                                    <option v-bind:value="18">18"</option>
                                    <option v-bind:value="19">19"</option>
                                    <option v-bind:value="21">21"</option>
                                </f7-input>
                                <f7-label class="labelin">Ширина:</f7-label>
                                <f7-input type="number" v-model.number="param8" placeholder="Ширина шины"></f7-input>
                                <f7-label class="labelin">Профиль:</f7-label>
                                <f7-input type="number" v-model.number="param9" placeholder="Высота шины в %"></f7-input>
                            </div>
                        </div>

                    </f7-list-item>
                </f7-list>
            </f7-accordion-content>
        </f7-list-item>

        <f7-list-item accordion-item title="Датчик" @accordion:close="AccordClose" class="settings" media="<i class='icon icon-gauge2'>">
            <f7-accordion-content>
                <f7-list media-list>
                    <f7-list-item>

                        <!--            <div slot="root" class='icon icon-meter'></div>-->
                        <div slot="inner">
                            <f7-label class="labelin">Питание внешнего датчика</f7-label>
                            <f7-input type="switch" @change="onChangePwr" v-model="param10"></f7-input>

                            <div :style="stylediv1">
                                <f7-label class="labelin">Импульсов на оборот:</f7-label>
                                <f7-input type="number" v-model.number="param11" placeholder="Введите число импульсов на оборот"></f7-input>
                            </div>
                            <p></p>
                            <f7-button big fill v-on:click="AccordOpen">Сброс</f7-button>
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
                interval: null,
                params: {sp: 0},
                stylediv1: 'margin-top: 6px'
            }
        },
        computed: {
/*            maxPumpOff: function () {
                return this.config.trip.pump.dpms * 50;
            },*/
            param1: {
                get () { return this.$store.state.config.trip.presets[0].trip_m / 1000 },
                set(value) {
                    this.$store.commit({type:'UPD_TRIP_TRIPM', preset: 0, data: value})
                }
            },
            param2: {
                get () { return this.$store.state.config.trip.presets[0].dp_num },
                set(value) {
                    this.$store.commit({type:'UPD_TRIP_DPNUM', preset: 0, data: value})
                }
            },
            param3: {
                get () { return this.$store.state.config.trip.presets[1].trip_m / 1000 },
                set(value) {
                    this.$store.commit({type:'UPD_TRIP_TRIPM', preset: 1, data: value})
                }
            },
            param4: {
                get () { return this.$store.state.config.trip.presets[1].dp_num },
                set(value) {
                    this.$store.commit({type:'UPD_TRIP_DPNUM', preset: 1, data: value})
                }
            },             
            param5: {
                get () { return this.$store.state.config.trip.pump.dpms },
                set(value) {
                    this.$store.commit({type:'UPD_TRIP_DPMS', data: value})
                }
            },             
            param6: {
                get () { return this.$store.state.config.trip.pump.dpdp },
                set(value) {
                    this.$store.commit({type:'UPD_TRIP_DPDP', data: value})
                }
            },
            param7: {
                get () { return this.$store.state.config.trip.wheel.dia },
                set(value) {
                    this.$store.commit({type:'UPD_TRIP_WHEEL_D', data: parseInt(value)})
                }
            },                         
            param8: {
                get () { return this.$store.state.config.trip.wheel.width },
                set(value) {
                    this.$store.commit({type:'UPD_TRIP_WHEEL_W', data: value})
                }
            },
            param9: {
                get () { return this.$store.state.config.trip.wheel.height },
                set(value) {
                    this.$store.commit({type:'UPD_TRIP_WHEEL_H', data: value})
                }
            },
            param10: {
                get () { return this.$store.state.config.trip.sensor.extsp },
                set(value) {
                    this.$store.commit({type:'UPD_TRIP_SENSOR_EXTSP', data: value})
                }
            },  
            param11: {
                get () { 
                    return this.$store.state.config.trip.sensor.imp 
                },
                set(value) {
                    this.$store.commit({type:'UPD_TRIP_SENSOR_IMP', data: value})
                }
            },              
        },
        methods: {
/*            limitNumber: function(val, min, max) {
                return Number(Math.max(Math.min(val, max), min)).toFixed(0);
            },*/            
/*            doneEditTrip: function (event) {
                switch(event.currentTarget.id) {
                    case '0': 
                        this.param1 = this.limitNumber(this.param1, 1, 100); 
                        console.log(this.param1);
                        
                        break;
                    case '1': this.config.trip.presets[0].dp_num = this.limitNumber(this.config.trip.presets[0].dp_num, 1, 10); break;
                    case '2': this.tripM[1] = this.limitNumber(this.tripM[1], 1, 100); break;
                    case '3': this.config.trip.presets[1].dp_num = this.limitNumber(this.config.trip.presets[1].dp_num, 1, 10); break;
                }
            },*/
            AccordOpen: function () {
                this.$store.state.connection.send(JSON.stringify({get: "work", p: [1]}));    

                this.interval = setInterval(() => {
                    this.$store.state.connection.send(JSON.stringify({get: "params"}));
                    this.$store.commit({type:'UPD_TRIP_SENSOR_IMP', data: this.$store.state.params.sp})
                }, 800);
            },
            AccordClose: function () {
                /*console.log('Accordion close\n', this.interval);*/
                clearInterval(this.interval);
                this.$store.state.connection.send(JSON.stringify({get: "work", p: [0]}));    
            },
            onChangePwr: function(event) {
                //this.config.trip.sensor.extsp = event.srcElement.checked;
            }
        },
        beforeDestroy: function() {
            console.log('BACK')
            clearInterval(this.interval);
            this.$store.commit('CALC_IMPTRIPM');
            this.$store.dispatch('changeConfig');            
        },
        components: {
        }
    }
</script>

<style>
    
</style>