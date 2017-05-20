<template>
<f7-page>
    <f7-navbar title="Системные настройки" back-link="Back" sliding ></f7-navbar>
    <f7-list media-list>
        <f7-list-item title="Подключение WiFi" after="<i class='icon icon-wifi-ap'>">

            <!--            <div slot="root" class='icon icon-meter'></div>-->
            <div slot="inner">
                <div style="margin-top: 6px">
                    <f7-label class="labelin">SSID</f7-label>
                    <f7-input type="text" v-model="status.wifi.ssid" placeholder="Введите имя точки доступа"></f7-input>
                    <f7-label class="labelin">Пароль</f7-label>
                    <f7-input type="password" v-model="status.wifi.psw" placeholder="Пароль"></f7-input>
                </div>
            </div>
            <f7-grid>
                <f7-col width="50">
                    <p>
                        <f7-button big fill v-on:click="save">Сохранить</f7-button>
                    </p>
                </f7-col>
                <f7-col width="50">
                    <p>
                        <f7-button big fill v-on:click="update">Обновить ПО</f7-button>
                    </p>
                </f7-col>
           
            </f7-grid>
            
            <f7-block-title>Внимание!</f7-block-title>
            <f7-block tablet-inset>
                <f7-block inner>
                    <p>Перед обновлением ПО обязfтельно необходимо ввести данные точки доступа, через которую имеется выход в интернет.</p>
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
                aps: [],
                ap: {SSID: null, PASS: null},
                fChange: { type: Boolean, default: false },
                status: {wifi: {connect: false, ssid: "ASUS77", psw: "36910082013"}},
                interval: null,
            }
        },
        created: function () {
            console.log('created');
            this.fetchStatus();
        }, 
        computed: {
            
        },
        methods: {
            fetchStatus: function() {
                var self = this;
                this.interval = setInterval(() => {
                    this.axios.get('http://'+self.$root.uri+'/status.json', {timeout: 1000}).then(
                                (response) => {
                                    console.log('OK get aps.json');
                                    console.log(response);
                                    if (response.status === 200) {
                                        console.log('CODE=200 get config.json');
                                        self.status = response.data;
                                        if (self.status.wifi.connect == false)
                                        {
                                            self.status.wifi.ssid = null;        
                                            self.status.wifi.psw = null;
                                        }
                                        self.connection = true;
                                    }
                                })
                            .catch(
                                (response) => {
                                    console.log('ERROR get config.json');
                                    console.log(response);
                                    self.connection = false;
                                })
                }, 500);
            },
            save: function () {
                var self = this;
                var blob = new Blob([JSON.stringify(self.status)]);
                const dataF = new FormData();

                dataF.append('data', new File([blob], '/status.json', { type: 'application/json' } ));
                
                this.axios.post('http://'+self.$root.uri+'/update', dataF, {timeout: 1000, headers: { 'Content-Type': 'multipart/form-data' }}).then(
                    (response) => {
                        console.log(response);
                    })
                .catch(
                (response) => {
                    console.log('error');
                })               
            },
            update: function () {
                this.save();
                var self = this;
                this.axios.get('http://'+self.$root.uri+'/update', {timeout: 1000}).then(
                    (response) => {
                        console.log(response);
                    })
                .catch(
                (response) => {
                    console.log('error');
                })
            }
        },
        components: {
        },
        beforeDestroy: function () {
            console.log('clear interval');
            console.log(this.interval);
            clearInterval(this.interval);
        }        
    }
</script>

<style>
    
</style>