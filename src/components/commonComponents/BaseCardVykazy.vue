<template>
  <v-card class="mb-7">
    <v-toolbar flat>
        <v-toolbar-title>

            {{ heading }}
        </v-toolbar-title>

        <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon
              color="black"
              dark
              v-bind="attrs"
              v-on="on"
              @click.stop="onClickButton()"
          >
            mdi-plus-box
          </v-icon>
        </template>
        <span>Vytvoriť dochádzku</span>
      </v-tooltip>
      </v-toolbar>
      <v-divider></v-divider>
     <div class="pa-4">
            <slot/>
       </div>
  </v-card>
</template>

<script>
  export default {
    name: 'BaseCard',

    props: {
      heading: {
        type: String,
        default: '',
      }
    },
    data:  () => ({

    }),

    methods:{
      // eslint-disable-next-line no-unused-vars
      onClickButton (event) {
        console.log("button clicked")
        this.$emit('pridatMesiac', true)
      }
    }
  }
</script>
