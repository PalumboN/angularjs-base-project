class AdminCtrl {
  constructor($scope, $uibModal, Api) {
    this.api = Api
    this.uibModal = $uibModal
    this.catalog = []
    this._getCatalog()
    this.products = []
    this._getProducts()
    this.comments = []
    this._getComments()
    this.apiKey = "AWwwtQVGxSaakxdOwcENrz"
    this.scope = $scope
    $scope.lang = "es"
  }

  newSection() {
    var section = {
      name: { es: "Nueva Sección" },
      changed: true,
      items: []
    }
    this.catalog.push(section)
  }

  newItem(section) {
    section.items.push({name: { es: "Nuevo producto" } })
    section.changed = true
  }

  newImg(section, item) {
    item.loadingImg = true
    filestack
    .init(this.apiKey)
    .upload(item.file)
    .tap(({url}) => item.img = url)
    .tap(() => section.changed = true)
    .catch((err) => console.log({err}))
    .finally(() => {
      item.loadingImg = false
      this.scope.$apply()
    })
  }

  catalogMoved(index) {
    this._moved(this.catalog, index)
  }

  catalogChanged() {
    return this._changed(this.catalog)
  }

  updateCatalog() {
    this._updateChanged(this.catalog, (section) => this.save(section))
  }

  remove(section, item) {
    _.pull(section.items, item)
    section.changed = true
  }

  save(section) {
    this.api
    .save("catalog", section)
    .then(({data}) => _.assign(section, data))
    .then(() => section.changed = false)
  }

  delete(section) {
    this._delete("catalog", section, `${section.name.es} (${section.items.length} productos)`)
    .then(() => this._getCatalog())
  }

  _getCatalog() {
    this.api
    .catalog()
    .then((catalog) => this.catalog = catalog)
  }



  toggle(entity) {
      entity.active = !entity.active
      entity.changed = true
  }

  syncProducts() {
    this.syncing = true
    this.api
    ._post("products/sync")
    .then(() => this._getProducts())
    .finally(() => this.syncing = false)
  }

  productDrop(index) {
    this.products[index] = new Product(this.products[index])
  }

  productsMoved(index) {
    this._moved(this.products, index)
  }

  productsChanged() {
    return this._changed(this.products)
  }

  updateProducts() {
    this._updateChanged(this.products, (product) => this.update(product))
  }

  update(product) {
    product.updating = true
    this.api
    .save("products", product)
    .then(() => product.changed = false)
    .finally(() => product.updating = false)
  }

  _getProducts() {
    this.api
    .products()
    .then((products) => this.products = products)
  }


  newComment() {
    var comment = {
      user: "Usuario",
      points: 0,
      active: true,
      changed: true
    }
    this.comments.push(comment)
  }

  saveComment(comment) {
    this.api
    .save("clients/comments", comment)
    .then(() => comment.changed = false)
  }

  deleteComment(comment) {
    this._delete("clients/comments", comment, `${comment.user} - "${comment.text.es}"`)
    .then(() => this._getComments())
  }

  _getComments() {
    this.api
    .clientsComments()
    .then((comments) => this.comments = comments)
  }


  _delete(path, entity, description) {
    var modal = this.uibModal.open({
      templateUrl: 'app/partials/modals/confirm.html',
      controller: 'ConfirmCtrl',
      controllerAs: 'ctrl',
      resolve: {
        item: () => description
      }
    })

    return modal.result
    .then(() => this.api.delete(path, entity))
  }


  _changed(list) {
    return _.some(list, "changed")
  }

  _updateChanged(list, update) {
    _
    .filter(list, "changed")
    .forEach(update)
  }


  _moved(list, index) {
    list.splice(index, 1)
    this._updateOrder(list)
  }

  _updateOrder(entities) {
    entities.forEach((entity, index) => {
      //TODO: Usar el método de Product
      if (entity.order == index) return
      entity.order = index
      entity.changed = true
    })
  }
}
app.controller("AdminCtrl", AdminCtrl)
