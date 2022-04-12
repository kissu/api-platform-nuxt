<template>
  <v-form>
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model.number="item.id"
            :error-messages="idErrors"
            label="id"
            @input="$v.item.id.$touch()"
            @blur="$v.item.id.$touch()"
          />
        </v-col>
      
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.title"
            :error-messages="titleErrors"
            label="title"
            @input="$v.item.title.$touch()"
            @blur="$v.item.title.$touch()"
          />
        </v-col>
      </v-row>
      
      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.author"
            :error-messages="authorErrors"
            label="author"
            @input="$v.item.author.$touch()"
            @blur="$v.item.author.$touch()"
          />
        </v-col>
      
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.part"
            :error-messages="partErrors"
            label="part"
            @input="$v.item.part.$touch()"
            @blur="$v.item.part.$touch()"
          />
        </v-col>
      </v-row>
      
      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.place"
            :error-messages="placeErrors"
            label="place"
            @input="$v.item.place.$touch()"
            @blur="$v.item.place.$touch()"
          />
        </v-col>
      
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model.number="item.borrowCount"
            :error-messages="borrowCountErrors"
            label="borrowCount"
            @input="$v.item.borrowCount.$touch()"
            @blur="$v.item.borrowCount.$touch()"
          />
        </v-col>
      </v-row>
      
    </v-container>
  </v-form>
</template>

<script>
import has from 'lodash/has';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';
import { mapFields } from 'vuex-map-fields';

export default {
  name: 'TopBookForm',
  mixins: [validationMixin],
  props: {
    values: {
      type: Object,
      required: true
    },

    errors: {
      type: Object,
      default: () => {}
    },

    initialValues: {
      type: Object,
      default: () => {}
    }
  },
  mounted() {
  },
  data: () => ({
      id: null,
      title: null,
      author: null,
      part: null,
      place: null,
      borrowCount: null,
  }),
  computed: {

    // eslint-disable-next-line
    item() {
      return this.initialValues || this.values;
    },

    idErrors() {
      const errors = [];

      if (!this.$v.item.id.$dirty) return errors;

      has(this.violations, 'id') && errors.push(this.violations.id);


      return errors;
    },
    titleErrors() {
      const errors = [];

      if (!this.$v.item.title.$dirty) return errors;

      has(this.violations, 'title') && errors.push(this.violations.title);


      return errors;
    },
    authorErrors() {
      const errors = [];

      if (!this.$v.item.author.$dirty) return errors;

      has(this.violations, 'author') && errors.push(this.violations.author);


      return errors;
    },
    partErrors() {
      const errors = [];

      if (!this.$v.item.part.$dirty) return errors;

      has(this.violations, 'part') && errors.push(this.violations.part);


      return errors;
    },
    placeErrors() {
      const errors = [];

      if (!this.$v.item.place.$dirty) return errors;

      has(this.violations, 'place') && errors.push(this.violations.place);


      return errors;
    },
    borrowCountErrors() {
      const errors = [];

      if (!this.$v.item.borrowCount.$dirty) return errors;

      has(this.violations, 'borrowCount') && errors.push(this.violations.borrowCount);


      return errors;
    },

    violations() {
      return this.errors || {};
    }
  },
  methods: {
  },
  validations: {
    item: {
      id: {
      },
      title: {
      },
      author: {
      },
      part: {
      },
      place: {
      },
      borrowCount: {
      },
    }
  }
};
</script>
