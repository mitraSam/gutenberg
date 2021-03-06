import merge from 'lodash.merge'

export const controllers = {
  createOne(model, body) {
    return model.create(body)
  },

  updateOne(docToUpdate, update) {
    merge(docToUpdate, update)
    return docToUpdate.save()
  },

  deleteOne(docToDelete) {
    return docToDelete.remove()
  },

  getOne(docToGet) {
    return Promise.resolve(docToGet)
  },

    getSearchResult(docs){
    return Promise.resolve(docs)
    },

  getAll(model) {
    return model.find({})
  },

}

export const createOne = (model) => (req, res, next) => controllers.createOne(model, req.body)
    .then(doc => res.status(201).json(doc))
    .catch(error => next(error))

export const updateOne = (model) => async (req, res, next) => {
  const docToUpdate = req.docFromId
  const update = req.body

  return controllers.updateOne(docToUpdate, update)
    .then(doc => res.status(201).json(doc))
    .catch(error => next(error))
};

export const search = (model) => (model) => (req, res, next,id) => controllers.getAll(model)
        .then(docs => res.json(docs))
        .catch(error => next(error))


export const deleteOne = (model) => (req, res, next) => controllers.deleteOne(req.docFromId)
    .then(doc => res.status(201).json(doc))
    .catch(error => next(error))

export const getOne = (model) => (req, res, next) => controllers.getOne(req.docFromId)
    .then(doc => res.status(200).json(doc))
    .catch(error => next(error))

export const getSearchResult = (model)=>(req,res,next)=>controllers.getSearchResult(req.docsFromSearch)
    .then(docs=>res.status(200).json(docs))
    .catch(error=>next(error))

export const getAll = (model) => (req, res, next) => controllers.getAll(model)
    .then(docs => res.json(docs))
    .catch(error => next(error))

export const generateControllers = (model, overrides = {}) => {
  const defaults = {
    getAll: getAll(model),
    getOne: getOne(model),
      deleteOne: deleteOne(model),
    updateOne: updateOne(model),
    createOne: createOne(model),
      getSearchResult:getSearchResult(model),
  }

  return {...defaults, ...overrides}
}
