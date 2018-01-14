<template>
<f7-page>
    <f7-navbar title="Системные настройки" back-link="Back" sliding></f7-navbar>


    
<f7-list accordion>
    <f7-list-item accordion-item title="Подключение" class="system" media="<i class='icon icon-wifi-logo'>">
        <f7-accordion-content>
            <f7-list media-list>
                <f7-list-item>
                    <f7-card>
                        <!--                    <f7-card-header>
                        <div class="item-media">
                            <i class='icon icon-wifi-logo'></i>
                            <p class="text-icon">Подключение WiFi</p>
                        </div>
                    </f7-card-header>-->
                        <f7-card-content>


                            <div :style="stylediv1">
                            <f7-label class="labelin">SSID</f7-label>
                            <f7-input type="text" v-model="ssid" placeholder="Введите имя точки доступа"></f7-input>
                            <f7-label class="labelin">Пароль</f7-label>
                            <f7-input type="password" v-model="psw" placeholder="Пароль"></f7-input>
                             </div>
                            <f7-grid>
                                <f7-col width="50">
                                    <p>
                                        <f7-button big raised fill v-on:click="saveSSID">Сохранить</f7-button>
                                    </p>
                                </f7-col>
                                <f7-col width="50">
                                    <p>
                                        <f7-button big raised fill v-on:click="clearSSID">Сброс SSID</f7-button>
                                    </p>
                                </f7-col>

                            </f7-grid>
                        </f7-card-content>
                    </f7-card>
                </f7-list-item>
            </f7-list>
        </f7-accordion-content>
    </f7-list-item>

    <f7-list-item accordion-item title="Обновление ПО" class="settings" media="<i class='icon icon-wifi-logo'>">
        <f7-accordion-content>
            <f7-list media-list>
                <f7-list-item>
                    <f7-card>

                        <f7-card-content class="caution">

                            <p :style="cautionStyle">Внимание!</p>
                            <p>Перед обновлением ПО обязательно необходимо ввести данные точки доступа, через которую имеется выход в интернет.</p>

                            <p>
                                <f7-button big raised color='red' fill v-on:click="updateFW">Обновить ПО</f7-button>
                            </p>


                        </f7-card-content>
                    </f7-card>
                </f7-list-item>
            </f7-list>
        </f7-accordion-content>
    </f7-list-item>

    <f7-list-item accordion-item title="Светодиод" class="settings" media="<i class='icon icon-wifi-logo'>">
        <f7-accordion-content>
            <f7-list media-list>
                <f7-list-item>
                    <f7-card>
                        <f7-card-content>

                            <div :style="styledivBright">
                                <f7-label class="labelin">Яркость: {{param1}}%</f7-label>
                                <f7-input type="range" min="10" max="255" step="1" v-model="param1">
                                </f7-input>
                             </div>

                        </f7-card-content>
                    </f7-card>
                </f7-list-item>
            </f7-list>
        </f7-accordion-content>
    </f7-list-item>

</f7-list>    
        
   <f7-list media-list v-if="false">      
        
        <f7-list-item title="Подключение WiFi" after="<i class='icon icon-wifi-logo'>">

            <!--            <div slot="root" class='icon icon-meter'></div>-->
            <div slot="inner">
                <div :style="stylediv1">
                    <f7-label class="labelin">SSID</f7-label>
                    <f7-input type="text" v-model="ssid" placeholder="Введите имя точки доступа"></f7-input>
                    <f7-label class="labelin">Пароль</f7-label>
                    <f7-input type="password" v-model="psw" placeholder="Пароль"></f7-input>
                </div>
            </div>
            <f7-grid>
                <f7-col width="50">
                    <p>
                        <f7-button big raised fill v-on:click="saveSSID">Сохранить</f7-button>
                    </p>
                </f7-col>
                <f7-col width="50">
                    <p>
                        <f7-button big raised fill v-on:click="clearSSID">Сброс SSID</f7-button>
                    </p>
                </f7-col>

            </f7-grid>
        </f7-list-item>


        <f7-list-item title="Обновление ПО">
            <div slot="inner">
                <p :style="cautionStyle">Внимание</p>
                <p>Перед обновлением ПО обязательно необходимо ввести данные точки доступа, через которую имеется выход в интернет.</p>
                <!--               <f7-block tablet-inset>-->
                <!--                <f7-block inner>
                    <p :style="cautionStyle">Внимание</p>
                    <p>Перед обновлением ПО обязательно необходимо ввести данные точки доступа, через которую имеется выход в интернет.</p>
                </f7-block>-->
                <p>
                    <f7-button big raised color='red' fill v-on:click="updateFW">Обновить ПО</f7-button>
                </p>
            </div>
            <!--            </f7-block>             -->
        </f7-list-item>

        <!--            <f7-block-title :style="cautionStyle">Внимание!</f7-block-title>-->


        <f7-list-item title="Светодиод">
            <div slot="inner">
                <div :style="styledivBright">
                    <f7-label class="labelin">Яркость: {{param1}}</f7-label>
                    <f7-input type="range" min="5" max="255" step="1" v-model="param1">
                    </f7-input>
                </div>
            </div>
        </f7-list-item>
    </f7-list>

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
        methods: {
            saveSSID: function() {
                this.$store.dispatch('changeSystem');
            },
            updateFW: function() {
                if (this.$store.state.system.wifi.ssid === '')
                    this.$f7.alert('Введите название точки доступа и пароль!', 'Cosmoiler')
                else {
                    //                    this.saveSSID();
                    this.$store.dispatch('Update');
                    this.$router.back()
                }
            },
            clearSSID: function() {

                this.$store.commit('UPD_UPDATE_SSID', '')
                this.$store.commit('UPD_UPDATE_PSW', '')
                this.saveSSID()
                //this.op = true

            },
        },
        beforeDestroy: function() {
            this.$store.dispatch('changeSystem');            
        }, 
        computed: {
            ssid: {
                get() {
                    return this.$store.state.system.wifi.ssid
                },
                set(value) {
                    this.$store.commit('UPD_UPDATE_SSID', value)
                }
            },
            psw: {
                get() {
                    return this.$store.state.system.wifi.psw
                },
                set(value) {
                    this.$store.commit('UPD_UPDATE_PSW', value)
                }
            },
            param1: {
                get() {
                    let a = this.$store.state.system.bright * (100 / 255)
                    return parseInt(a.toFixed(0),10)
                },
                set(value) {
                    console.log(value)
                    this.$store.commit('UPD_SYS_BRIGHT', value)
                }
            }
        }
    }

</script>

<style>


</style>
