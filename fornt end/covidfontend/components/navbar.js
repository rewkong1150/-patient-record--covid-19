import Link from 'next/link'
const Navbar = () => (
    <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
    <div class="container flex flex-wrap justify-between items-center mx-auto">
            <ul class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
         <div className='mr-4 bg-indigo-500 p-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-lime-500'>
         <Link href="/Home"><a> Home </a></Link> |
        
        <Link href="/patient"><a>Patient</a></Link> |
        
        
        <Link href="/addpatient"><a>addpatient</a></Link> |
        
        <Link href="/"><a>Login</a></Link> |
        <Link href="/logout"><a> Logout </a></Link> 
        
        </div>
        </ul>
    </div>
    </nav>
)

export default Navbar
