import Layout from "../components/layout"
import Navbar from "../components/navbar"
import AuthStudents from "../components/AuthStudent"
import Styles from "../styles/Home.module.css"
import axios from 'axios'
import { useState, useEffect } from "react"
// import useSWR from 'swr'
import config from '../config/config'

const URL = `${config.URL}/students`
const Students = ({ token }) => {

    const [students, setStudents] = useState({
        list: [
            { id: 1, fname: "ปฐมพร", surname: "แก่นจันทร์", major: "1809700323073", gpa: 23 }
        ]
    })
    const [fname, setFname] = useState('')
    const [surname, setSurname] = useState('')
    const [major, setMajor] = useState('')
    const [gpa, setGpa] = useState(0)

    useEffect(() => {
        getStudents()
    }, [])

    const getStudents = async () => {

        let student = await axios.get(`${config.URL}/students`)
        setStudents(student.data)

    }

    const updateStudent = async (id) => {

        let student = await axios.put(`${URL}/${id}`, { fname, surname, major, gpa })
        setStudents(student.data)
    }

    const deleteStudent = async (id) => {

        let student = await axios.delete(`${URL}/${id}`)
        setStudents(student.data)
    }

    const addStudent = async (fname, surname, major, gpa) => {

        let student = await axios.post(`${config.URL}/students`,

            { fname, surname, major, gpa })
        setStudents(student.data)



    }

    const printStudents = () => {
        if (students.list && students.list.length)

            return students.list.map((item, index) =>
            (<li key={index}>

name: {item.fname},
                surname: {item.surname},
                เลขประจำตัวประชาชน: {item.major},
                age: {item.gpa}
                <button className='bg-pink-700 hover:bg-pink-900 text-white font-bold py-2 px-4 rounded-full'onClick={() => updateStudent(item.id)}>Update</button>
                <button className='bg-pink-700 hover:bg-pink-900 text-white font-bold py-2 px-4 rounded-full'onClick={() => deleteStudent(item.id)}>Delete</button>
            </li>)
            )
    }
    return (
        <Layout>
             <Navbar />
             <div class="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h2 class="text-2xl font-bold text-center">บันทึก แก้ไข</h2>
        </div>
        <div  class="px-8 py-6 mt-4 text-left bg-white shadow-lg">
                <ul>
                {printStudents()}
                </ul>
                    </div>
            <div class="flex items-center justify-center min-h-screen bg-blue-100">
               <br></br>
                
              
                   
                    <div class="px-8 py-6 mt-4 text-left bg-white shadow-lg">
                    <h2 class="text-3xl font-bold text-center">Insert Student</h2>
                    <form action="">
                name: <input type="text" onChange={(e) => setFname(e.target.value)}></input>
                surname: <input type="text" onChange={(e) => setSurname(e.target.value)}></input>
                เลขประจำตัวประชาชน: <input type="text" onChange={(e) => setMajor(e.target.value)}></input>
                age: <input type="number" onChange={(e) => setGpa(e.target.value)}></input>
                <div><button className='bg-pink-700 hover:bg-pink-900 text-white font-bold py-2 px-4 rounded-full' onClick={() => addStudent(fname, surname, major, gpa)}>Add</button></div>
                
                </form>
                    </div>
                   
                    

               
            </div>
        </Layout>
    )
}

export default AuthStudents(Students)

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}