const { PrismaClient } = require("@prisma/client");
const { StatusCodes } = require("http-status-codes");
const NotFoundError = require("../errors/notFoundError");

const prisma = new PrismaClient();

const createOrder = async (req, res) => {
  const { body: newOrder } = req;

  const order = await prisma.order.create({
    data: { ...newOrder },
  });

  res.status(StatusCodes.CREATED).json(order);
};

const deleteOrder = async (req, res) => {
  const { id } = req.params;

  const order = await prisma.order.findUnique({
    where: { id },
  });

  if (!order) {
    throw new NotFoundError(`Order with id = ${id} is not found.`);
  }

  const deletedOrder = await prisma.order.delete({
    where: { id },
  });

  res.status(StatusCodes.OK).json(deletedOrder);
};
const editOrder = async (req, res) => {
  const { id } = req.params;
  const { body: orderToUpdate } = req;

  const order = await prisma.order.findUnique({
    where: { id },
  });

  if (!order) {
    throw new NotFoundError(`Order with id = ${id} is not found.`);
  }

  const updatedOrder = await prisma.order.update({
    where: { id },
    data: { ...orderToUpdate },
  });

  res.status(StatusCodes.OK).json(updatedOrder);
};

const getAllOrders = async (req, res) => {
  const orders = await prisma.order.findMany({
    include: {
      customer: true,
      product: true,
    },
  });

  res.status(StatusCodes.OK).json(orders);
};
const getOrderById = async (req, res) => {
  const { id } = req.params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      customer: true,
      product: true,
    },
  });

  if (!order) {
    throw new NotFoundError(`Order with id = ${id} is not found.`);
  }

  res.status(StatusCodes.OK).json(order);
};

module.exports = {
  createOrder,
  deleteOrder,
  editOrder,
  getAllOrders,
  getOrderById,
};
