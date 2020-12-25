import React, { Component } from 'react'
import {
    Card, CardBody, Table,
    Modal, ModalHeader, ModalBody, ModalFooter, Button,
    Form, FormGroup, Input, InputGroup, Label, ButtonGroup, Badge, CardFooter
} from 'reactstrap';
import swal from 'sweetalert';

class UserInput extends Component {

    state = {
        semesterName: '',
        subDada: {
            name: '',
            grade: '',
            credit: '',
        },
        subjects: [],
        semesters: []
    }

    handleInput = event => {
        this.setState({
            subDada: {
                ...this.state.subDada,
                [event.target.name]: event.target.value
            }
        })
    }

    handleSemesterName = event => {
        this.setState({
            semesterName: event.target.value
        })
    }

    handleFormSubmit = event => {
        event.preventDefault()
        this.setState({
            subjects: this.state.subjects.concat(this.state.subDada)
        }, () => {
            event.target.reset()
            this.setState({ subDada: { name: '', grade: '', credit: '' } })
            console.log(this.state.subjects)
            swal({
                title: "Good job!",
                text: "Successcully added your data",
                icon: "success",
                button: "Close",
            });
        })
    }

    handleAddNewSemester = () => {
        const newSemester = {
            id: 0,
            name: this.state.semesterName,
            credits: 0,
            points: 0,
            cgpa: 0,
            sgpa: 0,
            subject: this.state.subjects
        }

        if (!newSemester.name) {
            swal("Opps!", "Please Enter Semester Name", "info");
            return;
        }

        this.props.addNewSemester(newSemester)
        this.setState({
            semesters: this.state.semesters.concat(newSemester),
            subjects: [],
            subDada: { name: '', grade: '', credit: '' }
        }, () => {
            this.props.modalHandle()
            swal({
                title: "Good job! " + this.state.semesterName,
                text: "New Semester Successcully added",
                icon: "success",
                button: "Close",
            });

        })
    }


    render() {
        const { isOpen, modalHandle } = this.props
        const { name } = this.state.subDada
        let totalCredits = 0
        let totalPoints = 0
        return <>
            <Modal size="lg" isOpen={isOpen}>

                <ModalHeader>
                    Enter Your Data
                </ModalHeader>
                <ModalBody>
                    <Card>
                        <CardBody>

                            <FormGroup>
                                <Label>Enter Semester Name</Label>
                                <Input onChange={this.handleSemesterName} type="text" name="semester" placeholder="Enter Your Semeter Name"></Input>
                            </FormGroup>
                            <Form onSubmit={this.handleFormSubmit}>
                                <FormGroup>
                                    <InputGroup>
                                        <Input value={name} name="name" onChange={this.handleInput} placeholder="Subject Name" ></Input>
                                        <Input name="grade" onChange={this.handleInput} type="select" id="exampleSelect">
                                            <option value="">Grade</option>
                                            <option value="A+">A+</option>
                                            <option value="A">A</option>
                                            <option value="A-">A-</option>
                                            <option value="B+">B+</option>
                                            <option value="B">B</option>
                                            <option value="B-">B-</option>
                                            <option value="C+">C+</option>
                                            <option value="C">C</option>
                                            <option value="D">D</option>
                                            <option value="F">F</option>
                                        </Input>
                                        <Input name="credit" onChange={this.handleInput} type="select" id="exampleSelect">
                                            <option value="">Credit</option>
                                            <option value="4">4</option>
                                            <option value="3">3</option>
                                            <option value="2">2</option>
                                            <option value="1.5">1.5</option>
                                            <option value="0.75">0.75</option>
                                        </Input>
                                        <Input className="rounded-0 btn-info" type="submit" value="add" />
                                    </InputGroup>
                                </FormGroup>
                            </Form>
                        </CardBody>

                        <CardBody>
                            <Table dark>
                                <thead>
                                    <tr>
                                        <th>Serial</th>
                                        <th>Course Name</th>
                                        <th>Course Grade</th>
                                        <th>Course Credit</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.subjects.map((sub, i) => {
                                        totalPoints = parseFloat(totalPoints) + ((parseFloat(sub.credit)) * parseFloat(sub.grade === 'A+' ? 4 : sub.grade === "A" ? 3.75 : sub.grade === "A-" ? 3.50 : sub.grade === "B+" ? 3.25 : sub.grade === "B" ? 3.00 : sub.grade === "B-" ? 2.75 : sub.grade === "C+" ? 2.50 : sub.grade === "C" ? 2.25 : sub.grade === "D" ? 2 : 0))
                                        totalCredits = parseFloat(totalCredits) + parseFloat(sub.credit)
                                        return <tr>
                                            <th>{i + 1}</th>
                                            <td>{sub.name}</td>
                                            <td>{sub.grade}</td>
                                            <td>{sub.credit}</td>
                                        </tr>
                                    })}
                                </tbody>
                            </Table>
                        </CardBody>
                        <CardFooter>
                            <ButtonGroup className="d-flex justify-content-between">
                                <div>
                                    <Badge color="info" className="rounded-0 mx-2">Total Points {totalPoints}</Badge>
                                    <Badge color="info" className="rounded-0 mx-2">Total Credits {totalCredits}</Badge>
                                </div>
                                <div>
                                    <Badge color="info" className="rounded-0 mx-2">SGPA {(totalPoints / totalCredits).toPrecision(3)}</Badge>
                                </div>
                            </ButtonGroup>
                        </CardFooter>
                    </Card>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={this.handleAddNewSemester} color="warning" className="rounded-0">Add This Semester</Button>
                    <Button className="rounded-0" onClick={modalHandle}>Close</Button>
                </ModalFooter>

            </Modal>
        </>
    }
}

export default UserInput