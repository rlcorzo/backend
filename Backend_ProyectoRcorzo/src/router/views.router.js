import { Router } from "express";

const router = Router();

router.get("/router", (req, res) =>{
    res.render("Products");
});

export default router;