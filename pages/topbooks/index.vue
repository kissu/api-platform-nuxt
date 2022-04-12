<template>
  <div class="topbook-list">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg12>
          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="items"
            :items-per-page.sync="options.itemsPerPage"
            :loading="isLoading"
            loading-text="Loading..."
            :options.sync="options"
            :server-items-length="totalItems"
            class="elevation-1"
            item-key="@id"
            show-select
            @update:options="onUpdateOptions"
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>TopBook</v-toolbar-title>

                <v-spacer></v-spacer>


                <v-btn
                  color="primary"
                  dark
                  class="ml-2"
                  @click="addHandler"
                >
                  New Item
                </v-btn>
              </v-toolbar>
            </template>

                <template slot="item.id" slot-scope="{ item }">
                  {{ $t(item['id']) }}
                </template>
                <template slot="item.borrowCount" slot-scope="{ item }">
                  {{ $t(item['borrowCount']) }}
                </template>

            <ActionCell
              slot="item.action"
              slot-scope="props"
              :handle-edit="() => editHandler(props.item)"
              :handle-delete="() => deleteHandler(props.item)"
            ></ActionCell>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { mapFields } from 'vuex-map-fields';
import list from '../../mixins/list';

export default {
  servicePrefix: 'topbooks',
  mixins: [list],
  components: {
    Toolbar: () => import('../../components/Toolbar'),
    ActionCell: () => import('../../components/ActionCell'),
    TopBookFilterForm: () => import('../../components/topbook/Filter'),
    DataFilter: () => import('../../components/DataFilter')
  },
  data: () => ({
    headers: [
      { text: 'id', value: 'id' },
      { text: 'title', value: 'title' },
      { text: 'author', value: 'author' },
      { text: 'part', value: 'part' },
      { text: 'place', value: 'place' },
      { text: 'borrowCount', value: 'borrowCount' },
      {
        text: 'Actions',
        value: 'action',
        sortable: false
      }
    ],
    selected: []
  }),
  computed: {
    ...mapGetters('topbook', {
      items: 'list'
    }),
    ...mapFields('topbook', {
      deletedItem: 'deleted',
      error: 'error',
      isLoading: 'isLoading',
      resetList: 'resetList',
      totalItems: 'totalItems',
      view: 'view'
    })
  },
  methods: {
    ...mapActions('topbook', {
      fetchAll: 'fetchAll',
      deleteItem: 'del'
    })
  }
};
</script>
