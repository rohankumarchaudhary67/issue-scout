import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { Issue } from "../models/issues.model"; // Assuming Issue is the Mongoose model

const getAllIssues = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
        try {
            // Use aggregate with $sample to return issues in random order
            const issues = await Issue.aggregate([{ $sample: { size: 1000 } }]); // Limit to 100 or any desired number

            if (!issues.length) {
                return res.status(404).json({ message: "No issues found" });
            }

            res.status(200).json({
                success: true,
                data: issues,
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: "Error fetching issues",
                error: error.message,
            });
        }
    }
);

export { getAllIssues };
