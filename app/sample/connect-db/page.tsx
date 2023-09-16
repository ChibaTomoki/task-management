'use client'

import axios from 'axios'

export default function SsrMongodb() {
  const getSample = async () => {
    const res = await axios.get(`/api/sample`)
    console.dir(res)
  }
  const postSample = async () => {
    const res = await axios.post('/api/sample')
    console.dir(res)
  }
  const deleteSample = async () => {
    const res = await axios.delete('/api/sample')
    console.dir(res)
  }

  return (
    <div>
      <h1>mongoDB接続テスト</h1>
      <button onClick={() => void getSample()}>GET</button>
      <button onClick={() => void postSample()}>POST</button>
      <button onClick={() => void deleteSample()}>DELETE</button>
    </div>
  )
}
