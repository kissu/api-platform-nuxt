<template>
  <v-form>
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.body"
            :error-messages="bodyErrors"
            label="body"
            required
            @input="$v.item.body.$touch()"
            @blur="$v.item.body.$touch()"
          />
        </v-col>
      
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model.number="item.rating"
            :error-messages="ratingErrors"
            label="rating"
            required
            @input="$v.item.rating.$touch()"
            @blur="$v.item.rating.$touch()"
          />
        </v-col>
      </v-row>
      
      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.book"
            :error-messages="bookErrors"
            label="book"
            required
            @input="$v.item.book.$touch()"
            @blur="$v.item.book.$touch()"
          />
        </v-col>
      
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.author"
            :error-messages="authorErrors"
            label="author"
            @input="$v.item.author.$touch()"
            @blur="$v.item.author.$touch()"
          />
        </v-col>
      </v-row>
      
      <v-row>
        <!-- todo : fix the dateTime format, not supported by default on vuetify -->
        <v-col cols="12" sm="6" md="6">
          <InputDate
            v-model="item.publicationDate"
            label="publicationDate"
            :error-messages="publicationDateErrors"
          />
        </v-col>
      
        <v-col cols="12"></v-col>
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
import InputDate from '../InputDate';
import { date } from '../../validators/date';

export default {
  name: 'ReviewForm',
  mixins: [validationMixin],
  components: {
    InputDate,
  },
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
      body: null,
      rating: null,
      book: null,
      author: null,
      publicationDate: null,
  }),
  computed: {

    // eslint-disable-next-line
    item() {
      return this.initialValues || this.values;
    },

    bodyErrors() {
      const errors = [];

      if (!this.$v.item.body.$dirty) return errors;

      has(this.violations, 'body') && errors.push(this.violations.body);

      !this.$v.item.body.required && errors.push('Field is required');

      return errors;
    },
    ratingErrors() {
      const errors = [];

      if (!this.$v.item.rating.$dirty) return errors;

      has(this.violations, 'rating') && errors.push(this.violations.rating);

      !this.$v.item.rating.required && errors.push('Field is required');

      return errors;
    },
    bookErrors() {
      const errors = [];

      if (!this.$v.item.book.$dirty) return errors;

      has(this.violations, 'book') && errors.push(this.violations.book);

      !this.$v.item.book.required && errors.push('Field is required');

      return errors;
    },
    authorErrors() {
      const errors = [];

      if (!this.$v.item.author.$dirty) return errors;

      has(this.violations, 'author') && errors.push(this.violations.author);


      return errors;
    },
    publicationDateErrors() {
      const errors = [];

      if (!this.$v.item.publicationDate.$dirty) return errors;

      has(this.violations, 'publicationDate') && errors.push(this.violations.publicationDate);


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
      body: {
        required,
      },
      rating: {
        required,
      },
      book: {
        required,
      },
      author: {
      },
      publicationDate: {
        date,
      },
    }
  }
};
</script>
