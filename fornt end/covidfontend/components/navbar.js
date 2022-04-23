import Link from 'next/link'

const Navbar = () => (
    <div>
        <Link href="/"><a> Home </a></Link> |
        <Link href="/profile"><a> Profile </a></Link> | 
        <Link href="/patient"><a>ข้อมูลผู้ป่วย</a></Link> |
        <Link href="/foo"><a> Foo </a></Link> |
        <Link href="/login"><a> Login </a></Link> |
    </div>
)

export default Navbar