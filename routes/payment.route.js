const express = require("express");
const router = express.Router();
const Stripe = require("stripe")(
  "sk_test_51OKSbgKsooFxVAXeL7qt1YfszeWTPIloeAqeYyv38af9H82lHtpvDGqGdT6JS4FlOF3oU8hXRsl4z3OB1jpIdABh00jDvluAU8"
);
router.post("/", async (req, res) => {
  console.log(req.body);
  let status, error;
  const { token, amount } = req.body;
  try {
    await Stripe.charges.create({
      source: token.id,
      amount,
      currency: "usd",
    });
    status = "success";
  } catch (error) {
    console.log(error);
    status = "Failure";
  }
  res.json({ error, status });
});
module.exports = router;
