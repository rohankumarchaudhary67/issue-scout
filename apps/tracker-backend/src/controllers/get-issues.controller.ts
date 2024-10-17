import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { Issue } from "../models/issues.model"; // Assuming Issue is the Mongoose model

const getAllIssues = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
        try {
            // Fetch all issues grouped by repository
            const allIssues = await Issue.aggregate([
                {
                    $group: {
                        _id: "$repository", // Group by repository
                        issues: { $push: "$$ROOT" } // Push issues into an array
                    }
                }
            ]);

            // Shuffle the repositories to randomize the selection order
            const shuffledRepos = allIssues.sort(() => Math.random() - 0.5);

            const issuesToReturn: any[] = [];
            const maxIssues = 1000; // Set the maximum number of issues to return

            // Create an array to track the index of the last selected issue for each repository
            const lastSelectedIndex = new Array(shuffledRepos.length).fill(0);

            while (issuesToReturn.length < maxIssues) {
                let allReposExhausted = true;

                for (let i = 0; i < shuffledRepos.length; i++) {
                    const repo = shuffledRepos[i];
                    const index = lastSelectedIndex[i];

                    // Check if we can select an issue from this repository
                    if (index < repo.issues.length) {
                        issuesToReturn.push(repo.issues[index]);
                        lastSelectedIndex[i]++; // Move to the next issue in this repository
                        allReposExhausted = false; // At least one repository has more issues
                    }
                }

                // If all repositories are exhausted, break out of the loop
                if (allReposExhausted) {
                    break;
                }
            }

            if (!issuesToReturn.length) {
                return res.status(404).json({ message: "No issues found" });
            }

            res.status(200).json({
                success: true,
                data: issuesToReturn,
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
