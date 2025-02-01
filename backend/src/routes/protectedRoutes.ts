const express = require("express");
const { authenticateUser, authorizeRoles } = require("../middlewares/authMiddleware");
import { Request, Response } from "express";
const router = express.Router();

// Admin-only route
interface AuthenticatedRequest extends Request {
    user?: {
        role: string;
    };
}

router.get("/admin", authenticateUser, authorizeRoles("admin"), (req: AuthenticatedRequest, res: Response) => {
    res.json({ message: "Welcome, Admin!" });
});

// Beauty master-only route
interface AuthenticatedRequest extends Request {
    user?: {
        role: string;
    };
}

interface AuthenticatedResponse extends Response { }

router.get("/beauty_master", authenticateUser, authorizeRoles("beauty_master"), (req: AuthenticatedRequest, res: AuthenticatedResponse) => {
    res.json({ message: "Welcome, Beauty Master!" });
});

// Customer-only route
interface AuthenticatedRequest extends Request {
    user?: {
        role: string;
    };
}

interface AuthenticatedResponse extends Response { }

router.get("/customer", authenticateUser, authorizeRoles("customer"), (req: AuthenticatedRequest, res: AuthenticatedResponse) => {
    res.json({ message: "Welcome, Customer!" });
});

module.exports = router;
