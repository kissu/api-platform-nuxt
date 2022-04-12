<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="6" md="6">
        <v-text-field
          v-model="item.archived"
          label="archived"
          type="text"
        />
      </v-col>
    
      <v-col cols="12" sm="6" md="6">
        <v-text-field
          v-model="item.title"
          label="title"
          type="text"
        />
      </v-col>
    </v-row>
    
    <v-row>
      <v-col cols="12" sm="6" md="6">
        <v-text-field
          v-model="item.author"
          label="author"
          type="text"
        />
      </v-col>
    
      <v-row cols="12"></v-row>
    </v-row>
    
  </v-container>
</template>

<script>

export default {
  name: 'BookFilter',
  props: {
    values: {
      type: Object,
      required: true
    }
  },
  mounted() {
  },

  computed: {
    // eslint-disable-next-line
    item() {
      return this.initialValues || this.values;
    }
  },
  methods: {
  }
};
</script>
