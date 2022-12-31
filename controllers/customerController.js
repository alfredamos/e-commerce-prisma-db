const { PrismaClient } = require("@prisma/client");
const { StatusCodes } = require("http-status-codes");

const prisma = new PrismaClient();

const createCustomer = async (req, res) => {
  const { body: newCustomer } = req;

  const customer = await prisma.customer.create({
    data: { ...newCustomer },
  });

  res.status(StatusCodes.CREATED).json(customer);
};

const deleteCustomer = async (req, res) => {
  const { id } = req.params;

  const customer = await prisma.customer.findUnique({
    where: { id },
  });

  if (!customer) {
    throw new NotFoundError(`Customer with id = ${id} is not found.`);
  }

  const deletedCustomer = await prisma.customer.delete({
    where: { id },
  });

  res.status(StatusCodes.OK).json(deletedCustomer);
};
const editCustomer = async (req, res) => {
  const { id } = req.params;
  const { body: customerToUpdate } = req;

  const customer = await prisma.customer.findUnique({
    where: { id },
  });

  if (!customer) {
    throw new NotFoundError(`Customer with id = ${id} is not found.`);
  }

  const updatedCustomer = await prisma.customer.update({
    where: { id },
    data: { ...customerToUpdate },
  });

  res.status(StatusCodes.OK).json(updatedCustomer);
};

const getAllCustomers = async (req, res) => {
  const customers = await prisma.customer.findMany({
    include: {
      customerOrders: true,
    },
  });

  res.status(StatusCodes.OK).json(customers);
};
const getCustomerById = async (req, res) => {
  const { id } = req.params;

  const customer = await prisma.customer.findUnique({
    where: { id },
    include: {
      customerOrders: true,
    },
  });

  if (!customer) {
    throw new NotFoundError(`Customer with id = ${id} is not found.`);
  }

  res.status(StatusCodes.OK).json(customer);
};

module.exports = {
  createCustomer,
  deleteCustomer,
  editCustomer,
  getAllCustomers,
  getCustomerById
};
