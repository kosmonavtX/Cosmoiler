<template>
    <f7-page>
        <f7-navbar :title="this.$t('settings')" back-link="Back" sliding v-on:back-click="back"></f7-navbar>
        <!--                            <f7-list media-list>
                            <f7-list-item swipeout title="Предустановки..." media="<i class='icon icon-presets'></i>" link="#" subtitle="Смазывать через заданное расстояние...">
                            <f7-swipeout-actions>
                                <f7-swipeout-button close color="purple" id="trip">Город</f7-swipeout-button>
                                <f7-swipeout-button href="/trip/" color="teal">Трасса</f7-swipeout-button>
                            </f7-swipeout-actions>
                            </f7-list-item>
    </f7-list>-->
        <div v-if=this.$store.state.connect>
            <f7-list accordion>
<!----------ПРЕДУСТАНОВКИ------------>
                <f7-list-item accordion-item :title="this.$t('settings.presets.title')" class="settings"
                    media="<i class='icon icon-presets'>">
                    <f7-accordion-content>
                        <f7-list media-list>
                            <f7-list-item>
<!----------ГОРОД------------>
                                <!--     <f7-card>
                                    <f7-card-header> -->
                                <div class="item-media">
                                    <i class='icon icon-building'></i>
                                    <p class="text-icon">{{ $t('settings.presets.city_way') }}</p>
                                </div>
                                <!--    </f7-card-header>
                                    <f7-card-content> -->
                                <f7-label class="labelin">{{ $t('settings.presets.time', {p: param1}) }}
                                </f7-label>
                                <f7-input type="range" min="10" max="600" step="10" v-model.number="param1"
                                    placeholder="Введите время между включениями">
                                </f7-input>
                                <f7-label class="labelin">{{ $t('settings.presets.drop', {p: param2}) }}
                                </f7-label>
                                <f7-input type="range" min="1" max="10" step="1" v-model.number="param2"
                                    placeholder="Количество капель за цикл">
                                </f7-input>
                                <!--          </f7-card-content>
                                </f7-card> -->
<!----------ДОЖДЬ, ПЕСОК------------>
                                <!--  <f7-card>
                                    <f7-card-header> -->
                                <div class="item-media">
                                    <i class='icon icon-off-road'></i>
                                    <p class="text-icon">{{ $t('settings.presets.user') }}</p>
                                </div>
                                <!--      </f7-card-header>
                                    <f7-card-content> -->
                                <f7-label class="labelin">{{ $t('settings.presets.time', {p: param_user1}) }}
                                </f7-label>
                                <f7-input type="range" min="10" max="600" step="10" v-model.number="param_user1"
                                    placeholder="Введите время между включениями">
                                </f7-input>
                                <f7-label class="labelin">{{ $t('settings.presets.drop', {p: param_user2}) }}
                                </f7-label>
                                <f7-input type="range" min="1" max="10" step="1" v-model.number="param_user2"
                                    placeholder="Количество капель за цикл">
                                </f7-input>
                                <f7-label class="labelin">{{ $t('settings.presets.num', {p: param_user3}) }}
                                </f7-label>
                                <f7-input color="brown" type="range" v-model.number="param_user3" min="0" max="20"
                                    step="1">
                                </f7-input>


                                <f7-card v-if="false">
                                    <f7-card-header>
                                        <div class="item-media">
                                            <i class='icon icon-highway'></i>
                                            <p class="text-icon">{{ $t('settings.presets.way') }}</p>
                                        </div>
                                    </f7-card-header>
                                    <f7-card-content>
                                        <f7-label class="labelin">{{ $t('settings.presets.time', {p: param3}) }}
                                        </f7-label>
                                        <f7-input type="range" min="10" max="600" step="10" v-model.number="param3"
                                            placeholder="Введите время между включениями">
                                        </f7-input>
                                        <f7-label class="labelin">{{ $t('settings.presets.drop', {p: param4}) }}
                                        </f7-label>
                                        <f7-input type="range" min="1" max="10" step="1" v-model.number="param4"
                                            placeholder="Количество капель за цикл">
                                        </f7-input>
                                    </f7-card-content>
                                </f7-card>

                            </f7-list-item>
                        </f7-list>
                    </f7-accordion-content>
                </f7-list-item>

<!----------НАСТРОЙКИ НАСОСА------------>
                <f7-list-item accordion-item :title="this.$t('settings.pump.title')" class="settings"
                    media="<i class='icon icon-pump'>">
                    <f7-accordion-content>
                        <f7-list media-list>
                            <f7-list-item>
                                <div slot="inner">
                                    <div :style="stylediv1">
                                        <f7-label class="labelin">{{ $t('settings.pump.on', {p: param5}) }}</f7-label>
                                        <f7-input color="green" type="range" min="10" max="500" step="5"
                                            v-model="param5">
                                        </f7-input>
                                        <f7-label class="labelin">{{ $t('settings.pump.off', {p: param6}) }}</f7-label>
                                        <f7-input color="red" type="range" :min="param5 * 2" :max="2000" step="10"
                                            v-model="param6">
                                        </f7-input>
                                    </div>
                                </div>

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
                stylediv1: 'margin-top: 6px'
            }
        },
        methods: {
            back: function () {

            }
        },
        beforeDestroy: function () {
            this.$store.dispatch('changeTimeCnfg');
            this.$store.dispatch('changePumpCnfg');
        },
        computed: {
            param1: {
                get() {
                    return this.$store.state.time.time.presets[0].dp_time
                },
                set(value) {
                    this.$store.commit({
                        type: 'UPD_TIME_DPTIME',
                        data: value,
                        preset: 0
                    })
                }
            },
            param2: {
                get() {
                    return this.$store.state.time.time.presets[0].dp_num
                },
                set(value) {
                    this.$store.commit({
                        type: 'UPD_TIME_DPNUM',
                        data: value,
                        preset: 0
                    })
                }
            },
            param3: {
                get() {
                    return this.$store.state.time.time.presets[1].dp_time
                },
                set(value) {
                    this.$store.commit({
                        type: 'UPD_TIME_DPTIME',
                        data: value,
                        preset: 1
                    })
                }
            },
            param4: {
                get() {
                    return this.$store.state.time.time.presets[1].dp_num
                },
                set(value) {
                    this.$store.commit({
                        type: 'UPD_TIME_DPNUM',
                        data: value,
                        preset: 1
                    })
                }
            },
            param_user1: {
                get() {
                    return this.$store.state.time.time.presets[2].dp_time
                },
                set(value) {
                    this.$store.commit({
                        type: 'UPD_TIME_DPTIME',
                        data: value,
                        preset: 2
                    })
                }
            },
            param_user2: {
                get() {
                    return this.$store.state.time.time.presets[2].dp_num
                },
                set(value) {
                    this.$store.commit({
                        type: 'UPD_TIME_DPNUM',
                        data: value,
                        preset: 2
                    })
                }
            },
            param_user3: {
                get() {
                    return this.$store.state.time.time.presets[2].cycles
                },
                set(value) {
                    this.$store.commit({
                        type: 'UPD_TIME_CYCLES',
                        data: value,
                        preset: 2
                    })
                }
            },
            param5: {
                get() {
                    return this.$store.state.pump.pump.dpms
                },
                set(value) {
                    this.$store.commit('UPD_TIME_DPMS', value)
                }
            },
            param6: {
                get() {
                    return this.$store.state.pump.pump.dpdp
                },
                set(value) {
                    this.$store.commit('UPD_TIME_DPDP', value)
                }
            },
        },
        components: {}
    }
</script>

<style>

</style>
