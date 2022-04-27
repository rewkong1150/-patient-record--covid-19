import Head from 'next/head' 
import Layout from '../components/layout' 
import Navbar from '../components/navbar'
import styles from '../styles/Home.module.css'
import Authlogin from "../components/Authlogin"
export default function Home({ token }) {
 
  return (
    <Layout>
         <Navbar />
    <Head>
        <title>First Page</title>
    </Head>
    <div class="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h2 class="text-2xl font-bold text-center">โรคโควิด 19 (COVID-19)</h2>
        </div>
    <div  class="flex items-center justify-center min-h-screen bg-blue-100">
    
        <div class="px-8 py-6 mt-4 text-left bg-white shadow-lg  flex justify-center flex-col">
        <p>
         โรคโควิด-19 เป็นโรคติดเชื้อไวรัสผ่านทางละอองฝอยจากระบบทางเดินหายใจ และจากการสัมผัสกับสารคัดหลั่งของผู่ป่วย เช่น น้ำลาย น้ำมูก เสมหะ

เชื้อ COVID-19 มีหลากหลายสายพันธุ์ โดยสายพันธุ์ที่น่ากังวล (Variants of Concerns) หรือสายพันธุ์ที่เชื้อไวรัสได้กลายพันธุ์เพื่อให้แพร่กระจายได้มากและง่ายกว่าเดิม และหลีกเลี่ยงภูมิคุ้มกันในร่างกายได้ดีขึ้น มีอยู่ทั้งหมด 4 สายพันธุ์ ได้แก่ สายพันธุ์อัลฟ่า (B.1.1.7) สายพันธุ์เดลต้า (B.1.617.2) สายพันธุ์เบต้า (B.1.351) และสายพันธุ์แกมม่า (P.1)

ในการรักษาผู้ป่วยโรคโควิด-19 ยังไม่มียาสำหรับรักษาโรคโดยเฉพาะ แต่เป็นการรักษาตามอาการ เช่น ใช้ยาพาราเซตามอลในการลดอาการไข้ หรือใช้ยา Favipiravir ในการยับยั้งการจำลองสารพันธุกรรมของไวรัส เป็นต้น
        </p>
        <div className='flex justify-center flex-row'><img class="chat-notification-logo flex items-center " src='https://www.doctorraksa.com/th-TH/wp-content/uploads/2021/08/coronavirus.jpg'></img></div>
 
    </div>
    </div>
</Layout>
  )
}

export function getServerSideProps({ req, res }) {
  // console.log("token from cookie: ",cookie.get("token")) 
  // console.log('req: ', req.headers)
  return { props: { token: req.cookies.token || "" } };
}
