"use client"
//this is the component which i made in the ./component/dashboard path
import Dashboard from "@/components/dashboard";
import {StudentProfile} from "@/components/studentProfile";
import {Wallet} from "@/components/wallet";
import {Communication} from "@/components/communication";



const StudentDashboard = () => {
  const handleOpenWallet = () => {
    console.log("Wallet opened!")
  }

  const handleOpenMessages = () => {
    console.log("Messages opened!")
  }
  const passingArgs = {
  name: 'Rahul Sharma',
  className: 'Grade 10',
  school: 'Delhi Public School',
  location: 'South Delhi',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul'
}




  return (
    <div>
<Dashboard {...passingArgs} />
{/* <StudentProfile/> */}










<div className="flex flex-col sm:flex-row gap-5 justify-center items-center sm:items-start">
  <Wallet walletBalance={5000} onOpenWallet={handleOpenWallet} />
  <Communication onOpenMessages={handleOpenMessages} />
</div>

    </div>
  )
}

export default  StudentDashboard;