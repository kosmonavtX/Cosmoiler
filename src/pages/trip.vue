<template>
    <f7-page>
        <f7-navbar :title="this.$t('settings')" back-link="Back" sliding></f7-navbar>

        <div v-if=this.$store.state.connect>
            <f7-list accordion>
                <!----------ПРЕДУСТАНОВКИ------------>
                <f7-list-item accordion-item :title="this.$t('settings.presets.title')" class="settings"
                    media="<i class='icon icon-presets' >">
                    <f7-accordion-content>
                        <f7-list media-list>
                            <!----------ГОРОД------------>
                            <f7-list-item>

                                <div class="item-media">
                                    <i class='icon icon-building'></i>
                                    <p class="text-icon">{{ $t('settings.presets.city') }}</p>
                                </div>
                                <div :style="stylediv1">
                                    <f7-label class="labelin">{{ $t('settings.presets.distance', {p: param_city1}) }}
                                    </f7-label>
                                    <f7-input type="range" id="0" v-model.number="param_city1" min="1" max="10" step="1"
                                        placeholder="$t('settings.presets.placeholder_Distance')">
                                    </f7-input>
                                    <f7-label class="labelin">{{ $t('settings.presets.drop', {p: param_city2}) }}
                                    </f7-label>
                                    <f7-input color="brown" type="range" id="1" v-model.number="param_city2" min="1"
                                        max="10" step="1" placeholder="$t('settings.presets.placeholder_Drop')">
                                    </f7-input>

                                    <f7-label class="labelin">N = {{param_city3}}</f7-label>
                                    <f7-input color="brown" type="range" id="1" v-model.number="param_city3" min="1"
                                        max="10" step="1">
                                    </f7-input>
                                </div>

                                <!----------ТРАССА------------>


                                <div class="item-media">
                                    <i class='icon icon-highway'></i>
                                    <p class="text-icon">{{ $t('settings.presets.way') }}</p>
                                </div>

                                <div :style="stylediv1">
                                    <f7-label class="labelin">{{ $t('settings.presets.distance', {p: param_way1}) }}
                                    </f7-label>
                                    <f7-input type="range" id="2" v-model.number="param_way1" min="1" max="20" step="1"
                                        placeholder="Введите расстояние между включением">
                                    </f7-input>
                                    <f7-label class="labelin">{{ $t('settings.presets.drop', {p: param_way2}) }}
                                    </f7-label>
                                    <f7-input color="brown" type="range" id="3" v-model.number="param_way2" min="1"
                                        max="10" step="1" placeholder="Количество капель за цикл">
                                    </f7-input>
                                    <f7-label class="labelin">{{ $t('settings.presets.maxspeed', {p: param_MAXSPEED}) }}
                                    </f7-label>
                                    <f7-input color="green" type="range" id="4" v-model.number="param_MAXSPEED"
                                        min="100" max="200" step="10" placeholder="Максимальная скорость">
                                    </f7-input>

                                    <f7-label class="labelin">N = {{ param_way3 }}</f7-label>
                                    <f7-input color="brown" type="range" id="1" v-model.number="param_way3" min="1"
                                        max="20" step="1">
                                    </f7-input>
                                </div>


                                <!----------ДОЖДЬ, ПЕСОК------------>


                                <div class="item-media">
                                    <i class='icon icon-off-road'></i>
                                    <p class="text-icon">{{ $t('settings.presets.user') }}</p>
                                </div>

                                <div :style="stylediv1">
                                    <f7-label class="labelin">{{ $t('settings.presets.distance', {p: param_user1}) }}
                                    </f7-label>
                                    <f7-input type="range" id="0" v-model.number="param_user1" min="1" max="10" step="1"
                                        placeholder="Введите расстояние между включением">
                                    </f7-input>
                                    <f7-label class="labelin">{{ $t('settings.presets.drop', {p: param_user2}) }}
                                    </f7-label>
                                    <f7-input color="brown" type="range" id="1" v-model.number="param_user2" min="1"
                                        max="10" step="1" placeholder="Количество капель за цикл">
                                    </f7-input>
                                    <f7-label class="labelin">{{ $t('settings.presets.num', {p: param_user3}) }}
                                    </f7-label>
                                    <f7-input color="brown" type="range" id="2" v-model.number="param_user3" min="0"
                                        max="20" step="1">
                                    </f7-input>

                                    <f7-label class="labelin">N = {{ param_user4 }}</f7-label>
                                    <f7-input color="brown" type="range" id="1" v-model.number="param_user4" min="1"
                                        max="10" step="1">
                                    </f7-input>
                                </div>


                            </f7-list-item>
                            <!--                     <f7-list-item>




                        <f7-card>
                            <f7-card-header>
                                <div class="item-media">
                                    <i class='icon icon-building'></i>
                                    <p class="text-icon">{{ $t('settings.presets.city') }}</p>
                                </div>
                            </f7-card-header>
                            <f7-card-content>
                                <div :style="stylediv1">
                                    <f7-label class="labelin">{{ $t('settings.presets.distance', {p: param_city1}) }}</f7-label>
                                    <f7-input type="range" id="0" v-model.number="param_city1" min="1" max="10" step="1" placeholder="$t('settings.presets.placeholder_Distance')">
                                    </f7-input>
                                    <f7-label class="labelin">{{ $t('settings.presets.drop', {p: param_city2}) }}</f7-label>
                                    <f7-input color="brown" type="range" id="1" v-model.number="param_city2" min="1" max="10" step="1" placeholder="$t('settings.presets.placeholder_Drop')">
                                    </f7-input>
                                </div>
                            </f7-card-content>
                        </f7-card>

                        <f7-card>
                            <f7-card-header>
                                <div class="item-media">
                                    <i class='icon icon-highway'></i>
                                    <p class="text-icon">{{ $t('settings.presets.way') }}</p>
                                </div>
                            </f7-card-header>
                            <f7-card-content>
                                <div :style="stylediv1">
                                    <f7-label class="labelin">{{ $t('settings.presets.distance', {p: param_way1}) }}</f7-label>
                                    <f7-input type="range" id="2" v-model.number="param_way1" min="1" max="20" step="1" placeholder="Введите расстояние между включением">
                                    </f7-input>
                                    <f7-label class="labelin">{{ $t('settings.presets.drop', {p: param_way2}) }} </f7-label>
                                    <f7-input color="brown" type="range" id="3" v-model.number="param_way2" min="1" max="10" step="1" placeholder="Количество капель за цикл">
                                    </f7-input>
                                    <f7-label class="labelin">{{ $t('settings.presets.maxspeed', {p: param_MAXSPEED}) }} </f7-label>
                                    <f7-input color="green" type="range" id="4" v-model.number="param_MAXSPEED" min="100" max="200" step="10" placeholder="Максимальная скорость">
                                    </f7-input>
                                </div>
                            </f7-card-content>
                        </f7-card>
                        <f7-card>
                            <f7-card-header>
                                <div class="item-media">
                                    <i class='icon icon-off-road'></i>
                                    <p class="text-icon">{{ $t('settings.presets.user') }}</p>
                                </div>
                            </f7-card-header>
                            <f7-card-content>
                                <div :style="stylediv1">
                                    <f7-label class="labelin">{{ $t('settings.presets.distance', {p: param_user1}) }}</f7-label>
                                    <f7-input type="range" id="0" v-model.number="param_user1" min="1" max="10" step="1" placeholder="Введите расстояние между включением">
                                    </f7-input>
                                    <f7-label class="labelin">{{ $t('settings.presets.drop', {p: param_user2}) }}</f7-label>
                                    <f7-input color="brown" type="range" id="1" v-model.number="param_user2" min="1" max="10" step="1" placeholder="Количество капель за цикл">
                                    </f7-input>
                                    <f7-label class="labelin">{{ $t('settings.presets.num', {p: param_user3}) }}</f7-label>
                                    <f7-input color="brown" type="range" id="2" v-model.number="param_user3" min="0" max="20" step="1">
                                    </f7-input>
                                </div>
                            </f7-card-content>
                        </f7-card>
                    </f7-list-item> -->
                        </f7-list>
                    </f7-accordion-content>
                </f7-list-item>

                <!----------ДАТЧИК------------>
                <f7-list-item accordion-item :title="this.$t('settings.sensor.title')" @accordion:close="AccordClose"
                    class="settings" media="<i class='icon icon-gauge'>">
                    <f7-accordion-content>
                        <f7-list media-list>
                            <f7-list-item>
                                <div slot="inner">
                                    <f7-list>

                                        <f7-list-item v-if="presentGNSS"
                                            media="<i class='icon icon-gps'>" radio name="my-radio" v-bind:value="1"
                                            :checked="param12" @click="onSetTypeSensor(1)">
                                            {{ $t('settings.sensor.gnss') }}</f7-list-item>

                                        <f7-list-item media="<i class='icon icon-gauge2'>" radio name="my-radio"
                                            v-bind:value="2" :checked="!param12" @click="onSetTypeSensor(2)">
                                            {{ $t('settings.sensor.impulse') }}</f7-list-item>


                                    </f7-list>
                                </div>
                                <div v-if="!param12">
                                    <f7-card>
                                        <f7-card-content>
                                            <!--                                 <f7-label class="labelin">{{ $t('settings.sensor.ext') }}</f7-label>
                                <f7-input type="switch" @change="onChangePwr" v-model="param10"></f7-input> -->

                                            <f7-grid>
                                                <f7-col width="50">
                                                    <div :style="stylediv1">
                                                        <f7-label class="labelin">{{ $t('settings.sensor.imprev') }}
                                                        </f7-label>
                                                        <f7-input type="number" v-model.number="param11"
                                                            placeholder="Введите число импульсов на оборот"></f7-input>
                                                    </div>
                                                </f7-col>
                                                <f7-col width="50">
                                                    <f7-button v-bind:style="{'margin-top': 30 +'px'}" fill
                                                        v-on:click="AccordOpen">{{ $t('button.reset') }}</f7-button>
                                                </f7-col>
                                            </f7-grid>
                                        </f7-card-content>
                                    </f7-card>

                                    <f7-card>
                                        <f7-card-header>
                                            <span :style="stylefooter_p">{{ $t('settings.sensor.wheel.title') }}</span>

                                        </f7-card-header>
                                        <f7-card-content>
                                            <div :style="stylediv1">
                                                <f7-grid>
                                                    <f7-col>
                                                        <f7-label class="labelin">
                                                            {{ $t('settings.sensor.wheel.rimdia') }}</f7-label>
                                                        <f7-input type="select" v-model="param7">
                                                            <option v-bind:value="16">16"</option>
                                                            <option v-bind:value="17">17"</option>
                                                            <option v-bind:value="18">18"</option>
                                                            <option v-bind:value="19">19"</option>
                                                            <option v-bind:value="21">21"</option>
                                                        </f7-input>
                                                    </f7-col>
                                                    <f7-col>
                                                        <f7-label class="labelin">
                                                            {{ $t('settings.sensor.wheel.width') }}</f7-label>
                                                        <f7-input type="number" v-model.number="param8"
                                                            placeholder="Ширина шины"></f7-input>
                                                    </f7-col>
                                                </f7-grid>
                                                <f7-label class="labelin">{{ $t('settings.sensor.wheel.height') }}
                                                </f7-label>
                                                <f7-input type="number" v-model.number="param9"
                                                    placeholder="Высота шины в %"></f7-input>

                                            </div>
                                        </f7-card-content>
                                    </f7-card>
                                </div>
                            </f7-list-item>
                        </f7-list>
                    </f7-accordion-content>
                </f7-list-item>

                <!----------НАСТРОЙКИ НАСОСА------------>
                <f7-list-item accordion-item :title="this.$t('settings.pump.title')" class="settings"
                    media="<i class='icon icon-pump' >">
                    <f7-accordion-content>
                        <f7-list media-list>
                            <f7-list-item>
                                <div slot="inner">
                                    <div :style="stylediv1">
                                        <f7-label class="labelin">{{ $t('settings.pump.on', {p: param5}) }}</f7-label>
                                        <f7-input color="green" type="range" :min="10/stepDPMS" :max="500/stepDPMS"
                                            :step="10" v-model="param5">
                                        </f7-input>
                                        <f7-label class="labelin">{{ $t('settings.pump.off', {p: param6}) }}</f7-label>
                                        <f7-input color="red" type="range" :min="param5 * 2" :max="2000/stepDPMS"
                                            :step="10" v-model="param6">
                                        </f7-input>
                                    </div>
                                </div>

                            </f7-list-item>
                        </f7-list>
                    </f7-accordion-content>
                </f7-list-item>
                <!--        <f7-list-item v-if=!param12 accordion-item title="Колесо (с датчиком)" class="settings" media="<i class='icon icon-gauge2'>">
            <f7-accordion-content>
                <f7-list media-list>
                    <f7-list-item>
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
        </f7-list-item>-->
            </f7-list>
        </div>
    </f7-page>
