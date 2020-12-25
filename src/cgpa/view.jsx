import {
    Card, CardBody, CardHeader, CardFooter, ButtonGroup, Table, Badge,
} from 'reactstrap';

const View = ({ subjects }) => {
    let totalPoints = 0
    let totalCredits = 0
    return <>
        {subjects.map(sub => {
            totalPoints = parseFloat(totalPoints) + parseFloat(sub.cg_po)
            totalCredits = parseFloat(totalCredits) + parseFloat(sub.credits)

            return <Card className="my-2 rounded-0">
                <CardHeader>

                    <h3>{sub.name}</h3>
                </CardHeader>
                <CardBody>

                    <Table bordered>
                        <thead>
                            <tr>
                                <th>Serial</th>
                                <th>Course Name</th>
                                <th>Course Grade</th>
                                <th>Course Credit</th>
                                <th>Point</th>
                            </tr>
                        </thead>

                        <tbody>
                            {sub.subject.map((sub, i) => {
                                return <tr>
                                    <th>{i + 1}</th>
                                    <th>{sub.name}</th>
                                    <th>{sub.grade}</th>
                                    <th>{sub.credit}</th>
                                    <th>
                                        {sub.grade === 'A+' ? 4 :
                                            sub.grade === "A" ? 3.75 :
                                                sub.grade === "A-" ? 3.50 :
                                                    sub.grade === "B+" ? 3.25 :
                                                        sub.grade === "B" ? 3.00 :
                                                            sub.grade === "B-" ? 2.75 :
                                                                sub.grade === "C+" ? 2.50 :
                                                                    sub.grade === "C" ? 2.25 :
                                                                        sub.grade === "D" ? 2 : 0}
                                    </th>
                                </tr>
                            })}
                        </tbody>
                    </Table>

                </CardBody>
                <CardFooter>
                    <ButtonGroup className='d-flex justify-content-between'>
                        <div>
                            <Badge color="danger" className="mx-2">points: {sub.points}</Badge>
                            <Badge color="danger" className="mx-2">credits: {sub.credits}</Badge>
                            <Badge color="danger" className="mx-2">credits x points: {sub.cg_po}</Badge>

                            <Badge color="danger" className="mx-2">Total Points {totalPoints}</Badge>
                            <Badge color="danger" className="mx-2">completed credits {totalCredits}</Badge>

                        </div>

                        <div> <Badge color="warning" className="mx-2">SGPA: {(sub.cg_po / sub.credits).toPrecision(3)}</Badge>
                            <Badge color="warning" className="mx-2">CGPA: {(totalPoints / totalCredits).toPrecision(3)}</Badge>
                        </div>
                    </ButtonGroup>
                </CardFooter>
            </Card>
        })}
    </>
}

export default View