import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

export default function IssueCardUI() {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">
                        <span className="text-muted-foreground pr-2">Orgainzation:</span>
                        Dingo
                    </CardTitle>
                    <CardTitle className="">
                        <span className="text-muted-foreground font-semibold">Issue:</span> Refactor mmcs algorithm
                    </CardTitle>
                    <CardDescription>
                        Issue Number: 96
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                    <p><span className="text-muted-foreground font-semibold pr-2">State:</span>Open</p>
                    <p><span className="text-muted-foreground font-semibold pr-2">Assignee:</span>No Assignee</p>
                    <p><span className="text-muted-foreground font-semibold pr-2">Comments:</span>4</p>
                </CardContent>
                <CardFooter>
                    <Button className="w-full font-bold">
                        View Details
                    </Button>
                </CardFooter>
            </Card>
        </>
    )
}