</template>

<script>
    export default {
        data() {
            return {
                interval: null,
                params: {
                    sp: 0
                },
                stepDPMS: 1,
                stylediv1: 'margin-top: 6px',
                stylefooter_p: 'text-transform: initial; font-weight: 600'
            }
        },
        computed: {
            param_city1: {
                get() {
                    return this.$store.state.trip.trip.presets[0].trip_m / 1000
                },
                set(value) {
                    this.$store.commit({
                        type: 'UPD_TRIP_TRIPM',
                        preset: 0,
                        data: value
                    })
                }
            },
            param_city2: {
                get() {
                    return this.$store.state.trip.trip.presets[0].dp_num
                },
                set(value) {
                    this.$store.commit({
                        type: 'UPD_TRIP_DPNUM',
                        preset: 0,
                        data: value
                    })
                }
            },
            param_city3: {
                get() {
                    return this.$store.state.trip.trip.presets[0].n
                },
                set(value) {
                    this.$store.commit({
                        type: 'UPD_TRIP_N',
                        preset: 0,
                        data: value
                    })
                }
            },
            param_way1: {
                get() {
                    return this.$store.state.trip.trip.presets[1].trip_m / 1000
                },
                set(value) {
                    this.$store.commit({
                        type: 'UPD_TRIP_TRIPM',
                        preset: 1,
                        data: value
                    })
                }
            },
            param_way2: {
                get() {
                    return this.$store.state.trip.trip.presets[1].dp_num
                },
                set(value) {
                    this.$store.commit({
                        type: 'UPD_TRIP_DPNUM',
                        preset: 1,
                        data: value
                    })
                }
            },
            param_way3: {
                get() {
                    return this.$store.state.trip.trip.presets[1].n
                },
                set(value) {
                    this.$store.commit({
                        type: 'UPD_TRIP_N',
                        preset: 1,
                        data: value
                    })
                }
            },
            param_user1: {
                get() {
                    return this.$store.state.trip.trip.presets[2].trip_m / 1000
                },
                set(value) {
                    this.$store.commit({
                        type: 'UPD_TRIP_TRIPM',
                        preset: 2,
                        data: value
                    })
                }
            },
            param_user2: {
                get() {
                    return this.$store.state.trip.trip.presets[2].dp_num
                },
                set(value) {
                    this.$store.commit({
                        type: 'UPD_TRIP_DPNUM',
                        preset: 2,
                        data: value
                    })
                }
            },
            param_user3: {
                get() {
                    return this.$store.state.trip.trip.presets[2].cycles
                },
                set(value) {
                    this.$store.commit({
                        type: 'UPD_TRIP_CYCLES',
                        preset: 2,
                        data: value
                    })
                }
            },
            param_user4: {
                get() {
                    return this.$store.state.trip.trip.presets[2].n
                },
                set(value) {
                    this.$store.commit({
                        type: 'UPD_TRIP_N',
                        preset: 2,
                        data: value
                    })
                }
            },
            param_MAXSPEED: {
                get() {
                    return this.$store.state.trip.trip.smart.maxsp
                },
                set(value) {
                    this.$store.commit({
                        type: 'UPD_TRIP_MAXSP',
                        data: value
                    })
                }
            },
            param5: {
                get() {
                    return this.$store.state.pump.pump.dpms / this.stepDPMS
                },
                set(value) {
                    this.$store.commit({
                        type: 'UPD_TRIP_DPMS',
                        data: value * this.stepDPMS
                    });
                    //console.log(this.$store.state.config.pump.dpms);
                }
            },
            param6: {
                get() {
                    return this.$store.state.pump.pump.dpdp / this.stepDPMS
                },
                set(value) {
                    this.$store.commit({
                        type: 'UPD_TRIP_DPDP',
                        data: value * this.stepDPMS
                    });
                    //console.log(this.$store.state.config.pump.dpdp);
                }
            },
            param7: {
                get() {
                    return this.$store.state.trip.trip.wheel.dia
                },
                set(value) {
                    this.$store.commit({
                        type: 'UPD_TRIP_WHEEL_D',
                        data: parseInt(value)
                    })
                }
            },
            param8: {
                get() {
                    return this.$store.state.trip.trip.wheel.width
                },
                set(value) {
                    this.$store.commit({
                        type: 'UPD_TRIP_WHEEL_W',
                        data: value
                    })
                }
            },
            param9: {
                get() {
                    return this.$store.state.trip.trip.wheel.height
                },
                set(value) {
                    this.$store.commit({
                        type: 'UPD_TRIP_WHEEL_H',
                        data: value
                    })
                }
            },
            /*             param10: {
                            get () { return this.$store.state.config.trip.sensor.extsp },
                            set(value) {
                                this.$store.commit({type:'UPD_TRIP_SENSOR_EXTSP', data: value})
                            }
                        }, */
            param11: {
                get() {
                    return this.$store.state.trip.trip.sensor.imp
                },
                set(value) {
                    this.$store.commit({
                        type: 'UPD_TRIP_SENSOR_IMP',
                        data: value
                    })
                }
            },
            param12: {
                get() {
                    // true если выбран датчик GNSS и модуль установлен
                    return this.$store.state.trip.trip.sensor.gnss && this.$store.state.gnssPresent
                },
            },
            presentGNSS: {
                get() {
                    return this.$store.state.gnssPresent
                },


            },
        },
        methods: {
            AccordOpen: function () {
                this.$store.state.connection.send(JSON.stringify({
                    cmd: "work",
                    param: 1
                }));
                this.interval = setInterval(() => {
                    this.$store.state.connection.send(JSON.stringify({
                        cmd: "telemetry"
                    }));
                    this.$store.commit({
                        type: 'UPD_TRIP_SENSOR_IMP',
                        data: this.$store.state.params.sp
                    })
                }, 300);
            },
            AccordClose: function () {
                debug.log('Accordion close\n', this.interval);
                clearInterval(this.interval);
                this.$store.state.connection.send(JSON.stringify({
                    cmd: "work",
                    param: 0
                }));
            },
            onChangePwr: function (event) {
                //this.config.trip.sensor.extsp = event.srcElement.checked;
            },
            onSetTypeSensor: function (value) {
                switch (value) {
                    case 1:
                        this.$store.commit('SET_SENSOR_GNSS');
                        break;
                    case 2:
                        this.$store.commit('SET_SENSOR_IMP');
                        break;
                }
            }
        },
        beforeCreate: function () {
            // Запрос наличия модуля GNSS
/*             this.$store.state.connection.send(JSON.stringify({
                cmd: "get",
                param: ["gnss"]
            })); */
            if (!this.$store.state.gnssPresent)
                this.$store.state.trip.trip.sensor.gnss = false;
        },
        beforeDestroy: function () {
            debug.log('BACK')
            clearInterval(this.interval);
            this.$store.state.connection.send(JSON.stringify({
                cmd: "work",
                param: 0
            }));
            this.$store.commit('CALC_IMPTRIPM');
            this.$store.dispatch('changeTripCnfg');
            this.$store.dispatch('changePumpCnfg');
        },
        components: {}
    }
</script>

<style>

</style>
