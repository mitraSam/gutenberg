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

    getRecentPreview(model){
        return model.find({},{contents:0,appendix:0}).sort('-date').limit(5)

    },
  getAll(model) {
    return model.find({})
  },



    findByParam(model, id) {
    return model.findOne({title:id}).exec()
    }
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
}

export const deleteOne = (model) => (req, res, next) => controllers.deleteOne(req.docFromId)
    .then(doc => res.status(201).json(doc))
    .catch(error => next(error))

export const getOne = (model) => (req, res, next) => controllers.getOne(req.docFromId)
    .then(doc => res.status(200).json(doc))
    .catch(error => next(error))

export const getAll = (model) => (req, res, next) => controllers.getAll(model)
    .then(docs => res.json(docs))
    .catch(error => next(error))

export const getRecentPreview = (model) => (req, res, next) => controllers.getRecentPreview(model)
    .then(docs => res.json(docs))
    .catch(error => next(error))

export const findByParam = (model) => (req, res, next, id) =>{
  return controllers.findByParam(model,id).then(doc=>{
    if(!doc){
      next(new Error('Find by param not Found'))
    }
    else{
      req.docFromId = doc
        next()
    }
  }).catch(error=>{
    next(error)
  })
}


export const generateControllers = (model, overrides = {}) => {
  const defaults = {
    findByParam: findByParam(model),
    getAll: getAll(model),
    getOne: getOne(model),
      getRecentPreview:getRecentPreview(model),
    deleteOne: deleteOne(model),
    updateOne: updateOne(model),
    createOne: createOne(model)
  }

  return {...defaults, ...overrides}
}