
import React, { useState } from 'react'
import {
    Card, CardBody, CardHeader, CardFooter, ButtonGroup, Table, Badge, Button
} from 'reactstrap';




const View = ({ semesters, deleteSemester, cedit, gedit, search }) => {
    let [count, setCount] = useState(0)
    let totalPoints = 0
    let totalCredits = 0
    return <>
        {semesters.map(subject => {
            totalPoints = parseFloat(totalPoints) + parseFloat(subject.cg_po)
            totalCredits = parseFloat(totalCredits) + parseFloat(subject.credits)

            return <Card className="my-2 rounded-0">
                <CardHeader>

                    <h3>{subject.name}</h3>
                    <Button onClick={() => deleteSemester(subject.id)}>Action</Button>
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
                            {subject.subject.filter(sub => {
                                if (search === '' || null) {
                                    return sub
                                }
                                if (sub.name.toString().includes(search.toString()) || sub.grade.toString().includes(search.toString())) {
                                    return sub
                                }
                            }).map((sub, i) => {
                                return <tr>
                                    <th>{i + 1}</th>
                                    <th>{sub.name}</th>
                                    <th onClick={() => gedit(subject.id, i, sub.grade)}>{sub.grade}</th>
                                    <th onClick={() => cedit(subject.id, i, sub.credit)}>{sub.credit}</th>
                                    <th>
                                        {sub.grade === 'A+' ? 4 : sub.grade === "A" ? 3.75 : sub.grade === "A-" ? 3.50 : sub.grade === "B+" ? 3.25 : sub.grade === "B" ? 3.00 : sub.grade === "B-" ? 2.75 : sub.grade === "C+" ? 2.50 : sub.grade === "D" ? 2 : 0}
                                    </th>
                                </tr>
                            })}
                        </tbody>
                    </Table>

                </CardBody>
                <CardFooter>
                    <ButtonGroup className='d-flex justify-content-between'>
                        <div>
                            <Badge color="danger" className="mx-2">points: {subject.points}</Badge>
                            <Badge color="danger" className="mx-2">credits: {subject.credits}</Badge>
                            <Badge color="danger" className="mx-2">credits x points: {subject.cg_po}</Badge>

                            <Badge color="danger" className="mx-2">Total Points {totalPoints}</Badge>
                            <Badge color="danger" className="mx-2">completed credits {totalCredits}</Badge>

                        </div>

                        <div> <Badge color="warning" className="mx-2">SGPA: {(subject.cg_po / subject.credits).toPrecision(3)}</Badge>
                            <Badge color="warning" className="mx-2">CGPA: {(totalPoints / totalCredits).toPrecision(3)}</Badge>
                        </div>
                    </ButtonGroup>
                </CardFooter>
            </Card>
        })}
    </>
}

export default View