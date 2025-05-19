const Visitor = require("../schemas/Visitor");
const { sendErrorresponse } = require("../helpers/send_error_response");
const { visitorValidation } = require("../validation/visitor.validation");

const add = async (req, res) => {
  try {
    const { error, value } = visitorValidation(req.body);

    if (error) {
      return sendErrorresponse(error, res);
    }
    const { ip, os, device, browser } = req.body;
    const newVisitor = await Visitor.create({ ip, os, device, browser });
    res.status(201).send({ message: "New visitor added", newVisitor });
  } catch (error) {
    sendErrorresponse(error, res);
  }
};

const findAll = async (req, res) => {
  try {
    const data = await Visitor.find();
    res.status(200).send({ data: data });
  } catch (error) {
    sendErrorresponse(error, res);
  }
};

const findById = async (req, res) => {
  const { id } = req.params;
  try {
    const visitor = await Visitor.findById(id);
    res.status(200).send({ data: visitor });
  } catch (error) {
    sendErrorresponse(error, res);
  }
};

const update = async (req, res) => {
  try {
    const { error, value } = visitorValidation(req.body);

    if (error) {
      return sendErrorresponse(error, res);
    }
    const updatedVisitor = await Visitor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    res.status(200).send({ message: "Value updated", data: updatedVisitor });
  } catch (error) {
    sendErrorresponse(error, res);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    await Visitor.findByIdAndDelete(id);
    res.status(200).send({ message: "Visitor deleted successfully" });
  } catch (error) {
    sendErrorresponse(error, res);
  }
};


module.exports = {
  add,
  findAll,
  findById,
  update,
  remove,
};
