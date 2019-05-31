<template>
<!-- App -->
<div id="app">

    <!-- Statusbar -->
    <!--<f7-statusbar>sdfsdfs</f7-statusbar>-->

    <!-- Right Panel -->
    <!-- Меню -->
    <f7-panel right cover layout="dark">
        <f7-view id="right-panel-view" navbar-through :dynamic-navbar="true">
            <f7-navbar v-if="$theme.ios" sliding></f7-navbar>
            <f7-pages>
                <f7-page>
                    <f7-navbar v-if="$theme.material" sliding></f7-navbar>
                    <f7-list>
                        <f7-list-item link="/params/" link-view="#main-view"  :title="$t('menu.telemetry')" link-close-panel></f7-list-item>
                        <f7-list-item link="/ctrlpump/" link-view="#main-view" link-close-panel :title="$t('menu.ctrl')"></f7-list-item>
                        <f7-list-item link="/system/" link-view="#main-view"  :title="$t('menu.system')" link-close-panel></f7-list-item>

                        <f7-list-item link="/about/" :title="$t('menu.about')"></f7-list-item>
                    </f7-list>
                </f7-page>
            </f7-pages>
        </f7-view>
    </f7-panel>

    <!-- Main Views -->
    <f7-views>
        <f7-view id="main-view" navbar-through :dynamic-navbar="true" main>
            <!-- iOS Theme Navbar -->
            <f7-navbar v-if="$theme.ios">
                <f7-nav-left>
                    <f7-link icon="icon-bars" open-panel="left"></f7-link>
                </f7-nav-left>
                <f7-nav-center sliding>Cosmoiler - автоматический смазчик цепи мотоцикла</f7-nav-center>
                <div :style="styleVer">{{this.$store.state.versw}}</div>
                <f7-nav-right v-if=this.$store.state.connect>
                    <f7-link icon="icon-bars" open-panel="right"></f7-link>
                </f7-nav-right>
            </f7-navbar>
            <!-- Pages -->
            <f7-pages>
                <f7-page>
                    <!-- Material Theme Navbar -->
                    <f7-navbar v-if="$theme.material">
                        <f7-nav-left>
                            <!--<f7-link icon-size="32px" v-on:click="reconnect"></f7-link>--> <!--icon-cosmoiler-logo_pict_font2-->
                        </f7-nav-left>
                        <f7-nav-center sliding>Cosmoiler - автоматический смазчик цепи мотоцикла</f7-nav-center>

                        <f7-nav-right v-if=this.$store.state.connect>
                            <f7-link icon="icon-bars" open-panel="right"></f7-link>
                        </f7-nav-right>
                    </f7-navbar>


                    <div v-if=true>
                        <!--                     <f7-grid>
                            <f7-col width="100">
                                <f7-chip text="ПОДКЛЮЧЕНО!" bg="green" color="white"></f7-chip>
                            </f7-col>
                        </f7-grid> -->

<!--<f7-button v-on:click="test">Test</f7-button>-->

                        <!-- <f7-block-title :style="{'font-weight': 600}">{{ $t('selectmode') }} </f7-block-title> -->
                              <f7-block>
        <p> Автосмазчик <b>Cosmoiler</b> предназначен для автоматической смазки мотоциклетной цепи. </p>
        <p><b>Cosmoiler</b> представляет собой моноблок со встроенным насосом и схемой управления. Размеры блока 75 х 35 х 40 мм.
            Доработанная двойная форсунка (смазка цепи с обеих сторон относительно звезды) + алгоритм управления решают проблему с вытеканием масла из форсунки на стоянке. При этом низкая стоимость форсунки (относительно аналогов) достигается за счет практически нулевой трудоемкости ее изготовления (3D печать).</p>
      </f7-block>
        <f7-block-title>Режимы работы</f7-block-title>


                        <f7-list media-list>
                            <f7-list-item
                                :title="$t('mode.trip.title')"
                                media="<i class='icon icon-meter'></i>"
                                link="/trip/"
                                badge-color="green"
                                :subtitle="$t('mode.trip.subtitle')"
                                text="Правильный режим работы любого автосмазчика.
                                В данном режиме цепь смазывается через заданный мотоциклистом пробег (как того и требует инструкция по обслуживанию практически на любой мотоцикл).">

                            </f7-list-item>
                            <f7-list-item
                                :title="$t('mode.time.title')"
                                media="<i class='icon icon-time'></i>"
                                link="/time/"
                                badge-color="green"
                                :subtitle="$t('mode.time.subtitle')"
                                text=" Режим используемый для мотоциклов, в которых отсутствует датчик скорости (как правило карбюраторные модели мотоциклов, а также некоторые инжекторные со считыванием скорости от датчиков АБС) или по разным причинам нет возможности установить дополнительный датчик. ">
                            </f7-list-item>
                            <f7-list-item
                                :title="$t('mode.manual.title')"
                                media="<i class='icon icon-right-hand'></i>"
                                link="/manual/"
                                badge-color="green"
                                :subtitle="$t('mode.manual.subtitle')"
                                text=" Дополнительный режим работы автосмазчика. Позволяет включать насос вручную с помощью любого подключенного к блоку управления нормально разомкнутого выключателя.">

                            </f7-list-item>
                            <f7-list-item divider></f7-list-item>
                            <f7-list-item
                                title="Купить"
                                media="<i class='icon icon-right-hand'></i>"
                                link="https://www.vk.com/cosmoiler" external force
                                text="Здесь Вы можете приобрести автоматический смазчик Cosmoiler"
                                v-on:click="open_url">
  <f7-block >
       <img src="https://1.bp.blogspot.com/-ztt5ZFZshdc/XEcNQ3FWVDI/AAAAAAAAB24/sdOo6aauxHAPPNC74Rit44chwkxTA7DOwCLcBGAs/s1600/c3BgqR4QJ3s.jpg" width="40%"/>

  </f7-block>
                            </f7-list-item>
                        </f7-list>

                    </div>

                    <div class="preload" v-else=this.$store.state.connect>
                        <f7-grid>
                            <f7-col width="100">
                                <p>{{ $t('connect') }}</p>
                            </f7-col>
                            <f7-col width="100">
                                <f7-preloader color="blue" size="40px"></f7-preloader>
                            </f7-col>
                        </f7-grid>
                    </div>
                </f7-page>
            </f7-pages>
        </f7-view>
    </f7-views>

    <!-- Popup -->
