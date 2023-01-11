import React from 'react'

import Listbox from '@components/listbox'

const CollectionSort = ({ sortOptions, activeSort, onChange }) => {
  return (
    <div className="collection-sort is-right ml-auto flex px-8 sm:px-16">
      <Listbox
        id="collection-sort"
        label="Select sorting order"
        name="sort"
        options={sortOptions}
        activeOption={activeSort}
        onChange={onChange}
        before={
          <>
            <span className="collection-sort--icon has-indicator"></span>
            <span className="collection-sort--title mr-8 hidden font-semibold uppercase sm:inline">
              Sort:
            </span>
          </>
        }
      />
    </div>
  )
}

export default CollectionSort
