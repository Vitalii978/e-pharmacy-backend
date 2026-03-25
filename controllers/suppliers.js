const { Supplier } = require('../models/supplier');
const { HttpError, ctrlWrapper } = require('../utilits');

const getAllSuppliers = async (req, res) => {
  const { query } = req.query;

  let suppliers;

  if (query) {
    suppliers = await Supplier.find({
      name: { $regex: query, $options: 'i' },
    });
  } else {
    suppliers = await Supplier.find();
  }

  res.json(suppliers);
};

const addSupplier = async (req, res) => {
  const { name } = req.body;

  const existingSupplier = await Supplier.findOne({ name });

  if (existingSupplier) {
    throw HttpError(400, 'Supplier with this name already exists');
  }

  const supplier = await Supplier.create(req.body);

  res.status(201).json(supplier);
};

const editSupplier = async (req, res) => {
  const { _id } = req.params;
  const { name } = req.body;

  const supplier = await Supplier.findById(_id);

  if (!supplier) {
    throw HttpError(404, 'Supplier not found');
  }

  if (name) {
    const existingSupplier = await Supplier.findOne({ name });

    if (existingSupplier && existingSupplier._id.toString() !== _id) {
      throw HttpError(400, 'Supplier with this name already exists');
    }
  }

  const updatedSupplier = await Supplier.findByIdAndUpdate(_id, req.body, {
    new: true,
  });

  res.json(updatedSupplier);
};

module.exports = {
  getAllSuppliers: ctrlWrapper(getAllSuppliers),
  addSupplier: ctrlWrapper(addSupplier),
  editSupplier: ctrlWrapper(editSupplier),
};
