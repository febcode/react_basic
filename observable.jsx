import { makeObservable, observable, action } from "mobx";

class Store {
  data = [
    { id: 1, value: "10" },
    { id: 2, value: "20" },
    { id: 3, value: "30" },
  ];

  constructor() {
    makeObservable(this, {
      data: observable,  // 👈 Explicitly marking `data` as observable
      updateAllRecords: action, // 👈 Marking function as an action
    });
  }

  updateAllRecords() {
    this.data.forEach((item) => {
      item.value = parseInt(item.value, 10);
    });
  }
}

const store = new Store();
export default store;
