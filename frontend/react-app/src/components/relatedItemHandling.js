
export default class RelatedItemHandling {
  constructor({
    get,
    getAvailable,
    add,
    create,
    save,
    delete: deleteItem,
    unlink
  }) {
    if (typeof get !== "function") {
      throw new Error("RelatedItemHandling benötigt eine get-Funktion");
    }

    this.get = get;
    this.getAvailable = getAvailable;
    this.add = add;
    this.create = create;
    this.save = save;
    this.delete = deleteItem;
    this.unlink = unlink;
  }

  get canCreate() {
    return typeof this.create === "function";
  }

  get canLink() {
    return typeof this.getAvailable === "function"
      && typeof this.add === "function";
  }

  get canUnlink() {
    return typeof this.unlink === "function";
  }
}
