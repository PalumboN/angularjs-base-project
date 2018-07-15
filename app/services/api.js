class Api {
  constructor($http) {
    this.http = $http
  }

  products() { return this._get("products").then((products) => products.map((it) => new Product(it))) }
  catalog() { return this._get("catalog") }
  section(id) { return this._get("catalog/" + id) }
  clientsComments() { return this._get("clients/comments") }
  sendMessage(message) { return this._post("message/send", message) }

  _get(resource) {
    return this.http
    .get(this._makeUrl(resource))
    .then(this._data)
    .then(this._data)
  }

  _post(resource, data) {
    return this.http
    .post(this._makeUrl(resource), data)
    .then(this._data)
  }

  _put(resource, data) {
    return this.http
    .put(this._makeUrl(`${resource}/${data._id}`), data)
    .then(this._data)
  }

  _delete(resource, {_id}) {
    return this.http
    .delete(this._makeUrl(`${resource}/${_id}`))
    .then(this._data)
  }

  _data(response) {
    return response.data
  }

  _makeUrl(resource) {
    return "api/" + resource
  }

  //Admin
  save(resource, json) {
    if (json._id) {
      return this._put(resource, json)
    } else {
      return this._post(resource, json)
    }
  }

  delete(resource, json) {
    if (!json._id) {
      return Promise.resolve()
    }
    return this._delete(resource, json)
  }
}
app.service("Api", Api)
