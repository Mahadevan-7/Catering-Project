router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});
