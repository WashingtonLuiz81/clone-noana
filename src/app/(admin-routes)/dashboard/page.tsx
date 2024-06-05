'use client'

// import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route'
// import { getServerSession } from 'next-auth'
// import { redirect } from 'next/navigation'
import { useEffect } from 'react'

export default function Dashboard() {
  // const session = await getServerSession(nextAuthOptions)

  // if (!session) {
  //   redirect('/')
  // }

  // async function getData() {
  //   const IdToken =
  //     'eyJraWQiOiI3RTJGK3NkXC90bG1qaktpZForVWpoc2NjMGhtVFlwTHp1a1Z6dWFpWUh0cz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhMmVkYTc1Mi02NjRhLTQ4NGQtOWNjZi05MmEwMDM4YTQ2ZjIiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfbGdqaUhTNWhIIiwiY29nbml0bzp1c2VybmFtZSI6Im5vYW5hIiwib3JpZ2luX2p0aSI6IjU3ZWU3YTE5LTYwMDktNDdjMy04MzgzLTgzNGVlNzM0ZDgyMSIsImF1ZCI6IjE1NnF0M3FyNzltdTRqc25yNXQ4MmhvdDE1IiwiZXZlbnRfaWQiOiJkOWFmMmQ2Mi05YmEyLTRhNTYtYjRkOS04ZDZjZjE1NDQ2ODQiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTcxNzUyNTM3OCwiZXhwIjoxNzE3NTI4OTc4LCJpYXQiOjE3MTc1MjUzNzgsImp0aSI6ImEzMWU3ZjRhLTU2NGEtNDUwYi1hY2JkLWJjOGNmMDRlYTRmZSIsImVtYWlsIjoibm9hbmFAbG9jYWxob3N0In0.GYKE_jU1zqcBYAaYNd5YKnnabkuVRjWJJDVdI2yVrRukirNSBnu1z8hucpJiG4qgNPMheVprOp_b5ErfVtrnS3OlPz-toTq4vigHzMMhsUzQ175lOpRXSj_wC3s5xL8siKZ8kZLfAGE__LXiahuXPRDXUJTu1tzKgiB5UhCUOJuUrKCqAvOhy599BAmCu72jMKg9vEKNbGGpjM4nVtKJ9Ikt22DlZGDsOZxUIa9q_AWtgvE0zcZ6XXhwB5E8ib9PiX4-DqqjqA3Bv82h-Nhq6jlDQncZwOm5QakFN7GI7dYunzwWxoBqNnPArO91PL47osVG20VlXxbfrR9gb3ERdg'
  //   const response = await fetch(
  //     'https://admin.hml.noana.link/v1/person/person/',
  //     {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${IdToken}`,
  //       },
  //     },
  //   )

  //   const responseJson = await response.json()

  //   console.log('responseJson: ', responseJson)
  // }

  useEffect(() => {
    // getData()
  }, [])

  return (
    <div>
      <div>Olá, </div>
      <div>Dashboard</div>
    </div>
  )
}
