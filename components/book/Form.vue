<template>
  <v-form>
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.isbn"
            :error-messages="isbnErrors"
            label="isbn"
            @input="$v.item.isbn.$touch()"
            @blur="$v.item.isbn.$touch()"
          />
        </v-col>
      
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.title"
            :error-messages="titleErrors"
            label="title"
            required
            @input="$v.item.title.$touch()"
            @blur="$v.item.title.$touch()"
          />
        </v-col>
      </v-row>
      
      <v-row>
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.description"
            :error-messages="descriptionErrors"
            label="description"
            required
            @input="$v.item.description.$touch()"
            @blur="$v.item.description.$touch()"
          />
        </v-col>
      
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.author"
            :error-messages="authorErrors"
            label="author"
            required
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
            required
          />
        </v-col>
      
        <v-col cols="12" sm="6" md="6">
          <v-text-field
            v-model="item.reviews"
            :error-messages="reviewsErrors"
            label="reviews"
            @input="$v.item.reviews.$touch()"
            @blur="$v.item.reviews.$touch()"
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
import InputDate from '../InputDate';
import { date } from '../../validators/date';

export default {
  name: 'BookForm',
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
      isbn: null,
      title: null,
      description: null,
      author: null,
      publicationDate: null,
      reviews: null,
  }),
  computed: {

    // eslint-disable-next-line
    item() {
      return this.initialValues || this.values;
    },

    isbnErrors() {
      const errors = [];

      if (!this.$v.item.isbn.$dirty) return errors;

      has(this.violations, 'isbn') && errors.push(this.violations.isbn);


      return errors;
    },
    titleErrors() {
      const errors = [];

      if (!this.$v.item.title.$dirty) return errors;

      has(this.violations, 'title') && errors.push(this.violations.title);

      !this.$v.item.title.required && errors.push('Field is required');

      return errors;
    },
    descriptionErrors() {
      const errors = [];

      if (!this.$v.item.description.$dirty) return errors;

      has(this.violations, 'description') && errors.push(this.violations.description);

      !this.$v.item.description.required && errors.push('Field is required');

      return errors;
    },
    authorErrors() {
      const errors = [];

      if (!this.$v.item.author.$dirty) return errors;

      has(this.violations, 'author') && errors.push(this.violations.author);

      !this.$v.item.author.required && errors.push('Field is required');

      return errors;
    },
    publicationDateErrors() {
      const errors = [];

      if (!this.$v.item.publicationDate.$dirty) return errors;

      has(this.violations, 'publicationDate') && errors.push(this.violations.publicationDate);

      !this.$v.item.publicationDate.required && errors.push('Field is required');

      return errors;
    },
    reviewsErrors() {
      const errors = [];

      if (!this.$v.item.reviews.$dirty) return errors;

      has(this.violations, 'reviews') && errors.push(this.violations.reviews);


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
      isbn: {
      },
      title: {
        required,
      },
      description: {
        required,
      },
      author: {
        required,
      },
      publicationDate: {
        required,
        date,
      },
      reviews: {
      },
    }
  }
};
</script>
