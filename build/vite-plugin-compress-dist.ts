import { cwd } from 'process'
import { resolve, join } from 'path'
import compressing from 'compressing'
import { createWriteStream, rename, readdirSync, statSync, unlinkSync, rmdirSync } from 'fs'

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
  archiverName: 'src.zip',
  type: 'zip',
  sourceName: 'dist/build/build',
}
export default function createCompressDist(opts?: CompressOptions<'zip' | 'tar' | 'tgz'>) {
  const { sourceName, archiverName, type } = opts || initOpts
  return {
    name: 'vite-plugin-compress-dist',
    closeBundle() {
      console.log('closeBundle')
      const rootPath = cwd()
      let removeDir = dir => {
        let files = readdirSync(dir)
        for (let i = 0; i < files.length; i++) {
          let newPath = join(dir, files[i])
          let stat = statSync(newPath)
          if (stat.isDirectory()) {
            //如果是文件夹就递归下去
            removeDir(newPath)
          } else {
            //删除文件
            unlinkSync(newPath)
          }
        }
        rmdirSync(dir) //如果文件夹是空的，就将自己删除掉
      }
      removeDir(resolve(rootPath, sourceName))
      rename(resolve(rootPath, 'dist/build/h5'), resolve(rootPath, sourceName), err => {
        if (err) throw err
        console.log('重命名完成')
      })

      const sourcePath = resolve(rootPath, sourceName)
      console.log(`sourcePath: ${sourcePath}`)
      const packagePath = resolve(rootPath, 'dist/build/package.json')
      const writerStream = createWriteStream(resolve(rootPath, 'dist/build/package.json'))
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
