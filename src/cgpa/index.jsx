import React, { Component } from 'react'
import sid from "short-id";
import {
    Card, CardHeader, Button,

} from 'reactstrap';

import demoSubjects from '../demo/semesters'
import View from './view'
import UserInput from '../input/index'

class CGPA extends Component {

    state = {
        userId: 1,
        demoData: demoSubjects,
        subjects: [],
        isOpen: false,
        dx: [
            {
                name: '',
                grade: '',
                credit: ''
            }
        ]
    }

    componentDidMount = () => {
        const subjects = []
        this.state.demoData.map(sub => {
            subjects.push(this.convertReatData(sub))
        })
        this.setState({
            subjects: this.state.subjects.concat(subjects)
        }, () => {
            //console.log(this.state.subjects)
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
        let s = this.convertReatData(newSem)
        this.setState({
            subjects: this.state.subjects.concat(s)
        }, () => {
            console.log(this.state.subjects)
        })
    }

    convertGrageToPoint = (grade) => {
        return grade === 'A+' ? 4 :
            grade === "A" ? 3.75 :
                grade === "A-" ? 3.50 :
                    grade === "B+" ? 3.25 :
                        grade === "B" ? 3.00 :
                            grade === "B-" ? 2.75 :
                                grade === "C+" ? 2.50 :
                                    grade === "C" ? 2.25 :
                                        grade === "D" ? 2 : 0
    }

    modalHandle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        const { isOpen, subjects } = this.state

        return <>
            <Card>
                <CardHeader className="text-center">

                    <h4>CGPA Calculation</h4>
                    <h5>Dept. of CSE, BUBT</h5>
                    <h5>Intake: 35, Section: 01</h5>
                    <Button onClick={this.modalHandle}>Add New Semester</Button>
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
                subjects={subjects}
            />

            <Card className="rounded-0">
                <CardHeader className="text-center py-4">
                    <small>Designed and Developed by Jobayer Hossain &copy; <mark>react js</mark> {Date()}</small>
                </CardHeader>
            </Card>
        </>
    }
}

export default CGPA