<!--    <f7-popup id="popup">
        <f7-view navbar-fixed>
            <f7-pages>
                <f7-page>
                    <f7-navbar title="Popup">
                        <f7-nav-right>
                            <f7-link close-popup>Close</f7-link>
                        </f7-nav-right>
                    </f7-navbar>
                    <f7-block>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque, architecto. Cupiditate laudantium rem nesciunt numquam, ipsam. Voluptates omnis, a inventore atque ratione aliquam. Omnis iusto nemo quos ullam obcaecati, quod.</f7-block>
                </f7-page>
            </f7-pages>
        </f7-view>
    </f7-popup>-->

    <!-- Login Screen -->
<!--    <f7-login-screen id="login-screen">
        <f7-view>
            <f7-pages>
                <f7-page login-screen>
                    <f7-login-screen-title>Login</f7-login-screen-title>
                    <f7-list form>
                        <f7-list-item>
                            <f7-label>Username</f7-label>
                            <f7-input name="username" placeholder="Username" type="text"></f7-input>
                        </f7-list-item>
                        <f7-list-item>
                            <f7-label>Password</f7-label>
                            <f7-input name="password" type="password" placeholder="Password"></f7-input>
                        </f7-list-item>
                    </f7-list>
                    <f7-list>
                        <f7-list-button title="Sign In" close-login-screen></f7-list-button>
                        <f7-list-label>
                            <p>Click Sign In to close Login Screen</p>
                        </f7-list-label>
                    </f7-list>
                </f7-page>
            </f7-pages>
        </f7-view>
    </f7-login-screen>-->

</div>
</template>

<script>
    export default {
        data: function() {
            return {
                messonoff: ['','','',''],
/*                asd: document.location.host*/
                styleVer: 'font-size:12px; margin-top: 5px',

            }
        },
        computed: {

            badgeName1: function() { // trip
                if (this.$store.state.modejson.mode == 1) {
                    this.messonoff[0] = 'ВЫКЛ';
                    return this.$i18n.translate('mode.on')
                }
                else {
                    this.messonoff[0] = 'ВКЛ';
                    return "";
                }
            },
            badgeName2: function() { // time
                if (this.$store.state.modejson.mode == 2) {
                    this.messonoff[1] = 'ВЫКЛ';
                    return this.$i18n.translate('mode.on');
                }
                else {
                    this.messonoff[1] = 'ВКЛ';
                    return "";
                }
            },
            badgeName3: function() { // manual
                if (this.$store.state.modejson.mode == 3) {
                    this.messonoff[2] = 'ВЫКЛ';
                    return this.$i18n.translate('mode.on');
                }
                else {
                    this.messonoff[2] = 'ВКЛ';
                    return "";
                }
            },
            badgeName4: function() { // pumping
                if (this.$store.state.modejson.mode == 4) {
                    this.messonoff[3] = 'ВЫКЛ';
                    return this.$i18n.translate('mode.on');
                }
                else {
                    this.messonoff[3] = 'ВКЛ';
                    return ""
                }
            },
        },
        methods: {
/*            Управление режимами*/
            ctrlMode: function(event) {
/*                console.log(this.$store.state.modejson.mode);
                console.log(event);*/
                if (this.$store.state.modejson.mode != null) {
                        //switch(event.currentTarget.id)
                        switch (event) {
                                case 1:
                                    if (this.$store.state.modejson.mode === 1)
                                        this.$store.dispatch('changeMode', {mode:0})
                                    else
                                        this.$store.dispatch('changeMode', {mode:1})
                                    break;
                                case 2:
                                    if (this.$store.state.modejson.mode === 2)
                                        this.$store.dispatch('changeMode', {mode:0})
                                    else
                                        this.$store.dispatch('changeMode', {mode:2})
                                    break;
                                case 3:
                                    if (this.$store.state.modejson.mode === 3)
                                        this.$store.dispatch('changeMode', {mode:0})
                                    else
                                        this.$store.dispatch('changeMode', {mode:3})
                                    break;
                                case 'pumping':
                                    if (this.$store.state.modejson.mode === 4)
                                        this.$store.dispatch('changeMode', {mode:0})
                                    else
                                        this.$store.dispatch('changeMode', {mode:4})
                                    break;
                        };
                }
            },
            open_url: function() {
                window.open("http://vk.com/cosmoiler", "_self");
            },
            reconnect: function() {
                this.$store.dispatch('reconnect')
            }
    }
    }

</script>
