<template>
  <f7-page>
    <f7-navbar title="Настройки" back-link="Back" sliding></f7-navbar>
        
<f7-list media-list>
    <f7-list-item title="Включение/выключение режима" subtitle="">

        <div slot="inner">
            <f7-input type="switch"></f7-input>
        </div>

    </f7-list-item>
</f7-list>
      
    <f7-block inner>
        <p>В разработке....</p>
    </f7-block> 
      
    

    <f7-block-title>Checkboxes</f7-block-title>
<!--    <f7-list form>
      <f7-list-item v-for="n in 3" checkbox name="my-checkbox" :value="n" :title="'Checkbox ' + n"></f7-list-item>
    </f7-list>

    <f7-block-title>Radios</f7-block-title>
    <f7-list form>
      <f7-list-item v-for="n in 3" radio name="my-radio" :checked="n === 1" :value="n" :title="'Radio ' + n"></f7-list-item>
    </f7-list>-->

  </f7-page>
</template>

<script>
export default {}
</script>