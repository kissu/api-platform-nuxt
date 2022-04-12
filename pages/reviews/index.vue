<template>
  <div class="review-list">
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
                <v-toolbar-title>Review</v-toolbar-title>

                <v-spacer></v-spacer>

                <DataFilter :handle-filter="onSendFilter" :handle-reset="resetFilter">
                  <ReviewFilterForm
                    ref="filterForm"
                    :values="filters"
                    slot="filter"
                  />
                </DataFilter>

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

                <template slot="item.rating" slot-scope="{ item }">
                  {{ $t(item['rating']) }}
                </template>
                <template slot="item.publicationDate" slot-scope="{ item }">
                  {{ formatDateTime(item['publicationDate'], 'long') }}
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
  servicePrefix: 'reviews',
  mixins: [list],
  components: {
    Toolbar: () => import('../../components/Toolbar'),
    ActionCell: () => import('../../components/ActionCell'),
    ReviewFilterForm: () => import('../../components/review/Filter'),
    DataFilter: () => import('../../components/DataFilter')
  },
  data: () => ({
    headers: [
      { text: 'body', value: 'body' },
      { text: 'rating', value: 'rating' },
      { text: 'book', value: 'book' },
      { text: 'author', value: 'author' },
      { text: 'publicationDate', value: 'publicationDate' },
      {
        text: 'Actions',
        value: 'action',
        sortable: false
      }
    ],
    selected: []
  }),
  computed: {
    ...mapGetters('review', {
      items: 'list'
    }),
    ...mapFields('review', {
      deletedItem: 'deleted',
      error: 'error',
      isLoading: 'isLoading',
      resetList: 'resetList',
      totalItems: 'totalItems',
      view: 'view'
    })
  },
  methods: {
    ...mapActions('review', {
      fetchAll: 'fetchAll',
      deleteItem: 'del'
    })
  }
};
</script>
