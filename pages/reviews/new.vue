<template>
  <div>
    <Toolbar :handle-submit="onSendForm" :handle-reset="resetForm"></Toolbar>
    <ReviewForm ref="createForm" :values="item" :errors="violations" />
    <Loading :visible="isLoading" />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { createHelpers } from 'vuex-map-fields';
import create from '../../mixins/create';

const servicePrefix = 'reviews';

const { mapFields } = createHelpers({
  getterType: 'review/getField',
  mutationType: 'review/updateField'
});

export default {
  servicePrefix,
  mixins: [create],
  components: {
    Loading: () => import('../../components/Loading'),
    Toolbar: () => import('../../components/Toolbar'),
    ReviewForm: () => import('../../components/review/Form')
  },
  data: () => ({
    item: {}
  }),
  computed: {
    ...mapFields(['error', 'isLoading', 'created', 'violations'])
  },
  methods: {
    ...mapActions('review', ['create', 'reset'])
  }
};
</script>
