import { Schema, connect, model, models } from 'mongoose'
import { NextResponse } from 'next/server'

type Sample = {
  _id: string
  now: Date
}

const connectDB = async () => {
  if (!process.env.MONGO_URI)
    throw new Error('環境変数が正しく設定されていません')

  await connect(process.env.MONGO_URI, { dbName: 'taskManagement' })
}

const sampleSchema = new Schema<Sample>({
  now: Date,
})
const sampleModel = models.sample || model('sample', sampleSchema)

export const GET = async () => {
  await connectDB()

  const sample = await sampleModel.find({})
  return NextResponse.json(sample)
}
export const POST = async () => {
  await connectDB()

  await sampleModel.create({
    now: new Date(),
  })
  return NextResponse.json({ message: 'post success' })
}
export const DELETE = async () => {
  await connectDB()

  await sampleModel.deleteMany({})
  return NextResponse.json({ message: 'delete success' })
}
