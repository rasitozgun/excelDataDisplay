import { create } from "zustand";

const useStore = create((set) => ({
  items: [],
  titles: [],
  filterItem: "",
  filteredItems: [], // items after filter
  currentPosts: [],
  currentItemPage: 1,
  totalPosts: 0,
  postItemPerPage: 30,
  lastPostIndex: 30,
  firstPostIndex: 0,
  setItems: (data) => {
    set((state) => ({
      items: data,
      filteredItems: state.filterItem ? filterItems(data, state.filterItem) : data,
      totalPosts: Math.ceil(data.length / state.postItemPerPage),
      currentItemPage: 1,
      currentPosts: data.slice(state.firstPostIndex, state.lastPostIndex),
    }));
  },
  setFilterItem: (filterValue) => {
    set((state) => ({
      filterItem: filterValue,
      filteredItems: filterValue ? filterItems(state.items, filterValue) : state.items,
      totalPosts: Math.ceil(state.filteredItems.length / state.postItemPerPage),
      currentItemPage: 1,
      currentPosts: state.filteredItems.slice(state.firstPostIndex, state.lastPostIndex),
    }));
  },
  handlePageClick: (data) => {
    set((state) => ({
      currentItemPage: data.selected + 1,
      currentPosts: state.filteredItems.slice(
        state.postItemPerPage * data.selected,
        state.postItemPerPage * (data.selected + 1)
      ),
    }));
  },
}));

function filterItems(items, filterItem) {
  return items.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(filterItem.toLowerCase())
    )
  );
}

export default useStore;
