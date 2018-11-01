!function(e){function r(t){if(n[t])return n[t].exports;var s=n[t]={i:t,l:!1,exports:{}};return e[t].call(s.exports,s,s.exports,r),s.l=!0,s.exports}var n={};r.m=e,r.c=n,r.d=function(e,n,t){r.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:t})},r.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(n,"a",n),n},r.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},r.p="",r(r.s="./src/index.js")}({"./src/api/index.js":function(e,r,n){"use strict";var t=n("./src/api/restRouter.js");n.d(r,"a",function(){return t.a})},"./src/api/modules/auth.js":function(e,r,n){"use strict";n.d(r,"b",function(){return i}),n.d(r,"c",function(){return d}),n.d(r,"a",function(){return p});var t=n("jsonwebtoken"),s=n.n(t),o=n("express-jwt"),u=n.n(o),a=n("./src/api/resources/user/user.model.js"),c=u()({secret:"blueRhinoJumps"}),i=function(e,r,n){var t=f(e.docFromId.id,e.docFromId.username);r.json(t)},d=function(){return function(e,r,n){var t=e.body.username,s=e.body.password;if(!t||!s)return void r.status(400).send("Please provide password & username");a.a.findOne({username:t}).then(function(t){t?t.authenticate(s)?(e.docFromId=t,n()):(r.statusMessage="Invalid password",r.status(400).end()):(r.statusMessage="Invalid username",r.status(400).end())}).catch(function(e){return n(e)})}},f=function(e,r){return s.a.sign({id:e,username:r},"blueRhinoJumps",{expiresIn:"30d"})},p=[function(){return function(e,r,n){e.query&&e.query.hasOwnProperty("access_token")&&(e.headers.authorization="Bearer "+e.query.access_token),c(e,r,n)}}(),function(){return function(e,r,n){var t="";return e.headers.getuserbooks&&(t="readBooks"),a.a.findById(e.user.id,{passwordHash:0}).populate(t,"author title credits original description chapters").then(function(t){t?(e.docFromId=t,n()):r.status(401).send("Unauthorized")}).catch(function(e){return n(e)})}}()]},"./src/api/modules/errorHandler.js":function(e,r,n){"use strict";n.d(r,"a",function(){return t});var t=function(e,r,n,t){console.error(e,"here"),n.status(e.status).send(e.message)}},"./src/api/modules/query.js":function(e,r,n){"use strict";n.d(r,"a",function(){return O});var t=n("babel-runtime/helpers/extends"),s=n.n(t),o=n("babel-runtime/regenerator"),u=n.n(o),a=n("babel-runtime/helpers/asyncToGenerator"),c=n.n(a),i=n("babel-runtime/core-js/promise"),d=n.n(i),f=n("lodash.merge"),p=n.n(f),l=this,h={createOne:function(e,r){return e.create(r)},updateOne:function(e,r){return p()(e,r),e.save()},deleteOne:function(e){return e.remove()},getOne:function(e){return d.a.resolve(e)},getSearchResult:function(e){return d.a.resolve(e)},getRecentPreview:function(e){return e.find({},{contents:0}).sort("-date").limit(5)},getAll:function(e){return e.find({})},findBySearch:function(e,r){var n=new RegExp(r,"i");return e.find({},"-contents",{lean:!0}).or([{author:{$regex:n}},{title:{$regex:n}}])},findByParam:function(e,r,n){return n?e.findOne({title:r}).exec():e.findOne({title:r},{contents:0}).exec()}},m=function(e){return function(r,n,t){return h.createOne(e,r.body).then(function(e){return n.status(201).json(e)}).catch(function(e){return t(e)})}},b=function(e){return function(){var e=c()(u.a.mark(function e(r,n,t){var s,o;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return s=r.docFromId,o=r.body,e.abrupt("return",h.updateOne(s,o).then(function(e){return n.status(201).json(e)}).catch(function(e){return t(e)}));case 3:case"end":return e.stop()}},e,l)}));return function(r,n,t){return e.apply(this,arguments)}}()},j=function(e){return function(e,r,n){return h.deleteOne(e.docFromId).then(function(e){return r.status(201).json(e)}).catch(function(e){return n(e)})}},g=function(e){return function(e,r,n){return h.getOne(e.docFromId).then(function(e){return r.status(200).json(e)}).catch(function(e){return n(e)})}},v=function(e){return function(e,r,n){return h.getSearchResult(e.docsFromSearch).then(function(e){return r.status(200).json(e)}).catch(function(e){return n(e)})}},y=function(e){return function(r,n,t){return h.getAll(e).then(function(e){return n.json(e)}).catch(function(e){return t(e)})}},x=function(e){return function(r,n,t){return h.getRecentPreview(e).then(function(e){return n.json(e)}).catch(function(e){return t(e)})}},k=function(e){return function(r,n,t,s){var o=r.query.contents;return h.findByParam(e,s,o).then(function(e){e?(r.docFromId=e,t()):t(new Error("Find by param not Found"))}).catch(function(e){t(e)})}},w=function(e){return function(r,n,t,s){return h.findBySearch(e,s).then(function(e){e.length?(r.docsFromSearch=e,t()):n.json({message:"found nothing..."})}).catch(function(e){t(e)})}},O=function(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n={findByParam:k(e),getAll:y(e),getOne:g(),getRecentPreview:x(e),deleteOne:j(),updateOne:b(),createOne:m(e),findBySearch:w(e),getSearchResult:v()};return s()({},n,r)}},"./src/api/resources/books/books.controller.js":function(e,r,n){"use strict";var t=n("./src/api/modules/query.js"),s=n("./src/api/resources/books/books.model.js"),o=Object(t.a)(s.a);r.a=o},"./src/api/resources/books/books.model.js":function(e,r,n){"use strict";n.d(r,"a",function(){return u});var t=n("mongoose"),s=n.n(t),o=new s.a.Schema({title:{type:String,required:[!0,"Book must have a title"],unique:!0},author:{type:String,required:[!0,"Book must have an author"]},credits:{},license:String,original:String,pages:{type:Number,required:[!0,"Book must have a pages number"]},chapters:[],parts:{},footnotes:[],appendix:String,contents:[]}),u=s.a.model("books",o)},"./src/api/resources/books/books.restRouter.js":function(e,r,n){"use strict";n.d(r,"a",function(){return u});var t=n("express"),s=n.n(t),o=n("./src/api/resources/books/books.controller.js"),u=s.a.Router();u.param("id",o.a.findByParam),u.param("searchTerm",o.a.findBySearch),u.route("/books").get(o.a.getRecentPreview).post(o.a.createOne),u.route("/search/:searchTerm").get(o.a.getSearchResult),u.route("/book/:id").get(o.a.getOne).put(o.a.updateOne).delete(o.a.deleteOne)},"./src/api/resources/books/index.js":function(e,r,n){"use strict";var t=n("./src/api/resources/books/books.restRouter.js");n.d(r,"a",function(){return t.a})},"./src/api/resources/user/index.js":function(e,r,n){"use strict";var t=n("./src/api/resources/user/user.restRouter.js");n.d(r,"a",function(){return t.a})},"./src/api/resources/user/user.controller.js":function(e,r,n){"use strict";var t=n("./src/api/modules/query.js"),s=n("./src/api/resources/user/user.model.js"),o=Object(t.a)(s.a);o.createUser=function(e,r,n){s.a.create(e.body).then(function(r){e.docFromId=r,n()}).catch(function(e){11e3===e.code||11001===e.code?r.status(500).send("username already taken"):n(e)})},o.getUser=function(e,r,n){if(!e.headers.getuserbooks)return r.status(200).json(e.docFromId);s.a.findOne(e.docFromId).populate("readBooks","author title credits original description chapters").then(function(e){return r.status(200).json(e)})},o.addBook=function(e,r,n){s.a.update(e.docFromId,{$addToSet:{readBooks:e.headers.id}}).then(function(){r.status(200).end()}).catch(function(e){return n(e)})},r.a=o},"./src/api/resources/user/user.model.js":function(e,r,n){"use strict";n.d(r,"a",function(){return c});var t=n("mongoose"),s=n.n(t),o=n("bcrypt"),u=n.n(o),a=new s.a.Schema({username:{type:String,unique:!0,required:!0},passwordHash:{required:!0,type:String},readBooks:[{type:s.a.Schema.Types.ObjectId,ref:"books"}]},{timestamps:!0});a.methods={authenticate:function(e){return u.a.compareSync(e,this.passwordHash)},hashPassword:function(e){if(!e)throw new Error("Could not save user");var r=u.a.genSaltSync(10);return u.a.hashSync(e,r)}},a.pre("save",function(e){var r=this,n=this.hashPassword(r.passwordHash);r.passwordHash=n,e()});var c=s.a.model("user",a)},"./src/api/resources/user/user.restRouter.js":function(e,r,n){"use strict";n.d(r,"a",function(){return a});var t=n("express"),s=n.n(t),o=n("./src/api/resources/user/user.controller.js"),u=n("./src/api/modules/auth.js"),a=s.a.Router();a.route("/").post(o.a.createUser,u.b),a.use(u.a),a.route("/id").get(o.a.getUser).put(o.a.addBook).delete(o.a.createOne)},"./src/api/restRouter.js":function(e,r,n){"use strict";n.d(r,"a",function(){return c});var t=n("express"),s=n.n(t),o=n("./src/api/resources/user/index.js"),u=n("./src/api/resources/books/index.js"),a=n("./src/api/modules/errorHandler.js"),c=(n("./src/api/modules/auth.js"),s.a.Router());c.use("/user",o.a),c.use("/",u.a),c.use(a.a)},"./src/db.js":function(e,r,n){"use strict";n.d(r,"a",function(){return o});var t=n("mongoose"),s=n.n(t);s.a.Promise=global.Promise;var o=function(){return s.a.connect("mongodb://samo:admin12@ds159782.mlab.com:59782/dbforme",{useMongoClient:!0})}},"./src/index.js":function(e,r,n){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var t=n("http"),s=n.n(t),o=n("./src/server.js"),u=s.a.createServer(o.a);o.a;u.listen(3e3,function(){console.log("Server listening on port 3000")})},"./src/middleware.js":function(e,r,n){"use strict";var t=n("body-parser"),s=n.n(t),o=n("cors"),u=n.n(o),a=function(e){e.use(s.a.urlencoded({extended:!0})),e.use(s.a.json()),e.use(u()())};r.a=a},"./src/server.js":function(e,r,n){"use strict";var t=n("express"),s=n.n(t),o=n("./src/middleware.js"),u=n("./src/api/index.js"),a=n("./src/db.js"),c=n("./src/api/modules/auth.js"),i=s()();Object(o.a)(i),Object(a.a)(),i.use("/api/signin",Object(c.c)(),c.b),i.use("/api",u.a),i.all("*",function(e,r){r.json({ok:!0})}),r.a=i},"babel-runtime/core-js/promise":function(e,r){e.exports=require("babel-runtime/core-js/promise")},"babel-runtime/helpers/asyncToGenerator":function(e,r){e.exports=require("babel-runtime/helpers/asyncToGenerator")},"babel-runtime/helpers/extends":function(e,r){e.exports=require("babel-runtime/helpers/extends")},"babel-runtime/regenerator":function(e,r){e.exports=require("babel-runtime/regenerator")},bcrypt:function(e,r){e.exports=require("bcrypt")},"body-parser":function(e,r){e.exports=require("body-parser")},cors:function(e,r){e.exports=require("cors")},express:function(e,r){e.exports=require("express")},"express-jwt":function(e,r){e.exports=require("express-jwt")},http:function(e,r){e.exports=require("http")},jsonwebtoken:function(e,r){e.exports=require("jsonwebtoken")},"lodash.merge":function(e,r){e.exports=require("lodash.merge")},mongoose:function(e,r){e.exports=require("mongoose")}});