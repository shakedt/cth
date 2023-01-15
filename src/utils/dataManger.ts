const dataManager = () => {
  const tableName = "messageHistory";
  function getLocalStorage() {
    let localStorage;
    if (typeof window !== "undefined") {
      localStorage = window.localStorage; // should we move to indexedDb?
    }

    return localStorage;
  }

  function setNewData(data: any) {
    const localStorage = getLocalStorage();

    if (localStorage) {
      let itemList: string | null | Array<{}> = localStorage.getItem(tableName);

      if (!!itemList) {
        itemList = JSON.parse(itemList) as Array<{}>;
        itemList.push(data.message);
      } else {
        itemList = [data.message];
      }

      if (itemList.length > 0) {
        localStorage.setItem(tableName, JSON.stringify(itemList));
      } else {
        return false;
      }
    }
  }

  function getAllData() {
    const localStorage = getLocalStorage();
    const data = localStorage?.getItem(tableName)
      ? JSON.parse(localStorage?.getItem(tableName) as string)
      : [];

    return data;
  }

  return {
    getLocalStorage,
    setNewData,
    getAllData,
  };
};

export default dataManager();
