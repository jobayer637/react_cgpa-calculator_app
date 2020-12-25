import React, { Component } from 'react'
import {
    Card, CardBody,
    Modal, ModalHeader, ModalBody, ModalFooter, Button,
    Form, FormGroup, Input, InputGroup, Label
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
        this.props.addNewSemester(newSemester)
        this.setState({
            semesters: this.state.semesters.concat(newSemester)
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