import React, { Component } from 'react'
import sid from "short-id";
import {
    Card, CardHeader, Button, Modal, Input, ModalBody, InputGroup, Form, Badge,

} from 'reactstrap';

import demoSubjects from '../demo/semesters'
import View from './view'
import UserInput from '../input/index'
import swal from 'sweetalert';
import semesters from './../demo/semesters';

class CGPA extends Component {

    state = {
        userId: 1,
        demoData: demoSubjects,
        semesters: [],
        isOpen: false,
        dx: [
            {
                name: '',
                grade: '',
                credit: ''
            }
        ],

        gradeModalIsOpen: false,
        gradeEditValue: '',
        semesterId: '',
        subjectIdex: '',
        updateStatus: '',

        search: '',
        rgb: {
            red: 200,
            green: 200,
            blue: 200
        }

    }

    componentDidMount = () => {
        const semester = []
        this.state.demoData.map(sub => {
            semester.push(this.convertReatData(sub))
        })
        this.setState({
            semesters: this.state.semesters.concat(semester)
        }, () => {
            this.setState({
                rgb: {
                    red: Math.floor(Math.random() * 200),
                    blue: Math.floor(Math.random() * 200),
                    green: Math.floor(Math.random() * 200)
                }
            })
        })
    }


    convertReatData = sub => {
        let id = sid.generate()
        let name = sub.name
        let credits = 0
        let points = 0
        let cg_po = 0
        let cgpa = 0
        let subject = sub.subject

        sub.subject.map(s => {
            credits = parseFloat(credits) + parseFloat(s.credit)
            points += this.convertGrageToPoint(s.grade)
            cg_po += parseFloat(s.credit) * parseFloat(this.convertGrageToPoint(s.grade))
        })


        let sem = {
            id: id,
            name: name,
            credits: credits,
            points: points,
            cgpa: cgpa,
            sgpa: cgpa,
            cg_po: cg_po,
            subject: sub.subject
        }

        return sem
    }

    addNewSemester = (newSem) => {
        let semester = this.convertReatData(newSem)
        this.setState({
            semesters: this.state.semesters.concat(semester)
        }, () => {
            this.setState({
                rgb: {
                    red: Math.floor(Math.random() * 200),
                    blue: Math.floor(Math.random() * 200),
                    green: Math.floor(Math.random() * 200)
                }
            })
        })
    }

    convertGrageToPoint = (grade) => {
        return grade === 'A+' ? 4 : grade === "A" ? 3.75 : grade === "A-" ? 3.50 : grade === "B+" ? 3.25 : grade === "B" ? 3.00 : grade === "B-" ? 2.75 : grade === "C+" ? 2.50 : grade === "C" ? 2.25 : grade === "D" ? 2 : grade === "F" ? 0 : 0
    }

