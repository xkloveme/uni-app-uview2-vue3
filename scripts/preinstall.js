if (!/yarn/.test(process.env.npm_execpath || '') && !/pnpm/.test(process.env.npm_execpath || '')) {
  console.log(`\n\u001b[33m您现在使用的包管理工具是:\n${process.env.npm_execpath}\u001b[39m`)
  console.log(`\n\u001b[33m推荐使用 Node 15.12.0  npm 7.11.1\u001b[39m`)
  console.warn(
    `\n\u001b[33m本仓库使用 yarn OR pnpm 作为包管理器,请确保已安装 yarn OR pnpm 并使用其进行依赖下载\u001b[39m\n`,
  )
  console.warn(
    `\u001b[33m若未安装请先使用 npm install -g yarn OR npm install -g pnpm 安装\u001b[39m\n`,
  )
  process.exit(1)
}
