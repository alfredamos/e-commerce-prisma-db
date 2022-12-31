const { PrismaClient } = require("@prisma/client");
const { StatusCodes } = require("http-status-codes");

const prisma = new PrismaClient();

const createProduct = async (req, res) => {
  const { body: newProduct } = req;

  const product = await prisma.product.create({
    data: { ...newProduct },
  });

  res.status(StatusCodes.CREATED).json(product);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    throw new NotFoundError(`Product with id = ${id} is not found.`);
  }

  const deletedProduct = await prisma.product.delete({
    where: { id },
  });

  res.status(StatusCodes.OK).json(deletedProduct);
};
const editProduct = async (req, res) => {
  const { id } = req.params;
  const { body: productToUpdate } = req;

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    throw new NotFoundError(`Product with id = ${id} is not found.`);
  }

  const updatedProduct = await prisma.product.update({
    where: { id },
    data: { ...productToUpdate },
  });

  res.status(StatusCodes.OK).json(updatedProduct);
};

const getAllProducts = async (req, res) => {
  const products = await prisma.product.findMany({
    include: {
      productOrders: true,
    },
  });

  res.status(StatusCodes.OK).json(products);
};
const getProductById = async (req, res) => {
  const { id } = req.params;

  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      productOrders: true,
    },
  });

  if (!product) {
    throw new NotFoundError(`Product with id = ${id} is not found.`);
  }

  res.status(StatusCodes.OK).json(product);
};

module.exports = {
  createProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
  getProductById
};
