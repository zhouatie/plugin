const request = require('request')
const sha256 = require('js-sha256')
const chalk = require('chalk')

const args = process.argv.slice(2)
const log = console.log

const  truncate = (q) => {
  var len = q.length;
  if(len<=20) return q;
  return q.substring(0, 10) + len + q.substring(len-10, len);
}

const query = args.reduce((obj, item) => {
  const arr = item.split('=')
  if (arr.length <= 1) arr.unshift('q')
  obj[arr[0]] = arr[1]
  return obj
}, {})

const signType = 'v3'
const curTime = Math.round(new Date().getTime()/1000)
const appKey = '06f92ea59ce450ca'
const secret = 'FPuHFbpa2wpAdkU9tfoaDEAWQyGQtVmb'
const salt = Date.now()
const str = `${appKey}${truncate(query.q || '')}${salt}${curTime}${secret}`
const sign = sha256(str)

const url = `http://openapi.youdao.com/api?q=${encodeURIComponent(query.q)}&signType=${signType}&curtime=${curTime}&from=auto&to=auto&appKey=${appKey}&salt=${salt}&sign=${sign}`

request.get(url, (err, res) => {
  if (err) {
    console.log(err)
    return
  }
  const body = JSON.parse(res.body)

  if (body.basic) {
    if (body.l.startsWith('zh')) log(body.basic['phonetic'] ? `${body.query} ${chalk.magenta(`[${body.basic['phonetic']}]`)}` : '')
    else {
      log(chalk.magenta(`${body.basic['uk-phonetic'] ? `英 [${body.basic['uk-phonetic']}]` : ''}   ${body.basic['us-phonetic'] ? `美 [${body.basic['us-phonetic']}]` : ''}`))
    }

    log('\n')
    body.basic.explains.forEach(o => {
      log(chalk.cyan(`${o}`))
    })
    log('\n')
  } else {
    log(chalk.bold(body.query))
  }
})
