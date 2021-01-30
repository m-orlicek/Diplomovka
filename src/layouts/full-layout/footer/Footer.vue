<template>
    <v-footer app class="footerpart" inset>
      <v-col>
        <span>© {{ new Date().getFullYear() }} — Matúš Orlíček</span>
      </v-col>
    </v-footer>
</template>
<script>
export default {
    name: "Footer",
    data:() => ({

    })
}
</script>
<style lang="scss">
  .v-application .footerpart{
    border-top:1px solid rgba(0,0,0,0.1)!important;
    text-align: right!important;
  }
  .theme--light.v-footer{
    background:white;
  }
</style>
