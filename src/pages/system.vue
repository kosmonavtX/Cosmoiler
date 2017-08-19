<template>
<f7-page>
    <f7-navbar title="Системные настройки" back-link="Back" sliding></f7-navbar>
    <f7-list media-list>
        <f7-list-item title="Подключение WiFi" after="<i class='icon icon-wifi-ap'>">

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
                        <f7-button big fill v-on:click="saveSSID">Сохранить</f7-button>
                    </p>
                </f7-col>
                <f7-col width="50">
                    <p>
                        <f7-button big fill v-on:click="updateFW">Обновить ПО</f7-button>
                    </p>
                </f7-col>

            </f7-grid>

            <f7-block-title :style="cautionStyle">Внимание!</f7-block-title>
            <f7-block tablet-inset>
                <f7-block inner>
                    <p>Перед обновлением ПО обязательно необходимо ввести данные точки доступа, через которую имеется выход в интернет.</p>
                </f7-block>
            </f7-block>
        </f7-list-item>


    </f7-list>
</f7-page>
</template>

<script>
    export default {
        data () {
            return {
                cautionStyle: 'font-size: 18px; font-weight: bold; color: #e91e63;',
                stylediv1: 'margin-top: 6px'
            }
        },
        methods: {
            saveSSID: function () {
                this.$store.dispatch('changeStatus');
       
            },
            updateFW: function () {
                this.saveSSID();
                this.$store.dispatch('Update');
            }
        },
        computed: {
            ssid: {
                get() {return this.$store.state.status.wifi.ssid},
                set(value) { this.$store.commit('UPD_UPDATE_SSID', value) }
            },
            psw: {
                get() {return this.$store.state.status.wifi.psw},
                set(value) { this.$store.commit('UPD_UPDATE_PSW', value) }
            }
        }
    }
</script>

<style>
    
</style>