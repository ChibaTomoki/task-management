import axios from 'axios'

export default async function UnprotectedClient() {
  const res = await fetchUnprotectedAPI()
  console.dir(res)

  return (
    <div>
      <h1>unprotected server page</h1>
      <p>{res.data.message}</p>
    </div>
  )
}

const fetchUnprotectedAPI = async () => {
  const res = await axios.get<{ message: string }>(
    `${process.env.BASE_URL}/api/sample/unprotected`,
  )
  console.dir(res)
  return res
}
