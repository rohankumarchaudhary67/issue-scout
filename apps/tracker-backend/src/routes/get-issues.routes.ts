import { Router } from "express";
import { getAllIssues } from "../controllers/get-issues.controller";

const IssuesRouter = Router();

IssuesRouter.route("/").get(getAllIssues);

export default IssuesRouter;