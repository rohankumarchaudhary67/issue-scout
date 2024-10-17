import mongoose, { Model, Schema, Document } from "mongoose";

interface Issues extends Document {
    githubId: number;                // GitHub issue ID
    issueNumber: number;             // GitHub issue number
    issueURL: string;                // URL to the GitHub issue
    title: string;                   // Issue title
    state: string;                   // Issue state (open/closed)
    labels: string[];                // List of labels (array of strings)
    comments: number;                // Number of comments on the issue
    createdAt: Date;                 // Creation date from GitHub
    updatedAt: Date;                 // Last updated date from GitHub
    repository: string;              // Repository name or reference
}

interface IssueModel extends Model<Issues> { }

const issueSchema = new Schema<Issues, IssueModel>(
    {
        githubId: {
            type: Number,
            required: true,
            unique: true,
        },
        issueNumber: {
            type: Number,
            required: true,
        },
        issueURL: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        labels: {
            type: [String],  // Array of label names
            required: true,
        },
        comments: {
            type: Number,
            required: true,
        },
        createdAt: {
            type: Date,
            required: true,
        },
        updatedAt: {
            type: Date,
            required: true,
        },
        repository: {
            type: String,
            required: true,
        },
    }
);

const Issue = mongoose.model<Issues, IssueModel>("Issue", issueSchema);

export { Issue, Issues };
