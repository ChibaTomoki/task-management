'use client'

import axios from 'axios'

export default function UnprotectedClient() {
  const fetchUnprotectedAPI = async () => {
    const res = await axios.get('/api/sample/unprotected')
    console.dir(res)
  }
  const fetchProtectedAPI = async () => {
    const res = await axios.get('/api/sample/protected')
    console.dir(res)
  }

  return (
    <div>
      <h1>unprotected client page</h1>
      <button
        onClick={() => {
          fetchUnprotectedAPI().catch((error) => {
            console.log(error)
          })
        }}
      >
        fetch unprotectedAPI
      </button>
      <button
        onClick={() => {
          fetchProtectedAPI().catch((error) => {
            console.log(error)
          })
        }}
      >
        fetch protectedAPI
      </button>
    </div>
  )
}
