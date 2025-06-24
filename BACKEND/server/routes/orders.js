router.post('/', async (req, res) => {
  const { email, cart, total } = req.body;
  const order = new Order({ email, items: cart, total });
  await order.save();
  res.status(201).json({ message: 'Order placed' });
});
