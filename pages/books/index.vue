<template>
  <div class="book-list">
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
            <template #top>
              <v-toolbar flat color="white">
                <v-toolbar-title>Book</v-toolbar-title>

                <v-spacer></v-spacer>

                <DataFilter :handle-filter="onSendFilter" :handle-reset="resetFilter">
                  <BookFilterForm
                    ref="filterForm"
                    slot="filter"
                    :values="filters"
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
  servicePrefix: 'books',
  components: {
    Toolbar: () => import('../../components/Toolbar'),
    ActionCell: () => import('../../components/ActionCell'),
    BookFilterForm: () => import('../../components/book/Filter'),
    DataFilter: () => import('../../components/DataFilter')
  },
  mixins: [list],
  data: () => ({
    headers: [
      { text: 'isbn', value: 'isbn' },
      { text: 'title', value: 'title' },
      { text: 'description', value: 'description' },
      { text: 'author', value: 'author' },
      { text: 'publicationDate', value: 'publicationDate' },
      { text: 'reviews', value: 'reviews' },
      {
        text: 'Actions',
        value: 'action',
        sortable: false
      }
    ],
    selected: []
  }),
  computed: {
    ...mapGetters('book', {
      items: 'list'
    }),
    ...mapFields('book', {
      deletedItem: 'deleted',
      error: 'error',
      isLoading: 'isLoading',
      resetList: 'resetList',
      totalItems: 'totalItems',
      view: 'view'
    })
  },
  methods: {
    ...mapActions('book', {
      fetchAll: 'fetchAll',
      deleteItem: 'del'
    })
  }
};
</script>
