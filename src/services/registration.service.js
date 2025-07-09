const store = require('../data/registration.store');

exports.add = (data) => store.add(data);
exports.getAll = () => store.getAll();
