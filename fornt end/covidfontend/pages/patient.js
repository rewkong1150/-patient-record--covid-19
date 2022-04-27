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
                <a href= "http://localhost:3001/LayoutSample">
  <button type="button"  className='bg-pink-700 hover:bg-pink-900 text-white font-bold py-2 px-4 rounded-full'>
    พิมพ์ใบรับรองแพทย์
  </button>
</a>
            </li>)
            )
    }
    return (
        <Layout>
            <Navbar />
            <div class="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h2 class="text-2xl font-bold text-center">รายชื่อผู้ป่วย</h2>
        </div>
            <div class="flex items-center justify-center min-h-screen bg-blue-100">
            
           <div  class="px-8 py-6 mt-4 text-left bg-white shadow-lg"><br></br>
                <ul>
                    {printStudents()}
                </ul></div>
                
            </div>
        </Layout>
    )
}

export default AuthStudents(Students)

export function getServerSideProps({ req, res }) {
    return { props: { token: req.cookies.token || "" } };
}