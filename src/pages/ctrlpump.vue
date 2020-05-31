<template>
    <f7-page>
        <f7-navbar :title="this.$t('ctrlpump.title')" back-link="Back" sliding></f7-navbar>
        <div v-if=this.$store.state.connect>

            <f7-list accordion>
<!----------ПРОКАЧКА------------>
                <f7-list-item accordion-item title="Прокачка" class="system" media="<i class='icon icon-arrows-cw'>">
                    <f7-accordion-content>
                        <f7-list media-list>
                            <f7-list-item>
                                <f7-input type="switch" @change="onPumping" :v-model="0"></f7-input>
                            </f7-list-item>
                        </f7-list>
                    </f7-accordion-content>
                </f7-list-item>
<!----------ПОПОЛНЕНИЕ------------>
                <f7-list-item accordion-item title="Пополнение" class="settings"
                    media="<i class='icon icon-pumping'>">
                    <f7-accordion-content>
                        <f7-list media-list>
                            <f7-list-item>
                                <f7-card>
                                    <f7-card-content class="caution">
                                        <p :style="cautionStyle">{{ $t('attention.title') }}</p>
                                        <p>
                                            {{ $t('pumping.attention.content') }}<br>
                                            {{ $t('pumping.attention.content1') }}<br>
                                            {{ $t('pumping.attention.content2') }}<br>
                                            {{ $t('pumping.attention.content3') }}<br>
                                            {{ $t('pumping.attention.content4') }}
                                        </p>
                                    </f7-card-content>
                                </f7-card>

                            </f7-list-item>
                            <f7-list-item>
                                <f7-input type="switch" @change="onAddOil" :v-model="0"></f7-input>
                            </f7-list-item>
                        </f7-list>
                    </f7-accordion-content>
                </f7-list-item>
<!----------ВЯЗКОСТЬ------------>
                <f7-list-item accordion-item title="Настройки вязкости" class="settings"
                    media="<i class='icon icon-wrench'>">
                    <f7-accordion-content>
                        <f7-list media-list>
                            <f7-list-item>

                                <div :style="stylediv">

                                    <f7-label class="labelin">{{ $t('settings.pump.on', {p: pump.dpms}) }}
                                    </f7-label>
                                    <f7-input color="green" type="range" min="10" max="2000" step="10"
                                        v-model="pump.dpms">
                                    </f7-input>
                                    <f7-label class="labelin">{{ $t('settings.pump.off', {p: pump.dpdp}) }}
                                    </f7-label>
                                    <f7-input color="red" type="range" :min="100" :max="5000" step="10"
                                        :value="pump.dpdp" v-model="pump.dpdp">
                                    </f7-input>

                                </div>


                                <f7-grid>
                                    <f7-col width="50">
                                        <p>
                                            <f7-button big raised color="green" fill v-on:click="on">
                                                {{ $t('button.start') }}
                                            </f7-button>
                                        </p>
                                    </f7-col>
                                    <f7-col width="50">
                                        <p>
                                            <f7-button big raised color="red" fill v-on:click="off">
                                                {{ $t('button.stop') }}
                                            </f7-button>
                                        </p>
                                    </f7-col>
                                    <f7-col width="100">
                                        <p>
                                            <f7-button raised fill color="gray" v-on:click="reverse">
                                                {{ $t('button.reverse', {p: dirname.properites[pump.dir].name}) }}
                                            </f7-button>
                                        </p>
                                    </f7-col>
                                </f7-grid>
                            </f7-list-item>
                        </f7-list>
                    </f7-accordion-content>
                </f7-list-item>
            </f7-list>




<!--             <f7-list media-list>
                <f7-card>
                    <f7-card-header>
                        <div class="item-media">
                            <i :style="{'font-size': sizeIconPump+'px'}" class='icon icon-pump'></i>
                            <p class="text-icon">{{ $t('settings.pump.title') }}</p>
                        </div>
                    </f7-card-header>
                    <f7-card-content>

                        <div :style="stylediv">

                            <f7-label class="labelin">{{ $t('settings.pump.on', {p: pump.dpms}) }}</f7-label>
                            <f7-input color="green" type="range" min="5" max="500" step="5" v-model="pump.dpms">
                            </f7-input>
                            <f7-label class="labelin">{{ $t('settings.pump.off', {p: pump.dpdp}) }}</f7-label>
                            <f7-input color="red" type="range" :min="10" :max="2000" step="10" :value="pump.dpdp"
                                v-model="pump.dpdp">
                            </f7-input>

                        </div>


                        <f7-grid>
                            <f7-col width="50">
                                <p>
                                    <f7-button big raised color="green" fill v-on:click="on">{{ $t('button.start') }}
                                    </f7-button>
                                </p>
                            </f7-col>
                            <f7-col width="50">
                                <p>
                                    <f7-button big raised color="red" fill v-on:click="off">{{ $t('button.stop') }}
                                    </f7-button>
                                </p>
                            </f7-col>
                            <f7-col width="100">
                                <p>
                                    <f7-button raised fill color="gray" v-on:click="reverse">
                                        {{ $t('button.reverse', {p: dirname.properites[pump.dir].name}) }}</f7-button>
                                </p>
                            </f7-col>
                        </f7-grid>

                    </f7-card-content>
                </f7-card>
            </f7-list> -->
        </div>
    </f7-page>
</template>

<script>
    var direction = {
        OUT: 0,
        IN: 1,
        properites: {
            0: {
                name: '(OUT)'
            },
            1: {
                name: '(IN) '
            }
        }
    };

    export default {
        data() {
            return {
                pump: {
                    dpms: 300,
                    dpdp: 1000,
                    state: 0,
                    dir: direction.OUT
                },
                dirname: direction,
                stylediv: 'margin-top: 6px',
                sizeIconPump: 40,
                cautionStyle: 'font-size: 18px; font-weight: bold; color: #e91e63; margin-bottom',
            }
        },
        created: function () {
            this.$store.state.connection.send(JSON.stringify({
                cmd: "work",
                param: 2
            }))
        },
        methods: {
            send: function (state, dpms, dpdp, dir) {
                this.$store.state.connection.send(JSON.stringify({
                    cmd: "pump",
                    param: [state, dpms, dpdp, dir]
                }));
            },
            on: function () {
                this.pump.state = 1;
                this.send(this.pump.state, this.pump.dpms, this.pump.dpdp, this.pump.dir);
            },
            off: function () {
                this.pump.state = 0;
                this.send(this.pump.state, this.pump.dpms, this.pump.dpdp, this.pump.dir);
            },
            reverse: function () {
                if (this.pump.dir === direction.OUT)
                    this.pump.dir = direction.IN;
                else
                    this.pump.dir = direction.OUT;
                this.send(this.pump.state, this.pump.dpms, this.pump.dpdp, this.pump.dir);
            },
            onPumping: function (event) {
                this.send(event.srcElement.checked, 1000, 0, direction.OUT);
            },
            onAddOil: function (event) {
                this.send(event.srcElement.checked, 1000, 0, direction.IN);
            }
        },
        beforeDestroy: function () {
            this.$store.state.connection.send(JSON.stringify({
                cmd: "work",
                param: 0
            }));
        },
    }
</script>

<style>

</style>