    modalHandle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        }, () => {
            this.setState({
                rgb: {
                    red: Math.floor(Math.random() * 200),
                    blue: Math.floor(Math.random() * 200),
                    green: Math.floor(Math.random() * 200)
                }
            })
        })
    }

    deleteSemester = (id) => {
        let semesters = [...this.state.semesters]
        let index = semesters.find(sem => sem.id === id)
        semesters.splice(index, 1)
        this.setState({
            semesters
        }, () => [
            this.setState({
                rgb: {
                    red: Math.floor(Math.random() * 200),
                    blue: Math.floor(Math.random() * 200),
                    green: Math.floor(Math.random() * 200)
                }
            })
        ])
    }

    gedit = (sem_id, sub_index, sub_grade) => {
        this.setState({
            gradeModalIsOpen: !this.state.gradeModalIsOpen,
            gradeEditValue: sub_grade,
            semesterId: sem_id,
            subjectIdex: sub_index,
            updateStatus: 'g'
        }, () => {
            this.setState({
                rgb: {
                    red: Math.floor(Math.random() * 200),
                    blue: Math.floor(Math.random() * 200),
                    green: Math.floor(Math.random() * 200)
                }
            })
        })
    }

    cedit = (sem_id, sub_index, sub_credit) => {
        this.setState({
            gradeModalIsOpen: !this.state.gradeModalIsOpen,
            gradeEditValue: sub_credit,
            semesterId: sem_id,
            subjectIdex: sub_index,
            updateStatus: 'c'
        }, () => {
            this.setState({
                rgb: {
                    red: Math.floor(Math.random() * 200),
                    blue: Math.floor(Math.random() * 200),
                    green: Math.floor(Math.random() * 200)
                }
            })
        })
    }

    updateGrade = event => {
        this.setState({
            gradeEditValue: event.target.value
        }, () => {
            this.setState({
                rgb: {
                    red: Math.floor(Math.random() * 200),
                    blue: Math.floor(Math.random() * 200),
                    green: Math.floor(Math.random() * 200)
                }
            })
        })
    }

    handleGradeUpdate = (event) => {
        event.preventDefault()
        const gChaar = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'D', 'F'];
        const cChar = ['4', '3', '2.5', '2', '1.5', '1', '0.75']

        if (this.state.updateStatus === 'g') {
            if (!gChaar.includes(this.state.gradeEditValue.toUpperCase())) {
                swal({
                    title: "Oopps!",
                    text: "Please Enter Valid Grade Between ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'D', 'F']",
                    icon: "warning",
                    button: "Close",
                });
                return
            }
        }

        if (this.state.updateStatus === 'c') {
            if (!cChar.includes(this.state.gradeEditValue.toString())) {
                swal({
                    title: "Oopps!",
                    text: "Please Enter Valid Credit Between ['4', '3', '2.5','2', '1.5', '1', '0.75']",
                    icon: "warning",
                    button: "Close",
                });

                return
            }
        }

        const semesters = [...this.state.semesters]
        let semester = semesters.find(sub => sub.id === this.state.semesterId)

        if (this.state.updateStatus === 'g') {
            semester.subject[this.state.subjectIdex].grade = this.state.gradeEditValue.toUpperCase()
            let points = 0
            let cg_po = 0
            semester.subject.map(sub => {
                points = parseFloat(points) + parseFloat(this.convertGrageToPoint(sub.grade))
                cg_po += parseFloat(sub.credit) * parseFloat(this.convertGrageToPoint(sub.grade))
            })
            semester.points = points
            semester.cg_po = cg_po
        }

        if (this.state.updateStatus === 'c') {
            semester.subject[this.state.subjectIdex].credit = this.state.gradeEditValue
            let credits = 0
            let cg_po = 0
            let points = 0
            semester.subject.map(sub => {
                points = parseFloat(points) + parseFloat(this.convertGrageToPoint(sub.grade))
                credits = parseFloat(credits) + parseFloat(sub.credit)
                cg_po += parseFloat(sub.credit) * parseFloat(this.convertGrageToPoint(sub.grade))
            })
            semester.credits = credits
            semester.points = points
            semester.cg_po = cg_po
        }

        this.setState({
            semesters: semesters
        }, () => {
            swal({
                title: "Good job!",
                text: "Successcully Updated",
                icon: "success",
                button: "Close",
            });
            this.setState({
                gradeModalIsOpen: !this.state.gradeModalIsOpen,
                gradeEditValue: '',
                semesterId: '',
                subjectIdex: '',
                updateStatus: '',
                rgb: {
                    red: Math.floor(Math.random() * 200),
                    blue: Math.floor(Math.random() * 200),
                    green: Math.floor(Math.random() * 200)
                }
            })
            //console.log(this.state.semesters)
        })
    }

    searchHandle = event => {
        this.setState({
            search: event.target.value
        }, () => {
            this.setState({
                rgb: {
                    red: Math.random() * 200,
                    blue: Math.random() * 200,
                    green: Math.random() * 200
                }
            })
        })
    }

    handleDeleteAllSemester = () => {
        this.setState({
            semesters: []
        }, () => {
            this.setState({
                rgb: {
                    red: Math.floor(Math.random() * 200),
                    blue: Math.floor(Math.random() * 200),
                    green: Math.floor(Math.random() * 200)
                }
            })
        })
    }

    deleteSubject = (semesterId, subjectId) => {

        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    let semesters = [...this.state.semesters]
                    let findSemester = semesters.find(semester => semester.id === semesterId)
                    findSemester.points = parseFloat(findSemester.points) - parseFloat(this.convertGrageToPoint(findSemester.subject[subjectId].grade))
                    findSemester.credits = parseFloat(findSemester.credits) - parseFloat(findSemester.subject[subjectId].credit)
                    findSemester.cg_po = findSemester.cg_po - (parseFloat(findSemester.subject[subjectId].credit) * parseFloat(this.convertGrageToPoint(findSemester.subject[subjectId].grade)))
                    findSemester.subject.splice(subjectId, 1)
                    this.setState({
                        semesters: semesters
                    }, () => {
                        swal("Poof! Your imaginary file has been deleted!", {
                            icon: "success",
                        });
                    })
                } else {
                    swal("Your imaginary file is safe!");
                }
            });

    }

    render() {
        const { isOpen, semesters, search } = this.state
        let { red, green, blue } = this.state.rgb

        return <>

            <Modal isOpen={this.state.gradeModalIsOpen}>
                <ModalBody>
                    <Form onSubmit={this.handleGradeUpdate}>
                        <InputGroup>
                            <Input required onChange={this.updateGrade} className="rounded-0 border-dark" type="text" value={this.state.gradeEditValue}></Input>
                            <Button type="submit" className="rounded-0 border-dark btn-dark">updae</Button>
                            <Button className="rounded-0 btn-warning border-dark" onClick={() => this.setState({ gradeModalIsOpen: !this.state.gradeModalIsOpen })}>cancel</Button>
                        </InputGroup>
                    </Form>
                </ModalBody>
            </Modal>

            <Card>
                <CardHeader className="text-center">

                    <h4>CGPA Calculation</h4>
                    <h5>Dept. of CSE, BUBT</h5>
                    <h5>Intake: 35, Section: 01</h5>
                    <div className="d-flex justify-content-between">
                        <div>
                            <Button className="rounded-0 btn-dark" onClick={this.modalHandle}>Add New Semester</Button>
                            <Button className="rounded-0 btn-danger ml-2" onClick={this.handleDeleteAllSemester}>Delete All Semester</Button>
                        </div>
                        <Input onChange={this.searchHandle} value={this.state.search} className="w-50 rounded-0 border-success" type="text" placeholder="Search Your Data by course name or grade"></Input>
                    </div>
                </CardHeader>
            </Card>

            {/* Input part */}
            <UserInput
                isOpen={isOpen}
                modalHandle={this.modalHandle}
                addNewSemester={this.addNewSemester}
            />


            {/* view part */}
            <View
                semesters={semesters}
                deleteSemester={this.deleteSemester}
                deleteSubject={this.deleteSubject}
                cedit={this.cedit}
                gedit={this.gedit}
                search={search}
                red={red}
                blue={blue}
                green={green}
            />

            <Card className="rounded-0">
                <CardHeader className="text-center py-4">
                    <small>Designed and Developed by Jobayer Hossain &copy; <mark>BUBT</mark> &copy; <mark>React js</mark> &copy; {Date()}</small>
                </CardHeader>
            </Card>
        </>
    }
}

export default CGPA
