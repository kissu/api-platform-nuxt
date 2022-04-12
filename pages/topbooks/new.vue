<template>
  <div>
    <Toolbar :handle-submit="onSendForm" :handle-reset="resetForm"></Toolbar>
    <TopBookForm ref="createForm" :values="item" :errors="violations" />
    <Loading :visible="isLoading" />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { createHelpers } from 'vuex-map-fields';
import create from '../../mixins/create';

const servicePrefix = 'topbooks';

const { mapFields } = createHelpers({
  getterType: 'topbook/getField',
  mutationType: 'topbook/updateField'
});

export default {
  servicePrefix,
  mixins: [create],
  components: {
    Loading: () => import('../../components/Loading'),
    Toolbar: () => import('../../components/Toolbar'),
    TopBookForm: () => import('../../components/topbook/Form')
  },
  data: () => ({
    item: {}
  }),
  computed: {
    ...mapFields(['error', 'isLoading', 'created', 'violations'])
  },
  methods: {
    ...mapActions('topbook', ['create', 'reset'])
  }
};
</script>
