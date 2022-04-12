<!-- TODO : Use this for create / update !! -->
<template>
  <div>
    <Toolbar
      :handle-submit="onSendForm"
      :handle-reset="resetForm"
      :handle-delete="del"
    >
      <template #left>
        <h1 v-if="item">
          Edit {{ item['@id'] }}
        </h1>
      </template>
    </Toolbar>
    <TopBookForm
      v-if="item"
      ref="updateForm"
      :values="item"
      :errors="violations"
    />
    <Loading :visible="deleteLoading" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { mapFields } from 'vuex-map-fields';
import update from '../../mixins/update';

const servicePrefix = 'topbooks';

export default {
  servicePrefix,
  components: {
    Loading: () => import('../../components/Loading'),
    Toolbar: () => import('../../components/Toolbar'),
    TopBookForm: () => import('../../components/topbook/Form.vue')
  },
  mixins: [update],

  computed: {
    ...mapFields('topbook', {
      deleteLoading: 'isLoading',
      isLoading: 'isLoading',
      error: 'error',
      updated: 'updated',
      violations: 'violations'
    }),
    ...mapGetters('topbook', ['find'])

  },

  methods: {
    ...mapActions('topbook', {
      createReset: 'resetCreate',
      deleteItem: 'del',
      delReset: 'resetDelete',
      retrieve: 'load',
      update: 'update',
      updateReset: 'resetUpdate'
    })
  }
};
</script>
