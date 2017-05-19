<template>
<f7-page>
    <f7-navbar title="Настройки" back-link="Back" sliding v-on:back-click="back"></f7-navbar>

    <f7-list accordion>
        <f7-list-item accordion-item title="Предустановки" class="settings" after="<i class='icon icon-presets' >">
            <f7-accordion-content>
                <f7-list media-list>
                    <f7-list-item title="Город" after="<i class='icon icon-building'>" class="presets-icon">

                        <!--            <div slot="root" class='icon icon-meter'></div>-->
                        <div slot="inner">
                            <div style="margin-top: 6px">
                                <f7-label class="labelin">Расстояние (км):</f7-label>
                                <!--<f7-input type="range" min="1" max="50" step="1" v-model="tripM[0]"></f7-input>-->
                                <f7-input type="number" id="0" @blur="doneEditTrip($event)" @keyup.enter="doneEditTrip($event)" v-model.number="tripM[0]" placeholder="Введите расстояние между включением"></f7-input>
                                <f7-label class="labelin">Капли:</f7-label>
                                <!--                                <f7-input type="range" min="1" max="10" step="1" v-model="config.trip.presets[0].dp_num"></f7-input>-->
                                <f7-input type="number" id="1" @blur="doneEditTrip($event)" @keyup.enter="doneEditTrip($event)" v-model.number="config.trip.presets[0].dp_num" placeholder="Количество капель за цикл"></f7-input>
                            </div>
                        </div>

                    </f7-list-item>
                    <f7-list-item title="ТРАССА" after="<i class='icon icon-highway'>" class="presets-icon">

                        <!--            <div slot="root" class='icon icon-meter'></div>-->
                        <div slot="inner">
                            <div style="margin-top: 6px">
                                <f7-label class="labelin">Расстояние (км):</f7-label>
                                <f7-input type="number" id="2" @blur="doneEditTrip($event)" @keyup.enter="doneEditTrip($event)" v-model.number="tripM[1]" placeholder="Введите расстояние между включением"></f7-input>
                                <f7-label class="labelin">Капли:</f7-label>
                                <f7-input type="number" id="3" @blur="doneEditTrip($event)" @keyup.enter="doneEditTrip($event)" v-model.number="config.trip.presets[1].dp_num" placeholder="Количество капель за цикл"></f7-input>
                            </div>
                        </div>

                    </f7-list-item>
                </f7-list>
            </f7-accordion-content>
        </f7-list-item>
        <f7-list-item accordion-item title="Настройки насоса" class="settings" after="<i class='icon icon-pump' >">
            <f7-accordion-content>
                <f7-list media-list>
                    <f7-list-item>

                        <!--            <div slot="root" class='icon icon-meter'></div>-->
                        <div slot="inner">
                            <div style="margin-top: 6px">
                                <f7-label class="labelin">Время вкл: {{config.trip.pump.dpms}}</f7-label>
                                <f7-input type="range" min="10" max="500" step="10" v-model="config.trip.pump.dpms"></f7-input>
                                <!--                                <f7-input type="number" v-model.number="config.trip.pump.dpms" placeholder="Введите время импульса насоса (1/1000 сек)"></f7-input>-->
                                <f7-label class="labelin">Время выкл: {{config.trip.pump.dpdp}}</f7-label>
                                <f7-input type="range" :min="config.trip.pump.dpms * 4" :max="config.trip.pump.dpms * 50" step="10" v-model="config.trip.pump.dpdp"></f7-input>
                                <!--                                <f7-input type="number" v-model.number="config.trip.pump.dpdp" placeholder="Время между импульсами (1/1000 сек)"></f7-input>-->
                            </div>
                        </div>

                    </f7-list-item>
                </f7-list>
            </f7-accordion-content>
        </f7-list-item>
        <f7-list-item accordion-item title="Колесо (с датчиком)" class="settings" after="<i class='icon icon-gauge2'>">
            <f7-accordion-content>
  
                <f7-list media-list>
                    <f7-list-item>

                        <!--            <div slot="root" class='icon icon-meter'></div>-->
                        <div slot="inner">
                            <div style="margin-top: 6px">
                                <f7-label class="labelin">Диаметр:</f7-label>
                                <f7-input type="select" v-model="config.trip.wheel.dia">
                                    <option v-bind:value="16">16"</option>
                                    <option v-bind:value="17">17"</option>
                                    <option v-bind:value="18">18"</option>
                                    <option v-bind:value="19">19"</option>
                                    <option v-bind:value="21">21"</option>
                                </f7-input>
                                
                                <!--                                <f7-input type="number" max=19 v-model.number="config.trip.wheel.dia" placeholder="Введите диаметр шины в дюймах"></f7-input>-->
                                <f7-label class="labelin">Ширина:</f7-label>
                                <f7-input type="number" v-model.number="config.trip.wheel.width" placeholder="Ширина шины"></f7-input>
                                <f7-label class="labelin">Профиль:</f7-label>
                                <f7-input type="number" v-model.number="config.trip.wheel.height" placeholder="Высота шины в %"></f7-input>
                            </div>
                        </div>

                    </f7-list-item>
                </f7-list>
            </f7-accordion-content>
        </f7-list-item>

        <f7-list-item accordion-item title="Датчик" @accordion:close="AccordClose" class="settings" after="<i class='icon icon-gauge2'>">
            <f7-accordion-content>
                <f7-list media-list>
                    <f7-list-item>

                        <!--            <div slot="root" class='icon icon-meter'></div>-->
                        <div slot="inner">

                            <div style="margin-top: 6px">
                                <f7-label class="labelin">Импульсов на оборот:</f7-label>
                                <f7-input type="number" v-model.number="config.trip.sensor.imp" placeholder="Введите число импульсов на оборот"></f7-input>
                            </div>
                            <p></p>
                            <f7-button big fill v-on:click="AccordOpen">Сброс</f7-button>
                        </div>


                    </f7-list-item>
                </f7-list>
            </f7-accordion-content>
        </f7-list-item>
    </f7-list>
    <!--    <f7-block inner>
        <f7-label>Параметры</f7-label>
        <f7-list accordion>
            <f7-list-item accordion-item title="ГОРОД">
                <f7-accordion-content>
                    <f7-block>
                        <f7-label>Расстояние (км)</f7-label>
                        <f7-input type="tel"></f7-input>
                        <f7-label>Число капель</f7-label>
                        <f7-input type="text"></f7-input>
                    </f7-block>
                </f7-accordion-content>
            </f7-list-item>
            <f7-list-item accordion-item title="ТРАССА">
                <f7-accordion-content>
                    <f7-block>
                        <f7-label>Расстояние (км)</f7-label>
                        <f7-input type="tel"></f7-input>
                        <f7-label>Число капель</f7-label>
                        <f7-input type="text"></f7-input>
                    </f7-block>
                </f7-accordion-content>
            </f7-list-item>
        </f7-list>
    </f7-block>-->
    <!--    <f7-block inner>
        <f7-label>Насос</f7-label>
        <f7-block inner>
            <f7-label>Расстояние (км)</f7-label>
            <f7-input type="tel"></f7-input>
            <f7-label>Число капель</f7-label>
            <f7-input type="tel"></f7-input>
        </f7-block>
    </f7-block>-->

