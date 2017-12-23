import _ from 'lodash'

/**
 * Generate new url by path and params.
 *
 * @private
 * @param {array} [path]
 * @param {object} [params]
 * @return {string} url.
 */
function buildUrl (path, params) {
  let url = path.join('/')

  if (_.keys(params).length > 0) {
    const queryParams = []
    _.each(params, function (val, key) {
      if (!_.isArray(val)) {
        val = [val]
      }
      // Query param values that are lists (e.g. tag: [1, 2, 3]) should be sent as tag=1&tag=2&tag=3 to match the API.
      _.each(val, function (valItem) {
        queryParams.push(encodeURIComponent(key) + '=' + encodeURIComponent(valItem))
      })
    })

    url += '?' + queryParams.join('&')
  }

  return url
}

/**
 * @public
 */
class RequestBuilder {
  constructor () {
    this.DOMAIN = ''
    this.CREDENTIALS = 'include'
    this._headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    this._path = []
    this._params = {}
    this._formData = []
  }
  createResult (result) {
    return result
      ? result.json()
      : {
        code: -2,
        message: '未知错误'
      }
  }

  /**
   * Add header to request.
   * @param {String} name
   * @param {String|Number|Boolean} val
   * @return {RequestBuilder}
   */
  header (name, val) {
    this._headers[name] = val
    return this
  }

  /**
   * Set the content type of the body.
   * @param contentType
   * @returns {RequestBuilder}
   */
  contentType (contentType) {
    this._headers['Content-Type'] = contentType
    return this
  }
  /**
   * Convenience method for sending data as plain text.
   * @returns {RequestBuilder}
   */
  withText () {
    return this.contentType('text/plain')
  }
  /**
   * Convenience method for sending data as json.
   * @returns {RequestBuilder}
   */
  withJson () {
    return this.contentType('application/json')
  }

  /**
   * Set the Accept header.
   * @param {String} acceptType
   * @returns {RequestBuilder}
   */
  accepts (acceptType) {
    this._headers.Accept = acceptType
    return this
  }
  /**
   * Convenience method for getting plain text response
   * @returns {RequestBuilder}
   */
  asText () {
    return this.accepts('text/plain')
  }

  /**
   * Convenience method for getting XML response
   * @returns {RequestBuilder}
   */
  asXML () {
    return this.accepts('text/xml')
  }

  /**
   * Append formData params. Cancel body params for browser calls.
   * @return {RequestBuilder}
   */
  append () {
    if (arguments.length) {
      this._formData.push(arguments)
    }
    return this
  }

  /**
   * Add path segment to request url. Do not include the slash.
   * @param {String|Int} path
   * @return {RequestBuilder}
   */
  path (path) {
    if (_.isNumber(path) || _.isBoolean(path)) {
      path = path.toString()
    }
    if (!path) {
      path = ''
    }
    this._path.push(path.includes('/') ? encodeURI(path) : encodeURIComponent(path))
    return this
  }

  /**
   * Add non-encoded path segment to request url
   * @param {String|Int} path
   * @return {RequestBuilder}
   */
  pathRaw (path) {
    if (path) {
      this._path.push(path)
    }
    return this
  }

  /**
   * Add query parameter to request url.
   * @param key {String}
   * @param value {String|Number|Boolean}
   * @return {RequestBuilder}
   */
  query (key, value) {
    if (value !== null && value !== undefined) {
      this._params[key] = value
    }
    return this
  }

  /**
   * Alias for path().
   * @return {RequestBuilder}
   */
  p () {
    return this.path.apply(this, arguments)
  }

  /**
   * Alias for query().
   * @return {RequestBuilder}
   */
  q () {
    return this.query.apply(this, arguments)
  }

  /**
   * Send HEAD request.
   * @return {Promise}
   */
  head () {
    return this.send('HEAD', null)
  }

  /**
   * Send GET request.
   * @return {Promise}
   */
  get () {
    return this.send('GET', null)
  }

  /**
   * Send POST request.
   * @param {any} body
   * @return {Promise}
   */
  post (body) {
    return this.send('POST', body)
  }

  /**
   * Send PUT request.
   * @param any body
   * @return {Promise}
   */
  put (body) {
    return this.send('PUT', body)
  }

  /**
   * Send DELETE request.
   * @return {Promise}
   */
  delete () {
    return this.send('DELETE', null)
  }

  /**
   * Alias for delete.
   * @return {Promise}
   */
  del () {
    return this.delete.apply(this, arguments)
  }

  /**
   * Send PATCH request.
   * @param {any} body
   * @return {Promise}
   */
  patch (body) {
    return this.send('PATCH', body)
  }

  async send (method, body) {
    const url = `${this.DOMAIN}/${buildUrl(this._path, this._params)}`
    let result
    if (
      this._headers['Content-Encoding'] !== 'gzip' &&
      body &&
      this._headers['Content-Type'] === 'application/json'
    ) {
      body = JSON.stringify(body)
    }
    try {
      result = await fetch(url, {
        method,
        body,
        headers: this._headers,
        credentials: this.CREDENTIALS
      })
    } catch (e) {
      console.error(e)
    }
    return this.createResult(result)
  }
}

export default RequestBuilder
