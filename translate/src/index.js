const request = require('request')
const chalk = require('chalk')
const utils = require('./utils.js')
const md5 = require('md5')
const args = process.argv.slice(2)

const query = args.reduce((obj, item) => {
  const arr = item.split('=')
  if (arr.length <= 1) arr.unshift('q')
  obj[arr[0]] = arr[1]
  return obj
}, {})

if (args.length < 1) {
  console.log(`\n${chalk.bgRed('ERROR:')}${chalk.red(' 请填写需要翻译的内容')}\n`)
} else {
  let { q='', from='en', to='zh'} = query
  
  // 如果识别出是中文则自动转换
  if (utils.guessIsZh(q)) {
    from = 'zh';
    to = 'en';
  }
  
  const salt = Date.now()
  const appId = '20191124000359888'
  const secret = 'jthUv6OkpEPilSeYKn0Z'
  const sign = md5(`${appId}${q}${salt}${secret}`)

  const url = `http://api.fanyi.baidu.com/api/trans/vip/translate?q=${encodeURIComponent(q)}&from=${from}&to=${to}&appid=${appId}&salt=${salt}&sign=${sign}`
  request.get(url, (err, res) => {
    if (err) {
      return console.error(err)
    }
    const body = JSON.parse(res.body)
    if (body.error_msg) {
      console.error(body.error_msg)
      return
    }
    console.log('\n')
    console.log(chalk.green('结果：'))
    console.table(body.trans_result.map(o => o.dst))
    console.log('\n')
  })
}