</f7-page>
</template>

<script>
    
    export default {
        data () {
            return {
                config: this.$root.config,
                trip_m: null,
                tripM: this.$root.tripM,
                interval: null,
                params: {sp: 0},
                /* {
                    trip: {
                        presets: [{trip_m: null, dp_num: null},{trip_m: null, dp_num: null}],
                        pump: {dpms: null, dpdp: null},     
                        wheel: {dia: null, width: null, height: null}*/
            }
        },
        created: function() {
            console.log('created trip.vue');
            //this.modeState = true;
           // this.$root.fetchConfig();
            //this.fetchState();
            //this.modeState = this.;
            console.log(this.$root.connection);
            console.log(this.config);
            console.log(this.config.trip.presets[0].trip_m);
           // this.tripM0W = this.$root.config.trip.presets[0].trip_m / 1000;
        },
/*        beforeMount: function() {
                console.log('before mount');
            //if (this.$root.connection === true)
              //  this.tripM0W = this.config.trip.presets[0].trip_m / 1000;  
        },*/
        computed: {
            maxPumpOff: function () {
                return this.config.trip.pump.dpms * 50;
            }
/*            tripM0W: function() { 
                    console.log('get');
                    console.log(this.config.trip.presets[0].trip_m);
                    return this.config.trip.presets[0].trip_m / 1000;
            }, */
        },
        watch: {
          
        },
        methods: {
            limitNumber: function(val, min, max) {
                return Number(Math.max(Math.min(val, max), min)).toFixed(0);
            },            
            doneEditTrip: function (event) {
                switch(event.currentTarget.id) {
                    case '0': this.tripM[0] = this.limitNumber(this.tripM[0], 1, 100); break;
                    case '1': this.config.trip.presets[0].dp_num = this.limitNumber(this.config.trip.presets[0].dp_num, 1, 10); break;
                    case '2': this.tripM[1] = this.limitNumber(this.tripM[1], 1, 100); break;
                    case '3': this.config.trip.presets[1].dp_num = this.limitNumber(this.config.trip.presets[1].dp_num, 1, 10); break;
                }
                console.log('doneEditTripCity', this.tripM[1]);
            },
            back: function() {
                console.log('back');
                this.config.trip.presets[0].trip_m = this.tripM[0]*1000;
                this.config.trip.presets[1].trip_m = this.tripM[1]*1000;
                /*console.log(this.tripM);*/
                
                /*this.config.trip.sensor.imp = this.params.sp;*/
                
                /* вычисление длины окружности колеса */
                var dm = this.config.trip.wheel.dia*25.4;
                var hm = this.config.trip.wheel.height * this.config.trip.wheel.width/100;
                var Len = (dm + 2 * hm)*3.14159;
                this.config.trip.wheel.lenght = Len;
                console.log(Len);
                this.imptripm();
                
                this.$root.saveConfig();    
            },
            imptripm: function() {
	            for (var i = 0; i<2; i++)
		          this.config.trip.presets[i].imptripm = Number(this.config.trip.sensor.imp *     this.config.trip.presets[i].trip_m / (this.config.trip.wheel.lenght/1000)).toFixed(0);        
            },
            AccordOpen: function () {
                console.log('Accordion open');
                var self = this;
                this.axios.get('http://'+self.$root.uri+'/work', {
                    params: {state: 2} // SETTINGS
                }, {timeout: 1000}).then(
                    (response) => {
                        /*console.log(response);*/
                    })
                .catch(
                (response) => {
                    console.log('error');
                    self.$root.connection = false;
                });
                this.interval = setInterval(() => {

                        this.axios.get('http://'+self.$root.uri+'/paramxml', {timeout: 1000}).then(
                                (response) => {
                                    /*console.log(response);*/
                                    if (response.status === 200) {
                                        self.params = response.data;
                                        this.config.trip.sensor.imp = this.params.sp;
                                        self.$root.connection = true;
                                    }
                                })
                            .catch(
                                (response) => {
                                    self.$root.connection = false;
                                })
                    },
                    500);
            },
            AccordClose: function () {
                console.log('Accordion close');
                clearInterval(this.interval);
                var self = this;
                this.axios.get('http://'+self.$root.uri+'/work', {
                    params: {state: 0} // SETTINGS
                }, {timeout: 1000}).then(
                    (response) => {
                        console.log(response);
                    })
                .catch(
                (response) => {
                    console.log('error');
                    self.$root.connection = false;
                });
            }
        },
        components: {
        }
    }
</script>

<style>
    
</style>