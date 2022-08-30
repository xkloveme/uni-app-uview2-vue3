import { cwd } from 'process'
import { resolve } from 'path'
import compressing from 'compressing'
import { createWriteStream, rename } from 'fs'

export interface CompressOptions<Type extends 'zip' | 'tar' | 'tgz'> {
  archiverName?: ArchiverName<Type>
  type: Type
  sourceName?: string
}
type ArchiverName<T> = T extends 'zip' | 'tar'
  ? `${string}.${T}`
  : T extends 'tgz'
  ? `${string}.tar.gz`
  : never

const initOpts: CompressOptions<'zip'> = {
  archiverName: 'build.zip',
  type: 'zip',
  sourceName: 'out/build',
}
export default function createCompressDist(opts?: CompressOptions<'zip' | 'tar' | 'tgz'>) {
  const { sourceName, archiverName, type } = opts || initOpts
  return {
    name: 'vite-plugin-compress-dist',
    closeBundle() {
      console.log('closeBundle')
      const rootPath = cwd()
      rename(resolve(rootPath, 'dist/build/h5'), resolve(rootPath, sourceName), err => {
        if (err) throw err
        console.log('重命名完成')
      })

      const sourcePath = resolve(rootPath, sourceName)
      console.log(`sourcePath: ${sourcePath}`)
      const packagePath = resolve(rootPath, 'out/package.json')
      const writerStream = createWriteStream(resolve(rootPath, 'out/package.json'))
      const data = `{
        "name": "vite-zlb",
        "private": true,
        "version": "1.0.0",
        "type": "module",
        "scripts": {
          "dev": "vite",
          "build": "echo 打包成功",
          "preview": "vite preview"
        },
        "dependencies": {
        },
        "devDependencies": {
        }
      }`

      // 使用 utf8 编码写入数据
      writerStream.write(data)

      writerStream.on('finish', () => {
        console.log(`package.json:  ${sourceName}`)
      })

      writerStream.on('error', err => {
        throw err
      })

      const destStream = createWriteStream(resolve(rootPath, archiverName))
      const sourceStream = new compressing[type].Stream()

      destStream.on('finish', () => {
        console.log(`vite-plugin-compress-dist:  ${sourceName} compress completed!`)
      })

      destStream.on('error', err => {
        throw err
      })

      sourceStream.addEntry(sourcePath)
      sourceStream.addEntry(packagePath)
      sourceStream.pipe(destStream)
    },
  }
}
