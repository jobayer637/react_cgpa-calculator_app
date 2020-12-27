import { Form, FormGroup, InputGroup, Input } from 'reactstrap'

const AddSub = ({ handleInputAddSubject, handleAddSubFormSubmit, addSubject, showAddSubjectForm }) => {
    return <Form onSubmit={handleAddSubFormSubmit}>
        <FormGroup>
            <InputGroup>
                <Input className="rounded-0" value={addSubject.name} required name="name" onChange={handleInputAddSubject} placeholder="Subject Name" ></Input>
                <Input className="rounded-0" required name="grade" onChange={handleInputAddSubject} type="select" id="exampleSelect">
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
                <Input className="rounded-0" required name="credit" onChange={handleInputAddSubject} type="select" id="exampleSelect">
                    <option value="">Credit</option>
                    <option value="4">4</option>
                    <option value="3">3</option>
                    <option value="2">2</option>
                    <option value="1.5">1.5</option>
                    <option value="0.75">0.75</option>
                </Input>
                <div className="d-flex justify-content-between">
                    <Input className="rounded-0 btn-primary px-5" type="submit" value="Add" />
                    <Input onClick={() => showAddSubjectForm('')} className="rounded-0 btn btn-warning px-5" type="button" value="Cancel" />
                </div>
            </InputGroup>
        </FormGroup>
    </Form>
}

export default AddSub