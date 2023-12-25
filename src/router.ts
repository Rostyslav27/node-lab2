import { Router } from "./Router.class";

const router = new Router();

router.setHandler("GET", "/", (req, res) => {
  res.json({ message: "hi GET" });
});

router.setHandler("GET", "/test", (req, res) => {
  res.json({ message: "hi test" });
});

router.setHandler("POST", "/", (req, res) => {
  res.json({ message: "hi", params: req.data });
});

router.setHandler("OPTIONS", "/", (req, res) => {
  res.json({ message: "hi options" });
});

export { router };
